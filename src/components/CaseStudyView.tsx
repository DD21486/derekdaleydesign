"use client";

import { useMemo } from "react";
import { CaseStudyViewNext } from "@/components/CaseStudyViewNext";
import { EnterItem } from "@/components/EnterItem";
import { CaseStudyCredits } from "@/components/CaseStudyCredits";
import { CaseStudyMediaBlock } from "@/components/CaseStudyMediaBlock";
import { CaseStudyPersonaList } from "@/components/CaseStudyPersonaList";
import { CaseStudyOverviewBar } from "@/components/CaseStudyOverviewBar";
import { CaseStudySummaryPanel } from "@/components/CaseStudySummaryPanel";
import { CaseStudySectionHeading } from "@/components/CaseStudySectionHeading";
import {
  CaseStudyIcon,
  caseStudyIcons,
  type CaseStudyIconName,
} from "@/components/caseStudyIcons";
import {
  CaseStudyTableOfContents,
  type CaseStudyTocItem,
} from "@/components/CaseStudyTableOfContents";
import { useCaseStudyTransition } from "@/components/CaseStudyTransitionProvider";
import { caseStudySectionId } from "@/components/caseStudyStyles";
import type {
  CaseStudy,
  CaseStudyBullet,
  CaseStudyParagraph,
  CaseStudyParagraphSegment,
  CaseStudySection,
  WorkItem,
} from "@/lib/content";

function isBulletItem(
  bullet: CaseStudyBullet,
): bullet is { title: string; description: string; icon?: string } {
  return (
    typeof bullet === "object" &&
    "title" in bullet &&
    "description" in bullet
  );
}

function getBulletIconName(icon?: string): CaseStudyIconName {
  if (icon && icon in caseStudyIcons) {
    return icon as CaseStudyIconName;
  }

  return "briefcase";
}

function isSubheading(
  paragraph: CaseStudyParagraph,
): paragraph is { type: "subheading"; value: string } {
  return (
    typeof paragraph === "object" &&
    "type" in paragraph &&
    paragraph.type === "subheading"
  );
}

function isNote(
  paragraph: CaseStudyParagraph,
): paragraph is { type: "note"; value: string } {
  return (
    typeof paragraph === "object" &&
    "type" in paragraph &&
    paragraph.type === "note"
  );
}

function isParagraphText(
  paragraph: CaseStudyParagraph,
): paragraph is string | CaseStudyParagraphSegment[] {
  return typeof paragraph === "string" || Array.isArray(paragraph);
}

function paragraphKey(paragraph: CaseStudyParagraph, index: number) {
  if (typeof paragraph === "string") return paragraph;
  if (isSubheading(paragraph) || isNote(paragraph)) return paragraph.value;
  return `${index}-${paragraph.map((segment) => (segment.type === "link" ? segment.label : segment.value)).join("")}`;
}

function bulletKey(bullet: CaseStudyBullet, index: number) {
  if (isBulletItem(bullet)) return bullet.title;
  return paragraphKey(bullet, index);
}

