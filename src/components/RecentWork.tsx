"use client";

import Image from "next/image";
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
import type { WorkItem } from "@/lib/content";

type RecentWorkProps = {
  items: WorkItem[];
};

type DragSide = "left" | "right";

type TrailItem = {
  id: number;
  side: DragSide;
  offsetX: number;
  offsetY: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
};

type DragState = {
  side: DragSide;
  pointerId: number;
  grabOffsetX: number;
  grabOffsetY: number;
  offsetX: number;
  offsetY: number;
  lastClientX: number;
  lastClientY: number;
  velocityX: number;
  velocityY: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
};

type ReturnAnimState = {
  side: DragSide;
  phase: "hold" | "arc" | "landed";
  offsetX: number;
  offsetY: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
};

const RETURN_HOLD_MS = 100;
const RETURN_ARC_MS = 1000;
const RETURN_CAP_REACT_MS = 420;

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function quadBezier(t: number, p0: number, p1: number, p2: number) {
  const inverse = 1 - t;
  return inverse * inverse * p0 + 2 * inverse * t * p1 + t * t * p2;
}

function returnLayerZIndex(side: DragSide, phase: ReturnAnimState["phase"]) {
  if (phase === "hold") return 30;
  return side === "left" ? 10 : 0;
}

type FolderDragContextValue = {
  activeDragStackId: string | null;
  setActiveDragStackId: (stackId: string | null) => void;
  hoveredCapStackId: string | null;
  setHoveredCapStackId: (stackId: string | null) => void;
  registerCap: (stackId: string, element: HTMLElement | null) => void;
  findCapAtPoint: (x: number, y: number) => string | null;
  handleDrop: (sourceStackId: string, dropStackId: string | null) => void;
};

const FolderDragContext = createContext<FolderDragContextValue | null>(null);

function useFolderDrag() {
  const context = useContext(FolderDragContext);
  if (!context) {
    throw new Error("useFolderDrag must be used within FolderDragProvider");
  }
  return context;
}

const folderTransition =
  "transition-transform duration-[420ms] ease-[cubic-bezier(0.34,1.45,0.64,1)] will-change-transform";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function computeDragTilt(
  offsetX: number,
  offsetY: number,
  velocityX: number,
  velocityY: number,
) {
  const posRotateY = clamp(offsetX / 7, -16, 16);
  const posRotateX = clamp(-offsetY / 7, -16, 16);
  const velRotateY = clamp(velocityX * 1.4, -14, 14);
  const velRotateX = clamp(-velocityY * 1.4, -14, 14);
  const rotateZ = clamp(velocityX * 0.9, -10, 10);

  return {
    rotateX: clamp(posRotateX + velRotateX * 0.55, -22, 22),
    rotateY: clamp(posRotateY + velRotateY * 0.55, -22, 22),
    rotateZ,
  };
}

type ToastPhase = "idle" | "enter" | "show" | "exit";

function WorkToast({ phase }: { phase: ToastPhase }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || phase === "idle") return null;

  return createPortal(
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
      <div
        role="status"
        aria-live="polite"
        className={`rounded-full border border-white/10 bg-surface-elevated px-5 py-2.5 text-[13px] text-foreground shadow-[0_10px_40px_rgba(0,0,0,0.28)] ${
          phase === "enter" || phase === "show" ? "work-toast-enter" : "work-toast-exit"
        }`}
      >
        That doesnt go there...
      </div>
    </div>,
    document.body,
  );
}

