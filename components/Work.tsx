"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerFast = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
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

const fadeUpScale = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const chip = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 lg:scroll-mt-26 bg-white px-6 py-10 text-black sm:px-10 lg:px-16 lg:pt-4"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div
          variants={fadeUp}
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
          variants={fadeUpScale}
          className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl"
        >
          Featured work
        </motion.h2>
      </motion.div>

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
  const handleProgress = useCallback((index: number, progress: number) => {
    setActive(index);
    setSegmentProgress(progress);
  }, []);

  return (
    <div className="relative mt-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Sticky media panel */}
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
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
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Full-width scroll-progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-4 flex items-center gap-3"
            >
              <span className="font-mono text-[10px] font-medium text-black/50">
                {activeProject.index}
              </span>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-black/10">
                <motion.div
                  style={{ scaleX: segmentProgress, transformOrigin: "left" }}
                  className="h-full w-full rounded-full bg-black"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Flowing text column */}
        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <TextBlock
              key={project.title}
              project={project}
              isActive={i === active}
              onProgress={handleProgress}
              projectIndex={i}
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
  projectIndex,
}: {
  project: (typeof PROJECTS)[number];
  isActive: boolean;
  onProgress: (index: number, progress: number) => void;
  projectIndex: number;
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
        onProgress(projectIndex, Math.min(Math.max(v, 0), 1));
      }
    });
    return unsubscribe;
  }, [scrollYProgress, onProgress, projectIndex]);

  return (
    <motion.div
      ref={blockRef}
      animate={{ opacity: isActive ? 1 : 0.35 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-[90vh] flex-col justify-center py-10"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.span
          variants={fadeUp}
          className="font-mono text-xs tracking-[0.24em] text-black/40uppercase"
        >
          {project.index} · {project.tagline}
        </motion.span>
        <motion.h3
          variants={fadeUpScale}
          className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl"
        >
          {project.title}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-md text-sm leading-relaxed text-black/70 sm:text-base"
        >
          {project.description}
        </motion.p>

        <motion.div
          variants={staggerFast}
          className="mt-6 flex flex-wrap gap-2"
        >
          {project.stack.map((tech) => (
            <motion.span
              key={tech}
              variants={chip}
              className="rounded-full border border-black/15 px-3 py-1 text-xs font-medium text-black/70"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.a
          variants={fadeUp}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
        >
          Know more ↗
        </motion.a>
      </motion.div>
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
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col"
    >
      <motion.span
        variants={fadeUp}
        className="mb-6 font-mono text-xs tracking-[0.24em] text-black/40 uppercase"
      >
        {project.index} · {project.tagline}
      </motion.span>
      <motion.div
        variants={fadeUpScale}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="mt-6">
        <motion.h3 variants={fadeUp} className="mt-3 text-2xl font-bold">
          {project.title}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="mt-4 text-sm leading-relaxed text-black/70"
        >
          {project.description}
        </motion.p>

        <motion.div
          variants={staggerFast}
          className="mt-5 flex flex-wrap gap-2"
        >
          {project.stack.map((tech) => (
            <motion.span
              key={tech}
              variants={chip}
              className="rounded-full border border-black/15 px-3 py-1 text-xs font-medium text-black/70"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.a
          variants={fadeUp}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
        >
          Know more ↗
        </motion.a>
      </div>
    </motion.div>
  );
}
