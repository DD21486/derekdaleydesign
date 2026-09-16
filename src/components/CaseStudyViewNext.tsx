"use client";

import { EnterItem } from "@/components/EnterItem";
import { FolderDragProvider, WorkItemCard } from "@/components/RecentWork";
import { getWorkItemBySlug } from "@/lib/content";

type CaseStudyViewNextProps = {
  slug: string;
  enterIndex: number;
};

export function CaseStudyViewNext({ slug, enterIndex }: CaseStudyViewNextProps) {
  const work = getWorkItemBySlug(slug);

  if (!work) return null;

  return (
    <EnterItem index={enterIndex}>
      <div className="mt-16 border-t border-white/[0.06] pt-16 sm:mt-24 sm:pt-24">
        <p className="text-[15px] leading-[1.75] text-foreground/90">
          Enjoyed this case study? Check this one out:
        </p>
        <div className="relative left-1/2 mt-8 w-[min(calc(100vw-2rem),26rem)] max-w-none -translate-x-1/2 sm:mt-10">
          <FolderDragProvider>
            <WorkItemCard item={work} size="large" clickBehavior="direct" />
          </FolderDragProvider>
        </div>
      </div>
    </EnterItem>
  );
}
