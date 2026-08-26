"use client";

import Image from "next/image";
import { OverlayModal } from "@/components/OverlayModal";
import { HobbyIcon } from "@/lib/hobby-icons";
import type { HobbyProject } from "@/lib/content";

type HobbyProjectModalProps = {
  project: HobbyProject | null;
  onClose: () => void;
};

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-subtle">
      {children}
    </p>
  );
}

function HobbyProjectDetailContent({
  project,
  close,
}: {
  project: HobbyProject & { detail: NonNullable<HobbyProject["detail"]> };
  close: () => void;
}) {
  const { detail } = project;

  return (
    <>
      <div
        className="about-image-enter relative overflow-hidden rounded-xl"
        style={{ animationDelay: "0.5s" }}
      >
        <Image
          src={detail.banner}
          alt={`${project.title} banner`}
          width={1200}
          height={300}
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="block h-auto w-full"
        />
      </div>

      <div
        className="about-content-enter mt-4 flex items-start justify-between gap-3"
        style={{ animationDelay: "0.55s" }}
      >
        <div>
          <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
            {project.title}
          </h2>
          <p className="mt-1 text-[14px] text-foreground-muted">{project.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={close}
          className="shrink-0 font-mono text-[13px] text-foreground-muted transition-colors hover:text-foreground"
        >
          [close]
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] lg:gap-8">
        <aside
          className="about-content-enter space-y-5 border-white/10 lg:border-r lg:pr-6"
          style={{ animationDelay: "0.6s" }}
        >
          <div>
            <SidebarLabel>Timeframe</SidebarLabel>
            <p className="mt-2 flex items-center gap-2 text-[13px] text-foreground-muted">
              <HobbyIcon name="calendar" className="h-3.5 w-3.5 shrink-0 text-foreground-subtle" />
              {detail.date}
            </p>
          </div>

          <div>
            <SidebarLabel>Status</SidebarLabel>
            <p className="mt-2 flex items-center gap-2 text-[13px] text-foreground-muted">
              <HobbyIcon
                name={detail.status.icon}
                className="h-3.5 w-3.5 shrink-0 text-foreground-subtle"
              />
              {detail.status.label}
            </p>
          </div>

          <div>
            <SidebarLabel>Skills flexed</SidebarLabel>
            <ul className="mt-2 space-y-2.5">
              {detail.skills.map((skill) => (
                <li
                  key={skill.label}
                  className="flex items-start gap-2 text-[13px] leading-snug text-foreground-muted"
                >
                  <HobbyIcon
                    name={skill.icon}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground-subtle"
                  />
                  {skill.label}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-6">
          {detail.sections.map((section, index) => (
            <div
              key={section.title ?? index}
              className="about-content-enter space-y-3"
              style={{ animationDelay: `${0.65 + index * 0.08}s` }}
            >
              {section.title ? (
                <h3 className="text-[15px] font-semibold text-foreground">{section.title}</h3>
              ) : null}
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[14px] leading-[1.7] text-foreground/90"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function HobbyProjectFallbackContent({
  project,
  close,
}: {
  project: HobbyProject;
  close: () => void;
}) {
  return (
    <>
      <div className="about-content-enter flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
            {project.title}
          </h2>
          <p className="mt-1 text-[14px] text-foreground-muted">{project.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={close}
          className="shrink-0 font-mono text-[13px] text-foreground-muted transition-colors hover:text-foreground"
        >
          [close]
        </button>
      </div>

      <div
        className="about-image-enter mt-8 overflow-hidden rounded-xl"
        style={{ animationDelay: "0.7s" }}
      >
        <div className="relative aspect-video w-full bg-surface-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}

export function HobbyProjectModal({ project, onClose }: HobbyProjectModalProps) {
  return (
    <OverlayModal
      open={project !== null}
      onClose={onClose}
      ariaLabel={project?.title ?? "Hobby project"}
      contentClassName="mx-auto max-w-3xl px-3 py-6 sm:px-4 sm:py-7"
    >
      {(close) =>
        project ? (
          project.detail ? (
            <HobbyProjectDetailContent project={project} close={close} />
          ) : (
            <HobbyProjectFallbackContent project={project} close={close} />
          )
        ) : null
      }
    </OverlayModal>
  );
}
