"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseStudyMediaItem } from "@/lib/content";

const SCROLL_MS = 30000;
const FADE_MS = 1000;

const wideMediaClass =
  "relative left-1/2 my-8 max-w-none -translate-x-1/2 w-[min(calc(100vw-2rem),80rem)] sm:my-10 min-[1900px]:w-[min(calc(100vw-1rem),96rem)]";

type CaseStudySlideCarouselProps = {
  slides: CaseStudyMediaItem[];
  label: string;
  className?: string;
};

export function CaseStudySlideCarousel({
  slides,
  label,
  className = "",
}: CaseStudySlideCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);
  const [offset, setOffset] = useState(0);
  const [fade, setFade] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const clearTimers = useCallback(() => {
    for (const id of timeoutsRef.current) {
      window.clearTimeout(id);
    }
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeoutsRef.current.push(id);
  }, []);

  const getMaxScroll = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return 0;
    return Math.max(0, track.scrollWidth - container.clientWidth);
  }, []);

  const runCycle = useCallback(() => {
    clearTimers();

    const maxScroll = getMaxScroll();
    if (maxScroll <= 0 || prefersReducedMotion) {
      setEnableTransition(false);
      setIsScrolling(false);
      setOffset(0);
      setFade(0);
      return;
    }

    setEnableTransition(false);
    setIsScrolling(false);
    setOffset(0);
    setFade(0);

    schedule(() => {
      setEnableTransition(true);
      setIsScrolling(true);
      setOffset(maxScroll);

      schedule(() => {
        setFade(1);

        schedule(() => {
          setEnableTransition(false);
          setIsScrolling(false);
          setOffset(0);

          schedule(() => {
            setFade(0);

            schedule(() => {
              runCycle();
            }, FADE_MS);
          }, 50);
        }, FADE_MS);
      }, SCROLL_MS);
    }, 100);
  }, [clearTimers, getMaxScroll, prefersReducedMotion, schedule]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return clearTimers;
    }

    const images = Array.from(track.querySelectorAll("img"));
    if (images.length === 0) {
      runCycle();
      return clearTimers;
    }

    let loadedCount = 0;
    let hasStarted = false;
    const handleLoaded = () => {
      loadedCount += 1;
      if (loadedCount >= images.length && !hasStarted) {
        hasStarted = true;
        runCycle();
      }
    };

    for (const image of images) {
      if (image.complete) {
        handleLoaded();
      } else {
        image.addEventListener("load", handleLoaded, { once: true });
        image.addEventListener("error", handleLoaded, { once: true });
      }
    }

    return clearTimers;
  }, [clearTimers, runCycle, slides]);

  return (
    <figure className={`${wideMediaClass} ${className}`} aria-label={label}>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-black"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-black"
          style={{
            opacity: fade,
            transition: `opacity ${FADE_MS}ms ease`,
          }}
        />
        <div
          ref={trackRef}
          className="flex w-max gap-4 p-4"
          style={{
            transform: `translateX(-${offset}px)`,
            transition:
              enableTransition && isScrolling
                ? `transform ${SCROLL_MS}ms linear`
                : "none",
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.src ?? slide.alt}
              className="aspect-square w-[min(17.5rem,72vw)] shrink-0 sm:w-[min(460px,22vw)]"
            >
              {slide.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full rounded-xl object-cover"
                  draggable={false}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
