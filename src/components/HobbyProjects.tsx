"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { HobbyProject } from "@/lib/content";

type HobbyProjectsProps = {
  items: HobbyProject[];
};

const MAX_TILT = 12;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function HobbyProjectCard({ item }: { item: HobbyProject }) {
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
      <div className="mx-auto w-[45%] overflow-visible">
        <div
          ref={imageRef}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseMove={handleImageMove}
          onMouseLeave={handleImageLeave}
          className="relative aspect-square overflow-hidden rounded-2xl transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`,
          }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="pointer-events-none object-cover select-none"
          />
        </div>
      </div>
      <h3 className="mt-4 text-center text-[15px] font-semibold text-foreground">
        {item.title}
      </h3>
      <p className="mt-1 text-center text-[13px] text-neutral-500">{item.subtitle}</p>
    </article>
  );
}

export function HobbyProjects({ items }: HobbyProjectsProps) {
  return (
    <section aria-label="Hobby projects">
      <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground-subtle">
        Hobby Projects
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <HobbyProjectCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
