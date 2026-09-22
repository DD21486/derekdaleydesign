import {
  BookOpen,
  Briefcase,
  ClipboardList,
  Compass,
  Heart,
  Layers,
  LayoutTemplate,
  Map,
  Monitor,
  Palette,
  Route,
  Search,
  Sparkles,
  Target,
  TriangleAlert,
  Trophy,
  User,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { caseStudySectionId } from "@/components/caseStudyStyles";

export const caseStudyIcons = {
  "book-open": BookOpen,
  user: User,
  users: Users,
  "triangle-alert": TriangleAlert,
  target: Target,
  compass: Compass,
  search: Search,
  "clipboard-list": ClipboardList,
  "layout-template": LayoutTemplate,
  workflow: Workflow,
  monitor: Monitor,
  sparkles: Sparkles,
  route: Route,
  palette: Palette,
  layers: Layers,
  trophy: Trophy,
  heart: Heart,
  briefcase: Briefcase,
  map: Map,
} as const satisfies Record<string, LucideIcon>;

export type CaseStudyIconName = keyof typeof caseStudyIcons;

const caseStudyIconBySectionId: Record<string, CaseStudyIconName> = {
  overview: "book-open",
  "my-role": "user",
  "the-team": "users",
  "the-problem": "triangle-alert",
  "the-challenge": "target",
  "north-star-design-principles": "compass",
  "research-requirements-stakeholders": "clipboard-list",
  "crafting-a-customizable-user-interface": "layout-template",
  "laying-the-foundation": "workflow",
  "streamlined-user-friendly-and-adaptable-ui": "monitor",
  "results-and-achievements": "trophy",
  "competitive-analysis-and-research": "search",
  "what-research-changed": "search",
  "the-on-the-go-user": "route",
  "the-coffee-enthusiast": "compass",
  "the-subscriber": "layers",
  "designing-user-pathways": "route",
  "brainstorming-and-wireframing": "map",
  "visual-exploration-and-brand-identity": "palette",
  "putting-it-all-together": "layers",
  "a-phenomenal-launch-and-charitable-impact": "heart",
  "launch-and-charitable-impact": "heart",
  "the-solution": "sparkles",
  "solution-results": "trophy",
  "personas-identified": "users",
  "design-process": "workflow",
  "claude-code-prototyping": "sparkles",
  "research-discovery": "search",
  "key-decisions-compromises": "target",
  "results": "trophy",
};

export function getCaseStudyIconName(sectionId: string): CaseStudyIconName {
  return caseStudyIconBySectionId[sectionId] ?? "briefcase";
}

export function getCaseStudyIconNameFromTitle(title: string): CaseStudyIconName {
  return getCaseStudyIconName(caseStudySectionId(title));
}

type CaseStudyIconProps = {
  name: CaseStudyIconName;
  className?: string;
};

export function CaseStudyIcon({
  name,
  className = "h-5 w-5",
}: CaseStudyIconProps) {
  const Icon = caseStudyIcons[name];
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
