"use client";

import Image from "next/image";
import { Mouse, Move } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LifeGraphEdge, LifeGraphNode } from "@/lib/content";

type LifeGraphProps = {
  nodes: LifeGraphNode[];
  edges: LifeGraphEdge[];
};

type Transform = {
  x: number;
  y: number;
  scale: number;
};

const MIN_SCALE = 0.35;
const MAX_SCALE = 2.5;
const VIEWBOX = { width: 1200, height: 500 };
const TOOLTIP_DELAY_MS = 250;
const TOOLTIP_WIDTH = 288;
const TOOLTIP_EDGE_PADDING = 20;

const NODE_SIZES = {
  primary: {
    dot: 5,
    hit: 18,
    glow: [12, 8.5, 6] as const,
    ring: 14,
    ringWidth: 1.5,
    title: 12,
    year: 8,
    titleY: 20,
    yearY: 33,
  },
  branch: {
    dot: 3,
    hit: 14,
    glow: [8, 5.5, 3.5] as const,
    ring: 10,
    ringWidth: 1,
    title: 10,
    year: 6,
    titleY: 16,
    yearY: 26,
  },
} as const;

function getNodeSizes(node: LifeGraphNode) {
  return node.primary ? NODE_SIZES.primary : NODE_SIZES.branch;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function MouseWheelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="7" y="3" width="10" height="18" rx="5" />
      <line x1="12" y1="7" x2="12" y2="11" />
      <path d="M12 13v1.5" />
      <path d="M10 11.5 12 9.5 14 11.5" />
      <path d="M10 16.5 12 18.5 14 16.5" />
    </svg>
  );
}

function getClampedTooltipPosition(x: number, y: number) {
  const halfWidth = TOOLTIP_WIDTH / 2;
  const minX = TOOLTIP_EDGE_PADDING + halfWidth;
  const maxX = window.innerWidth - TOOLTIP_EDGE_PADDING - halfWidth;

  return {
    x: clamp(x, minX, maxX),
    y: Math.max(y, TOOLTIP_EDGE_PADDING + 120),
  };
}

function GraphControlsHint() {
  return (
    <div className="absolute bottom-6 left-6 rounded-lg border border-white/10 bg-surface-elevated/80 p-3 backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1 text-foreground-muted">
          <Mouse className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          <Move className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </div>
        <span className="text-[11px] text-foreground-muted">Drag to move</span>
      </div>
      <div className="mt-2.5 flex items-center gap-2.5">
        <MouseWheelIcon className="h-4 w-4 text-foreground-muted" />
        <span className="text-[11px] text-foreground-muted">Scroll to zoom in / out</span>
      </div>
    </div>
  );
}

function GraphDefs() {
  return (
    <defs>
      <radialGradient id="life-graph-node-gradient" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="55%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#3b82f6" />
      </radialGradient>
      <linearGradient id="life-graph-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
  );
}

type GraphNodeHoverVisualsProps = {
  glowRadii: readonly [number, number, number];
  ringRadius: number;
  ringWidth: number;
};

function GraphNodeHoverVisuals({ glowRadii, ringRadius, ringWidth }: GraphNodeHoverVisualsProps) {
  const glowOuterRef = useRef<SVGCircleElement>(null);
  const glowInnerRef = useRef<SVGCircleElement>(null);
  const coreRef = useRef<SVGCircleElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const animations: Animation[] = [];
    const orbLayers = [
      { ref: glowOuterRef, r: glowRadii[0], opacity: 0.18 },
      { ref: glowInnerRef, r: glowRadii[1], opacity: 0.35 },
      { ref: coreRef, r: glowRadii[2], opacity: 1 },
    ];

    orbLayers.forEach(({ ref, r, opacity }, index) => {
      const circle = ref.current;
      if (!circle) return;

      circle.setAttribute("r", "0");
      circle.setAttribute("opacity", "0");

      animations.push(
        circle.animate(
          [
            { r: 0, opacity: 0 },
            { r: r * 1.15, opacity, offset: 0.7 },
            { r, opacity },
          ],
          {
            duration: 250,
            delay: index * 25,
            fill: "forwards",
            easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          },
        ),
      );
    });

    const ring = ringRef.current;
    if (ring) {
      const circumference = 2 * Math.PI * ringRadius;
      ring.style.strokeDasharray = `${circumference}`;
      ring.style.strokeDashoffset = `${circumference}`;

      animations.push(
        ring.animate(
          [
            { strokeDashoffset: circumference, opacity: 0.2 },
            { strokeDashoffset: 0, opacity: 1 },
          ],
          {
            duration: 250,
            fill: "forwards",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
        ),
      );
    }

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, [glowRadii, ringRadius]);

  return (
    <>
      <g pointerEvents="none">
        <circle ref={glowOuterRef} fill="#22d3ee" fillOpacity={0.18} />
        <circle ref={glowInnerRef} fill="#22d3ee" fillOpacity={0.35} />
        <circle ref={coreRef} fill="url(#life-graph-node-gradient)" />
      </g>
      <g transform="rotate(-90)" pointerEvents="none">
        <circle
          ref={ringRef}
          r={ringRadius}
          fill="none"
          stroke="url(#life-graph-ring-gradient)"
          strokeWidth={ringWidth}
          strokeLinecap="round"
          opacity={0.2}
        />
      </g>
    </>
  );
}

