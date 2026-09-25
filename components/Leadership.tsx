"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Shared variants (used by the stacked fallback)                     */
/* ------------------------------------------------------------------ */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
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

const PRINCIPLES = [
  {
    n: "01",
    title: "Start with the real problem",
    body: "Good technology begins with understanding the people, business, and problem behind the brief.",
  },
  {
    n: "02",
    title: "Build for real impact",
    body: "Every product should make something clearer, faster, easier, or more valuable.",
  },
  {
    n: "03",
    title: "Think beyond the launch",
    body: "The best digital products evolve with their users, their market, and the business behind them.",
  },
];

const DESK_ITEMS = [
  {
    label: "Building",
    value: "Growify India",
    rotate: "-rotate-1",
  },
  {
    label: "Exploring",
    value: "AI & intelligent automation",
    rotate: "rotate-1",
  },
  {
    label: "Focused on",
    value: "Digital products that solve real problems",
    rotate: "rotate-1",
  },
  {
    label: "Belief",
    value: "Useful technology creates lasting value.",
    rotate: "-rotate-1",
  },
];

const SERVICES = [
  "Digital Products",
  "AI & Automation",
  "Digital Growth",
  "Product Design",
];

/* ------------------------------------------------------------------ */
/*  Pin gate — horizontal pinning needs a tall viewport. On short      */
/*  screens (small laptop windows, landscape phones) the section       */
/*  falls back to the normal stacked scroll layout.                    */
/* ------------------------------------------------------------------ */
function useCanPin() {
  const [canPin, setCanPin] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-height: 700px)");
    const update = () => setCanPin(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canPin;
}

export default function Leadership() {
  const canPin = useCanPin();
  const reduceMotion = useReducedMotion();

  if (!canPin || reduceMotion) {
    return <StackedLeadership />;
  }

  return <PinnedLeadership />;
}

