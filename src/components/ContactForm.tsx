"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/content";

export function ContactForm() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section className="mt-16 border-t border-white/5 pt-12">
      <button
        type="button"
        onClick={copyEmail}
        className="flex items-center gap-2.5 text-[15px] text-foreground-muted transition-opacity hover:opacity-80"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 7 10-7" />
          </svg>
        </span>
        <span className="text-foreground-muted">·</span>
        <span className="text-foreground">
          {copied ? "Copied!" : "Copy my email"}
        </span>
      </button>
    </section>
  );
}
