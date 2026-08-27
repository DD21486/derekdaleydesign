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

export type CaseStudyMediaLayout = "contained" | "wide";

export type CaseStudyMedia = {
  src?: string;
  alt: string;
  layout: CaseStudyMediaLayout;
  aspect?: string;
  caption?: string;
  afterParagraph?: number;
};

export type CaseStudyOverviewItem = {
  label: string;
  value: string;
};

export type CaseStudyParagraphSegment =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string };

export type CaseStudyParagraph = string | CaseStudyParagraphSegment[];

export type CaseStudyOverviewIntro = {
  title: string;
  paragraphs: CaseStudyParagraph[];
};

export type CaseStudySection = {
  title: string;
  paragraphs: CaseStudyParagraph[];
  bullets?: string[];
  media?: CaseStudyMedia[];
};

export type CaseStudyRole = {
  title: string;
  focus: string;
};

export type CaseStudyTeamMember = {
  name: string;
  role: string;
};

export type CaseStudyMeta = {
  role: CaseStudyRole;
  team: CaseStudyTeamMember[];
  timeline: string;
};

export type CaseStudy = {
  slug: string;
  meta: CaseStudyMeta;
  overview: CaseStudyOverviewItem[];
  overviewIntro: CaseStudyOverviewIntro;
  hero?: CaseStudyMedia;
  sections: CaseStudySection[];
  summaryWatermark?: string;
};

const loremParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const loremParagraph2 =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "pantomath",
    meta: {
      role: {
        title: "Lead Product Designer",
        focus: "Product Design, Design Systems, Prototyping",
      },
      team: [],
      timeline: "Spring 26'",
    },
    hero: {
      alt: "Pantomath hero",
      layout: "wide",
      aspect: "21 / 9",
    },
    overview: [
      { label: "Industry", value: "Enterprise SaaS" },
      { label: "Client", value: "Pantomath" },
      { label: "Platform", value: "Web (Desktop/Mobile)" },
      { label: "Year", value: "2026" },
    ],
    overviewIntro: {
      title: "Overview",
      paragraphs: [loremParagraph, loremParagraph2],
    },
    sections: [
      {
        title: "The Challenge",
        paragraphs: [loremParagraph],
      },
      {
        title: "The Solution",
        paragraphs: [loremParagraph, loremParagraph2],
      },
    ],
  },
  {
    slug: "barstool",
    summaryWatermark: "/casestudy/barstooltv/barstool_ascii.gif",
    meta: {
      role: {
        title: "Lead Designer",
        focus:
          "User Experience, Interaction Design, Visual Design, User Flows, Research",
      },
      team: [
        { name: "Tucker Borgman", role: "PM" },
        { name: "Mike Nichols", role: "SWE" },
        { name: "Darren Carlin", role: "SWE" },
      ],
      timeline: "Designed and built in 6 weeks, debuted August '23",
    },
    hero: {
      src: "/casestudy/barstooltv/BarstoolTV_Header.webp",
      alt: "BarstoolTV platform header",
      layout: "wide",
    },
    overview: [
      { label: "Industry", value: "Media" },
      { label: "Client", value: "Barstool Sports" },
      { label: "Platform", value: "Web (Desktop/Mobile)" },
      { label: "Year", value: "2023" },
    ],
    overviewIntro: {
      title: "Overview",
      paragraphs: [
        "I led the design of a pay-per-view and on-demand video platform. This platform facilitates the effortless release of premium video content to cater to Barstool's extensive fan base, providing them with top-tier paid content.",
        "I conceptualized and designed the pay-per-view and on-demand video platform, complete with a robust backend CMS where stakeholders can efficiently create pay-per-view events on the fly.",
      ],
    },
    sections: [
      {
        title: "The Problem",
        paragraphs: [
          [
            {
              type: "text",
              value:
                "Barstool Sports was not fully capitalizing on its wealth of highly successful video content. ",
            },
            {
              type: "link",
              label: "Barstool had recently become the most liked brand on TikTok",
              href: "https://socialblade.com/tiktok/lists/top/100/likes#6646764999833403398",
            },
            {
              type: "text",
              value: ", eclipsing 31M followers and 5 billion likes.",
            },
          ],
          "All this video content, no way to monetize it.",
          "Studies show that pay for what you watch is becoming increasingly popular. The global live streaming pay-per-view market is expected to grow 15% annually from 2020 to 2027, reaching $2.3B by 2027. Barstool Sports was uniquely positioned to take full advantage of this growth, and my job was to design a platform to capture it.",
        ],
        media: [
          {
            src: "/casestudy/barstooltv/Barstool_PPV_Market.png",
            alt: "Pay-per-view market growth trend",
            layout: "contained",
            afterParagraph: 2,
          },
        ],
      },
      {
        title: "The Challenge",
        paragraphs: [
          "Designing an elegant and user-friendly pay-per-view platform that caters to both users and internal stakeholders.",
        ],
      },
      {
        title: "North Star Design Principles",
        bullets: [
          "User-Friendly Experience: Ensure that purchasing and watching events is as effortless for users as initiating internal PPV events.",
          "Aesthetic Enhancement: Modernize and redefine the design system aesthetics of Barstool.tv in line with Barstool's distinctive style.",
          "Exemplary Product Quality: Exceed user expectations by incorporating exceptional design to enhance the overall user experience.",
        ],
        paragraphs: [],
      },
      {
        title: "Research, Requirements, Stakeholders",
        paragraphs: [
          "The work began with research on all major streaming platforms: Netflix, Amazon Video, Hulu, and more. Detailed patterns were examined, including purchase flows and page load interactions such as content loading and display methods. Through this, we identified industry-standard functionality and mapped it to the needs of Barstool's unique customers.",
          "I also ensured that the design requirements listed in our product requirements document made sense, highlighting any discrepancies that needed further explanation or understanding.",
          "Internal stakeholders were identified early in the process to ensure frequent input. Aligning the Barstool team's vision for Barstool.tv was a priority from day one.",
        ],
      },
      {
        title: "Crafting a Customizable User Interface",
        paragraphs: [
          "At the outset, I cataloged prevalent design elements in well-known interfaces like Netflix and Hulu. I compiled a list of these elements, specifying those that needed integration with our proprietary CMS so stakeholders could customize the experience without engineering support.",
        ],
        media: [
          {
            alt: "Customizable UI component mapping",
            layout: "contained",
            aspect: "4 / 3",
          },
        ],
      },
      {
        title: "Laying the Foundation",
        paragraphs: [
          "I meticulously crafted user flows for a diverse range of use cases, leaving no stone unturned to uncover gaps, delineate interactions, and establish a rock-solid foundation for the design.",
        ],
        media: [
          {
            alt: "Pay-per-view user flows",
            layout: "contained",
            aspect: "16 / 10",
          },
        ],
      },
      {
        title: "Streamlined, User-Friendly, and Adaptable UI",
        paragraphs: [
          "The interface balanced Barstool's bold brand with the clarity users expect from premium streaming products. Every screen was designed to feel native to Barstool while supporting fast event setup on the internal side.",
        ],
        media: [
          {
            alt: "BarstoolTV interface screens",
            layout: "wide",
            aspect: "16 / 9",
          },
        ],
      },
      {
        title: "Results and Achievements",
        paragraphs: [
          "Platform Powerhouse: Developed a comprehensive pay-per-view platform complete with user authentication, payment processing, and an internal CMS backend. This backend empowers stakeholders to seamlessly integrate and manage assets, facilitating the swift creation, administration, and launch of pay-per-view events.",
          "Exceeding Expectations: The maiden voyage of Barstool.tv pay-per-view exceeded expectations, generating 40,000+ pay-per-view purchases. Internally, enthusiasm and excitement took hold, fueled by Barstool's substantial investments in live comedy within New York City.",
          "Whirlwind Event Launch: On Tuesday, August 15th, our team received a sudden request to support a pay-per-view event scheduled for the next night, the 20th-anniversary Barstool Sports Awards. This event was not originally supposed to be pay-per-view, but once leadership realized we had the capability, they decided to give it its first test. We managed to create assets, set up, and launch an entire pay-per-view event in under 24 hours.",
          "Versatile Content Hub: The platform now stands as the optimal channel for releasing paid comedy specials, Barstool events, and an array of compelling content.",
        ],
      },
    ],
  },
  {
    slug: "stella-blue",
    meta: {
      role: {
        title: "Senior UX / UI Designer",
        focus: "User Experience, Visual Design, User Flows, Research",
      },
      team: [
        { name: "Tucker Borgman", role: "PM" },
        { name: "Kat Gowin", role: "PM" },
        { name: "Joe Bona", role: "SWE" },
        { name: "Nick Morrison", role: "SWE" },
      ],
      timeline: "Designed and built in 8 weeks, launched November '22",
    },
    hero: {
      alt: "Stella Blue Coffee website hero",
      layout: "wide",
      aspect: "21 / 9",
    },
    overview: [
      { label: "Industry", value: "Retail" },
      { label: "Client", value: "Stella Blue Coffee" },
      { label: "Platform", value: "Web (Desktop/Mobile)" },
      { label: "Year", value: "2022" },
    ],
    overviewIntro: {
      title: "Overview",
      paragraphs: [
        "My approach was rooted in user-centered design, data-driven decisions, and seamless collaboration with stakeholders to conceive, design, and develop the website.",
      ],
    },
    sections: [
      {
        title: "Competitive Analysis and Research",
        paragraphs: [
          "My journey began by delving into comprehensive competitive research, where I meticulously examined coffee and DTC eCommerce landscapes, uncovering noteworthy trends, patterns, and key competitors.",
        ],
        bullets: [
          "The online coffee market is fiercely competitive, favoring vibrant, personalized brands.",
          "Subscriptions and bundles boost average order value and revenue compared to selling individual coffee bags.",
          "Some eCommerce experiences are overly complex; our aim was simplicity and user-friendliness.",
        ],
      },
      {
        title: "Designing User Pathways",
        paragraphs: [
          "For Stella Blue, we designed multiple coffee purchase paths. I created UX flows to identify gaps concurrently with wireframe development using FigJam.",
        ],
        media: [
          {
            alt: "Stella Blue purchase path flows",
            layout: "contained",
            aspect: "16 / 10",
          },
        ],
      },
      {
        title: "Brainstorming and Wireframing",
        paragraphs: [
          "Daily meetings with stakeholders involved brainstorming and refining ideas to chart the website's direction. We formulated key questions to guide our design:",
        ],
        bullets: [
          "How can we amplify Dan's appeal for users in an engaging manner?",
          "What strategies can simplify user entry into the subscription funnel?",
          "Balancing a light and fun vibe with a polished eCommerce experience, how can we achieve this synergy?",
        ],
      },
      {
        title: "Visual Exploration and Brand Identity",
        paragraphs: [
          "While pinpointing eCommerce needs, we collaborated with stakeholders to envision the brand's imagery for the website. I developed mood boards featuring coffee-related visuals that aligned with the site's direction and crafted a style guide that harmonized with both the coffee packaging art and modern web design standards.",
          "As we moved to the project's final stages, which included high-fidelity mockups, prototypes, and early development, our focus shifted from UX to UI. We had discussions on promoting our Coffee Club Subscription, improving our UI to highlight value propositions for better conversions, and other enhancements. As the experience evolved, we collaborated closely with developers to provide feedback as needed.",
        ],
        media: [
          {
            alt: "Stella Blue brand mood boards and style exploration",
            layout: "wide",
            aspect: "16 / 9",
          },
        ],
      },
      {
        title: "Putting It All Together",
        paragraphs: ["Key website successes:"],
        bullets: [
          "Engaging Video Header: Featuring a looping video of Dan, this header quickly captured users' attention and conveyed the brand's identity.",
          "User-Friendly Subscription Flow: A straightforward build-your-own subscription experience, minimizing friction for seamless checkout.",
          "Balancing Cartoon and Real Photography: Seamlessly integrated lighthearted cartoon branding with impactful real-world photography. We infused humor into the user experience for less serious elements, delighting users.",
        ],
        media: [
          {
            alt: "Stella Blue homepage and subscription flow",
            layout: "wide",
            aspect: "16 / 10",
          },
        ],
      },
      {
        title: "A Phenomenal Launch and Charitable Impact",
        paragraphs: [
          "The Stella Blue website launched in mid-November 2022, achieving the year-end revenue goal within 48 hours. A testament to combining great personalities, brand, design, and engineering.",
          "By the end of 2022, Stella Blue Coffee tripled its annual revenue goal, exclusively through the website, live for just a month and a half.",
          "Stella Blue has garnered outstanding reviews and maintains its strong performance. Personally, I take great pride in our partnership with PAWS Chicago, contributing a portion of our proceeds to support local dog adoption efforts in Chicago.",
        ],
      },
    ],
  },
];

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
            ", embracing AI, and building beyond my job description to become the most effective designer and builder I can be.",
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

