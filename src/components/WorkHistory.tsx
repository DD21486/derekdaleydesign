import type { WorkHistoryItem } from "@/lib/content";

type WorkHistoryProps = {
  items: WorkHistoryItem[];
};

export function WorkHistory({ items }: WorkHistoryProps) {
  return (
    <section aria-label="Work history">
      <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-subtle">
        Work History
      </p>

      <ol className="relative ml-1">
        {items.map((item, index) => (
          <li
            key={`${item.company}-${item.title}-${item.dates}`}
            className="relative pb-8 pl-8 last:pb-0"
          >
            {index < items.length - 1 ? (
              <span
                aria-hidden
                className="absolute left-[5px] top-2.5 h-[calc(100%-0.25rem)] w-px bg-white/10"
              />
            ) : null}
            <span
              aria-hidden
              className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border border-white/20 bg-surface-muted"
            />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-foreground">
                {item.title}
              </p>
              <p className="mt-0.5 text-[14px] text-foreground/90">
                {item.company}
                {item.employmentType ? (
                  <span className="text-foreground-muted">
                    {" "}
                    · {item.employmentType}
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-[13px] text-foreground-muted">
                {item.dates}
                {item.duration ? (
                  <span> · {item.duration}</span>
                ) : null}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