function CaseStudyParagraphText({
  paragraph,
}: {
  paragraph: string | CaseStudyParagraphSegment[];
}) {
  if (typeof paragraph === "string") return paragraph;

  return (
    <>
      {paragraph.map((segment, segmentIndex) => {
        if (segment.type === "text") {
          return <span key={segmentIndex}>{segment.value}</span>;
        }

        if (segment.type === "bold") {
          return (
            <strong key={segmentIndex} className="font-semibold text-foreground">
              {segment.value}
            </strong>
          );
        }

        return (
          <a
            key={segmentIndex}
            href={segment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground/60"
          >
            {segment.label}
          </a>
        );
      })}
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
        {section.media
          ?.filter((media) => media.beforeTitle)
          .map((media) => (
            <CaseStudyMediaBlock key={media.alt} media={media} className="mb-10" />
          ))}
        <CaseStudySectionHeading id={sectionId} iconSrc={section.iconSrc}>
          {section.title}
        </CaseStudySectionHeading>
        {section.media
          ?.filter((media) => media.beforeContent)
          .map((media) => (
            <CaseStudyMediaBlock key={media.alt} media={media} className="mt-8" />
          ))}
        {section.paragraphs.length > 0 ? (
          <div className="mt-6 space-y-5">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <div
                key={paragraphKey(paragraph, paragraphIndex)}
                className={`space-y-6 ${isNote(paragraph) ? "pt-6" : ""}`}
              >
                {isSubheading(paragraph) ? (
                  <h3
                    className={`text-[18px] font-semibold tracking-tight text-foreground ${paragraphIndex > 0 ? "pt-6" : ""}`}
                  >
                    {paragraph.value}
                  </h3>
                ) : isNote(paragraph) ? (
                  <p className="text-[15px] italic leading-[1.75] text-foreground-muted">
                    {paragraph.value}
                  </p>
                ) : isParagraphText(paragraph) ? (
                  <p className="text-[15px] leading-[1.75] text-foreground/90">
                    <CaseStudyParagraphText paragraph={paragraph} />
                  </p>
                ) : null}
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
          <ul
            className={`mt-6 ${
              isBulletItem(section.bullets[0])
                ? "space-y-6"
                : "list-disc space-y-3 pl-5"
            }`}
          >
            {section.bullets.map((bullet, bulletIndex) =>
              isBulletItem(bullet) ? (
                <li
                  key={bulletKey(bullet, bulletIndex)}
                  className={
                    bullet.icon ? "flex gap-4" : undefined
                  }
                >
                  {bullet.icon ? (
                    <div
                      aria-hidden
                      className="flex w-11 shrink-0 self-stretch items-center justify-center rounded-xl bg-gradient-to-b from-blue-600 via-blue-500 to-sky-400"
                    >
                      <CaseStudyIcon
                        name={getBulletIconName(bullet.icon)}
                        className="h-5 w-5 text-white/90"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-foreground">
                      {bullet.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-[1.65] text-foreground-muted">
                      {bullet.description}
                    </p>
                  </div>
                </li>
              ) : isParagraphText(bullet) ? (
                <li
                  key={bulletKey(bullet, bulletIndex)}
                  className="text-[15px] leading-[1.75] text-foreground/90"
                >
                  <CaseStudyParagraphText paragraph={bullet} />
                </li>
              ) : null,
            )}
          </ul>
        ) : null}
        {section.personas && section.personas.length > 0 ? (
          <CaseStudyPersonaList personas={section.personas} />
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
      className={`min-h-screen overflow-x-hidden bg-surface ${isExitingCaseStudy ? "case-study-exit" : ""}`}
    >
      <CaseStudyTableOfContents items={tocItems} />

      <div className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6 sm:pb-24 sm:pt-8">
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
            <h1 className="mt-3 text-[24px] font-semibold tracking-tight text-foreground sm:text-[32px]">
              {caseStudy.headline ?? work.title}
            </h1>
            <p className="mt-2 text-[13px] text-foreground-muted sm:text-[14px]">
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
            accent={caseStudy.summaryAccent}
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
                  (paragraph, paragraphIndex) =>
                    isParagraphText(paragraph) ? (
                      <p
                        key={paragraphKey(paragraph, paragraphIndex)}
                        className="text-[15px] leading-[1.75] text-foreground/90"
                      >
                        <CaseStudyParagraphText paragraph={paragraph} />
                      </p>
                    ) : null,
                )}
              </div>
              {caseStudy.overviewIntro.media?.map((media) => (
                <CaseStudyMediaBlock
                  key={media.alt}
                  media={media}
                  className="mt-8"
                />
              ))}
            </section>

            <CaseStudyCredits meta={caseStudy.meta} />
            </div>
          </CaseStudySummaryPanel>
        </EnterItem>

        <div className="mt-16 space-y-16 sm:mt-24 sm:space-y-24">
          {caseStudy.sections.map((section, sectionIndex) => {
            const sectionEnterIndex = enterIndex++;
            const sectionId = caseStudySectionId(section.title);

            return (
              <div
                key={section.title}
                className={
                  sectionIndex > 0
                    ? "border-t border-white/[0.06] pt-16 sm:pt-24"
                    : undefined
                }
              >
                <CaseStudySectionBlock
                  section={section}
                  sectionId={sectionId}
                  enterIndex={sectionEnterIndex}
                />
                {section.media
                  ?.filter(
                    (media) =>
                      media.afterParagraph === undefined &&
                      !media.beforeContent &&
                      !media.beforeTitle,
                  )
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

        {caseStudy.viewNext ? (
          <CaseStudyViewNext slug={caseStudy.viewNext} enterIndex={enterIndex++} />
        ) : null}

        <EnterItem index={enterIndex++}>
          <div className="mt-14 flex justify-center sm:mt-16">
            <button
              type="button"
              onClick={goHome}
              className="font-mono text-[13px] text-foreground-muted transition-colors hover:text-foreground"
            >
              [back to home]
            </button>
          </div>
        </EnterItem>
      </div>
    </div>
  );
}
