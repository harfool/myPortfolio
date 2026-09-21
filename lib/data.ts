export const FOCUS_AREAS = [
  "Performance optimization",
  "Component architecture",
  "Design system thinking",
  "Pixel-accurate UI",
];

export const TECH_STACK = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Prisma",
  "Figma",
];

export const STATS = [
  { value: "10+", label: "Months in production" },
  { value: "20+", label: "Projects shipped" },
  { value: "40%", label: "Avg. load-time cut" },
  { value: "100%", label: "Responsive builds" },
];

export const PROFICIENCY = [
  {
    level: "Expert",
    meter: 90,
    desc: "Advanced proficiency with deep understanding",
    skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS"],
  },
  {
    level: "Proficient",
    meter: 65,
    desc: "Strong working knowledge and experience",
    skills: ["Redux Toolkit", "Node.js", "MongoDB"],
  },
  {
    level: "Learning",
    meter: 30,
    desc: "Actively learning and gaining experience",
    skills: ["Docker", "PostgreSQL", "Prisma ORM"],
  },
];

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
  { label: "Service", count: 4 },
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
    title: "Zoo Management System",
    href: "https://zms.chaipecharcha.tech/",
    tagline: "Public site + admin dashboard for zoo operations",
    description:
      "A full platform to manage zoo operations - animal records, staff, and visitor ticketing. Public site with an animal catalogue and booking flow, plus a role-based admin dashboard for owners, admins, and editors.",
    stack: ["React", "Tailwind", "Node", "Express", "MongoDB", "JWT"],
    image: "/images/work/zoo-management.png",
  },
  {
    index: "02",
    title: "Marwar Saheli",
    href: "https://marwarsaheli.com/",
    tagline: "E-commerce platform for Rajasthani spices",
    description:
      "An online storefront selling authentic Rajasthani spices, built for scale - product search, reviews, lazy-loaded imagery, and a full order pipeline from cart to payment.",
    stack: ["React", "Tailwind", "Node", "Express", "MongoDB", "Razorpay"],
    image: "/images/work/marwar-saheli.png",
  },
  {
    index: "03",
    title: "AI | Gen AI",
    href: "https://harfool-ai.vercel.app/",
    tagline: "Platform showcasing AI-generated content",
    description:
      "A marketing and demo platform for showcasing AI-generated content and applications - clean landing experience built to convert, with performance and clarity as the priority.",
    stack: ["React", "Tailwind", "Node", "Express", "MongoDB"],
    image: "/images/work/ai-gen-ai.png",
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
    period: "July 2025 - Present",
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
    title: "Full-Stack Development",
    tagline: "Production-grade apps, database to deploy",
    description:
      "End-to-end product builds on modern stacks - typed APIs, clean data models, and frontends structured to scale past the first release instead of needing a rewrite.",
    deliverables: [
      "Next.js / React applications with typed APIs",
      "Database design (PostgreSQL, MongoDB) and auth",
      "Cloud deployment and CI/CD pipelines",
    ],
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
  },
  {
    index: "04",
    title: "Web Design & UI/UX",
    tagline: "Interfaces judged by usability first",
    description:
      "Design work rooted in clarity and conversion, not decoration - every screen earns its place, backed by a system that stays consistent as the product grows.",
    deliverables: [
      "Wireframes, prototypes, and design systems",
      "Responsive, accessible interface design",
      "Figma-to-code handoff and design QA",
    ],
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
