"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EXPERIENCE = [
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

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const tagContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const tagItem = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="scroll-mt-4 bg-white px-6 py-10 lg:py-20 text-black sm:px-10 lg:px-16 "
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex items-baseline justify-between gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/40">
            04 / Experience
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl"
        >
          Where I&apos;ve worked
        </motion.h2>

        {/* Timeline */}
        <div className="relative mt-16 pl-8 sm:pl-12">
          {/* Track + animated fill line */}
          <div className="absolute left-0 top-2 h-[calc(100%-2rem)] w-px bg-black/10 sm:left-0">
            <motion.div
              style={{ height: lineHeight }}
              className="w-px bg-black"
            />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-16"
          >
            {EXPERIENCE.map((job) => (
              <motion.div key={job.role} variants={fadeUp} className="relative">
                {/* Dot */}
                <span className="absolute -left-8 top-2 flex h-3 w-3 -translate-x-1/2 items-center justify-center sm:-left-12">
                  <span
                    className={`h-3 w-3 rounded-full border-2 border-black ${
                      job.current ? "bg-black" : "bg-white"
                    }`}
                  />
                  {job.current && (
                    <span className="absolute h-3 w-3 animate-ping rounded-full bg-black/40" />
                  )}
                </span>

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold sm:text-2xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm text-black/60">
                      {job.org} &middot; {job.location}
                    </p>
                  </div>
                  <span className="rounded-full border border-black px-3 py-1 text-xs font-medium whitespace-nowrap">
                    {job.period}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-black/75 sm:text-base"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-black/40" />
                      {point}
                    </li>
                  ))}
                </ul>

                <motion.div
                  variants={tagContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {job.stack.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={tagItem}
                      className="rounded-full border border-black/15 px-3 py-1.5 text-xs font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
