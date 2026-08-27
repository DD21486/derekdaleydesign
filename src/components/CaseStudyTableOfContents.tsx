"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CaseStudyIcon,
  getCaseStudyIconName,
  type CaseStudyIconName,
} from "@/components/caseStudyIcons";

export type CaseStudyTocItem = {
  id: string;
  label: string;
  icon?: CaseStudyIconName;
};

type CaseStudyTableOfContentsProps = {
  items: CaseStudyTocItem[];
};

export function CaseStudyTableOfContents({
  items,
}: CaseStudyTableOfContentsProps) {
  const clickTimeoutRef = useRef<number | null>(null);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isClickScrollingRef = useRef(false);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - 140) -
              Math.abs(b.boundingClientRect.top - 140),
          );

        if (visible.length === 0) return;
        setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current !== null) {
        window.clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    isClickScrollingRef.current = true;
    setActiveId(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (clickTimeoutRef.current !== null) {
      window.clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
      clickTimeoutRef.current = null;
    }, 900);
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="group/nav fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 min-[1400px]:block min-[1900px]:left-10"
    >
      <div
        className="
          overflow-hidden border border-white/[0.06] bg-black/90 px-3 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md
          transition-[border-radius,padding,border-color,min-width,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          max-[1899px]:min-w-[3.25rem] max-[1899px]:rounded-[2.5rem]
          max-[1899px]:group-hover/nav:min-w-[11.5rem] max-[1899px]:group-hover/nav:rounded-2xl
          max-[1899px]:group-hover/nav:border-white/25 max-[1899px]:group-hover/nav:px-4 max-[1899px]:group-hover/nav:py-5
          min-[1900px]:max-w-[12rem] min-[1900px]:rounded-none min-[1900px]:border-transparent min-[1900px]:bg-transparent
          min-[1900px]:px-0 min-[1900px]:py-0 min-[1900px]:shadow-none min-[1900px]:backdrop-blur-none
        "
      >
        <ul className="flex flex-col gap-1.5 max-[1899px]:items-center max-[1899px]:group-hover/nav:items-stretch max-[1899px]:group-hover/nav:gap-2 min-[1900px]:gap-2 min-[1900px]:items-stretch">
          {items.map((item) => {
            const isActive = item.id === activeId;
            const isHovered = item.id === hoveredId;
            const isHighlighted = isActive || isHovered;
            const iconName = item.icon ?? getCaseStudyIconName(item.id);

            return (
              <li
                key={item.id}
                className="max-[1899px]:w-auto max-[1899px]:group-hover/nav:w-full min-[1900px]:w-full"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-current={isActive ? "location" : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className={`
                    grid w-full py-1 text-left
                    transition-[grid-template-columns,gap,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    max-[1899px]:grid-cols-[1fr] max-[1899px]:place-items-center
                    max-[1899px]:group-hover/nav:grid-cols-[auto_minmax(0,1fr)]
                    max-[1899px]:group-hover/nav:place-items-start max-[1899px]:group-hover/nav:gap-x-2.5
                    min-[1900px]:grid-cols-[auto_minmax(0,1fr)] min-[1900px]:items-start min-[1900px]:gap-x-2.5
                    ${isHighlighted ? "opacity-100" : "opacity-40 hover:opacity-70"}
                  `}
                >
                  <CaseStudyIcon
                    name={iconName}
                    className={`h-4 w-4 shrink-0 transition-[margin,color] duration-200 max-[1899px]:group-hover/nav:mt-0.5 min-[1900px]:mt-0.5 ${
                      isHighlighted ? "text-foreground" : "text-foreground-muted"
                    }`}
                  />
                  <span
                    className={`
                      min-w-0 overflow-hidden text-left text-[13px] leading-snug
                      transition-[opacity,max-width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                      max-[1899px]:hidden max-[1899px]:max-w-0 max-[1899px]:opacity-0
                      max-[1899px]:group-hover/nav:block max-[1899px]:group-hover/nav:max-w-[9rem] max-[1899px]:group-hover/nav:opacity-100
                      min-[1900px]:block min-[1900px]:max-w-[9rem] min-[1900px]:opacity-100
                      ${isHighlighted ? "font-medium text-foreground" : "text-foreground-muted"}
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