function FolderDragProvider({ children }: { children: ReactNode }) {
  const capRegistryRef = useRef(new Map<string, HTMLElement>());
  const [activeDragStackId, setActiveDragStackId] = useState<string | null>(null);
  const [hoveredCapStackId, setHoveredCapStackId] = useState<string | null>(null);
  const [toastPhase, setToastPhase] = useState<ToastPhase>("idle");
  const toastTimeoutsRef = useRef<number[]>([]);

  const clearToastTimeouts = useCallback(() => {
    toastTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    toastTimeoutsRef.current = [];
  }, []);

  const registerCap = useCallback((stackId: string, element: HTMLElement | null) => {
    if (element) {
      capRegistryRef.current.set(stackId, element);
      return;
    }
    capRegistryRef.current.delete(stackId);
  }, []);

  const findCapAtPoint = useCallback((x: number, y: number) => {
    for (const [stackId, capElement] of capRegistryRef.current.entries()) {
      const rect = capElement.getBoundingClientRect();
      const padding = 12;

      if (
        x >= rect.left - padding &&
        x <= rect.right + padding &&
        y >= rect.top - padding &&
        y <= rect.bottom + padding
      ) {
        return stackId;
      }
    }

    return null;
  }, []);

  const showToast = useCallback(() => {
    clearToastTimeouts();
    setToastPhase("enter");

    const enterTimeout = window.setTimeout(() => {
      setToastPhase("show");
    }, 420);

    const exitTimeout = window.setTimeout(() => {
      setToastPhase("exit");
    }, 420 + 4000);

    const idleTimeout = window.setTimeout(() => {
      setToastPhase("idle");
    }, 420 + 4000 + 320);

    toastTimeoutsRef.current = [enterTimeout, exitTimeout, idleTimeout];
  }, [clearToastTimeouts]);

  const handleDrop = useCallback(
    (sourceStackId: string, dropStackId: string | null) => {
      if (dropStackId && dropStackId !== sourceStackId) {
        showToast();
      }
    },
    [showToast],
  );

  useEffect(() => {
    return () => clearToastTimeouts();
  }, [clearToastTimeouts]);

  return (
    <FolderDragContext.Provider
      value={{
        activeDragStackId,
        setActiveDragStackId,
        hoveredCapStackId,
        setHoveredCapStackId,
        registerCap,
        findCapAtPoint,
        handleDrop,
      }}
    >
      {children}
      <WorkToast phase={toastPhase} />
    </FolderDragContext.Provider>
  );
}

