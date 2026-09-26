export const FOCUS_AREAS = [
  "Performance optimization",
  "Component architecture",
  "Design system thinking",
  "Pixel-accurate UI",
];

export const STATS = [
  { value: "2+", label: "Years in production" },
  { value: "10+", label: "Projects shipped" },
  { value: "40%", label: "Avg. load-time cut" },
  { value: "100%", label: "Responsive builds" },
];

export type StackCardData = {
  name: string;
  level: "Expert" | "Proficient" | "Learning";
  desc: string;
};

export const STACK_CARDS: StackCardData[] = [
  {
    name: "React.js",
    level: "Expert",
    desc: "Component architecture, hooks, and performance patterns for production UI.",
  },
  {
    name: "JavaScript (ES6+)",
    level: "Expert",
    desc: "Modern syntax, async patterns, and clean logic across the stack.",
  },
  {
    name: "Tailwind CSS",
    level: "Expert",
    desc: "Utility-first styling for fast, consistent, responsive interfaces.",
  },
  {
    name: "Next.js",
    level: "Expert",
    desc: "App Router, server components, and full-stack routing at scale.",
  },
  {
    name: "TypeScript",
    level: "Expert",
    desc: "Type-safe code that catches bugs before they ship.",
  },
  {
    name: "Framer Motion",
    level: "Expert",
    desc: "Scroll-driven and gesture-based animation, tuned for performance.",
  },
  {
    name: "Redux Toolkit",
    level: "Proficient",
    desc: "Predictable state management for complex, data-heavy apps.",
  },
  {
    name: "Node.js",
    level: "Proficient",
    desc: "Server-side JavaScript for APIs, tooling, and backend logic.",
  },
  {
    name: "MongoDB",
    level: "Proficient",
    desc: "Schema design and queries for flexible, document-based data.",
  },
  {
    name: "Docker",
    level: "Learning",
    desc: "Containerizing apps for consistent local and deployed environments.",
  },
  {
    name: "PostgreSQL",
    level: "Learning",
    desc: "Relational schema design and query optimization.",
  },
  {
    name: "Prisma ORM",
    level: "Learning",
    desc: "Type-safe database access layered over SQL.",
  },
];

export const CARD_STYLES: Record<StackCardData["level"], string> = {
  Expert: "bg-black text-white border-black",
  Proficient: "bg-black text-white border-black",
  Learning: "bg-black text-white border-black",
};

export const CONTACT_LINKS = [
  {
    label: "Email",
    value: "harfoolgujjar63@gmail.com",
    href: "mailto:harfoolgujjar63@gmail.com",
  },
  { label: "Phone", value: "+91 96102 37965", href: "tel:+919610237965" },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/harfool-gurjar-84997637a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    label: "GitHub",
    value: "See the code",
    href: "https://github.com/harfool",
  },
];

export const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const FOOTER_SERVICES = [
  "Full-Stack Development",
  "AI Automation",
  "Digital Marketing",
  "Web Design & UI/UX",
  "Mobile App development"
];

export const FOOTER_SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harfool-gurjar-84997637a",
  },
  { label: "GitHub", href: "https://github.com/harfool" },
  { label: "Email", href: "mailto:harfoolgujjar63@gmail.com" },
];

export const NOTES = [
  "Every project starts with understanding the problem before writing a single line of code",
  "Performance and clean architecture aren't optional - they're the baseline",
];

export const NAV_LINKS = [
  { label: "About" },
  { label: "Work", count: 3 },
  { label: "Service", count: 5 },
  { label: "Experience" },
  { label: "Contact" },
];

