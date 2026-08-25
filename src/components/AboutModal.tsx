"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { AboutBentoImage } from "@/lib/content";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
  text: string;
  columns: AboutBentoImage[][];
};

const EXIT_DURATION_MS = 500;

function isVertical(src: string) {
  return src.includes("vertical");
}

function getCascadeDelay(columnIndex: number, rowIndex: number, columnCount: number) {
  return 0.5 + (rowIndex * columnCount + columnIndex) * 0.2;
}

export function AboutModal({ open, onClose, text, columns }: AboutModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setIsClosing(false);
  }, [open]);

  const handleClose = useCallback(() => {
    if (isClosing) return;

    setIsClosing(true);
    window.setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, EXIT_DURATION_MS);
  }, [isClosing, onClose]);

  useEffect(() => {
    if (!open && !isClosing) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, isClosing, handleClose]);

  if (!mounted || (!open && !isClosing)) return null;

  const columnCount = columns.length;

  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="About me">
      <button
        type="button"
        aria-label="Close about me"
        className={`absolute inset-0 bg-black/20 backdrop-blur-md ${
          isClosing ? "about-backdrop-exit" : "about-backdrop-enter"
        }`}
        onClick={handleClose}
      />

      <div
        className={`absolute inset-0 overflow-y-auto ${isClosing ? "about-modal-exit" : ""}`}
      >
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="about-content-enter flex items-start justify-between gap-4">
            <p className="max-w-2xl text-[14px] leading-[1.65] text-black dark:text-neutral-300">
              {text}
            </p>
            <button
              type="button"
              onClick={handleClose}
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
        </div>
      </div>
    </div>,
    document.body,
  );
}