function FolderStack({
  stackId,
  folders,
}: {
  stackId: string;
  folders: WorkItem["folders"];
}) {
  const {
    activeDragStackId,
    setActiveDragStackId,
    hoveredCapStackId,
    setHoveredCapStackId,
    registerCap,
    findCapAtPoint,
    handleDrop,
  } = useFolderDrag();

  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const trailIdRef = useRef(0);
  const lastTrailRef = useRef({ x: 0, y: 0, time: 0 });
  const spawnTrailRef = useRef<(trail: Omit<TrailItem, "id">) => void>(() => {});
  const findCapAtPointRef = useRef(findCapAtPoint);
  const setHoveredCapStackIdRef = useRef(setHoveredCapStackId);
  const handleDropRef = useRef(handleDrop);
  const returnFrameRef = useRef<number | null>(null);
  const returnTimeoutsRef = useRef<number[]>([]);

  const [drag, setDrag] = useState<DragState | null>(null);
  const [returnAnim, setReturnAnim] = useState<ReturnAnimState | null>(null);
  const [capReactScale, setCapReactScale] = useState<number | null>(null);
  const [trails, setTrails] = useState<TrailItem[]>([]);

  const clearReturnAnimation = useCallback(() => {
    if (returnFrameRef.current !== null) {
      cancelAnimationFrame(returnFrameRef.current);
      returnFrameRef.current = null;
    }
    returnTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    returnTimeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearReturnAnimation();
  }, [clearReturnAnimation]);

  findCapAtPointRef.current = findCapAtPoint;
  setHoveredCapStackIdRef.current = setHoveredCapStackId;
  handleDropRef.current = handleDrop;

  const isDraggingHere = activeDragStackId === stackId;
  const isAnyDrag = activeDragStackId !== null;
  const isReturningHere = returnAnim !== null;
  const isCapHovered = hoveredCapStackId === stackId && isAnyDrag;

  const capRef = useCallback(
    (element: HTMLDivElement | null) => {
      registerCap(stackId, element);
    },
    [registerCap, stackId],
  );

  spawnTrailRef.current = (trail) => {
    trailIdRef.current += 1;
    setTrails((current) =>
      [...current, { ...trail, id: trailIdRef.current }].slice(-16),
    );
  };

  const removeTrail = useCallback((id: number) => {
    setTrails((current) => current.filter((trail) => trail.id !== id));
  }, []);

  const maybeSpawnTrail = (state: DragState) => {
    const now = performance.now();
    const distance = Math.hypot(
      state.offsetX - lastTrailRef.current.x,
      state.offsetY - lastTrailRef.current.y,
    );

    if (distance < 10 && now - lastTrailRef.current.time < 45) return;

    lastTrailRef.current = { x: state.offsetX, y: state.offsetY, time: now };
    spawnTrailRef.current({
      side: state.side,
      offsetX: state.offsetX,
      offsetY: state.offsetY,
      rotateX: state.rotateX,
      rotateY: state.rotateY,
      rotateZ: state.rotateZ,
    });
  };

  const trailTransform = (trail: TrailItem) =>
    `translate(${trail.offsetX}px, ${trail.offsetY}px) perspective(900px) rotateX(${trail.rotateX}deg) rotateY(${trail.rotateY}deg) rotateZ(${trail.rotateZ}deg)`;

  const buildLayerTransform = (
    offsetX: number,
    offsetY: number,
    rotateX: number,
    rotateY: number,
    rotateZ: number,
    scale: number,
  ) =>
    `translate(${offsetX}px, ${offsetY}px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;

  const startReturnAnimation = useCallback(
    (from: DragState) => {
      clearReturnAnimation();

      const holdState: ReturnAnimState = {
        side: from.side,
        phase: "hold",
        offsetX: from.offsetX,
        offsetY: from.offsetY,
        rotateX: from.rotateX,
        rotateY: from.rotateY,
        rotateZ: from.rotateZ,
        scale: 1,
      };

      dragRef.current = null;
      setDrag(null);
      setReturnAnim(holdState);
      setCapReactScale(null);

      const holdTimeout = window.setTimeout(() => {
        const startTime = performance.now();
        const distance = Math.hypot(from.offsetX, from.offsetY);
        const arcHeight = clamp(distance * 0.42, 56, 140);
        const controlX = from.offsetX * 0.52;
        const controlY = from.offsetY * 0.52 - arcHeight;

        const animateCapReact = () => {
          const reactStart = performance.now();

          const animateReact = (reactNow: number) => {
            const reactProgress = Math.min(
              (reactNow - reactStart) / RETURN_CAP_REACT_MS,
              1,
            );
            const reactScale =
              reactProgress < 0.38
                ? 1 + (0.1 * reactProgress) / 0.38
                : 1.1 - (0.1 * (reactProgress - 0.38)) / 0.62;

            setCapReactScale(reactScale);

            if (reactProgress < 1) {
              returnFrameRef.current = requestAnimationFrame(animateReact);
              return;
            }

            returnFrameRef.current = null;
            setCapReactScale(null);
            setReturnAnim(null);
            setActiveDragStackId(null);
          };

          returnFrameRef.current = requestAnimationFrame(animateReact);
        };

        const animateArc = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / RETURN_ARC_MS, 1);
          const eased = easeInOutCubic(progress);

          setReturnAnim({
            side: from.side,
            phase: "arc",
            offsetX: quadBezier(eased, from.offsetX, controlX, 0),
            offsetY: quadBezier(eased, from.offsetY, controlY, 0),
            rotateX: lerp(from.rotateX, 0, eased),
            rotateY: lerp(from.rotateY, 0, eased),
            rotateZ: lerp(from.rotateZ, 0, eased),
            scale: 1 + Math.sin(progress * Math.PI) * 0.04,
          });

          if (progress < 1) {
            returnFrameRef.current = requestAnimationFrame(animateArc);
            return;
          }

          setReturnAnim({
            side: from.side,
            phase: "landed",
            offsetX: 0,
            offsetY: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
          });

          animateCapReact();
        };

        returnFrameRef.current = requestAnimationFrame(animateArc);
      }, RETURN_HOLD_MS);

      returnTimeoutsRef.current = [holdTimeout];
    },
    [clearReturnAnimation, setActiveDragStackId],
  );

  const startDrag = useCallback(
    (side: DragSide, event: React.PointerEvent<HTMLDivElement>) => {
      if (returnAnim) return;

      const container = containerRef.current;
      const layer = event.currentTarget;
      if (!container) return;

      event.preventDefault();
      layer.setPointerCapture(event.pointerId);

      const containerRect = container.getBoundingClientRect();
      const layerRect = layer.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;
      const layerCenterX = layerRect.left + layerRect.width / 2;
      const layerCenterY = layerRect.top + layerRect.height / 2;

      const nextDrag: DragState = {
        side,
        pointerId: event.pointerId,
        grabOffsetX: event.clientX - layerCenterX,
        grabOffsetY: event.clientY - layerCenterY,
        offsetX: layerCenterX - containerCenterX,
        offsetY: layerCenterY - containerCenterY,
        lastClientX: event.clientX,
        lastClientY: event.clientY,
        velocityX: 0,
        velocityY: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
      };

      dragRef.current = nextDrag;
      lastTrailRef.current = {
        x: nextDrag.offsetX,
        y: nextDrag.offsetY,
        time: performance.now(),
      };
      setActiveDragStackId(stackId);
      setDrag(nextDrag);
      spawnTrailRef.current({
        side: nextDrag.side,
        offsetX: nextDrag.offsetX,
        offsetY: nextDrag.offsetY,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
      });
    },
    [returnAnim, setActiveDragStackId, stackId],
  );

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const current = dragRef.current;
      if (!current || event.pointerId !== current.pointerId) return;

      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;
      const layerCenterX = event.clientX - current.grabOffsetX;
      const layerCenterY = event.clientY - current.grabOffsetY;
      const offsetX = layerCenterX - containerCenterX;
      const offsetY = layerCenterY - containerCenterY;

      const deltaX = event.clientX - current.lastClientX;
      const deltaY = event.clientY - current.lastClientY;
      const velocityX = current.velocityX * 0.6 + deltaX * 0.4;
      const velocityY = current.velocityY * 0.6 + deltaY * 0.4;
      const { rotateX, rotateY, rotateZ } = computeDragTilt(
        offsetX,
        offsetY,
        velocityX,
        velocityY,
      );

      const nextDrag: DragState = {
        ...current,
        offsetX,
        offsetY,
        lastClientX: event.clientX,
        lastClientY: event.clientY,
        velocityX,
        velocityY,
        rotateX,
        rotateY,
        rotateZ,
      };

      dragRef.current = nextDrag;
      setDrag(nextDrag);
      maybeSpawnTrail(nextDrag);
      setHoveredCapStackIdRef.current(
        findCapAtPointRef.current(event.clientX, event.clientY),
      );
    };

    const endDrag = (event: PointerEvent) => {
      const current = dragRef.current;
      if (!current || event.pointerId !== current.pointerId) return;

      const dropStackId = findCapAtPointRef.current(
        event.clientX,
        event.clientY,
      );
      const isRejected = dropStackId !== null && dropStackId !== stackId;

      if (isRejected) {
        handleDropRef.current(stackId, dropStackId);
        setHoveredCapStackIdRef.current(null);
        startReturnAnimation(current);
        return;
      }

      dragRef.current = null;
      setDrag(null);
      setActiveDragStackId(null);
      setHoveredCapStackIdRef.current(null);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [setActiveDragStackId, stackId, startReturnAnimation]);

  const layerStyle = (side: DragSide) => {
    if (returnAnim?.side === side) {
      return {
        transform: buildLayerTransform(
          returnAnim.offsetX,
          returnAnim.offsetY,
          returnAnim.rotateX,
          returnAnim.rotateY,
          returnAnim.rotateZ,
          returnAnim.scale,
        ),
        transition: "none",
        zIndex: returnLayerZIndex(side, returnAnim.phase),
      } as const;
    }

    if (drag?.side !== side) return undefined;

    return {
      transform: buildLayerTransform(
        drag.offsetX,
        drag.offsetY,
        drag.rotateX,
        drag.rotateY,
        drag.rotateZ,
        1,
      ),
      transition: "none",
      zIndex: 30,
    } as const;
  };

  const hoverFanRight =
    !isAnyDrag &&
    "group-hover/stack:translate-x-[36%] group-hover/stack:rotate-[11deg]";
  const hoverFanLeft =
    !isAnyDrag &&
    "group-hover/stack:-translate-x-[36%] group-hover/stack:-rotate-[11deg]";
  const capScaleClass =
    capReactScale !== null
      ? ""
      : isCapHovered
        ? "scale-110"
        : !isAnyDrag
          ? "group-hover/stack:scale-110"
          : "";

  const capStyle =
    capReactScale !== null
      ? { transform: `scale(${capReactScale})`, transition: "none" }
      : undefined;

  return (
    <div
      ref={containerRef}
      className="group/stack relative mx-auto aspect-[5/4] w-full max-w-[270px] overflow-visible"
    >
      {trails.map((trail) => (
        <div
          key={trail.id}
          aria-hidden
          className="folder-trail pointer-events-none absolute inset-0 z-[25] origin-center"
          style={{ transform: trailTransform(trail) }}
          onAnimationEnd={() => removeTrail(trail.id)}
        >
          <Image
            src={trail.side === "left" ? folders.left : folders.right}
            alt=""
            fill
            sizes="270px"
            draggable={false}
            className="object-contain select-none"
          />
        </div>
      ))}

      <div
        className={`absolute inset-0 z-0 origin-center touch-none ${folderTransition} ${hoverFanRight} ${isDraggingHere && drag?.side === "right" ? "cursor-grabbing" : isReturningHere ? "cursor-default" : "cursor-grab"}`}
        style={layerStyle("right")}
        onPointerDown={(event) => startDrag("right", event)}
      >
        <Image
          src={folders.right}
          alt=""
          fill
          sizes="270px"
          draggable={false}
          className="pointer-events-none object-contain drop-shadow-lg select-none"
        />
      </div>

      <div
        className={`absolute inset-0 z-10 origin-center touch-none ${folderTransition} ${hoverFanLeft} ${isDraggingHere && drag?.side === "left" ? "cursor-grabbing" : isReturningHere ? "cursor-default" : "cursor-grab"}`}
        style={layerStyle("left")}
        onPointerDown={(event) => startDrag("left", event)}
      >
        <Image
          src={folders.left}
          alt=""
          fill
          sizes="270px"
          draggable={false}
          className="pointer-events-none object-contain drop-shadow-lg select-none"
        />
      </div>

      <div
        ref={capRef}
        style={capStyle}
        className={`pointer-events-none absolute inset-0 z-20 origin-center ${folderTransition} ${capScaleClass}`}
      >
        <Image
          src={folders.cap}
          alt=""
          fill
          sizes="270px"
          draggable={false}
          className="object-contain drop-shadow-lg select-none"
        />
      </div>
    </div>
  );
}

function WorkItemCard({ item }: { item: WorkItem }) {
  return (
    <article className="flex flex-col items-center">
      <FolderStack stackId={item.id} folders={item.folders} />
      <div className="mt-5 text-center">
        <h3 className="text-[15px] font-semibold text-foreground">{item.title}</h3>
        <p className="mt-1 text-[12px] text-neutral-500">
          {item.company} / {item.date}
        </p>
      </div>
    </article>
  );
}

export function RecentWork({ items }: RecentWorkProps) {
  return (
    <FolderDragProvider>
      <section aria-label="Recent work">
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-subtle">
          Recent Work
        </p>
        <div className="grid grid-cols-2 gap-x-12 gap-y-16">
          {items.map((item) => (
            <WorkItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </FolderDragProvider>
  );
}
