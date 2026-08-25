export type WorkItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string;
  color: string;
};

export type NavLink = {
  id: string;
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email" | "link";
  external?: boolean;
};

export const siteConfig = {
  name: "Derek Daley",
  title: "Senior Product Designer",
  email: "hello@example.com",
  location: "CIN",
  secondaryLocation: "NYC",
  avatar: "/derek_portrait_1.png",
  avatarHover: "/baby_derek.png",
};

export const bio = {
  intro: [
    {
      text: "Currently leading design solo at ",
      bold: "Pantomath",
      suffix:
        " — a Series B company where I design tools & AI that automate data operations at enterprise scale. I own product, marketing, and brand design end-to-end.",
    },
    {
      text: "Previously Sr. Product Designer at ",
      bold: "Barstool Sports",
      suffix:
        " in NYC, and UI/Product Designer at ",
      bold2: "Kroger",
      suffix2:
        " — America's largest grocery chain. A decade of turning complex problems into clear, human-centered interfaces.",
    },
    {
      text: "These days I'm ",
      bold: "leaning into the unknown",
      suffix:
        ", embracing AI, and building beyond my job description — the most effective designer and builder I can be.",
    },
  ],
};

export const navLinks: NavLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daleyd4/",
    icon: "linkedin",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/placeholder",
    icon: "github",
    external: true,
  },
  {
    id: "email",
    label: "Copy my email",
    href: "mailto:hello@example.com",
    icon: "email",
  },
];

export const recentWork: WorkItem[] = [
  {
    id: "pantomath",
    title: "Enterprise Data Ops",
    subtitle: "Pantomath · 2023 — Present",
    description:
      "Designing AI-powered tools that automate data operations at enterprise scale — from 0→1 product to marketing and brand.",
    tags: ["Product Design", "AI", "Enterprise"],
    href: "#",
    color: "#1a1a2e",
  },
  {
    id: "barstool",
    title: "Internal Tools & Ecommerce",
    subtitle: "Barstool Sports · 2022 — 2023",
    description:
      "Built internal tools and ecommerce experiences for one of the most recognizable media brands in sports.",
    tags: ["Product Design", "Ecommerce", "Media"],
    href: "#",
    color: "#16213e",
  },
  {
    id: "kroger",
    title: "Pickup & Savings",
    subtitle: "Kroger · 2018 — 2022",
    description:
      "Designed pickup and savings experiences for America's largest grocery chain at a pivotal growth moment.",
    tags: ["UI Design", "Retail", "Mobile"],
    href: "#",
    color: "#0f3460",
  },
  {
    id: "side-project-1",
    title: "Side Project One",
    subtitle: "Personal · 2024",
    description:
      "Placeholder for a side project — update with your latest experiment, tool, or creative build.",
    tags: ["Side Project", "AI", "Prototype"],
    href: "#",
    color: "#2d2d2d",
  },
  {
    id: "side-project-2",
    title: "Side Project Two",
    subtitle: "Personal · 2023",
    description:
      "Placeholder for another side project — swap in screenshots and a case study link when ready.",
    tags: ["Side Project", "Design", "Code"],
    href: "#",
    color: "#3d3d3d",
  },
];

export const stats = [
  { value: "10+", label: "Years designing" },
  { value: "4", label: "Companies shipped at" },
  { value: "1", label: "Solo design lead" },
];
