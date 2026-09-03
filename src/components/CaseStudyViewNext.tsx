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
      <div className="mt-24 border-t border-black/[0.06] pt-24 dark:border-white/[0.06]">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-subtle">
          View Next
        </p>
        <div className="mt-10 flex justify-center">
          <FolderDragProvider>
            <WorkItemCard item={work} />
          </FolderDragProvider>
        </div>
      </div>
    </EnterItem>
  );
}