type GraphTooltipProps = {
  node: LifeGraphNode;
  x: number;
  y: number;
};

function GraphTooltip({ node, x, y }: GraphTooltipProps) {
  const { x: clampedX, y: clampedY } = getClampedTooltipPosition(x, y);

  return (
    <div
      className="life-graph-tooltip-in pointer-events-none fixed z-[60] w-72 rounded-xl border border-cyan-400/20 bg-black/50 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_24px_rgba(34,211,238,0.12)] backdrop-blur-md"
      style={{
        left: clampedX,
        top: clampedY - 16,
      }}
    >
      {node.image && (
        <div
          className="life-graph-tooltip-content-in mb-3 overflow-hidden rounded-lg bg-surface-muted"
          style={{ animationDelay: "0ms" }}
        >
          <Image
            src={node.image}
            alt=""
            width={288}
            height={160}
            className="block h-36 w-full object-cover grayscale"
          />
        </div>
      )}
      <p
        className="life-graph-tooltip-content-in text-[15px] font-medium text-foreground"
        style={{ animationDelay: "40ms" }}
      >
        {node.tooltipTitle ?? node.title}
      </p>
      <p
        className="life-graph-tooltip-content-in mt-0.5 font-mono text-[11px] text-cyan-400/80"
        style={{ animationDelay: "70ms" }}
      >
        {node.year}
      </p>
      <p
        className="life-graph-tooltip-content-in mt-1.5 text-[12px] leading-relaxed text-foreground-muted"
        style={{ animationDelay: "100ms" }}
      >
        {node.description}
      </p>
    </div>
  );
}

