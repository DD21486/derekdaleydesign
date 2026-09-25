"use client";

import Image from "next/image";
import { useCaseStudyTransition } from "@/components/CaseStudyTransitionProvider";
import type { SelectedWorkItem } from "@/lib/content";

type SelectedWorkProps = {
  items: SelectedWorkItem[];
};

export function SelectedWork({ items }: SelectedWorkProps) {
  const { goToCaseStudy, isTransitioning } = useCaseStudyTransition();

  return (
    <section aria-label="Selected work">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-subtle">
        Selected Work
      </p>

      <ol>
        {items.map((item) => (
          <li key={item.id} className="border-b border-white/10">
            <button
              type="button"
              disabled={isTransitioning}
              onClick={() => goToCaseStudy(item.id)}
              className="group grid w-full grid-cols-1 items-start gap-y-4 py-8 text-left transition-colors hover:bg-white/[0.025] focus-visible:bg-white/[0.025] focus-visible:outline-none disabled:cursor-wait lg:grid-cols-[1fr_12.75rem] lg:gap-x-8 lg:py-9 lg:-mx-4 lg:px-4"
            >
              <div className="min-w-0 lg:pt-1">
                <p className="text-[1.25rem] font-medium leading-snug tracking-tight text-foreground sm:text-[1.55rem] lg:text-[1.7rem]">
                  {item.outcome}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-muted">
                  {item.description}
                </p>
                <div className="relative mt-3">
                  <p className="text-[13px] leading-relaxed text-foreground-muted lg:pr-16">
                    <span className="text-foreground/90">{item.company}</span>
                    <span> · {item.role}</span>
                    <span> · {item.year}</span>
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                    Read
                  </p>
                </div>
              </div>

              <div className="relative aspect-[16/10] min-w-0 overflow-hidden rounded-md border border-white/10 bg-surface-muted lg:mt-1">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 216px"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
