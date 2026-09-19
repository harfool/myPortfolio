"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
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

export default function Service() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="service"
      className="scroll-mt-20 py-10 lg:py-0 bg-white px-6 text-black sm:px-10 lg:px-16 "
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-baseline justify-between gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/40">
            03 / Service
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-black/40 sm:inline">
            {SERVICES.length} offerings
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl"
        >
          What I can build
          <br />
          for you
        </motion.h2>

        <div className="mt-16 border-t border-black">
          {SERVICES.map((service, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.08,
                }}
                className="border-b border-black"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-4 py-6 text-left sm:py-8"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span
                      className={`font-mono text-sm transition-colors sm:text-base ${
                        isOpen ? "text-black" : "text-black/30"
                      }`}
                    >
                      {service.index}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold transition-colors sm:text-3xl">
                        {service.title}
                      </h3>
                      <p
                        className={`mt-1 text-xs text-black/50 transition-opacity sm:text-sm ${
                          isOpen ? "opacity-0 sm:opacity-100" : "opacity-100"
                        }`}
                      >
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black transition-transform duration-300 sm:h-11 sm:w-11 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <PlusIcon />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-8 sm:grid-cols-[1.3fr_1fr] sm:pl-[3.25rem] sm:pb-10">
                        <p className="text-sm leading-relaxed text-black/70 sm:text-base">
                          {service.description}
                        </p>
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/40">
                            Includes
                          </p>
                          <ul className="mt-3 space-y-2">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-sm text-black/75"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-black/40" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-black bg-black p-8 text-white sm:flex-row sm:items-center sm:p-10"
        >
          <div>
            <p className="text-lg font-bold sm:text-xl">
              Have a project in mind?
            </p>
            <p className="mt-1 text-sm text-white/60">
              Let&apos;s figure out what it needs and get it built.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
          >
            Start a project ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1V15M1 8H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
