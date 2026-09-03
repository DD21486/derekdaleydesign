import { siteConfig } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="mx-auto flex max-w-content items-center justify-center px-5 py-3">
        <p className="text-[12px] text-foreground-muted">
          © 2026 {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
