"use client";

import type { ReactNode } from "react";
import { useCaseStudyTransition } from "@/components/CaseStudyTransitionProvider";

export function HomeEntrance({ children }: { children: ReactNode }) {
  const { homeRemountKey } = useCaseStudyTransition();

  return <div key={homeRemountKey > 0 ? `home-${homeRemountKey}` : "home"}>{children}</div>;
}
