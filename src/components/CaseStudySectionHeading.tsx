import type { ReactNode } from "react";
import { caseStudySectionHeadingClass } from "@/components/caseStudyStyles";
import {
  CaseStudyIcon,
  getCaseStudyIconName,
  type CaseStudyIconName,
} from "@/components/caseStudyIcons";

type CaseStudySectionHeadingProps = {
  id?: string;
  icon?: CaseStudyIconName;
  inPanel?: boolean;
  children: ReactNode;
};

export function CaseStudySectionHeading({
  id,
  icon,
  inPanel = false,
  children,
}: CaseStudySectionHeadingProps) {
  const iconName = icon ?? (id ? getCaseStudyIconName(id) : "briefcase");

  return (
    <h2
      id={id}
      className={`${caseStudySectionHeadingClass} ${
        inPanel ? "scroll-mt-6" : "scroll-mt-28"
      }`}
    >
      <span className="flex items-center gap-3">
        <CaseStudyIcon
          name={iconName}
          className="h-6 w-6 shrink-0 text-foreground/75"
        />
        <span>{children}</span>
      </span>
    </h2>
  );
}
