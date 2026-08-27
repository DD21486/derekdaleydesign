import type { CaseStudyOverviewItem } from "@/lib/content";

type CaseStudyOverviewBarProps = {
  items: CaseStudyOverviewItem[];
  className?: string;
};

export function CaseStudyOverviewBar({
  items,
  className = "",
}: CaseStudyOverviewBarProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8 ${className}`}
    >
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-[13px] text-foreground-muted">{item.label}</p>
          <p className="mt-1.5 text-[15px] font-semibold text-foreground">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