export function getWorkItemBySlug(slug: string) {
  return recentWork.find((item) => item.id === slug);
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

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
      date: "Sep' 25",
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
            "I'm from Cincinnati. I eat cheese coneys. A lot. Twice a week for lunch, to the point where the servers know my order when I sit at the bar and I don't have to say anything.",
            "I thought it would be interesting to track my coney intake and go deep on learning how to build an end-to-end web app. So I did it.",
          ],
        },
        {
          title: "What it is & what I learned",
          paragraphs: [
            "It's exactly what it says. Eat coneys, snap a pic of the receipt, get credit for coneys eaten, track analytics, and earn achievements. There are even coney brand leaderboards. King of Skyline? King of Gold Star? See where you stack up.",
            "The project pushed me to learn a ton: Google auth, setting up and using a database, designing a suite of admin tools for user management, and the hardest part, image recognition. I tried not to route everything through AI and used OCR (optical character recognition) instead, which, as I learned, is very finicky.",
            "Friends and family used and tested it, but I paused to focus on the birth of my first child. The base app still exists. Maybe I'll pick it back up one day.",
          ],
        },
      ],
    },
  },
  {
    id: "mesh",
    title: "MESH",
    subtitle: "TD Strategy Game",
    image: "/MESH.png",
    detail: {
      date: "Mar' 26 - Present",
      status: {
        label: "In Development",
        tone: "active",
        icon: "play",
      },
      skills: [
        { label: "Systems Design", icon: "network" },
        { label: "Coding", icon: "layers" },
        { label: "3D Development", icon: "scan-eye" },
        { label: "Game & UI Design", icon: "pen-tool" },
      ],
      banner: "/mesh_banner.png",
      sections: [
        {
          title: "Why I build it",
          paragraphs: [
            "I'm the developer on MESH. I design it, code it, and ship it in my free time under Retrograde Interactive, with Jakie on writing and card design. As a product designer by day, this is where I get to own the whole stack, not just the interface.",
            "No roadmaps or stakeholders. I'm designing for fun, and that's the part I love most.",
          ],
        },
        {
          title: "What it pushes me on",
          paragraphs: [
            "MESH stretches me beyond product design: coding, 3D work, and systems design all in one project. I'm not mocking up behavior in Figma; I'm building it, breaking it, and feeling whether it actually works.",
            "It's a roguelike tower defense deckbuilder at its core. The design challenge is making complex systems feel clear, rewarding, and worth one more run.",
          ],
        },
        {
          title: "Where it's at",
          paragraphs: [
            "Alpha demo is live with two bosses on Windows and macOS. Still in development, with more sectors, deeper progression, and controller support on the way.",
          ],
        },
      ],
    },
  },
  {
    id: "sysmud",
    title: "Sysmud",
    subtitle: "In-browser MMO Experiment",
    image: "/sysmud.png",
    detail: {
      date: "Nov 26' - Jan 26'",
      status: {
        label: "In Development",
        tone: "active",
        icon: "play",
      },
      skills: [
        { label: "Art Design", icon: "pen-tool" },
        { label: "Complex Web Interactions", icon: "network" },
        { label: "Database Design", icon: "database" },
      ],
      banner: "/sysmud_banner.png",
      sections: [],
    },
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
