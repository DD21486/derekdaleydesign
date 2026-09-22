import { Avatar } from "@/components/Avatar";
import { Bio } from "@/components/Bio";
import { ClockBar } from "@/components/ClockBar";
import { EnterItem } from "@/components/EnterItem";
import { HeaderActions } from "@/components/HeaderActions";
import { HobbyProjects } from "@/components/HobbyProjects";
import { HomeEntrance } from "@/components/HomeEntrance";
import { WorkHistory } from "@/components/WorkHistory";
import { NavLinks } from "@/components/NavLinks";
import { RecentWork } from "@/components/RecentWork";
import { Stats } from "@/components/Stats";
import {
  aboutContent,
  bio,
  hobbyProjects,
  navLinks,
  recentWork,
  siteConfig,
  stats,
  workHistory,
} from "@/lib/content";

export default function Home() {
  return (
    <HomeEntrance>
      <div className="min-h-screen bg-surface">
        <EnterItem delay={0.5} fadeOnly duration={0.5}>
          <header className="sticky top-0 z-10 border-b border-white/5 bg-surface/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-x-3 gap-y-1 px-5 py-3">
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
              <h1 className="text-[24px] font-semibold tracking-tight text-foreground sm:text-[28px]">
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
            <div className="mx-auto max-w-4xl px-5 pt-16 sm:px-12 sm:pt-24 lg:px-16">
              <RecentWork items={recentWork} />
            </div>
          </EnterItem>

          <EnterItem index={9}>
            <div className="mx-auto max-w-4xl px-5 py-16 sm:px-12 sm:py-24 lg:px-16">
              <HobbyProjects items={hobbyProjects} />
            </div>
          </EnterItem>

          <EnterItem index={10}>
            <div className="mx-auto max-w-4xl px-5 pb-20 sm:px-12 lg:px-16">
              <WorkHistory items={workHistory} />
            </div>
          </EnterItem>
        </main>
      </div>
    </HomeEntrance>
  );
}
