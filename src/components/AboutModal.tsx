"use client";

import Image from "next/image";
import { OverlayModal } from "@/components/OverlayModal";
import type { AboutBentoImage } from "@/lib/content";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
  text: string;
  columns: AboutBentoImage[][];
};

function isVertical(src: string) {
  return src.includes("vertical");
}

function getCascadeDelay(columnIndex: number, rowIndex: number, columnCount: number) {
  return 0.5 + (rowIndex * columnCount + columnIndex) * 0.2;
}

export function AboutModal({ open, onClose, text, columns }: AboutModalProps) {
  const columnCount = columns.length;

  return (
    <OverlayModal open={open} onClose={onClose} ariaLabel="About me">
      {(close) => (
        <>
          <div className="about-content-enter flex items-start justify-between gap-4">
            <p className="max-w-2xl text-[14px] leading-[1.65] text-black dark:text-neutral-300">
              {text}
            </p>
            <button
              type="button"
              onClick={close}
              className="shrink-0 font-mono text-[13px] text-foreground-muted transition-colors hover:text-foreground"
            >
              [close]
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-5">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-5">
                {column.map((image, rowIndex) => (
                  <div
                    key={image.src}
                    className="about-image-enter overflow-hidden rounded-xl"
                    style={{
                      animationDelay: `${getCascadeDelay(columnIndex, rowIndex, columnCount)}s`,
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={isVertical(image.src) ? 1067 : 800}
                      className="block h-auto w-full object-cover grayscale"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </OverlayModal>
  );
}
