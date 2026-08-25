"use client";

import { useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { AboutBentoImage } from "@/lib/content";

type HeaderActionsProps = {
  aboutText: string;
  aboutColumns: AboutBentoImage[][];
};

export function HeaderActions({ aboutText, aboutColumns }: HeaderActionsProps) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setAboutOpen(true)}
          className="font-mono text-[13px] text-foreground-muted transition-colors hover:text-foreground"
        >
          [about me]
        </button>
        <ThemeToggle />
      </div>

      <AboutModal
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        text={aboutText}
        columns={aboutColumns}
      />
    </>
  );
}
