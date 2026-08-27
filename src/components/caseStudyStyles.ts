export function caseStudySectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const caseStudySectionHeadingClass =
  "text-[24px] font-semibold leading-tight tracking-tight text-foreground";
