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
      <h2 className="text-[15px] font-medium text-foreground">
        Send a note — or find me in Cincinnati
      </h2>

      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="rounded-lg border border-white/10 bg-surface-muted px-4 py-3 text-[15px] text-foreground placeholder:text-foreground-subtle outline-none transition-colors focus:border-white/20"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="rounded-lg border border-white/10 bg-surface-muted px-4 py-3 text-[15px] text-foreground placeholder:text-foreground-subtle outline-none transition-colors focus:border-white/20"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={4}
          className="resize-none rounded-lg border border-white/10 bg-surface-muted px-4 py-3 text-[15px] text-foreground placeholder:text-foreground-subtle outline-none transition-colors focus:border-white/20"
        />
        <button
          type="submit"
          disabled
          className="rounded-lg bg-foreground px-4 py-3 text-[15px] font-medium text-surface transition-opacity disabled:opacity-40"
        >
          Send message
        </button>
      </form>

      <button
        type="button"
        onClick={copyEmail}
        className="mt-4 flex items-center gap-2.5 text-[15px] text-foreground-muted transition-opacity hover:opacity-80"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 7 10-7" />
          </svg>
        </span>
        <span className="text-foreground-muted">—</span>
        <span className="text-foreground">
          {copied ? "Copied!" : "Copy my email"}
        </span>
      </button>
    </section>
  );
}
