"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { HobbyProjectModal } from "@/components/HobbyProjectModal";
import type { HobbyProject } from "@/lib/content";

type HobbyProjectsProps = {
  items: HobbyProject[];
};

const MAX_TILT = 12;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function HobbyProjectCard({
  item,
  onSelect,
}: {
  item: HobbyProject;
  onSelect: (item: HobbyProject) => void;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const handleImageMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const image = imageRef.current;
    if (!image) return;

    const rect = image.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    setTilt({
      x: clamp((-deltaY / rect.height) * MAX_TILT * 1.5, -MAX_TILT, MAX_TILT),
      y: clamp((deltaX / rect.width) * MAX_TILT * 1.5, -MAX_TILT, MAX_TILT),
    });
  };

  const handleImageLeave = () => {
    setIsHoveringImage(false);
    setTilt({ x: 0, y: 0 });
  };

  const scale = isHoveringImage ? 1.1 : 1;

  return (
    <article className="flex flex-col overflow-visible">
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="group/card mx-auto w-full max-w-[7rem] overflow-visible text-left"
        aria-label={`Open ${item.title}`}
      >
        <div
          ref={imageRef}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseMove={handleImageMove}
          onMouseLeave={handleImageLeave}
          className="relative aspect-square cursor-pointer overflow-hidden rounded-2xl transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`,
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="112px"
            className="pointer-events-none object-cover select-none"
          />
        </div>
        <h3 className="mt-4 text-center text-[15px] font-semibold text-foreground transition-colors group-hover/card:text-foreground-muted">
          {item.title}
        </h3>
        <p className="mt-1 text-center text-[13px] text-neutral-500">{item.subtitle}</p>
      </button>
    </article>
  );
}

export function HobbyProjects({ items }: HobbyProjectsProps) {
  const [activeProject, setActiveProject] = useState<HobbyProject | null>(null);

  return (
    <>
      <section aria-label="Hobby projects">
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-subtle">
          Hobby Projects
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 lg:grid-cols-4">
          {items.map((item) => (
            <HobbyProjectCard
              key={item.id}
              item={item}
              onSelect={setActiveProject}
            />
          ))}
        </div>
      </section>

      <HobbyProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}
