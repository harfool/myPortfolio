"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";

const PROJECTS = [
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

export default function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 bg-white px-6 py-10 text-black sm:px-10 lg:px-16 lg:pt-4"
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
            02 / Work
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-black/40 sm:inline">
            {PROJECTS.length} selected
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl"
        >
          Featured work
        </motion.h2>
      </div>

      {/* Desktop — scroll-driven sticky media + flowing text */}
      <div className="mx-auto hidden max-w-6xl lg:block">
        <ScrollytellingWork />
      </div>

      {/* Mobile / tablet */}
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-14 pb-4 lg:hidden">
        {PROJECTS.map((project) => (
          <MobileProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function ScrollytellingWork() {
  const [active, setActive] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);

  const activeProject = PROJECTS[active];

  return (
    <div className="relative mt-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Sticky media panel */}
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <div className="w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <AnimatePresence>
                <motion.div
                  key={activeProject.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Full-width scroll-progress bar */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-[10px] font-medium text-black/50">
                {activeProject.index}
              </span>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-black/10">
                <motion.div
                  style={{ scaleX: segmentProgress, transformOrigin: "left" }}
                  className="h-full w-full rounded-full bg-black"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Flowing text column */}
        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <TextBlock
              key={project.title}
              project={project}
              isActive={i === active}
              onProgress={(p) => {
                setActive(i);
                setSegmentProgress(p);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TextBlock({
  project,
  isActive,
  onProgress,
}: {
  project: (typeof PROJECTS)[number];
  isActive: boolean;
  onProgress: (progress: number) => void;
}) {
  const blockRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      // Only claim "active" while this block is actually the one
      // straddling the center trigger point (0 < v < 1).
      if (v > 0 && v < 1) {
        onProgress(Math.min(Math.max(v, 0), 1));
      }
    });
    return unsubscribe;
  }, [scrollYProgress, onProgress]);

  return (
    <motion.div
      ref={blockRef}
      animate={{ opacity: isActive ? 1 : 0.35 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-[90vh] flex-col justify-center py-10"
    >
      <span className="font-mono text-xs tracking-[0.24em] text-black/40uppercase">
        {project.index} · {project.tagline}
      </span>
      <h3 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
        {project.title}
      </h3>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-black/70 sm:text-base">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-black/15 px-3 py-1 text-xs font-medium text-black/70"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
      >
        Know more ↗
      </a>
    </motion.div>
  );
}

function MobileProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <span className="mb-6 font-mono text-xs tracking-[0.24em] text-black/40 uppercase">
        {project.index} · {project.tagline}
      </span>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.1)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-6">
        <h3 className="mt-3 text-2xl font-bold">{project.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-black/70">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-black/15 px-3 py-1 text-xs font-medium text-black/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
        >
          Know more ↗
        </a>
      </div>
    </motion.div>
  );
}
