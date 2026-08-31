"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export type HobbyLightboxImage = {
  src: string;
  alt: string;
  rect: DOMRect;
};

type HobbyImageLightboxProps = HobbyLightboxImage & {
  onClose: () => void;
};

const ANIMATION_MS = 380;

export function HobbyImageLightbox({
  src,
  alt,
  rect,
  onClose,
}: HobbyImageLightboxProps) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const maxWidth = Math.min(window.innerWidth * 0.92, 960);
  const maxHeight = window.innerHeight * 0.88;
  const scale = Math.min(
    maxWidth / rect.width,
    maxHeight / rect.height,
    2.75,
  );
  const dx = window.innerWidth / 2 - originX;
  const dy = window.innerHeight / 2 - originY;

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisible(true);
      setExpanded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleClose = useCallback(() => {
    setExpanded(false);
    setVisible(false);
    window.setTimeout(onClose, ANIMATION_MS);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleClose]);

  const transform = expanded
    ? `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`
    : "translate(-50%, -50%) scale(1)";

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Close image preview"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/55 backdrop-blur-md transition-opacity duration-[380ms] ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={(event) => event.stopPropagation()}
        className={`fixed z-[121] cursor-default rounded-xl object-contain shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? "" : "opacity-0"
        }`}
        style={{
          top: originY,
          left: originX,
          width: rect.width,
          height: rect.height,
          transform,
        }}
      />
    </div>,
    document.body,
  );
}
