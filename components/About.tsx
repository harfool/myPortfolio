"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Figma",
  "Git",
];

const STATS = [
  { value: "10+", label: "Months experience" },
  { value: "20+", label: "Projects shipped" },
  { value: "100%", label: "Responsive builds" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
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
      className=" bg-white px-6 py-20 text-black sm:px-10 lg:px-16 lg:py-28"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-[0.24em] text-black/40"
        >
          About
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="mt-4 max-w-3xl text-2xl font-bold leading-snug sm:text-3xl lg:text-4xl"
        >
          I build fast, accessible interfaces that turn design into real,
          working products - focused on performance, clean code, and
          pixel-accurate detail.
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="mt-10 grid grid-cols-3 gap-6 border-y border-black/10 py-8 sm:mt-14 sm:gap-10"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs text-black/60 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 sm:mt-14">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
            Tech stack
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:border-black/30"
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
