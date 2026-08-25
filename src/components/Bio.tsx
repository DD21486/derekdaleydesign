"use client";

import { CompanyLink } from "@/components/CompanyLink";
import type { BioParagraph } from "@/lib/content";

type BioProps = {
  paragraphs: BioParagraph[];
  startIndex?: number;
};

export function Bio({ paragraphs, startIndex = 0 }: BioProps) {
  return (
    <div className="mt-6 space-y-5 text-[16px] leading-[1.65] text-neutral-600 dark:text-neutral-300">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="page-enter"
          style={{ animationDelay: `${(startIndex + index) * 0.1}s` }}
        >
          {paragraph.segments.map((segment, segmentIndex) => {
            if (segment.type === "text") {
              return <span key={segmentIndex}>{segment.value}</span>;
            }

            if (segment.type === "muted") {
              return (
                <span
                  key={segmentIndex}
                  className="italic text-neutral-500 dark:text-neutral-400"
                >
                  {segment.value}
                </span>
              );
            }

            if (segment.type === "bold") {
              return (
                <strong
                  key={segmentIndex}
                  className="font-semibold text-foreground"
                >
                  {segment.value}
                </strong>
              );
            }

            return (
              <CompanyLink key={segmentIndex} company={segment.company} />
            );
          })}
        </p>
      ))}
    </div>
  );
}
