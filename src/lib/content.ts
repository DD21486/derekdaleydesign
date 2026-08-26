import type { HobbyIconName } from "@/lib/hobby-icons";

export type WorkItem = {
  id: string;
  title: string;
  company: string;
  date: string;
  folders: {
    cap: string;
    left: string;
    right: string;
  };
};

export type NavLink = {
  id: string;
  label: string;
  tooltip: string;
  href: string;
  icon: "github" | "linkedin" | "email" | "link";
  external?: boolean;
};

export type CompanyLinkData = {
  name: string;
  icon: string;
  href: string;
  previewLabel?: string;
  previewVideo?: string;
};

export type BioSegment =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "muted"; value: string }
  | { type: "company"; company: CompanyLinkData };

export type BioParagraph = {
  segments: BioSegment[];
};

export const companies = {
  pantomath: {
    name: "Pantomath",
    icon: "/icons/pantomath_mini_white.png",
    href: "https://www.pantomath.com/",
    previewVideo: "/videos/pantomath_1.mp4",
  },
  barstool: {
    name: "Barstool Sports",
    icon: "/icons/barstool_mini_white.png",
    href: "https://www.barstoolsports.com/",
    previewVideo: "/videos/Barstool.mp4",
  },
  kroger: {
    name: "Kroger",
    icon: "/icons/kroger_mini_white.png",
    href: "https://www.thekrogerco.com/",
    previewVideo: "/videos/Kroger.mp4",
  },
} satisfies Record<string, CompanyLinkData>;

export const siteConfig = {
  name: "Derek Daley",
  title: "Senior Product Designer",
  email: "hello@example.com",
  location: "CIN",
  secondaryLocation: "NYC",
  avatar: "/derek_portrait_1_small.png",
  avatarHover: "/baby_derek.png",
};

export const bio = {
  intro: [
    {
      segments: [
        { type: "text", value: "Currently leading design at " },
        { type: "company", company: companies.pantomath },
        { type: "muted", value: " (Seed→Series B | $10M+ ARR growth)" },
        {
          type: "text",
          value:
            ". I design tools and AI experiences that automate data operations at enterprise scale. I design in code daily, ship straight to production, and own product, marketing, and brand end-to-end as a team of one.",
        },
      ],
    },
    {
      segments: [
        { type: "text", value: "Previously " },
        { type: "company", company: companies.barstool },
        { type: "muted", value: " (NYC)" },
        { type: "text", value: " and " },
        { type: "company", company: companies.kroger },
        { type: "muted", value: " (Cincy)" },
        {
          type: "text",
          value:
            ". A decade designing B2C and B2B at scale for the world's biggest media and retail brands.",
        },
      ],
    },
    {
      segments: [
        { type: "text", value: "These days I'm " },
        { type: "bold", value: "leaning into the unknown" },
        {
          type: "text",
          value:
            ", embracing AI, and building beyond my job description — the most effective designer and builder I can be.",
        },
      ],
    },
  ] satisfies BioParagraph[],
};

export const navLinks: NavLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    tooltip: "Connect On Linkedin",
    href: "https://www.linkedin.com/in/daleyd4/",
    icon: "linkedin",
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    tooltip: "My Github",
    href: "https://github.com/DD21486",
    icon: "github",
    external: true,
  },
  {
    id: "email",
    label: "Copy my email",
    tooltip: "Copy My Email",
    href: "mailto:hello@example.com",
    icon: "email",
  },
];

const pantomathFolders = {
  cap: "/slides/pantomath_folder_cap.png",
  left: "/slides/pantomath_folder_slide_left_1.png",
  right: "/slides/pantomath_folder_slide_right_2.png",
};

const barstoolFolders = {
  cap: "/slides/barstooltv_folder_cap.png",
  left: "/slides/barstooltv_folder_slide_left_1.png",
  right: "/slides/barstooltv_folder_slide_right_2.png",
};

const stellaBlueFolders = {
  cap: "/slides/stellablue_folder_cap.png",
  left: "/slides/stellablue_folder_slide_left_1.png",
  right: "/slides/stellablue_folder_slide_right_1.png",
};

