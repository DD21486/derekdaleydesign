"use client";

import { useCallback, useRef, useState } from "react";
import type { WorkItem } from "@/lib/content";

type RecentWorkProps = {
  items: WorkItem[];
};

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article
      className="flex w-[min(100%,320px)] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-white/5 sm:w-[360px]"
      style={{ backgroundColor: item.color }}
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-black/20 p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-white/20">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-white/40"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Placeholder
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-[17px] font-medium text-white">{item.title}</h3>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-white/50">
            {item.subtitle}
          </p>
        </div>
        <p className="text-[14px] leading-relaxed text-white/70">
          {item.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function RecentWork({ items }: RecentWorkProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -380 : 380;
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section className="mt-10" aria-label="Recent work">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-subtle transition-colors hover:text-foreground-muted"
      >
        Recent Work
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {expanded && (
        <div className="relative -mx-5 sm:-mx-0">
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 scrollbar-none sm:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {items.map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-foreground-muted transition-colors hover:bg-surface-muted disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-foreground-muted transition-colors hover:bg-surface-muted disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
