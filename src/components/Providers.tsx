"use client";

import type { ReactNode } from "react";
import { CaseStudyTransitionProvider } from "@/components/CaseStudyTransitionProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <CaseStudyTransitionProvider>{children}</CaseStudyTransitionProvider>;
}