/* ------------------------------------------------------------------ */
/*  PINNED EXPERIENCE (all sizes with ≥700px viewport height)          */
/*                                                                     */
/*  Scroll phases over a 560vh track:                                  */
/*    0.00 – 0.16  intro: image grows, heading drifts up slightly      */
/*    0.18 – 0.96  horizontal slide across the 3 content panels        */
/* ------------------------------------------------------------------ */
function PinnedLeadership() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* Phase 1 — intro: image scales from small to full.
     Heading only drifts up — no fade. */
  const imageScale = useTransform(scrollYProgress, [0, 0.16], [0.45, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.16], [0, 0]);

  /* Phase 2 — horizontal travel across the 3 content panels */
  const x = useTransform(
    scrollYProgress,
    [0.18, 0.44, 0.7, 0.96],
    ["0vw", "-100vw", "-200vw", "-300vw"],
  );

  return (
    <section id="leadership" className="bg-white text-black">
      <div ref={trackRef} className="relative h-[560vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full will-change-transform"
          >
            {/* ── Panel 1 · Intro (white) ─────────────────────────── */}
            <div className="relative flex h-full w-screen shrink-0 flex-col items-center justify-center bg-white">
              <motion.h2
                style={{ y: headingY }}
                className="z-10 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl"
              >
                Leadership
              </motion.h2>

              {/* origin-top: image grows downward, never covers heading */}
              <motion.div
                style={{ scale: imageScale }}
                className="relative mt-4 aspect-square w-[76vw] max-w-[560px] origin-top sm:mt-6 sm:w-[56vw] lg:mt-8 lg:w-[36vw]"
              >
                <Image
                  src="/images/leader-illustration.png"
                  alt="Leadership illustration"
                  fill
                  sizes="(max-width: 640px) 76vw, (max-width: 1024px) 56vw, 36vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* ── Panel 2 · How I think (black) ───────────────────── */}
            <div className="flex h-full w-screen shrink-0 items-center bg-black text-white">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="mx-auto w-full max-w-6xl px-4 sm:px-10 lg:px-16"
              >
                <motion.span
                  variants={fadeUp}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 sm:text-xs"
                >
                  How I think
                </motion.span>

                <div className="divide-y divide-white/10">
                  {PRINCIPLES.map((p) => (
                    <motion.div
                      key={p.n}
                      variants={fadeUp}
                      className="grid grid-cols-[auto_1fr] items-center gap-4 py-4 sm:gap-8 sm:py-8 lg:gap-12 lg:py-10"
                    >
                      <span className="font-mono text-4xl font-black text-white/10 sm:text-6xl lg:text-8xl">
                        {p.n}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold sm:text-2xl lg:text-4xl">
                          {p.title}
                        </h3>
                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/60 sm:mt-2 sm:text-base lg:text-lg">
                          {p.body}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Panel 3 · The founder&apos;s desk (white) ─────────── */}
            <div className="flex h-full w-screen shrink-0 items-center bg-white text-black">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="mx-auto w-full max-w-6xl px-4 sm:px-10 lg:px-16"
              >
                <motion.span
                  variants={fadeUp}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/50 sm:text-xs"
                >
                  The founder&apos;s desk
                </motion.span>

                <motion.h2
                  variants={fadeUp}
                  className="mt-3 max-w-2xl text-3xl font-black uppercase leading-tight tracking-tight sm:mt-4 sm:text-3xl lg:text-5xl"
                >
                  What&apos;s shaping the work right now.
                </motion.h2>

                <motion.div
                  variants={staggerFast}
                  className="mt-6 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5"
                >
                  {DESK_ITEMS.map((item) => (
                    <motion.div
                      key={item.label}
                      variants={chip}
                      className={`${item.rotate} rounded-2xl border border-black/15 bg-black/5 p-4 sm:p-6 lg:p-8`}
                    >
                      <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-black/40 sm:text-xs">
                        {item.label}
                      </span>
                      <p className="mt-2 text-sm font-semibold sm:mt-3 sm:text-xl lg:text-2xl">
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* ── Panel 4 · The company (black, centered) ─────────── */}
            <div className="flex h-full w-screen shrink-0 items-center bg-black text-white">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="mx-auto w-full max-w-6xl px-4 sm:px-10 lg:px-16"
              >
                <motion.span
                  variants={fadeUp}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 sm:text-xs"
                >
                  The company
                </motion.span>

                <motion.h2
                  variants={fadeUp}
                  className="mt-3 text-3xl font-black uppercase tracking-tight sm:mt-4 sm:text-3xl lg:text-5xl"
                >
                  Growify India
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:mt-6 sm:text-lg lg:text-xl"
                >
                  A technology and digital growth company focused on building
                  products, automating workflows, and helping businesses grow
                  through technology.
                </motion.p>

                <motion.div
                  variants={staggerFast}
                  className="mt-6 flex flex-wrap gap-2 sm:mt-10 sm:gap-3"
                >
                  {SERVICES.map((service) => (
                    <motion.span
                      key={service}
                      variants={chip}
                      className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white/80 sm:px-4 sm:py-2 sm:text-sm"
                    >
                      {service}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6 sm:mt-14 sm:pt-8"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40 sm:text-xs">
                    Founded by
                  </span>
                  <span className="text-sm font-semibold sm:text-lg">
                    Harfool Gurjar
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll progress hairline — inverts over black/white */}
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute bottom-8 left-1/2 h-px w-48 origin-center -translate-x-1/2 bg-white mix-blend-difference"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STACKED FALLBACK (short viewports / reduced motion)                */
/* ------------------------------------------------------------------ */
function StackedLeadership() {
  const imageRef = useRef<HTMLDivElement>(null);

  /* Image grows as it scrolls into view — small at the bottom
     of the viewport, full size by the time it reaches center */
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start 0.95", "start 0.35"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <section id="leadership" className="bg-white text-black">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-20 text-center sm:px-10 lg:px-16">
        {/* Heading first, image after */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-black uppercase tracking-tight sm:text-5xl"
        >
          Leadership
        </motion.h2>

        {/* Grows big on scroll — origin-top so it expands downward */}
        <motion.div
          ref={imageRef}
          style={{ scale: imageScale }}
          className="relative mt-8 aspect-square w-[76vw] max-w-md origin-top sm:w-[46vw] lg:w-[34vw]"
        >
          <Image
            src="/images/leader-illustration.png"
            alt="Leadership illustration"
            fill
            sizes="(max-width: 640px) 76vw, (max-width: 1024px) 46vw, 34vw"
            className="object-contain"
          />
        </motion.div>
      </div>
      <HowIThink />
      <FoundersDesk />
      <GrowifyIndia />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stacked sub-sections (fallback + reused markup patterns)           */
/* ------------------------------------------------------------------ */
function HowIThink() {
  return (
    <div className="overflow-x-clip px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-baseline justify-between gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/50">
            How I think
          </span>
        </motion.div>

        <div className="flex flex-col divide-y divide-black/10">
          {PRINCIPLES.map((p, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 lg:py-14"
              >
                <span className="font-mono text-6xl font-black text-black/10 sm:text-7xl lg:text-8xl">
                  {p.n}
                </span>
                <div>
                  <h3 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-black/60 sm:text-lg">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FoundersDesk() {
  return (
    <div className="overflow-x-clip bg-black px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeUp} className="flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
            The founder&apos;s desk
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mt-4 max-w-2xl text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl"
        >
          What&apos;s shaping the work right now.
        </motion.h2>

        <motion.div
          variants={staggerFast}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {DESK_ITEMS.map((item) => (
            <motion.div
              key={item.label}
              variants={chip}
              className={`${item.rotate} rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:border-white/30 sm:p-8`}
            >
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-white/40">
                {item.label}
              </span>
              <p className="mt-3 text-xl font-semibold sm:text-2xl">
                {item.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function GrowifyIndia() {
  return (
    <div className="overflow-x-clip px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-[0.3em] text-black/50"
        >
          The company
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl"
        >
          Growify India
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-black/70 sm:text-xl"
        >
          A technology and digital growth company focused on building products,
          automating workflows, and helping businesses grow through technology.
        </motion.p>

        <motion.div
          variants={staggerFast}
          className="mt-10 flex flex-wrap gap-3"
        >
          {SERVICES.map((service) => (
            <motion.span
              key={service}
              variants={chip}
              className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium uppercase tracking-wide text-black/80"
            >
              {service}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-16 flex items-center gap-4 border-t border-black/10 pt-8"
        >
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
            Founded by
          </span>
          <span className="text-lg font-semibold">Harfool Gurjar</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
