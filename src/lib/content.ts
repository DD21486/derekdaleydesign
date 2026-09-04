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
  | { type: "bold"; value: string }
  | { type: "link"; label: string; href: string };

export type CaseStudyParagraph = string | CaseStudyParagraphSegment[];

export type CaseStudyOverviewIntro = {
  title: string;
  paragraphs: CaseStudyParagraph[];
  media?: CaseStudyMedia[];
};

export type CaseStudySection = {
  title: string;
  paragraphs: CaseStudyParagraph[];
  bullets?: CaseStudyParagraph[];
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
  headline?: string;
  meta: CaseStudyMeta;
  overview: CaseStudyOverviewItem[];
  overviewIntro: CaseStudyOverviewIntro;
  hero?: CaseStudyMedia;
  sections: CaseStudySection[];
  summaryWatermark?: string;
  summaryAccent?: "red" | "blue";
  viewNext?: string;
};

const loremParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const loremParagraph2 =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "pantomath",
    headline: "Redesigning Lineage at Scale: A Pantomath Case Study",
    summaryAccent: "blue",
    meta: {
      role: {
        title: "Lead Product Designer",
        focus: "Lineage, Interaction Design, Prototyping",
      },
      team: [
        { name: "Aidan Zebertavage", role: "PM" },
        { name: "Sean Spade", role: "Dev" },
      ],
      timeline: "Spring 26'",
    },
    hero: {
      src: "/casestudy/lineage/Header.mp4",
      alt: "Final lineage graph: large pipeline with minimap visible",
      layout: "wide",
      caption: "Hero: final lineage graph at scale with minimap",
    },
    overview: [
      { label: "Industry", value: "Enterprise SaaS" },
      { label: "Client", value: "Pantomath" },
      { label: "Platform", value: "Web" },
      { label: "Year", value: "2026" },
    ],
    overviewIntro: {
      title: "Overview",
      paragraphs: [
        "Lineage is one of Pantomath's biggest differentiators. It's often what makes new users say \"that's cool\" the moment they see it. But Pantomath's customers are enterprise, and their pipelines are huge: sometimes thousands of assets.",
        "Lineage hadn't been redesigned since MVP. Years of patches had pushed it past its limits. We rebuilt it from the ground up: the experience, the interactions, and the rendering tech underneath.",
      ],
    },
    sections: [
      {
        title: "The Problem",
        paragraphs: [
          [
            { type: "bold", value: "Technical: " },
            {
              type: "text",
              value:
                "Large pipelines loaded slowly. The biggest ones sometimes didn't load at all.",
            },
          ],
          [
            { type: "bold", value: "Experiential: " },
            {
              type: "text",
              value:
                "Even when they loaded, pipelines were too dense to make sense of. Cool in a demo, useless in real work.",
            },
          ],
          "Fixing one without the other wouldn't work. The backend rebuild needed a UX layer designed for scale, and vice versa.",
        ],
        media: [
          {
            alt: "Small pipeline vs. enterprise-scale pipeline side by side",
            layout: "wide",
            aspect: "16 / 10",
            caption: "Demo-scale vs. enterprise-scale pipeline density",
          },
        ],
      },
      {
        title: "Research & Discovery",
        paragraphs: [
          "I ran focused feedback sessions with paying customers and enterprise teams to understand exactly how they used lineage and where it broke down. Findings were documented for the team to reference long-term.",
          "That last insight reframed the project. The fix wasn't just \"load faster.\" It was rethinking whether the full graph needed to render up front at all. Usually, it didn't.",
          [
            { type: "bold", value: "Metaplane" },
            {
              type: "text",
              value:
                ": strong column-level lineage, but lacks job transformation logic for the full picture.",
            },
          ],
          [
            { type: "bold", value: "BigEye" },
            {
              type: "text",
              value: ": comparably deep, but visually overwhelming.",
            },
          ],
          "Pantomath was already the more visual, lineage-forward option. Post Series-B, the company was also moving toward a broader platform, with lineage as the core everything else orbits around. The redesign needed to hold up as that centerpiece.",
        ],
        media: [
          {
            alt: "Research synthesis doc, blurred/redacted",
            layout: "contained",
            aspect: "4 / 3",
            caption: "Research synthesis artifact",
            afterParagraph: 0,
          },
          {
            src: "/casestudy/lineage/metaplane-bigeye.png",
            alt: "Metaplane and BigEye lineage views compared",
            layout: "wide",
            caption: "Competitive landscape: Metaplane vs. BigEye",
            afterParagraph: 3,
          },
        ],
        bullets: [
          [
            { type: "bold", value: "Lineage impresses at first, then loses value" },
            { type: "text", value: ": Build tooling for real, ongoing workflows" },
          ],
          [
            { type: "bold", value: "Full pipelines are neat but too big to analyze" },
            {
              type: "text",
              value: ": Add zoom, a Google Maps-style minimap, and platform grouping",
            },
          ],
          [
            { type: "bold", value: "Users lean on lineage to explain data to stakeholders" },
            { type: "text", value: ": Add export (image, CSV)" },
          ],
          [
            {
              type: "bold",
              value: "Users usually want one piece of a pipeline, not the whole thing",
            },
            { type: "text", value: ": Let users slice, filter, and focus" },
          ],
          [
            {
              type: "bold",
              value: "Large pipelines load slowly or not at all",
            },
            {
              type: "text",
              value: ": Question whether everything needs to load at once",
            },
          ],
        ],
      },
      {
        title: "Personas Identified",
        paragraphs: [
          "Research kept pointing to four roles. Authors and DREs used lineage as a daily tool. Managers and executives used it to explain, sell, and get oriented. Same graph, different jobs.",
          [
            { type: "bold", value: "Data Author" },
            {
              type: "text",
              value:
                ": builds and owns the pipelines. They open lineage to see how their work connects: upstream sources, downstream dependents, and what a change would break. The full graph impressed them once, then got too dense to think with. Authors needed to start from a single asset, slice to the piece they cared about, and understand a pipeline without drowning in it.",
            },
          ],
          [
            { type: "bold", value: "Data Reliability Engineer" },
            {
              type: "text",
              value:
                ": lives in incidents. When something fails, they need to trace impact fast: what broke, what's downstream, and who to tell. The old lineage either didn't load at enterprise scale or was too messy to investigate. DREs needed on-click loading in seconds, clearer tracing, a list view for scanning, and export so findings could leave the app and go into the incident thread.",
            },
          ],
          [
            { type: "bold", value: "Manager" },
            {
              type: "text",
              value:
                ": a secondary user, not in the graph every day. They show up for reviews, status conversations, and scope questions, and they inherit whatever Authors and DREs can produce. They needed a view that made sense at a glance and a way to take it with them: export to image or CSV, not another tour of a dense canvas.",
            },
          ],
          [
            { type: "bold", value: "CFO / CDO" },
            {
              type: "text",
              value:
                ": rarely a daily user, but often the buyer. Lineage is what gets shown in a sales cycle and in conversations about whether the platform is ready for enterprise scale. If it looks slow, dated, or broken on a real pipeline, the deal suffers. They needed the product to feel credible and world-class: fast on huge graphs, visually modern, something a champion could demo without apology.",
            },
          ],
        ],
        media: [
          {
            alt: "Persona grid: Author, DRE, Manager, CFO/CDO",
            layout: "contained",
            aspect: "16 / 10",
            caption: "Personas: Data Author, DRE, Manager, and CFO / CDO",
          },
        ],
      },
      {
        title: "Design Process",
        paragraphs: [
          "Finding the right rendering tech. Design and engineering iterated together:",
          [
            { type: "bold", value: "React Flow (HTML)" },
            {
              type: "text",
              value: ": hit performance limits at scale.",
            },
          ],
          [
            { type: "bold", value: "Sigma.js (WebGL)" },
            {
              type: "text",
              value: ": faster, but too rigid for the interactions we needed.",
            },
          ],
          [
            { type: "bold", value: "Reagraph (WebGL)" },
            {
              type: "text",
              value:
                ": closest fit. Our engineer forked it and rewrote much of it for our exact use case.",
            },
          ],
          "From sketch to shipped:",
          "Rough wireframes for the core mechanics: a lineage explorer, impact \"radius,\" tracing, and a Google Maps-style minimap.",
          "Looping demo videos to validate interactions early, before heavy engineering investment.",
          "High-fidelity prototypes, stress-tested against real large-scale pipeline data, not curated demo data.",
          "The through-line: let people see the whole picture without forcing them to process it all at once.",
        ],
        media: [
          {
            alt: "Tech exploration: React Flow, Sigma.js, Reagraph",
            layout: "wide",
            aspect: "16 / 9",
            caption: "Rendering tech exploration",
            afterParagraph: 0,
          },
          {
            alt: "Early wireframes: explorer, radius/tracing, minimap",
            layout: "wide",
            aspect: "16 / 10",
            caption: "Wireframe set: core mechanics",
          },
          {
            alt: "Looping demo GIF: early interactive prototype",
            layout: "contained",
            aspect: "16 / 10",
            caption: "Early interactive prototype demo",
          },
          {
            alt: "High-fidelity mockups: minimap, filtered view, export flow",
            layout: "wide",
            aspect: "16 / 9",
            caption: "High-fidelity mockups: final interaction patterns",
          },
        ],
      },
      {
        title: "The List View",
        paragraphs: [
          "Not every user wanted the graph at all. Some just wanted the data.",
          "We added a list view as a lightweight alternative to the graphical experience. No need to load the full visual graph just to look up or analyze a pipeline. Users start at a depth of 1 and expand outward, node by node, revealing more of the pipeline as needed instead of rendering everything up front.",
          "This turned out to be one of the most useful additions for analysis-heavy work: scanning, comparing, and exporting were all faster in list form than in the graph, especially for users who just needed the data, not the visualization.",
        ],
        media: [
          {
            alt: "List view at depth 1, then expanded several levels deeper",
            layout: "wide",
            aspect: "16 / 10",
            caption: "List view: depth 1 vs. expanded",
            afterParagraph: 1,
          },
          {
            alt: "List view demo: expanding depth and exporting to CSV",
            layout: "contained",
            aspect: "16 / 10",
            caption: "List view demo: expand and export",
          },
        ],
        bullets: [
          [
            { type: "bold", value: "Depth-based expansion" },
            {
              type: "text",
              value: ": start narrow, expand outward only as far as needed.",
            },
          ],
          [
            { type: "bold", value: "No graph load required" },
            {
              type: "text",
              value: ": instant, lightweight way to explore a pipeline.",
            },
          ],
          [
            { type: "bold", value: "Built for analysis" },
            {
              type: "text",
              value: ": easier to scan and compare than a dense visual graph.",
            },
          ],
          [
            { type: "bold", value: "Export-friendly" },
            {
              type: "text",
              value:
                ": pairs naturally with CSV export for reporting and deeper analysis.",
            },
          ],
        ],
      },
      {
        title: "The Solution",
        paragraphs: [],
        bullets: [
          "On-click loading for 100% of pipelines, in under 5 seconds.",
          "Minimap + grouping by platform, so users orient before zooming in.",
          "Slice-and-dice tools to investigate one part of a pipeline without loading the whole thing.",
          "List view as a graph-free alternative, built for fast analysis and export.",
          "Export to image and CSV, so lineage can leave the app.",
          "Visual refresh to feel modern and world-class, not just functional.",
        ],
        media: [
          {
            alt: "Final demo: large pipeline, minimap, zoom, slice, export",
            layout: "wide",
            aspect: "21 / 9",
            caption: "Final demo: open, orient, zoom, slice, export",
          },
          {
            alt: "Feature callout strip: minimap, slice/filter, export",
            layout: "wide",
            aspect: "16 / 6",
            caption: "Feature highlights: minimap, slice & filter, export",
          },
        ],
      },
      {
        title: "Results",
        paragraphs: [],
        bullets: [
          "100% of pipelines load on click, in under 5 seconds, including ones that previously failed to load at all.",
          "Clearer, more direct control for users exploring lineage. Search and filtering replaced passive browsing.",
          "Lineage went from a one-time \"wow\" to a tool teams actually return to for investigation, stakeholder conversations, and incident analysis.",
        ],
        media: [
          {
            alt: "Before and after: old lineage view vs. redesigned experience",
            layout: "wide",
            aspect: "16 / 10",
            caption: "Before / after: the payoff",
          },
        ],
      },
    ],
  },
  {
    slug: "barstool",
    viewNext: "pantomath",
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
        title: "North Star Design Principles",
        bullets: [
          [
            { type: "bold", value: "Simplicity: " },
            {
              type: "text",
              value: "People want to purchase and watch with zero friction.",
            },
          ],
          [
            { type: "bold", value: "Consistency: " },
            {
              type: "text",
              value:
                "Barstool.tv's previous look and feel weren't up to par with where the Barstool brand was at the time. Take this opportunity to aesthetically improve the platform and apply design systems thinking to future-proof it.",
            },
          ],
          [
            { type: "bold", value: "Industry Standards: " },
            {
              type: "text",
              value:
                "Purchasing and watching pay-per-view content doesn't need a reinvention. Make sure our experience is familiar and consistent with industry-standard practices, and based on strong UX fundamentals.",
            },
          ],
        ],
        paragraphs: [],
      },
      {
        title: "Research, Requirements, Stakeholders",
        paragraphs: [
          [
            { type: "bold", value: "Competitive Analysis: " },
            {
              type: "text",
              value:
                "The work began with research on all major streaming platforms: Netflix, Amazon Video, Hulu, and more. Detailed patterns were examined, including purchase flows and page load interactions such as content loading and display methods. Through this, we identified industry-standard functionality and mapped it to the needs of Barstool's unique customers.",
            },
          ],
          [
            { type: "bold", value: "User Research: " },
            {
              type: "text",
              value:
                "We interviewed multiple Barstool viewers and discovered that the majority of PPV purchases happen within 30 minutes of a scheduled release. As social media channels start to promote events, fomo spikes. When that fomo spikes, it's that moment we have to capitalize. Any friction could lose a sale.",
            },
          ],
          [
            { type: "text", value: "This means " },
            { type: "bold", value: "simplicity" },
            {
              type: "text",
              value:
                " was the most important aspect when thinking about the UI design of the experience, as well as the purchase flow. Users should be able to purchase a PPV event ",
            },
            { type: "bold", value: "in as few clicks as possible" },
            { type: "text", value: "." },
          ],
          "I also ensured that the design requirements listed in the PRD aligned with our research and the technical constraints involved in designing text and image slots that our internal CMS could populate on the template.",
        ],
        media: [
          {
            src: "/casestudy/barstooltv/video_streamingBar.png",
            alt: "Video streaming platform UI patterns comparison",
            layout: "contained",
            afterParagraph: 0,
          },
        ],
      },
      {
        title: "Crafting a Customizable User Interface",
        paragraphs: [
          "At the outset, I cataloged prevalent design elements in well-known interfaces like Netflix and Hulu. I compiled a list of these elements, specifying those that needed integration with our proprietary CMS so stakeholders could customize the experience without engineering support.",
        ],
        media: [
          {
            src: "/casestudy/barstooltv/barstooltv_customizableInterface.png",
            alt: "Customizable UI component mapping",
            layout: "contained",
          },
        ],
      },
      {
        title: "Laying the Foundation",
        paragraphs: [
          "I meticulously crafted user flows for a diverse range of use cases, including time-gated user purchase flows. What did it feel like when a user wanted to buy a PPV event last minute? How quickly could they get through the payment flow? How quickly could they find what they were looking for?",
          "For our internal users, the ones creating the events, I also mapped out flows. How fast could we get a PPV event live? What was the most complicated part of setting up an event, and how could I help simplify it?",
          "I left no stone unturned to uncover gaps, delineate interactions, and establish a rock-solid foundation for the design.",
        ],
        media: [
          {
            src: "/casestudy/barstooltv/Barstooltv_foundation.png",
            alt: "Pay-per-view user flows",
            layout: "contained",
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
            src: "/casestudy/barstooltv/BarstoolTV_Streamlined.png",
            alt: "BarstoolTV interface screens",
            layout: "wide",
          },
        ],
      },
      {
        title: "Results and Achievements",
        paragraphs: [
          [
            { type: "bold", value: "Platform Powerhouse: " },
            {
              type: "text",
              value:
                "Developed a comprehensive pay-per-view platform complete with user authentication, payment processing, and an internal CMS backend. This backend empowers stakeholders to seamlessly integrate and manage assets, facilitating the swift creation, administration, and launch of pay-per-view events.",
            },
          ],
          [
            { type: "bold", value: "Exceeding Expectations: " },
            {
              type: "text",
              value:
                "The maiden voyage of Barstool.tv pay-per-view exceeded expectations, generating 40,000+ pay-per-view purchases. Internally, enthusiasm and excitement took hold, fueled by Barstool's substantial investments in live comedy within New York City.",
            },
          ],
          [
            { type: "bold", value: "Whirlwind Event Launch: " },
            {
              type: "text",
              value:
                "On Tuesday, August 15th, our team received a sudden request to support a pay-per-view event scheduled for the next night, the 20th-anniversary Barstool Sports Awards. This event was not originally supposed to be pay-per-view, but once leadership realized we had the capability, they decided to give it its first test. We managed to create assets, set up, and launch an entire pay-per-view event in under 24 hours.",
            },
          ],
          [
            { type: "bold", value: "Versatile Content Hub: " },
            {
              type: "text",
              value:
                "The platform now stands as the optimal channel for releasing paid comedy specials, Barstool events, and an array of compelling content.",
            },
          ],
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
        title: "User Discovery",
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
    title: "Graphical Lineage",
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

export type HobbyTool = {
  label: string;
  icon?: string;
};

export type HobbySectionBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "cta"; label: string; href: string };

export type HobbyProjectDetail = {
  date: string;
  status: {
    label: string;
    tone: HobbyProjectStatus;
    icon: HobbyIconName;
  };
  skills: HobbySkill[];
  tools: HobbyTool[];
  banner: string;
  sections: {
    title?: string;
    paragraphs?: string[];
    image?: {
      src: string;
      alt: string;
    };
    blocks?: HobbySectionBlock[];
  }[];
};

export type HobbyProject = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  detail?: HobbyProjectDetail;
};

