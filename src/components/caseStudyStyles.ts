export function caseStudySectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const caseStudySectionHeadingClass =
  "text-[20px] font-semibold leading-tight tracking-tight text-foreground sm:text-[24px]";
