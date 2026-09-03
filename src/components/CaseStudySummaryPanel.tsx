import type { ReactNode } from "react";

export type CaseStudySummaryAccent = "red" | "blue";

type CaseStudySummaryPanelProps = {
  children: ReactNode;
  className?: string;
  watermark?: string;
  accent?: CaseStudySummaryAccent;
};

const ACCENT_GRADIENTS: Record<CaseStudySummaryAccent, string> = {
  red: `
    radial-gradient(
      ellipse 90% 70% at 0% 0%,
      rgba(120, 18, 24, 0.55) 0%,
      rgba(70, 8, 12, 0.2) 38%,
      transparent 68%
    ),
    linear-gradient(
      135deg,
      rgba(95, 14, 20, 0.45) 0%,
      rgba(45, 6, 9, 0.12) 32%,
      transparent 52%
    )
  `,
  blue: `
    radial-gradient(
      ellipse 90% 70% at 0% 0%,
      rgba(34, 211, 238, 0.42) 0%,
      rgba(14, 116, 144, 0.18) 38%,
      transparent 68%
    ),
    linear-gradient(
      135deg,
      rgba(37, 99, 235, 0.38) 0%,
      rgba(12, 42, 88, 0.12) 32%,
      transparent 52%
    )
  `,
};

export function CaseStudySummaryPanel({
  children,
  className = "",
  watermark,
  accent,
}: CaseStudySummaryPanelProps) {
  const resolvedAccent = accent ?? (watermark ? "red" : undefined);

  return (
    <div
      className={`rounded-2xl bg-gradient-to-b from-white/[0.18] via-white/[0.10] to-white/[0.04] p-px ${className}`}
    >
      <div className="relative rounded-[calc(1rem-1px)] bg-black px-6 py-8 sm:px-8">
        {resolvedAccent ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[calc(1rem-1px)]"
          >
            <div
              className="absolute inset-0"
              style={{ background: ACCENT_GRADIENTS[resolvedAccent] }}
            />
            {watermark ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={watermark}
                alt=""
                aria-hidden
                className="pointer-events-none absolute top-1/2 -right-10 h-[115%] w-auto max-w-none -translate-y-[46%] select-none opacity-10 sm:-right-12"
              />
            ) : null}
          </div>
        ) : null}

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