export const HERO_SOCIALS = [
  { label: "GitHub", href: "https://github.com/harfool" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harfool-gurjar-84997637a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  { label: "X", href: "https://x.com/harfool_gurjar0" },
];

export const PROJECTS = [
  {
    index: "01",
    title: "Huelip",
    href: "https://huelip.com/", 
    tagline: "Escrow-based proptech platform for architects",
    description:
      "A proptech platform built for an architect to solve payment-trust issues with his own clients - escrow-secured transactions, a wholesaler marketplace for building materials, personal project management for professionals, and team-member collaboration. Now live and expanding with client-requested features.",
    stack: ["React", "Tailwind", "Node", "Express", "MongoDB"], // TODO: confirm exact stack / escrow-payment layer
    image: "/images/work/huelip.png",
  },
  {
    index: "02",
    title: "BuzzHub",
    href: "https://buzzhub.store/", 
    tagline: "E-commerce platform with abandoned cart recovery",
    description:
      "An e-commerce platform built to recover lost revenue - automated abandoned-cart recovery flows designed to win back drop-off customers and lift conversion.",
    stack: ["React", "Tailwind", "Node", "Express", "MongoDB"], // TODO: confirm exact stack / payment gateway used
    image: "/images/work/buzzhub.png",
  },
  {
    index: "03",
    title: "VFixer Chemicals",
    href: "https://vfixerchemical.com/",
    tagline: "Website and digital presence for a chemicals manufacturer",
    description:
      "A website built in one month for a construction chemicals manufacturer with no prior digital presence - giving them their first online storefront for leads and brand credibility.",
    stack: ["React", "Tailwind"], // TODO: confirm exact stack - this was a lighter 1-month build
    image: "/images/work/vfixer-chemicals.png",
  },
  {
    index: "04",
    title: "VDesign",
    href: "https://vdesign.co.in/login", 
    tagline: "Multi-location fabric shop management with AI visualization",
    description:
      "A management system for a multi-location fabric business - QR-based inventory tracking across stores, plus an AI-powered fabric visualization tool for customers.",
    stack: ["React", "Tailwind", "Node", "Express", "MongoDB"], // TODO: confirm AI/image-gen tooling used
    image: "/images/work/vdesign.png",
  },
];

export const EXPERIENCE = [
  {
    role: "Founder",
    org: "Growify India",
    location: "Remote",
    period: "Present",
    current: true,
    points: [
      "Leading product and engineering for Growify India's client projects",
      "Building full-stack web applications with a small in-house team",
      "Owning architecture, delivery, and client relationships end to end",
      "Setting technical direction across React, Next.js, and Node stacks",
    ],
    stack: ["Next.js", "TypeScript", "React.js", "Node.js", "Prisma"],
  },
  {
    role: "Freelance Software Engineer",
    org: "Freelance",
    location: "Remote",
    period: "Dec 2024 - Sept 2025",
    current: false,
    points: [
      "Built and deployed full-stack apps using the MERN stack for diverse clients",
      "Designed REST APIs with JWT authentication and database integrations",
      "Delivered production-ready solutions using Docker and Vercel/Render",
      "Collaborated with clients through Agile workflows, on time and on spec",
    ],
    stack: ["Node.js", "MongoDB", "Docker", "JWT", "REST APIs"],
  },
  {
    role: "Frontend Developer Intern",
    org: "MetaCaps IT Solutions",
    location: "Bijainagar, Ajmer",
    period: "Dec 2023 - Sept 2024",
    current: false,
    points: [
      "Built reusable, accessible React UI components from Figma (WCAG)",
      "Translated designs into pixel-perfect UIs - ~25% faster feedback cycles",
      "Integrated REST APIs; managed state with Hooks/Context",
      "Applied memoization + code-splitting for a ~40% load speed boost",
    ],
    stack: [
      "React.js",
      "JavaScript (ES6+)",
      "Redux Toolkit",
      "Zustand",
      "Tailwind CSS",
    ],
  },
];

export const SERVICES = [
  {
    index: "01",
    title: "Web Development",
    tagline: "Production-grade sites, database to deploy",
    description:
      "End-to-end web builds on modern stacks - typed APIs, clean data models, and frontends structured to scale past the first release instead of needing a rewrite.",
    deliverables: [
      "Next.js / React applications with typed APIs",
      "Database design (PostgreSQL, MongoDB) and auth",
      "Cloud deployment and CI/CD pipelines",
    ],
    logo: "/images/services/web-dev.png",
  },
  {
    index: "02",
    title: "AI Automation",
    tagline: "Workflows that save real hours, not headlines",
    description:
      "AI wired into actual business operations - support, data entry, reporting - built to cut manual work measurably, not bolted on as a demo feature.",
    deliverables: [
      "LLM-powered workflow and process automation",
      "Custom AI integrations into existing tools",
      "Internal dashboards and reporting agents",
    ],
    logo: "/images/services/ai-automation.png",
  },
  {
    index: "03",
    title: "Digital Marketing",
    tagline: "Growth measured by pipeline, not impressions",
    description:
      "Campaigns and funnels built around conversion and revenue - SEO, content, and paid strategy tied to numbers a founder actually reports on.",
    deliverables: [
      "SEO strategy and technical site audits",
      "Conversion-focused landing pages and funnels",
      "Analytics setup and performance reporting",
    ],
    logo: "/images/services/digital-marketing.png",
  },
  {
    index: "04",
    title: "Mobile Development",
    tagline: "Cross-platform apps, built to ship on both stores",
    description:
      "Native-feeling mobile apps from a single React Native/Expo codebase - built for real devices and real usage, not a demo that only runs in a simulator.",
    deliverables: [
      "Cross-platform apps (iOS and Android) from one codebase",
      "App Store and Google Play submission and release",
      "Push notifications, offline support, and native integrations",
    ],
    logo: "/images/services/mobile-dev.png",
  },
];

export const EMAIL = "harfoolgujjar63@gmail.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://harfool.dev";

export const SOCIAL_PROFILE_URLS = [
  "https://github.com/harfool",
  "https://www.linkedin.com/in/harfool-gurjar-84997637a",
  "https://x.com/harfool_gurjar0",
];