export const recentWork: WorkItem[] = [
  {
    id: "pantomath",
    title: "Pantomath",
    company: "Pantomath",
    date: "Spring 26'",
    folders: pantomathFolders,
  },
  {
    id: "barstool",
    title: "BarstoolTV",
    company: "Barstool Sports",
    date: "Spring 23'",
    folders: barstoolFolders,
  },
  {
    id: "stella-blue",
    title: "Stella Blue",
    company: "Stella Blue",
    date: "Fall 24'",
    folders: stellaBlueFolders,
  },
];

export type HobbyProjectStatus = "active" | "paused" | "completed";

export type HobbySkill = {
  label: string;
  icon: HobbyIconName;
};

export type HobbyProjectDetail = {
  date: string;
  status: {
    label: string;
    tone: HobbyProjectStatus;
    icon: HobbyIconName;
  };
  skills: HobbySkill[];
  banner: string;
  sections: {
    title?: string;
    paragraphs: string[];
  }[];
};

export type HobbyProject = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  detail?: HobbyProjectDetail;
};

export const hobbyProjects: HobbyProject[] = [
  {
    id: "coney-counter",
    title: "Coney Counter",
    subtitle: "Cincinnati Coney Tracking Webapp",
    image: "/coneycounter.png",
    detail: {
      date: "September 2025",
      status: {
        label: "Paused",
        tone: "paused",
        icon: "pause",
      },
      skills: [
        { label: "User Authentication", icon: "key-round" },
        { label: "Database Design", icon: "database" },
        { label: "Image Recognition", icon: "scan-eye" },
        { label: "Full-stack Development", icon: "layers" },
        { label: "API Architecture", icon: "network" },
        { label: "Product Design", icon: "pen-tool" },
      ],
      banner: "/coney_counter_banner.png",
      sections: [
        {
          title: "Why I built it",
          paragraphs: [
            "Coney Counter was my first real end-to-end web app — authentication, a database, image recognition, user accounts, and everything that comes with shipping something people can actually use. It taught me how software gets made, not just how it looks in a file.",
            "I'm from Cincinnati and eat a lot of cheese coneys — twice a week at my local Skyline, in and out in fifteen minutes. I wanted to turn that habit into something I could use and share with people who get it.",
          ],
        },
        {
          title: "What it does",
          paragraphs: [
            "Track your coney consumption, compete on leaderboards, and earn achievements along the way. Part utility, part celebration of the cheese coney. It's paused for now, but the skills stuck — auth, databases, backend logic, and shipping something real.",
          ],
        },
      ],
    },
  },
  {
    id: "mesh",
    title: "MESH",
    subtitle: "Towerdefense Video Game",
    image: "/MESH.png",
  },
  {
    id: "sysmud",
    title: "Sysmud",
    subtitle: "In-browser MMO Experiment",
    image: "/sysmud.png",
  },
];

export const stats = [
  { value: "10+", label: "Years designing", icon: "/icons/calendar.svg" },
  { value: "6", label: "Companies shipped at", icon: "/icons/ship.svg" },
  { value: "4", label: "States lives in", icon: "/icons/globe.svg" },
];

export type AboutBentoImage = {
  src: string;
  alt: string;
};

export const aboutContent = {
  text: "I live in Cincinnati with my wife Kendall, son Charles, and our pup Hadley. I'm a creative at heart, constantly building side projects and expanding my horizons in new directions. I travel back to NYC a few times a year to play bass in a band, I bleed black and orange on Sundays (Go Bengals), and overall, I'm just building the life I've always wanted.",
  columns: [
    [
      { src: "/about/daley_img_topleft_square.png", alt: "Stadium visit" },
      { src: "/about/daley_img_midleft_square.png", alt: "Bass guitar" },
      { src: "/about/daley_img_botleft_vertical.png", alt: "With the dog" },
    ],
    [
      { src: "/about/daley_img_midtop_vertical.png", alt: "On the pier" },
      { src: "/about/daley_img_middle_square.png", alt: "By the water" },
      { src: "/about/daley_img_botmid_square.png", alt: "Friends" },
    ],
    [
      { src: "/about/daley_img_topright_square.png", alt: "Basketball" },
      { src: "/about/daley_img_mdiright_vertical.png", alt: "With baby" },
      { src: "/about/daley_img_botright_square.png", alt: "Group photo" },
    ],
  ] satisfies AboutBentoImage[][],
};
