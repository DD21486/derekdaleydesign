import type { CaseStudyMedia } from "@/lib/content";

type CaseStudyMediaBlockProps = {
  media: CaseStudyMedia;
  className?: string;
};

function isVideoSrc(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

function MediaFrame({ media }: { media: CaseStudyMedia }) {
  if (media.src && isVideoSrc(media.src)) {
    return (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className="h-auto w-full rounded-2xl object-cover"
        style={media.aspect ? { aspectRatio: media.aspect } : undefined}
      />
    );
  }

  if (media.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.src}
        alt={media.alt}
        className="h-auto w-full rounded-2xl"
        style={media.aspect ? { aspectRatio: media.aspect } : undefined}
      />
    );
  }

  const aspectRatio = media.aspect ?? "16 / 10";

  return (
    <div
      className="w-full rounded-2xl bg-surface-muted"
      style={{ aspectRatio }}
      role="img"
      aria-label={media.alt}
    />
  );
}

export function CaseStudyMediaBlock({
  media,
  className = "",
}: CaseStudyMediaBlockProps) {
  const caption = media.caption ? (
    <figcaption className="mt-3 text-center text-[13px] text-foreground-muted">
      {media.caption}
    </figcaption>
  ) : null;

  if (media.layout === "wide") {
    return (
      <figure
        className={`relative left-1/2 my-10 max-w-none -translate-x-1/2 w-[min(calc(100vw-4rem),80rem)] min-[1900px]:w-[min(calc(100vw-1rem),96rem)] ${className}`}
      >
        <MediaFrame media={media} />
        {caption}
      </figure>
    );
  }

  return (
    <figure className={`my-8 w-full ${className}`}>
      <MediaFrame media={media} />
      {caption}
    </figure>
  );
}
