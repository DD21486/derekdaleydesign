"use client";

import { useMemo } from "react";
import { EnterItem } from "@/components/EnterItem";
import { CaseStudyCredits } from "@/components/CaseStudyCredits";
import { CaseStudyMediaBlock } from "@/components/CaseStudyMediaBlock";
import { CaseStudyOverviewBar } from "@/components/CaseStudyOverviewBar";
import { CaseStudySummaryPanel } from "@/components/CaseStudySummaryPanel";
import { CaseStudySectionHeading } from "@/components/CaseStudySectionHeading";
import {
  CaseStudyTableOfContents,
  type CaseStudyTocItem,
} from "@/components/CaseStudyTableOfContents";
import { useCaseStudyTransition } from "@/components/CaseStudyTransitionProvider";
import { caseStudySectionId } from "@/components/caseStudyStyles";
import type {
  CaseStudy,
  CaseStudyParagraph,
  CaseStudySection,
  WorkItem,
} from "@/lib/content";

function paragraphKey(paragraph: CaseStudyParagraph, index: number) {
  if (typeof paragraph === "string") return paragraph;
  return `${index}-${paragraph.map((segment) => segment.type === "text" ? segment.value : segment.label).join("")}`;
}

function CaseStudyParagraphText({
  paragraph,
}: {
  paragraph: CaseStudyParagraph;
}) {
  if (typeof paragraph === "string") return paragraph;

  return (
    <>
      {paragraph.map((segment, segmentIndex) =>
        segment.type === "text" ? (
          <span key={segmentIndex}>{segment.value}</span>
        ) : (
          <a
            key={segmentIndex}
            href={segment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground/60"
          >
            {segment.label}
          </a>
        ),
      )}
    </>
  );
}

type CaseStudyViewProps = {
  work: WorkItem;
  caseStudy: CaseStudy;
};

function mediaAfterParagraph(
  media: CaseStudySection["media"],
  paragraphIndex: number,
) {
  return media?.filter((item) => item.afterParagraph === paragraphIndex) ?? [];
}

function CaseStudySectionBlock({
  section,
  sectionId,
  enterIndex,
}: {
  section: CaseStudySection;
  sectionId: string;
  enterIndex: number;
}) {
  return (
    <EnterItem index={enterIndex}>
      <section>
        <CaseStudySectionHeading id={sectionId}>
          {section.title}
        </CaseStudySectionHeading>
        {section.paragraphs.length > 0 ? (
          <div className="mt-6 space-y-5">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <div key={paragraphKey(paragraph, paragraphIndex)} className="space-y-6">
                <p className="text-[15px] leading-[1.75] text-foreground/90">
                  <CaseStudyParagraphText paragraph={paragraph} />
                </p>
                {mediaAfterParagraph(section.media, paragraphIndex).map((media) => (
                  <CaseStudyMediaBlock
                    key={media.alt}
                    media={media}
                    className="!mt-8 !mb-0"
                  />
                ))}
              </div>
            ))}
          </div>
        ) : null}
        {section.bullets && section.bullets.length > 0 ? (
          <ul className="mt-6 list-disc space-y-3 pl-5">
            {section.bullets.map((bullet) => (
              <li
                key={bullet}
                className="text-[15px] leading-[1.75] text-foreground/90"
              >
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </EnterItem>
  );
}

export function CaseStudyView({ work, caseStudy }: CaseStudyViewProps) {
  const { goHome, isExitingCaseStudy } = useCaseStudyTransition();
  let enterIndex = 0;

  const tocItems = useMemo(() => {
    const items: CaseStudyTocItem[] = [
      {
        id: caseStudySectionId(caseStudy.overviewIntro.title),
        label: caseStudy.overviewIntro.title,
      },
      { id: "my-role", label: "My Role" },
    ];

    caseStudy.sections.forEach((section) => {
      items.push({
        id: caseStudySectionId(section.title),
        label: section.title,
      });
    });

    return items;
  }, [caseStudy]);

  return (
    <div
      className={`min-h-screen bg-surface ${isExitingCaseStudy ? "case-study-exit" : ""}`}
    >
      <CaseStudyTableOfContents items={tocItems} />

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-8">
        <EnterItem index={enterIndex++}>
          <button
            type="button"
            onClick={goHome}
            className="font-mono text-[13px] text-foreground-muted transition-colors hover:text-foreground"
          >
            [back to home]
          </button>
        </EnterItem>

        <EnterItem index={enterIndex++}>
          <header className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-subtle">
              Case Study
            </p>
            <h1 className="mt-3 text-[32px] font-semibold tracking-tight text-foreground">
              {work.title}
            </h1>
            <p className="mt-2 text-[14px] text-neutral-500">
              {work.company} / {work.date}
            </p>
          </header>
        </EnterItem>

        {caseStudy.hero ? (
          <EnterItem index={enterIndex++}>
            <CaseStudyMediaBlock media={caseStudy.hero} className="mt-8" />
          </EnterItem>
        ) : null}

        <EnterItem index={enterIndex++} fadeOnly>
          <CaseStudySummaryPanel className="mt-10">
            <CaseStudyOverviewBar items={caseStudy.overview} />
          </CaseStudySummaryPanel>
        </EnterItem>

        <EnterItem index={enterIndex++} fadeOnly>
          <CaseStudySummaryPanel
            watermark={caseStudy.summaryWatermark}
            className="mt-4"
          >
            <div className="space-y-12">
            <section>
              <CaseStudySectionHeading
                id={caseStudySectionId(caseStudy.overviewIntro.title)}
                inPanel
              >
                {caseStudy.overviewIntro.title}
              </CaseStudySectionHeading>
              <div className="mt-6 space-y-5">
                {caseStudy.overviewIntro.paragraphs.map(
                  (paragraph, paragraphIndex) => (
                    <p
                      key={paragraphKey(paragraph, paragraphIndex)}
                      className="text-[15px] leading-[1.75] text-foreground/90"
                    >
                      <CaseStudyParagraphText paragraph={paragraph} />
                    </p>
                  ),
                )}
              </div>
            </section>

            <CaseStudyCredits meta={caseStudy.meta} />
            </div>
          </CaseStudySummaryPanel>
        </EnterItem>

        <div className="mt-24 space-y-24">
          {caseStudy.sections.map((section, sectionIndex) => {
            const sectionEnterIndex = enterIndex++;
            const sectionId = caseStudySectionId(section.title);

            return (
              <div
                key={section.title}
                className={
                  sectionIndex > 0
                    ? "border-t border-black/[0.06] pt-24 dark:border-white/[0.06]"
                    : undefined
                }
              >
                <CaseStudySectionBlock
                  section={section}
                  sectionId={sectionId}
                  enterIndex={sectionEnterIndex}
                />
                {section.media
                  ?.filter((media) => media.afterParagraph === undefined)
                  .map((media) => (
                  <EnterItem
                    key={`${section.title}-${media.alt}`}
                    index={enterIndex++}
                  >
                    <CaseStudyMediaBlock media={media} />
                  </EnterItem>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
