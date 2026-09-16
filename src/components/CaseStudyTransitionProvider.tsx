"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const CAP_FLY_MS = 750;
const CAP_PAUSE_MS = 500;
const CAP_EXIT_MS = 200;
const BLACK_MS = 450;
const SLIDE_ARC_MS = 920;
const SLIDE_STAGGER_MS = 70;
const SLIDE_START_DELAY_MS = 120;

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type FlySlide = {
  side: "left" | "right";
  src: string;
  from: Rect;
  to: Rect;
  current: Rect;
  rotate: number;
};

type FlyTransition = {
  slug: string;
  capSrc: string;
  capFrom: Rect;
  capTo: Rect;
  capAtCenter: boolean;
  exiting: boolean;
  slides: FlySlide[];
};

type CaseStudyElements = {
  cap: HTMLElement;
  left: HTMLElement;
  right: HTMLElement;
};

type CaseStudyAssets = {
  cap: string;
  left: string;
  right: string;
};

type CaseStudyTransitionContextValue = {
  startCaseStudy: (
    slug: string,
    elements: CaseStudyElements,
    assets: CaseStudyAssets,
  ) => void;
  goToCaseStudy: (slug: string) => void;
  goHome: () => void;
  isExitingCaseStudy: boolean;
  isTransitioning: boolean;
  flyingStackId: string | null;
  homeRemountKey: number;
};

const CaseStudyTransitionContext =
  createContext<CaseStudyTransitionContextValue | null>(null);

