"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Stat = {
  value: string;
  label: string;
  icon: string;
};

type StatsProps = {
  items: Stat[];
};

const MAX_TILT = 14;

const iconMaskStyle = (icon: string): CSSProperties => ({
  WebkitMaskImage: `url(${icon})`,
  maskImage: `url(${icon})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
});

function StatIcon({
  icon,
  rotateX,
  rotateY,
}: {
  icon: string;
  rotateX: number;
  rotateY: number;
}) {
  const mask = iconMaskStyle(icon);

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 transition-transform duration-150 ease-out will-change-transform"
      style={{
        transform: `translate(-50%, -50%) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      <span
        className="absolute inset-0 bg-neutral-500/35 transition-opacity duration-500 ease-out group-hover/stat:opacity-0 dark:bg-neutral-400/25"
        style={mask}
      />
      <span
        className="absolute inset-0 bg-gradient-to-br from-violet-400 via-fuchsia-500 to-amber-400 opacity-0 transition-opacity duration-500 ease-out group-hover/stat:opacity-100"
        style={mask}
      />
    </span>
  );
}

function StatCell({
  stat,
  mouse,
}: {
  stat: Stat;
  mouse: { x: number; y: number } | null;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cell = cellRef.current;
    if (!cell || mouse === null) {
      setTilt({ x: 0, y: 0 });
      return;
    }

    const rect = cell.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = mouse.x - centerX;
    const deltaY = mouse.y - centerY;

    const rotateY = Math.max(
      -MAX_TILT,
      Math.min(MAX_TILT, (deltaX / rect.width) * MAX_TILT * 1.5),
    );
    const rotateX = Math.max(
      -MAX_TILT,
      Math.min(MAX_TILT, (-deltaY / rect.height) * MAX_TILT * 1.5),
    );

    setTilt({ x: rotateX, y: rotateY });
  }, [mouse]);

  return (
    <div
      ref={cellRef}
      className="group/stat relative flex min-h-[92px] cursor-default flex-col items-center justify-center text-center"
    >
      <StatIcon icon={stat.icon} rotateX={tilt.x} rotateY={tilt.y} />
      <div className="relative z-10">
        <div className="font-mono text-2xl font-medium tabular-nums text-foreground">
          {stat.value}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {stat.label}
        </div>
      </div>
    </div>
  );
}

export function Stats({ items }: StatsProps) {
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };

    setMouse({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="mt-10 grid grid-cols-3 gap-4 border-y border-white/5 py-8">
      {items.map((stat) => (
        <StatCell key={stat.label} stat={stat} mouse={mouse} />
      ))}
    </div>
  );
}
