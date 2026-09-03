"use client";

import Image from "next/image";
import { useState } from "react";
import { LifeGraphModal } from "@/components/LifeGraphModal";
import { lifeGraphContent } from "@/lib/content";

type AvatarProps = {
  portrait: string;
  hover: string;
  alt: string;
};

export function Avatar({ portrait, hover, alt }: AvatarProps) {
  const [lifeGraphOpen, setLifeGraphOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setLifeGraphOpen(true)}
        className="group relative mb-8 h-28 w-28 overflow-hidden rounded-full bg-surface-muted"
        aria-label="Open life graph"
      >
        <Image
          src={hover}
          alt=""
          width={112}
          height={112}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <Image
          src={portrait}
          alt={alt}
          width={112}
          height={112}
          priority
          className="relative z-10 h-full w-full object-cover transition-[opacity,filter] duration-500 ease-in-out group-hover:opacity-0 group-hover:blur-md"
        />
      </button>

      <LifeGraphModal
        open={lifeGraphOpen}
        onClose={() => setLifeGraphOpen(false)}
        nodes={lifeGraphContent.nodes}
        edges={lifeGraphContent.edges}
      />
    </>
  );
}
