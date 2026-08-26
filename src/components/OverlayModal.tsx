"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export const OVERLAY_MODAL_EXIT_MS = 500;

type OverlayModalProps = {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  contentClassName?: string;
  children: (close: () => void) => ReactNode;
};

export function OverlayModal({
  open,
  onClose,
  ariaLabel,
  contentClassName = "mx-auto max-w-4xl px-4 py-10",
  children,
}: OverlayModalProps) {
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
    }, OVERLAY_MODAL_EXIT_MS);
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

  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <button
        type="button"
        aria-label={`Close ${ariaLabel.toLowerCase()}`}
        className={`absolute inset-0 bg-black/70 backdrop-blur-md ${
          isClosing ? "about-backdrop-exit" : "about-backdrop-enter"
        }`}
        onClick={handleClose}
      />

      <div className={`absolute inset-0 overflow-y-auto ${isClosing ? "about-modal-exit" : ""}`}>
        <div className={contentClassName}>{children(handleClose)}</div>
      </div>
    </div>,
    document.body,
  );
}
