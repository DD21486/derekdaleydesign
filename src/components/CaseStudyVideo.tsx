"use client";

import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { CaseStudyMediaItem } from "@/lib/content";

type CaseStudyVideoProps = {
  media: CaseStudyMediaItem;
  className: string;
};

export function CaseStudyVideo({ media, className }: CaseStudyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [ratio, setRatio] = useState(media.aspect ?? "16 / 9");

  useEffect(() => {
    setReady(false);
    setRatio(media.aspect ?? "16 / 9");

    const video = videoRef.current;
    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;

    setReady(true);
    if (!media.aspect && video.videoWidth > 0) {
      setRatio(`${video.videoWidth} / ${video.videoHeight}`);
    }
  }, [media.aspect, media.src]);

  return (
    <span className="relative block w-full">
      <video
        ref={videoRef}
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={media.alt}
        aria-busy={!ready}
        className={`${className} bg-surface-muted`}
        style={{ aspectRatio: ratio }}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          if (!media.aspect && video.videoWidth > 0) {
            setRatio(`${video.videoWidth} / ${video.videoHeight}`);
          }
        }}
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        onError={() => setReady(true)}
      />
      {ready ? null : (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[inherit]">
          <LoadingSpinner label="Loading video" />
        </span>
      )}
    </span>
  );
}