export function LifeGraph({ nodes, edges }: LifeGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipTimerRef = useRef<number | null>(null);
  const [transform, setTransform] = useState<Transform>({ x: 48, y: 0, scale: 1 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const hoveredNode = hoveredId ? nodeMap.get(hoveredId) : null;

  useEffect(() => {
    if (tooltipTimerRef.current) {
      window.clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }

    if (!hoveredId) {
      setTooltipVisible(false);
      return;
    }

    tooltipTimerRef.current = window.setTimeout(() => {
      setTooltipVisible(true);
    }, TOOLTIP_DELAY_MS);

    return () => {
      if (tooltipTimerRef.current) {
        window.clearTimeout(tooltipTimerRef.current);
        tooltipTimerRef.current = null;
      }
    };
  }, [hoveredId]);

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;
    const factor = event.deltaY > 0 ? 0.92 : 1.08;

    setTransform((current) => {
      const nextScale = clamp(current.scale * factor, MIN_SCALE, MAX_SCALE);
      const scaleRatio = nextScale / current.scale;
      const nextX = cursorX - (cursorX - current.x) * scaleRatio;
      const nextY = cursorY - (cursorY - current.y) * scaleRatio;
      return { x: nextX, y: nextY, scale: nextScale };
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("[data-graph-node]")) return;

    isPanning.current = true;
    panStart.current = {
      x: event.clientX,
      y: event.clientY,
      tx: transform.x,
      ty: transform.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (hoveredId) {
      setTooltipPos({ x: event.clientX, y: event.clientY });
    }

    if (!isPanning.current) return;

    setTransform((current) => ({
      ...current,
      x: panStart.current.tx + (event.clientX - panStart.current.x),
      y: panStart.current.ty + (event.clientY - panStart.current.y),
    }));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    isPanning.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const zoomBy = (factor: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setTransform((current) => {
      const nextScale = clamp(current.scale * factor, MIN_SCALE, MAX_SCALE);
      const scaleRatio = nextScale / current.scale;
      return {
        x: centerX - (centerX - current.x) * scaleRatio,
        y: centerY - (centerY - current.y) * scaleRatio,
        scale: nextScale,
      };
    });
  };

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <svg
          className="h-full w-full select-none"
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: "0 0",
          }}
          aria-hidden
        >
          <GraphDefs />
          <g>
            {edges.map((edge) => {
              const from = nodeMap.get(edge.from);
              const to = nodeMap.get(edge.to);
              if (!from || !to) return null;

              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="currentColor"
                  strokeOpacity={0.25}
                  strokeWidth={1}
                  className="text-foreground-muted"
                />
              );
            })}

            {nodes.map((node) => {
              const isHovered = hoveredId === node.id;
              const sizes = getNodeSizes(node);

              return (
                <g
                  key={node.id}
                  data-graph-node
                  transform={`translate(${node.x} ${node.y})`}
                  onPointerEnter={(event) => {
                    setHoveredId(node.id);
                    setTooltipVisible(false);
                    setTooltipPos({ x: event.clientX, y: event.clientY });
                  }}
                  onPointerLeave={() => {
                    setHoveredId(null);
                    setTooltipVisible(false);
                  }}
                  onPointerMove={(event) => {
                    setTooltipPos({ x: event.clientX, y: event.clientY });
                  }}
                  className="cursor-pointer"
                >
                  <circle
                    r={sizes.hit}
                    fill="transparent"
                    pointerEvents="all"
                  />
                  {!isHovered && (
                    <circle
                      r={sizes.dot}
                      fill="currentColor"
                      className="text-foreground-muted"
                      pointerEvents="none"
                    />
                  )}
                  {isHovered && (
                    <GraphNodeHoverVisuals
                      key={`${node.id}-hover`}
                      glowRadii={sizes.glow}
                      ringRadius={sizes.ring}
                      ringWidth={sizes.ringWidth}
                    />
                  )}
                  <text
                    y={sizes.titleY}
                    textAnchor="middle"
                    pointerEvents="none"
                    className={`fill-current ${
                      isHovered
                        ? "life-graph-label-in text-foreground"
                        : "text-foreground-muted opacity-70"
                    }`}
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: sizes.title,
                      animationDelay: isHovered ? "0ms" : undefined,
                    }}
                  >
                    {node.title}
                  </text>
                  <text
                    y={sizes.yearY}
                    textAnchor="middle"
                    pointerEvents="none"
                    className={`fill-current ${
                      isHovered
                        ? "life-graph-label-in text-foreground-muted"
                        : "text-foreground-muted opacity-65"
                    }`}
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: sizes.year,
                      animationDelay: isHovered ? "80ms" : undefined,
                    }}
                  >
                    {node.year}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {tooltipVisible && hoveredNode && (
        <GraphTooltip node={hoveredNode} x={tooltipPos.x} y={tooltipPos.y} />
      )}

      <GraphControlsHint />

      <div className="absolute bottom-6 right-6 flex items-center gap-1 rounded-lg border border-white/10 bg-surface-elevated/80 p-1 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => zoomBy(0.85)}
          className="flex h-8 w-8 items-center justify-center font-mono text-[15px] text-foreground-muted transition-colors hover:text-foreground"
          aria-label="Zoom out"
        >
          −
        </button>
        <span className="min-w-[3rem] text-center font-mono text-[11px] text-foreground-subtle">
          {Math.round(transform.scale * 100)}%
        </span>
        <button
          type="button"
          onClick={() => zoomBy(1.15)}
          className="flex h-8 w-8 items-center justify-center font-mono text-[15px] text-foreground-muted transition-colors hover:text-foreground"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>
    </div>
  );
}
