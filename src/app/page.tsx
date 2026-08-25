import { Avatar } from "@/components/Avatar";
import { ClockBar } from "@/components/ClockBar";
import { ContactForm } from "@/components/ContactForm";
import { NavLinks } from "@/components/NavLinks";
import { RecentWork } from "@/components/RecentWork";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  bio,
  navLinks,
  recentWork,
  siteConfig,
  stats,
} from "@/lib/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-10 border-b border-white/5 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
          <ClockBar />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-content px-5 pb-20 pt-10">
        <Avatar
          portrait={siteConfig.avatar}
          hover={siteConfig.avatarHover}
          alt={siteConfig.name}
        />

        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </h1>

        <div className="mt-6 space-y-5 text-[16px] leading-[1.65] text-foreground-muted">
          <p>
            {bio.intro[0].text}
            <strong className="font-semibold text-foreground">
              {bio.intro[0].bold}
            </strong>
            {bio.intro[0].suffix}
          </p>
          <p>
            {bio.intro[1].text}
            <strong className="font-semibold text-foreground">
              {bio.intro[1].bold}
            </strong>
            {bio.intro[1].suffix}
            <strong className="font-semibold text-foreground">
              {bio.intro[1].bold2}
            </strong>
            {bio.intro[1].suffix2}
          </p>
          <p>
            {bio.intro[2].text}
            <strong className="font-semibold text-foreground">
              {bio.intro[2].bold}
            </strong>
            {bio.intro[2].suffix}
          </p>
        </div>

        <div className="mt-8">
          <NavLinks links={navLinks} email={siteConfig.email} />
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 border-y border-white/5 py-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-2xl font-medium tabular-nums text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <RecentWork items={recentWork} />

        <ContactForm />
      </main>
    </div>
  );
}
