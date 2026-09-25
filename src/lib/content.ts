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

export type CaseStudyMediaLayout =
  | "contained"
  | "wide"
  | "wide-pair"
  | "slider"
  | "logo-cluster";

export type CaseStudyMediaItem = {
  src?: string;
  alt: string;
  aspect?: string;
};

export type CaseStudyMedia = {
  src?: string;
  alt: string;
  layout: CaseStudyMediaLayout;
  aspect?: string;
  afterParagraph?: number;
  beforeContent?: boolean;
  beforeTitle?: boolean;
  items?: CaseStudyMediaItem[];
};

export type CaseStudyOverviewItem = {
  label: string;
  value: string;
};

export type CaseStudyParagraphSegment =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; label: string; href: string };

export type CaseStudySubheading = { type: "subheading"; value: string };

export type CaseStudyNote = { type: "note"; value: string };

export type CaseStudyParagraph =
  | string
  | CaseStudyParagraphSegment[]
  | CaseStudySubheading
  | CaseStudyNote;

export type CaseStudyOverviewIntro = {
  title: string;
  paragraphs: CaseStudyParagraph[];
  media?: CaseStudyMedia[];
};

export type CaseStudyPersona = {
  title: string;
  image: string;
  imageAlt: string;
  needs: string[];
};

export type CaseStudyBulletItem = {
  title: string;
  description: string;
  icon?: string;
};

export type CaseStudyBullet = CaseStudyParagraph | CaseStudyBulletItem;

