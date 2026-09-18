"use client";

import { motion } from "framer-motion";

const FOCUS_AREAS = [
  "Performance optimization",
  "Component architecture",
  "Design system thinking",
  "Pixel-accurate UI",
];

const TECH_STACK = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Prisma",
  "Figma",
];

const STATS = [
  { value: "10+", label: "Months in production" },
  { value: "20+", label: "Projects shipped" },
  { value: "40%", label: "Avg. load-time cut" },
  { value: "100%", label: "Responsive builds" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className=" bg-white px-6 py-10 lg:pt-4 lg:pb-20 text-black sm:px-10 lg:px-16 "
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        {/* Eyebrow + huge heading */}
        <motion.div
          variants={fadeUp}
          className="flex items-baseline justify-between gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/40">
            01 / About
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-black/40 sm:inline">
            Bhilwara, Rajasthan, India
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-6 text-[10vw] font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Founder.
          <br />
          Frontend
          <br />
          Engineer.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl"
        >
          I design and build performance-first React applications, turning rough
          ideas and Figma files into fast, modular products - with a bias toward
          clean architecture over shortcuts.
        </motion.p>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-black bg-black sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white p-6">
              <p className="text-3xl font-black sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs text-black/60 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Two-column: journey + focus / availability */}
        <div className="mt-14 grid gap-px overflow-hidden border border-black bg-black lg:grid-cols-[1.4fr_1fr]">
          <motion.div variants={fadeUp} className="bg-white p-8 sm:p-10">
            <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
              My journey
            </h3>
            <p className="mt-4 text-base leading-relaxed text-black/80 sm:text-lg">
              Started freelancing in mid-2025, building production React apps
              for small teams and founders. Since then I&apos;ve shipped 20+
              projects, cut load times by ~40% through memoization and
              code-splitting, and picked up Node, PostgreSQL, and Prisma along
              the way to ship full-stack when a project calls for it.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {FOCUS_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-black px-4 py-2 text-xs font-medium sm:text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-between bg-black p-8 text-white sm:p-10"
          >
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-white/40">
                Status
              </h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <p className="text-lg font-bold sm:text-xl">
                  Available for freelance
                </p>
              </div>
              <p className="mt-3 text-sm text-white/60">
                Open to new projects starting immediately. Based in India,
                working with clients worldwide.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-10 inline-flex w-fit items-center gap-1 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
            >
              Let&apos;s talk ↗
            </a>
          </motion.div>
        </div>

        {/* Tech stack marquee-style row */}
        <motion.div variants={fadeUp} className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
            Tech stack
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
