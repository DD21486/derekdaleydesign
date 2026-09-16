import type { CaseStudyMedia, CaseStudyMediaItem } from "@/lib/content";

type CaseStudyMediaBlockProps = {
  media: CaseStudyMedia;
  className?: string;
};

const wideMediaClass =
  "relative left-1/2 my-8 max-w-none -translate-x-1/2 w-[min(calc(100vw-2rem),80rem)] sm:my-10 min-[1900px]:w-[min(calc(100vw-1rem),96rem)]";

function isVideoSrc(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

function VideoMedia({
  media,
  className,
}: {
  media: CaseStudyMediaItem;
  className: string;
}) {
  return (
    <video
      src={media.src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={media.alt}
      className={className}
      style={media.aspect ? { aspectRatio: media.aspect } : undefined}
    />
  );
}

function MediaFrame({ media }: { media: CaseStudyMediaItem }) {
  if (media.src && isVideoSrc(media.src)) {
    return (
      <VideoMedia
        media={media}
        className="h-auto w-full rounded-2xl object-cover"
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

function MediaCaption({ caption }: { caption: string }) {
  return (
    <figcaption className="mt-3 text-center text-[13px] text-foreground-muted">
      {caption}
    </figcaption>
  );
}

export function CaseStudyMediaBlock({
  media,
  className = "",
}: CaseStudyMediaBlockProps) {
  const caption = media.caption ? <MediaCaption caption={media.caption} /> : null;

  if (media.layout === "wide-pair" && media.items) {
    const [left, right] = media.items;

    function PairVideo({
      item,
      variant,
    }: {
      item: CaseStudyMediaItem;
      variant: "primary" | "boxed";
    }) {
      if (!item.src || !isVideoSrc(item.src)) {
        return <MediaFrame media={item} />;
      }

      if (variant === "primary") {
        return (
          <VideoMedia
            media={item}
            className="h-auto w-full rounded-2xl object-cover"
          />
        );
      }

      return (
        <div className="flex min-h-0 items-center justify-center rounded-2xl bg-[#E1E3E7] md:h-full">
          <VideoMedia
            media={item}
            className="h-auto w-full object-contain md:max-h-full md:max-w-full"
          />
        </div>
      );
    }

    return (
      <div className={`${wideMediaClass} ${className}`}>
        <div className="space-y-8 md:hidden">
          {[left, right].map((item, index) => (
            <figure key={item.alt}>
              <PairVideo item={item} variant={index === 0 ? "primary" : "boxed"} />
              {item.caption ? <MediaCaption caption={item.caption} /> : null}
            </figure>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-2 items-stretch gap-5">
            <PairVideo item={left} variant="primary" />
            <PairVideo item={right} variant="boxed" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-5">
            {left.caption ? <MediaCaption caption={left.caption} /> : <div />}
            {right.caption ? <MediaCaption caption={right.caption} /> : null}
          </div>
        </div>
      </div>
    );
  }

  if (media.layout === "wide") {
    return (
      <figure className={`${wideMediaClass} ${className}`}>
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
