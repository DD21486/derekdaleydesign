"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { CompanyLinkData } from "@/lib/content";

type CompanyLinkProps = {
  company: CompanyLinkData;
};

export function CompanyLink({ company }: CompanyLinkProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const handlePreviewEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
  };

  const handlePreviewLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <span
      className="group/link relative mx-0.5 inline"
      onMouseEnter={company.previewVideo ? handlePreviewEnter : undefined}
      onMouseLeave={company.previewVideo ? handlePreviewLeave : undefined}
    >
      <a
        href={company.href}
        target={company.href.startsWith("http") ? "_blank" : undefined}
        rel={company.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-1 font-semibold text-foreground underline decoration-dotted decoration-foreground/35 underline-offset-[5px] transition-opacity hover:opacity-90"
      >
        <Image
          src={company.icon}
          alt=""
          width={20}
          height={20}
          aria-hidden
          className="h-5 w-5 shrink-0 object-contain"
        />
        {company.name}
      </a>

      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-30 -translate-x-1/2 scale-95 opacity-0 transition duration-200 ease-out group-hover/link:scale-100 group-hover/link:opacity-100"
      >
        <span className="relative block w-52 overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated shadow-2xl">
          {company.previewVideo ? (
            <>
              <video
                ref={videoRef}
                src={company.previewVideo}
                muted
                loop
                playsInline
                preload="none"
                aria-busy={!videoReady}
                className="aspect-[4/3] w-full bg-surface-muted object-cover"
                onLoadedData={() => setVideoReady(true)}
                onCanPlay={() => setVideoReady(true)}
                onError={() => setVideoReady(true)}
              />
              {videoReady ? null : (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner className="h-5 w-5" label="Loading video" />
                </span>
              )}
            </>
          ) : (
            <span className="flex aspect-[4/3] items-center justify-center bg-surface-muted">
              <span className="font-mono text-[11px] uppercase tracking-widest text-foreground-subtle">
                {company.previewLabel ?? "Placeholder"}
              </span>
            </span>
          )}
        </span>
      </span>
    </span>
  );
}