export function useCaseStudyTransition() {
  const context = useContext(CaseStudyTransitionContext);
  if (!context) {
    throw new Error(
      "useCaseStudyTransition must be used within CaseStudyTransitionProvider",
    );
  }
  return context;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function easeOutBack(t: number) {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

function quadBezier(t: number, p0: number, p1: number, p2: number) {
  const inv = 1 - t;
  return inv * inv * p0 + 2 * inv * t * p1 + t * t * p2;
}

function rectFromElement(element: HTMLElement): Rect {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function getCenterTarget(fromWidth: number): Rect {
  const width = Math.min(Math.max(fromWidth * 1.15, 240), 340);
  const height = width * 0.8;
  return {
    top: window.innerHeight / 2 - height / 2,
    left: window.innerWidth / 2 - width / 2,
    width,
    height,
  };
}

function getSlideTarget(capTo: Rect, side: "left" | "right"): Rect {
  const scale = 0.9;
  const tuckY = capTo.height * 0.05;
  const tuckX = side === "left" ? -capTo.width * 0.02 : capTo.width * 0.02;

  return {
    top: capTo.top + tuckY,
    left: capTo.left + capTo.width * 0.5 * (1 - scale) + tuckX,
    width: capTo.width * scale,
    height: capTo.height * scale,
  };
}

function getSlideStartRotation(side: "left" | "right") {
  return side === "left" ? -16 : 16;
}

function getArcControl(from: Rect, to: Rect, side: "left" | "right") {
  const midTop = (from.top + to.top) / 2;
  const midLeft = (from.left + to.left) / 2;
  const lift = clamp(Math.hypot(to.left - from.left, to.top - from.top) * 0.32, 56, 140);
  const spread = side === "left" ? -96 : 96;

  return {
    top: midTop - lift,
    left: midLeft + spread,
  };
}

function animateRectArc(
  from: Rect,
  to: Rect,
  side: "left" | "right",
  progress: number,
): Rect {
  const eased = easeOutBack(progress);
  const control = getArcControl(from, to, side);

  return {
    top: quadBezier(eased, from.top, control.top, to.top),
    left: quadBezier(eased, from.left, control.left, to.left),
    width: lerp(from.width, to.width, eased),
    height: lerp(from.height, to.height, eased),
  };
}

export function CaseStudyTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const timeoutsRef = useRef<number[]>([]);
  const handledEnterRef = useRef<string | null>(null);
  const capExitHandledRef = useRef(false);
  const slideFrameRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [flyTransition, setFlyTransition] = useState<FlyTransition | null>(null);
  const [flyingStackId, setFlyingStackId] = useState<string | null>(null);
  const [blackOpacity, setBlackOpacity] = useState(0);
  const [isExitingCaseStudy, setIsExitingCaseStudy] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [homeRemountKey, setHomeRemountKey] = useState(0);

  const clearSlideAnimation = useCallback(() => {
    if (slideFrameRef.current !== null) {
      cancelAnimationFrame(slideFrameRef.current);
      slideFrameRef.current = null;
    }
  }, []);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
    clearSlideAnimation();
  }, [clearSlideAnimation]);

  const queueTimeout = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeoutsRef.current.push(id);
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => clearTimeouts();
  }, [clearTimeouts]);

  const fadeBlackIn = useCallback(() => {
    setBlackOpacity(1);
  }, []);

  const fadeBlackOut = useCallback(() => {
    setBlackOpacity(0);
  }, []);

  const startSlideArc = useCallback((slides: FlySlide[]) => {
    clearSlideAnimation();
    const startTime = performance.now();

    const animate = (now: number) => {
      const nextSlides = slides.map((slide) => {
        const delay =
          SLIDE_START_DELAY_MS +
          (slide.side === "right" ? 0 : SLIDE_STAGGER_MS);
        const elapsed = now - startTime - delay;
        const progress = clamp(elapsed / SLIDE_ARC_MS, 0, 1);
        const eased = easeOutBack(progress);

        return {
          ...slide,
          current: animateRectArc(slide.from, slide.to, slide.side, progress),
          rotate: lerp(getSlideStartRotation(slide.side), 0, eased),
        };
      });

      setFlyTransition((current) =>
        current ? { ...current, slides: nextSlides } : null,
      );

      const allDone = slides.every((slide) => {
        const delay =
          SLIDE_START_DELAY_MS +
          (slide.side === "right" ? 0 : SLIDE_STAGGER_MS);
        return now - startTime - delay >= SLIDE_ARC_MS;
      });

      if (!allDone) {
        slideFrameRef.current = requestAnimationFrame(animate);
      } else {
        slideFrameRef.current = null;
      }
    };

    slideFrameRef.current = requestAnimationFrame(animate);
  }, [clearSlideAnimation]);

  const finishCapExit = useCallback(
    (slug: string) => {
      if (capExitHandledRef.current) return;
      capExitHandledRef.current = true;
      clearSlideAnimation();

      fadeBlackIn();
      queueTimeout(() => {
        sessionStorage.setItem("caseStudyEnter", slug);
        router.push(`/work/${slug}`);
        setFlyTransition(null);
        setFlyingStackId(null);
      }, BLACK_MS);
    },
    [clearSlideAnimation, fadeBlackIn, queueTimeout, router],
  );

  const startCaseStudy = useCallback(
    (
      slug: string,
      elements: CaseStudyElements,
      assets: CaseStudyAssets,
    ) => {
      if (isTransitioning) return;

      clearTimeouts();
      capExitHandledRef.current = false;
      setIsTransitioning(true);
      setIsExitingCaseStudy(false);

      const capFrom = rectFromElement(elements.cap);
      const capTo = getCenterTarget(capFrom.width);

      const slides: FlySlide[] = [
        {
          side: "right",
          src: assets.right,
          from: rectFromElement(elements.right),
          to: getSlideTarget(capTo, "right"),
          current: rectFromElement(elements.right),
          rotate: getSlideStartRotation("right"),
        },
        {
          side: "left",
          src: assets.left,
          from: rectFromElement(elements.left),
          to: getSlideTarget(capTo, "left"),
          current: rectFromElement(elements.left),
          rotate: getSlideStartRotation("left"),
        },
      ];

      setFlyTransition({
        slug,
        capSrc: assets.cap,
        capFrom,
        capTo,
        capAtCenter: false,
        exiting: false,
        slides,
      });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlyingStackId(slug);
          setFlyTransition((current) =>
            current ? { ...current, capAtCenter: true } : null,
          );
          startSlideArc(slides);

          queueTimeout(() => {
            setFlyTransition((current) =>
              current ? { ...current, exiting: true } : null,
            );
          }, CAP_FLY_MS + CAP_PAUSE_MS);

          queueTimeout(() => {
            finishCapExit(slug);
          }, CAP_FLY_MS + CAP_PAUSE_MS + CAP_EXIT_MS + 80);
        });
      });
    },
    [clearTimeouts, finishCapExit, isTransitioning, queueTimeout, startSlideArc],
  );

  const goHome = useCallback(() => {
    if (isTransitioning) return;

    clearTimeouts();
    setIsTransitioning(true);
    setIsExitingCaseStudy(true);

    queueTimeout(fadeBlackIn, 380);
    queueTimeout(() => {
      sessionStorage.setItem("homeEnter", "1");
      setHomeRemountKey((current) => current + 1);
      router.push("/");
      setIsExitingCaseStudy(false);
    }, 380 + BLACK_MS);
  }, [clearTimeouts, fadeBlackIn, isTransitioning, queueTimeout, router]);

  const goToCaseStudy = useCallback(
    (slug: string) => {
      if (isTransitioning) return;

      clearTimeouts();
      setIsTransitioning(true);
      setIsExitingCaseStudy(true);

      queueTimeout(fadeBlackIn, 280);
      queueTimeout(() => {
        sessionStorage.setItem("caseStudyEnter", slug);
        router.push(`/work/${slug}`);
        setIsExitingCaseStudy(false);
      }, 280 + BLACK_MS);
    },
    [clearTimeouts, fadeBlackIn, isTransitioning, queueTimeout, router],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const enteringCase = sessionStorage.getItem("caseStudyEnter");
    const enteringHome = sessionStorage.getItem("homeEnter");
    const enterKey = `${pathname}:${enteringCase ?? ""}:${enteringHome ?? ""}`;

    if (handledEnterRef.current === enterKey) return;

    if (enteringCase && pathname === `/work/${enteringCase}`) {
      handledEnterRef.current = enterKey;
      sessionStorage.removeItem("caseStudyEnter");
      setBlackOpacity(1);
      setIsTransitioning(true);
      queueTimeout(() => {
        fadeBlackOut();
        queueTimeout(() => setIsTransitioning(false), BLACK_MS);
      }, 80);
      return;
    }

    if (enteringHome && pathname === "/") {
      handledEnterRef.current = enterKey;
      sessionStorage.removeItem("homeEnter");
      queueTimeout(() => {
        fadeBlackOut();
        queueTimeout(() => setIsTransitioning(false), BLACK_MS + 100);
      }, 60);
    }
  }, [fadeBlackOut, pathname, queueTimeout]);

  const capStyle = flyTransition
    ? {
        top: flyTransition.capAtCenter
          ? flyTransition.capTo.top
          : flyTransition.capFrom.top,
        left: flyTransition.capAtCenter
          ? flyTransition.capTo.left
          : flyTransition.capFrom.left,
        width: flyTransition.capAtCenter
          ? flyTransition.capTo.width
          : flyTransition.capFrom.width,
        height: flyTransition.capAtCenter
          ? flyTransition.capTo.height
          : flyTransition.capFrom.height,
      }
    : null;

  const slideZIndex = (side: "left" | "right") =>
    side === "right" ? 299 : 300;

  return (
    <CaseStudyTransitionContext.Provider
      value={{
        startCaseStudy,
        goToCaseStudy,
        goHome,
        isExitingCaseStudy,
        isTransitioning,
        flyingStackId,
        homeRemountKey,
      }}
    >
      {children}
      {mounted &&
        createPortal(
          <>
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 z-[298] bg-black transition-opacity ease-in-out"
              style={{
                opacity: blackOpacity,
                transitionDuration: `${BLACK_MS}ms`,
              }}
            />
            {flyTransition?.slides.map((slide) => (
              <div
                key={slide.side}
                aria-hidden
                className={`pointer-events-none fixed case-study-fly-slide${flyTransition.exiting ? " case-study-fly-cap-settled" : ""}`}
                style={{
                  zIndex: slideZIndex(slide.side),
                  top: slide.current.top,
                  left: slide.current.left,
                  width: slide.current.width,
                  height: slide.current.height,
                  transform: `rotate(${slide.rotate}deg)`,
                  transformOrigin: "center center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt=""
                  draggable={false}
                  className={`h-full w-full object-contain${flyTransition.exiting ? " case-study-fly-cap-exit" : " drop-shadow-lg"}`}
                />
              </div>
            ))}
            {flyTransition && capStyle ? (
              <div
                aria-hidden
                className={`pointer-events-none fixed z-[301] case-study-fly-cap${flyTransition.exiting ? " case-study-fly-cap-settled" : ""}`}
                style={capStyle}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flyTransition.capSrc}
                  alt=""
                  draggable={false}
                  className={`h-full w-full object-contain${flyTransition.exiting ? " case-study-fly-cap-exit" : " drop-shadow-2xl"}`}
                  onAnimationEnd={(event) => {
                    if (
                      event.animationName.includes("case-study-fly-cap-out") &&
                      flyTransition.exiting
                    ) {
                      finishCapExit(flyTransition.slug);
                    }
                  }}
                />
              </div>
            ) : null}
          </>,
          document.body,
        )}
    </CaseStudyTransitionContext.Provider>
  );
}
