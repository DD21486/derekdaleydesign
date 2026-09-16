import type { CaseStudyPersona } from "@/lib/content";

type CaseStudyPersonaListProps = {
  personas: CaseStudyPersona[];
};

export function CaseStudyPersonaList({ personas }: CaseStudyPersonaListProps) {
  return (
    <div className="mt-8 space-y-8">
      {personas.map((persona) => (
        <div key={persona.title} className="flex flex-col gap-4 sm:flex-row sm:gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={persona.image}
            alt={persona.imageAlt}
            className="h-24 w-24 shrink-0 rounded-2xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-semibold text-foreground">
              {persona.title}
            </h3>
            <p className="mt-3 text-[13px] font-medium uppercase tracking-[0.08em] text-foreground-muted">
              What they need
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-4">
              {persona.needs.map((need) => (
                <li
                  key={need}
                  className="text-[15px] leading-[1.6] text-foreground/90"
                >
                  {need}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