const hobbyToolIconPaths: Partial<Record<string, string>> = {
  Cursor: "/icons/cursor.svg",
  Claude: "/icons/claude.svg",
  ChatGPT: "/icons/chatgpt.svg",
  Figma: "/icons/figma.svg",
  Illustrator: "/icons/illustrator.svg",
  Neon: "/icons/neon.svg",
  Photoshop: "/icons/photoshop.svg",
  Blender: "/icons/blender.svg",
  Godot: "/icons/godot.svg",
  Aesprite: "/icons/aesprite.svg",
};

function hobbyTool(label: string): HobbyTool {
  const icon = hobbyToolIconPaths[label];
  return icon ? { label, icon } : { label };
}

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
      tools: [
        "Cursor",
        "Claude",
        "ChatGPT",
        "Figma",
        "Illustrator",
        "Neon",
      ].map(hobbyTool),
      banner: "/coney_counter_banner.png",
      sections: [
        {
          title: "Why I built it",
          paragraphs: [
            "I'm from Cincinnati. I eat cheese coneys. A lot. Twice a week for lunch, to the point where the servers know my order when I sit at the bar and I don't have to say anything.",
            "I thought it would be interesting to track my coney intake and go deep on learning how to build an end-to-end web app. So I did it.",
          ],
          image: {
            src: "/hobby/coneycounter_1.png",
            alt: "Coney Counter app overview",
          },
        },
        {
          title: "What it is & what I learned",
          paragraphs: [
            "It's exactly what it says. Eat coneys, snap a pic of the receipt, get credit for coneys eaten, track analytics, and earn achievements. There are even coney brand leaderboards. King of Skyline? King of Gold Star? See where you stack up.",
            "The project pushed me to learn a ton: Google auth, setting up and using a database, designing a suite of admin tools for user management, and the hardest part, image recognition. I tried not to route everything through AI and used OCR (optical character recognition) instead, which, as I learned, is very finicky.",
            "Friends and family used and tested it, but I paused to focus on the birth of my first child. The base app still exists. Maybe I'll pick it back up one day.",
          ],
          image: {
            src: "/hobby/coneycounter_2.png",
            alt: "Coney Counter tracking and analytics",
          },
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
      tools: [
        "Cursor",
        "Claude",
        "Figma",
        "Photoshop",
        "Illustrator",
        "Blender",
        "Godot",
      ].map(hobbyTool),
      banner: "/mesh_banner.png",
      sections: [
        {
          title: "Why I'm Building It",
          blocks: [
            {
              type: "paragraph",
              text: "I've always been around video games. I watched my older brother play them, that led to me playing them. I grew up in the golden age of video games. I always wanted to create my own.",
            },
            {
              type: "image",
              src: "/hobby/MESH_3.png",
              alt: "Early MESH prototype",
            },
            {
              type: "paragraph",
              text: "As my skills started growing, I realized that I may be able to. In 2020 I created a small prototype, handwritten code, took forever, but it was thrilling. I then moved to NYC and paused that dream.",
            },
            {
              type: "paragraph",
              text: "Fast forward to 2026, I have been using AI to create tons of prototypes, and I finally found the idea for MESH and ran with it. In my free time, I don't even play games anymore, I just create them.",
            },
            {
              type: "image",
              src: "/hobby/MESH_1.png",
              alt: "MESH gameplay screenshot",
            },
            {
              type: "paragraph",
              text: "It pushes my design skills in ways I never realized and in a lot of ways past just design. Roadmapping, designing end to end, coding and launching a game solo has reignited my passion for design in ways I never realized. Building a game is being laser focused on the user and experience.",
            },
            {
              type: "image",
              src: "/hobby/MESH_2.png",
              alt: "MESH UI and systems design",
            },
            {
              type: "paragraph",
              text: "You can learn more about MESH on itch.io.",
            },
            {
              type: "cta",
              label: "Learn More about MESH",
              href: "https://retrogradeinteractive.itch.io/mesh",
            },
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
        label: "Paused",
        tone: "paused",
        icon: "pause",
      },
      skills: [
        { label: "Art Design", icon: "pen-tool" },
        { label: "Complex Web Interactions", icon: "network" },
        { label: "Database Design", icon: "database" },
      ],
      tools: ["Cursor", "Claude", "Figma", "Aesprite", "Neon"].map(hobbyTool),
      banner: "/sysmud_banner.png",
      sections: [
        {
          title: "Why I built it",
          blocks: [
            {
              type: "paragraph",
              text: "Sysmud came about when I was on paternity leave and wanted to create a retro-style video game right in the browser. At first it was single player, but I wanted to push myself a bit on how to design/implement a database solution for a game where every action is saved.",
            },
            {
              type: "image",
              src: "/hobby/sysmud1.png",
              alt: "Sysmud gameplay screenshot",
            },
            {
              type: "image",
              src: "/hobby/sysmud2.png",
              alt: "Sysmud world exploration screenshot",
            },
            {
              type: "paragraph",
              text: "It's a fully playable game with creatures to fight, sounds, gear to find, and a small world to explore. If you want to check it out, you can play it by visiting the temporary link below.",
            },
            {
              type: "cta",
              label: "Test out SYSMUD",
              href: "https://sysmud.vercel.app/login.html",
            },
          ],
        },
      ],
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

export type LifeGraphNode = {
  id: string;
  title: string;
  tooltipTitle?: string;
  year: string;
  description: string;
  image?: string;
  x: number;
  y: number;
  primary?: boolean;
};

export type LifeGraphEdge = {
  from: string;
  to: string;
};

export const lifeGraphContent = {
  nodes: [
    {
      id: "college-years",
      title: "College Years",
      year: "2012",
      description:
        "Attend Northern Kentucky University, getting involved in startup and on-campus organizations.",
      image: "/about/daley_img_topleft_square.png",
      x: 120,
      y: 260,
      primary: true,
    },
    {
      id: "web-editor",
      title: "Web Editor",
      tooltipTitle: "Web Editor @ The Northerner",
      year: "2012–2014",
      description:
        "Spend 2 years during school as the Web Editor @ The Northerner, NKU's student newspaper. Built websites and interactive web media for a variety of stories. Won multiple-state awards.",
      image: "/about/daley_img_midleft_square.png",
      x: 220,
      y: 120,
    },
    {
      id: "startup-founder",
      title: "Startup",
      tooltipTitle: "Startup Founder",
      year: "2013–2015",
      description:
        "Came up with a startup idea, pitched, and won first place in a state wide competition earning $5k in seed funding. Worked to bring the idea to life for two years before calling it.",
      image: "/about/daley_img_botmid_square.png",
      x: 240,
      y: 400,
    },
    {
      id: "graduate",
      title: "Graduate",
      year: "2016",
      description:
        "Graduate with a Ba. of Arts in Media Informatics. Finish up college with an offer waiting to join CompleteSet.",
      image: "/about/daley_img_middle_square.png",
      x: 320,
      y: 280,
      primary: true,
    },
    {
      id: "completeset",
      title: "CompleteSet",
      year: "2017",
      description:
        "Worked as a Visual Specialist out of college at a fast paced startup, doing everything from design, to marketing, to photography.",
      image: "/about/daley_img_midtop_vertical.png",
      x: 520,
      y: 280,
      primary: true,
    },
    {
      id: "kroger-contractor",
      title: "The Kroger Co. (Contractor)",
      year: "2018",
      description:
        "Joined The Kroger Co. as a contracting UI designer, designing experiences for millions of users daily.",
      image: "/about/daley_img_mdiright_vertical.png",
      x: 720,
      y: 280,
      primary: true,
    },
  ] satisfies LifeGraphNode[],
  edges: [
    { from: "college-years", to: "graduate" },
    { from: "college-years", to: "web-editor" },
    { from: "college-years", to: "startup-founder" },
    { from: "graduate", to: "completeset" },
    { from: "completeset", to: "kroger-contractor" },
  ] satisfies LifeGraphEdge[],
};
