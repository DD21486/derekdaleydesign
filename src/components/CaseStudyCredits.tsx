import type { CaseStudyMeta } from "@/lib/content";
import { CaseStudySectionHeading } from "@/components/CaseStudySectionHeading";

type CaseStudyCreditsProps = {
  meta: CaseStudyMeta;
  className?: string;
};

export function CaseStudyCredits({ meta, className = "" }: CaseStudyCreditsProps) {
  const hasTeam = meta.team.length > 0;

  return (
    <div
      className={`grid gap-12 ${hasTeam ? "md:grid-cols-2 md:gap-16" : "grid-cols-1"} ${className}`}
    >
      <section>
        <CaseStudySectionHeading id="my-role" inPanel>
          My Role
        </CaseStudySectionHeading>
        <p className="mt-6 text-[15px] leading-[1.75]">
          <span className="text-foreground/90">{meta.role.title}</span>
          <span className="text-foreground-muted"> - {meta.role.focus}</span>
        </p>
      </section>

      {hasTeam ? (
        <section>
          <CaseStudySectionHeading icon="users" inPanel>
            The Team
          </CaseStudySectionHeading>
          <ul className="mt-6 space-y-2.5">
            {meta.team.map((member) => (
              <li key={member.name} className="text-[15px] leading-[1.75]">
                <span className="text-foreground/90">{member.name}</span>
                <span className="text-foreground-muted">, {member.role}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