export type CaseStudySection = {
  title: string;
  paragraphs: CaseStudyParagraph[];
  bullets?: CaseStudyBullet[];
  personas?: CaseStudyPersona[];
  media?: CaseStudyMedia[];
  iconSrc?: string;
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
    viewNext: "stella-blue",
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
          { type: "subheading", value: "Technical" },
          "Large pipelines loaded slowly. The biggest ones sometimes didn't load at all.",
          { type: "subheading", value: "Experiential" },
          "Even when they loaded, pipelines were too dense to make sense of. Cool in a demo, useless in real work.",
          { type: "subheading", value: "Lack of Tooling" },
          "Users found it difficult to slice a large graph and find the set of assets they needed. The full pipeline was the only view.",
          {
            type: "note",
            value:
              "Fixing one without the other wouldn't work. The backend rebuild needed a UX layer designed for scale, and vice versa.",
          },
        ],
        media: [
          {
            src: "/casestudy/lineage/demovsproduction_scale.png",
            alt: "Small pipeline vs. enterprise-scale pipeline side by side",
            layout: "wide",
          },
        ],
      },
      {
        title: "Research & Discovery",
        paragraphs: [
          "I ran focused feedback sessions with paying customers and enterprise teams to understand exactly how they used lineage and where it broke down. Findings were documented for the team to reference long-term.",
          "That last insight reframed the project. The fix wasn't just \"load faster.\" It was rethinking whether the full graph needed to render up front at all. Usually, it didn't.",
          { type: "subheading", value: "Competitive Analysis" },
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
            src: "/casestudy/lineage/metaplane-bigeye.png",
            alt: "Metaplane and BigEye lineage views compared",
            layout: "wide",
            afterParagraph: 4,
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
        ],
        personas: [
          {
            title: "Data Author",
            image: "/casestudy/lineage/dataauthor.png",
            imageAlt: "Data Author persona",
            needs: [
              "Start from a single asset and slice to what matters",
              "See upstream and downstream without drowning in the full graph",
              "Understand what a change would break before shipping it",
            ],
          },
          {
            title: "Data Reliability Engineer",
            image: "/casestudy/lineage/datareliabilityeng.png",
            imageAlt: "Data Reliability Engineer persona",
            needs: [
              "On-click loading in seconds, even at enterprise scale",
              "Clear tracing to investigate incidents fast",
              "List view and export to share findings in the incident thread",
            ],
          },
          {
            title: "Manager",
            image: "/casestudy/lineage/datamanager.png",
            imageAlt: "Manager persona",
            needs: [
              "A view that makes sense at a glance",
              "Export to image or CSV for reviews and status conversations",
              "Output they can share without navigating a dense canvas",
            ],
          },
          {
            title: "CFO / CDO",
            image: "/casestudy/lineage/CFO_CDO.png",
            imageAlt: "CFO / CDO persona",
            needs: [
              "Fast, credible performance on real large-scale pipelines",
              "A visually modern experience for sales demos",
              "Something a champion can show without apology",
            ],
          },
        ],
      },
      {
        title: "Design Process",
        paragraphs: [
          { type: "subheading", value: "Working with Engineering" },
          "I had early discussions with engineering to find the right rendering tech and understand which solution they wanted to pursue, so I could design within real technical limitations instead of assumptions.",
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
          { type: "subheading", value: "Wireframing" },
          "Rough wireframes for the core mechanics: a lineage explorer, impact \"radius,\" tracing, and a Google Maps-style minimap.",
          { type: "subheading", value: "Prototyping" },
          "I built soft Figma prototypes to demonstrate key functionality for the lineage rework, validating user control flows.",
        ],
        media: [
          {
            src: "/casestudy/lineage/lineage_wireframing.png",
            alt: "Early wireframes: explorer, radius/tracing, minimap",
            layout: "wide",
            afterParagraph: 6,
          },
          {
            alt: "Early interactive prototype demos",
            layout: "wide-pair",
            items: [
              {
                src: "/casestudy/lineage/prototype1_expandinglineage.mp4",
                alt: "Expanding lineage from a single source",
              },
              {
                src: "/casestudy/lineage/prototype2_walkinglineage.mp4",
                alt: "Walking Lineage concept",
              },
            ],
            afterParagraph: 8,
          },
        ],
      },
      {
        title: "Claude Code Prototyping",
        iconSrc: "/icons/claude.svg",
        paragraphs: [
          "I built a Lineage Prototyping Sandbox with Claude Code where I could ship real, functional changes to lineage and evaluate how they felt and performed, not just how they looked in a mockup. I worked against actual demo data from our demo environment, so the scale felt honest instead of completely fabricated.",
        ],
        media: [
          {
            src: "/casestudy/lineage/lineage_sandbox_vid.mp4",
            alt: "Lineage Prototyping Sandbox demo in Claude Code",
            layout: "wide",
          },
        ],
      },
      {
        title: "Key Decisions & Compromises",
        paragraphs: [],
        bullets: [
          {
            title: "No full-picture loads by default",
            description:
              "Shifting from a large, beautiful full pipeline to one asset and its immediate dependencies took stakeholder convincing, but it was what users actually wanted and it fixed our two biggest issues: pipelines crashing on load, and users feeling overwhelmed when entering the lineage experience. It was a fundamental UX change that required long conversations with leadership to get everyone aligned.",
          },
          {
            title: "Simplified UI",
            description:
              "Load times had to stay fast and snappy. We avoided render-intensive treatments in the UI, or used them only when intentional: drop shadows, images, icons, and the like.",
          },
          {
            title: "Three tools, not five",
            description:
              "We originally assumed lineage needed 5+ tools for users to get value. Research narrowed it to three key tools that had to ship. We cut the rest on the premise that if users needed them badly, we'd hear about it. Trimming scope to something manageable paid off, as the simplified experience resonated with users.",
          },
        ],
      },
      {
        title: "Solution & Results",
        paragraphs: [],
        bullets: [
          {
            title: "Enterprise-scale performance",
            description:
              "100% of pipelines load on click in under 5 seconds across all customers, including the mega-pipelines which had previously failed to load at all.",
          },
          {
            title: "Orient before you zoom",
            description:
              "Minimap and platform grouping give users context before they dive into the graph.",
          },
          {
            title: "Focus without the full load",
            description:
              "A curated set of slice-and-dice tools and a list view let users explore one part of a pipeline without rendering everything upfront.",
          },
          {
            title: "Built for real persona-based workflows",
            description:
              "Lineage was redesigned around personas and how they actually work, not flashiness and sales demos. Search, filtering, and export replaced passive browsing, turning it from something champions showed in deals into a tool teams used day to day.",
          },
          {
            title: "From demo to daily tool",
            description:
              "Lineage went from a one-time \"wow\" to something teams actually return to for investigation, stakeholder conversations, and incident analysis.",
          },
          {
            title: "World-class feel",
            description:
              "A visual refresh that holds up in sales demos and enterprise evaluations, not just internal testing.",
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
        title: "Senior UX / UI Designer",
        focus:
          "User Experience, Interaction Design, Visual Design, User Flows, Research",
      },
      team: [
        { name: "Tucker Borgman", role: "PM" },
        { name: "Mike Nichols", role: "SWE" },
        { name: "Darren Carlin", role: "SWE" },
      ],
      timeline: "Designed and built in 6 weeks, debuted August 22'",
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
      { label: "Year", value: "2022" },
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
        paragraphs: [],
        bullets: [
          {
            title: "Platform Powerhouse",
            description:
              "Developed a comprehensive pay-per-view platform complete with user authentication, payment processing, and an internal CMS backend. This backend empowers stakeholders to seamlessly integrate and manage assets, facilitating the swift creation, administration, and launch of pay-per-view events.",
          },
          {
            title: "Exceeding Expectations",
            description:
              "The maiden voyage of Barstool.tv pay-per-view exceeded expectations, generating 40,000+ pay-per-view purchases. Internally, enthusiasm and excitement took hold, fueled by Barstool's substantial investments in live comedy within New York City.",
          },
          {
            title: "Whirlwind Event Launch",
            description:
              "On Tuesday, August 15th, our team received a sudden request to support a pay-per-view event scheduled for the next night, the 20th-anniversary Barstool Sports Awards. This event was not originally supposed to be pay-per-view, but once leadership realized we had the capability, they decided to give it its first test. We managed to create assets, set up, and launch an entire pay-per-view event in under 24 hours.",
          },
          {
            title: "Versatile Content Hub",
            description:
              "The platform now stands as the optimal channel for releasing paid comedy specials, Barstool events, and an array of compelling content.",
          },
        ],
      },
    ],
  },
  {
    slug: "stella-blue",
    viewNext: "barstool",
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
      timeline: "Designed and built in 8 weeks, launched late October 2023",
    },
    hero: {
      src: "/casestudy/stellablue/StellaBlue_Background_LowDataSize.mp4",
      alt: "Stella Blue Coffee website hero",
      layout: "wide",
      aspect: "16 / 9",
    },
    overview: [
      { label: "Industry", value: "Ecomm" },
      { label: "Client", value: "Barstool Sports" },
      { label: "Platform", value: "Web (Desktop/Mobile)" },
      { label: "Year", value: "2023" },
    ],
    overviewIntro: {
      title: "Overview",
      paragraphs: [
        "Stella Blue needed a DTC website from zero. The brand is Dan \"Big Cat\" Katz and Barstool Sports, so much of the traffic would land from social and buy on impulse. The same site had to earn trust from coffee buyers who are skeptical of a personality brand. Coffee Club, not the single bag, had to be the main way to purchase.",
        "The site launched in late October 2023. It hit the year-end revenue goal within 48 hours. About six weeks later, Stella Blue had tripled its annual revenue goal, entirely through the website.",
      ],
    },
    sections: [
      {
        title: "What Research Changed",
        media: [
          {
            alt: "Competitor coffee logos",
            layout: "logo-cluster",
            beforeTitle: true,
            items: [
              {
                src: "/casestudy/stellablue/bluebottlecoffee_logo.png",
                alt: "Blue Bottle Coffee",
              },
              {
                src: "/casestudy/stellablue/chamberlaincoffee_logo.png",
                alt: "Chamberlain Coffee",
              },
              {
                src: "/casestudy/stellablue/stumptown_coffeelogo.png",
                alt: "Stumptown Coffee Roasters",
              },
              {
                src: "/casestudy/stellablue/blackriflecoffee_logo.png",
                alt: "Black Rifle Coffee Company",
              },
            ],
          },
        ],
        paragraphs: [
          "Competitive research changed three decisions. The rest of the work follows from them.",
        ],
        bullets: [
          {
            title: "Subscriptions Carry the Business",
            icon: "layers",
            description:
              "Subscriptions and bundles beat one-off bags on order value. Coffee Club had to be a primary path on the site, not a link in the footer.",
          },
          {
            title: "Personality Is Not Proof",
            icon: "target",
            description:
              "A recognizable brand wins the first click. It loses the coffee skeptic unless sourcing, flavor, and charity are specific on the page.",
          },
          {
            title: "Social Traffic Has No Patience",
            icon: "sparkles",
            description:
              "Most coffee sites ask too much of someone buying from a post. Purchase paths and checkout had to be obvious immediately.",
          },
        ],
      },
      {
        title: "The On-the-Go User",
        paragraphs: [
          "This shopper is already on social, sees Dan or the brand, and is ready to buy. The job was to get them into a purchase without making them hunt.",
          "The header is a looping video of Dan (see top of case study), so the brand is clear in the first second. Shop and Coffee Club sit in view with that video. Gifting is a third path, still simple, for someone buying for a fan rather than for themselves.",
        ],
        media: [
          {
            src: "/casestudy/stellablue/mobilemmocks.png",
            alt: "Stella Blue mobile mocks",
            layout: "wide",
          },
          {
            src: "/casestudy/stellablue/StellaGiftTable.png",
            alt: "Stella Blue gift table",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Coffee Enthusiast",
        paragraphs: [
          "This shopper likes coffee and does not trust a personality brand yet. They need the finer details before they will buy.",
          "The product page states where the beans come from, how the coffee tastes, and exactly what the charity contribution is. Those details are the social proof. Humor stays in the brand, not in the facts.",
        ],
        media: [
          {
            src: "/casestudy/stellablue/StellaPDP.png",
            alt: "Stella Blue product detail page",
            layout: "wide",
          },
        ],
      },
      {
        title: "The Subscriber",
        paragraphs: [
          "This shopper wants coffee on a schedule and does not want to rebuild the order every time. Price and what is included have to be obvious.",
          "Coffee Club is a primary path from the homepage, not a footer link. The flow lets them choose coffees, see the price, and subscribe. Customization is there. The decision is not repeated on every delivery.",
        ],
        media: [
          {
            src: "/casestudy/stellablue/StellaCoffeeClubSelection.png",
            alt: "Stella Blue Coffee Club selection",
            layout: "wide",
          },
          {
            alt: "Stella Blue brand system",
            layout: "wide-pair",
            items: [
              {
                src: "/casestudy/stellablue/StellaBlue_Brand1.png",
                alt: "Stella Blue logo variations",
              },
              {
                src: "/casestudy/stellablue/StellaBlue_Brand2.png",
                alt: "Stella Blue Coffee Club colors",
              },
            ],
          },
        ],
      },
      {
        title: "Launch and Charitable Impact",
        paragraphs: [
          "Stella Blue has held up since launch, with strong reviews and a real charity commitment. A portion of proceeds supports local dog adoption in Chicago through PAWS Chicago.",
        ],
        bullets: [
          {
            title: "Year-End Goal, Then Triple",
            icon: "trophy",
            description:
              "The site launched in late October 2023 and hit the year-end revenue goal within 48 hours. By the end of 2023 it had tripled the annual goal, after about a month and a half live, with every sale coming through the site.",
          },
          {
            title: "Building a Brand That Lasts",
            icon: "sparkles",
            description:
              "Stella Blue is still a highly profitable brand for the Barstool family of brands.",
          },
          {
            title: "A Partnership That Held",
            icon: "heart",
            description:
              "Reviews stayed strong after launch. A portion of proceeds still supports local dog adoption in Chicago through PAWS Chicago.",
          },
        ],
        media: [
          {
            alt: "Stella Blue launch impact slides",
            layout: "slider",
            beforeContent: true,
            items: [
              { src: "/casestudy/stellablue/slide_1.png", alt: "Stella Blue launch slide 1" },
              { src: "/casestudy/stellablue/slide_2.png", alt: "Stella Blue launch slide 2" },
              { src: "/casestudy/stellablue/slide_3.png", alt: "Stella Blue launch slide 3" },
              { src: "/casestudy/stellablue/slide_4.png", alt: "Stella Blue launch slide 4" },
              { src: "/casestudy/stellablue/slide_5.png", alt: "Stella Blue launch slide 5" },
              { src: "/casestudy/stellablue/slide_6.png", alt: "Stella Blue launch slide 6" },
              { src: "/casestudy/stellablue/slide_7.png", alt: "Stella Blue launch slide 7" },
              { src: "/casestudy/stellablue/slide_8.png", alt: "Stella Blue launch slide 8" },
            ],
          },
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
  location: "Cincy",
  secondaryLocation: "ATX",
  avatar: "/derek_portrait_1_small.png",
  avatarHover: "/baby_derek.png",
};

export const bio = {
  intro: [
    {
      segments: [
        { type: "text", value: "Currently design lead & design engineer at " },
        { type: "company", company: companies.pantomath },
        { type: "muted", value: " (Seed→Series B | $10M+ ARR growth)" },
        {
          type: "text",
          value:
            ". I design tools and AI experiences that automate data operations at enterprise scale. I design in code daily, ship straight to production, and own product, marketing, and brand end-to-end as the only designer.",
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
    date: "August 22'",
    folders: barstoolFolders,
  },
  {
    id: "stella-blue",
    title: "Stella Blue",
    company: "Stella Blue",
    date: "Fall 23'",
    folders: stellaBlueFolders,
  },
];

export type SelectedWorkItem = {
  id: string;
  metric: string;
  metricLabel: string;
  outcome: string;
  description: string;
  company: string;
  role: string;
  year: string;
  image: string;
  imageAlt: string;
};

export const selectedWork: SelectedWorkItem[] = [
  {
    id: "pantomath",
    metric: "<5s",
    metricLabel: "Load time",
    outcome:
      "Lineage at Pantomath took 30+ seconds to load and lacked useful tools. Pipelines now open in under 5 seconds.",
    description: "Redesigning a technical tool while decreasing load times",
    company: "Pantomath",
    role: "Lead Product Designer",
    year: "2026",
    image: "/casestudy/lineage/demovsproduction_scale.png",
    imageAlt: "Demo-scale lineage beside an enterprise-scale pipeline",
  },
  {
    id: "stella-blue",
    metric: "3×",
    metricLabel: "Revenue",
    outcome: "Creating an on-brand coffee DTC experience from scratch.",
    description: "Hitting 3x revenue goal in 48 hrs",
    company: "Stella Blue",
    role: "Senior UX / UI Designer",
    year: "2023",
    image: "/casestudy/stellablue/mobilemmocks.png",
    imageAlt: "Stella Blue mobile shop, Coffee Club, and product page",
  },
  {
    id: "barstool",
    metric: "40k+",
    metricLabel: "Purchases",
    outcome:
      "Designing a net-new pay-per-view offering for the largest media family of brands in the world.",
    description:
      "Creating a PPV service for both user and business",
    company: "Barstool Sports",
    role: "Senior UX / UI Designer",
    year: "2022",
    image: "/casestudy/barstooltv/BarstoolTV_Streamlined.png",
    imageAlt: "BarstoolTV pay-per-view interface",
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
    subtitle: "Coney Tracking",
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
    id: "traeva",
    title: "Traeva",
    subtitle: "Discover Wildlife",
    image: "/traeva.png",
    detail: {
      date: "2026 - Present",
      status: {
        label: "In Development",
        tone: "active",
        icon: "play",
      },
      skills: [
        { label: "Systems Design", icon: "network" },
        { label: "Coding", icon: "layers" },
        { label: "GIS & Mapping", icon: "scan-eye" },
        { label: "UI/UX Design", icon: "pen-tool" },
        { label: "Data Curation", icon: "database" },
      ],
      tools: [
        "Cursor",
        "ChatGPT",
        "React / TypeScript",
        "Figma",
        "Photoshop",
        "MapLibre GL",
      ].map(hobbyTool),
      banner: "/traeva_banner.png",
      sections: [
        {
          title: "Why I'm Building It",
          blocks: [
            {
              type: "paragraph",
              text: "TLDR: I like maps and animals.",
            },
            {
              type: "image",
              src: "/hobby/traeva_1.png",
              alt: "Traeva wildlife discovery",
            },
            {
              type: "paragraph",
              text: "Maps were always interesting to me. Not just for getting from A to B, but for understanding a place before you're even there. Zooming in, panning around, imagining what might be living in that patch of green.",
            },
            {
              type: "image",
              src: "/hobby/traeva_2.png",
              alt: "Traeva map exploration",
            },
            {
              type: "paragraph",
              text: "Traeva came from wanting to see what I could do with publicly available map and wildlife data. There's a surprising amount of it out there, and I wanted to explore how design could make that information feel useful, beautiful, and worth discovering.",
            },
            {
              type: "image",
              src: "/hobby/traeva_3.png",
              alt: "Traeva interface exploration",
            },
            {
              type: "cta",
              label: "Explore Traeva",
              href: "https://traeva-seven.vercel.app/",
            },
          ],
        },
      ],
    },
  },
  {
    id: "sysmud",
    title: "Sysmud",
    subtitle: "In-Browser MMO",
    image: "/sysmud.png",
    detail: {
      date: "Nov 25'",
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

export type WorkHistoryItem = {
  title: string;
  company: string;
  dates: string;
  duration?: string;
  employmentType?: string;
};

export const workHistory: WorkHistoryItem[] = [
  {
    title: "Senior Product Designer & Design Engineer",
    company: "Pantomath",
    employmentType: "Full-time",
    dates: "Sep 2023 - Present",
    duration: "3 yrs 1 mo",
  },
  {
    title: "Senior UX / UI Designer",
    company: "Barstool Sports",
    employmentType: "Full-time",
    dates: "May 2022 - Sep 2023",
    duration: "1 yr 5 mos",
  },
  {
    title: "Associate Product Designer",
    company: "Kroger Digital",
    employmentType: "Full-time",
    dates: "Nov 2020 - May 2022",
    duration: "1 yr 7 mos",
  },
  {
    title: "User Interface Designer",
    company: "Kroger Digital",
    employmentType: "Full-time",
    dates: "Jun 2018 - Nov 2020",
    duration: "2 yrs 6 mos",
  },
  {
    title: "Visual Specialist",
    company: "CompleteSet",
    employmentType: "Full-time",
    dates: "May 2017 - Jan 2018",
    duration: "9 mos",
  },
  {
    title: "Digital Content Manager",
    company: "The Northerner",
    dates: "Aug 2015 - May 2017",
    duration: "1 yr 10 mos",
  },
  {
    title: "Full Stack Designer",
    company: "EventSpider LLC",
    dates: "May 2015 - Oct 2017",
    duration: "2 yrs",
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
