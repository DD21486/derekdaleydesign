import { Avatar } from "@/components/Avatar";
import { Bio } from "@/components/Bio";
import { ClockBar } from "@/components/ClockBar";
import { ContactForm } from "@/components/ContactForm";
import { EnterItem } from "@/components/EnterItem";
import { HeaderActions } from "@/components/HeaderActions";
import { NavLinks } from "@/components/NavLinks";
import { RecentWork } from "@/components/RecentWork";
import { Stats } from "@/components/Stats";
import {
  aboutContent,
  bio,
  navLinks,
  recentWork,
  siteConfig,
  stats,
} from "@/lib/content";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <EnterItem delay={0.5} fadeOnly duration={0.5}>
        <header className="sticky top-0 z-10 border-b border-white/5 bg-surface/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
            <ClockBar />
            <HeaderActions
              aboutText={aboutContent.text}
              aboutColumns={aboutContent.columns}
            />
          </div>
        </header>
      </EnterItem>

      <main>
        <div className="mx-auto max-w-content px-5 pt-10">
          <EnterItem index={1}>
            <Avatar
              portrait={siteConfig.avatar}
              hover={siteConfig.avatarHover}
              alt={siteConfig.name}
            />
          </EnterItem>

          <EnterItem index={2}>
            <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </h1>
          </EnterItem>

          <Bio paragraphs={bio.intro} startIndex={3} />

          <EnterItem index={6} className="mt-8">
            <NavLinks links={navLinks} email={siteConfig.email} />
          </EnterItem>

          <EnterItem index={7}>
            <Stats items={stats} />
          </EnterItem>
        </div>

        <EnterItem index={8}>
          <div className="mx-auto max-w-4xl px-12 py-24 sm:px-16">
            <RecentWork items={recentWork} />
          </div>
        </EnterItem>

        <div className="mx-auto max-w-content px-5 pb-20">
          <EnterItem index={9}>
            <ContactForm />
          </EnterItem>
        </div>
      </main>
    </div>
  );
}
