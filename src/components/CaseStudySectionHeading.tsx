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
  iconSrc?: string;
  inPanel?: boolean;
  children: ReactNode;
};

export function CaseStudySectionHeading({
  id,
  icon,
  iconSrc,
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
        {iconSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconSrc}
            alt=""
            aria-hidden
            className="h-6 w-6 shrink-0"
          />
        ) : (
          <CaseStudyIcon
            name={iconName}
            className="h-6 w-6 shrink-0 text-foreground/75"
          />
        )}
        <span>{children}</span>
      </span>
    </h2>
  );
}
