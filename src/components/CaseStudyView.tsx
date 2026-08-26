"use client";

import { EnterItem } from "@/components/EnterItem";
import { useCaseStudyTransition } from "@/components/CaseStudyTransitionProvider";
import type { CaseStudy, WorkItem } from "@/lib/content";

type CaseStudyViewProps = {
  work: WorkItem;
  caseStudy: CaseStudy;
};

export function CaseStudyView({ work, caseStudy }: CaseStudyViewProps) {
  const { goHome, isExitingCaseStudy } = useCaseStudyTransition();

  return (
    <div
      className={`min-h-screen bg-surface ${isExitingCaseStudy ? "case-study-exit" : ""}`}
    >
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-8">
        <EnterItem index={0}>
          <button
            type="button"
            onClick={goHome}
            className="font-mono text-[13px] text-foreground-muted transition-colors hover:text-foreground"
          >
            [back to home]
          </button>
        </EnterItem>

        <EnterItem index={1}>
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

        <EnterItem index={2}>
          <div className="mt-6 space-y-3">
            <p className="text-[15px] leading-[1.75] text-foreground/90">
              {caseStudy.meta.summary}
            </p>
            <p className="text-[13px] text-foreground-muted">
              <span className="text-foreground-subtle">Role: </span>
              {caseStudy.meta.role}
            </p>
            {caseStudy.meta.team.length > 0 ? (
              <p className="text-[13px] text-foreground-muted">
                <span className="text-foreground-subtle">Team: </span>
                {caseStudy.meta.team.join(" · ")}
              </p>
            ) : null}
            <p className="text-[13px] text-foreground-muted">
              <span className="text-foreground-subtle">Timeline: </span>
              {caseStudy.meta.timeline}
            </p>
          </div>
        </EnterItem>

        <EnterItem index={3}>
          <div className="mt-10 aspect-[21/9] rounded-2xl bg-surface-muted" />
        </EnterItem>

        {caseStudy.sections.map((section, sectionIndex) => (
          <EnterItem key={section.title} index={4 + sectionIndex}>
            <section className="mt-10">
              <h2 className="text-[18px] font-semibold text-foreground">
                {section.title}
              </h2>
              {section.paragraphs.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] leading-[1.75] text-foreground/90"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
              {section.bullets && section.bullets.length > 0 ? (
                <ul
                  className={`${section.paragraphs.length > 0 ? "mt-4" : "mt-4"} list-disc space-y-3 pl-5`}
                >
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
        ))}
      </div>
    </div>
  );
}
