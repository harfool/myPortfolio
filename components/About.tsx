"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useInView,
  animate,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  FOCUS_AREAS,
  STATS,
  STACK_CARDS,
  CARD_STYLES,
  type StackCardData,
} from "@/lib/data";

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

/* Wave constants — one coherent traveling wave */
const AMP = 22; // wave amplitude in px
const STEP = 1.8; // phase difference between adjacent cards (rad)
const TRAVEL = Math.PI * 3; // total phase traveled over the whole scroll
const TRAILING_GAP = 32; // px of space after the last card

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, numeric, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsubscribe = motionValue.on("change", (v) =>
      setDisplay(Math.round(v)),
    );
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, numeric, motionValue]);

  return (
    <p ref={ref} className="text-3xl font-black sm:text-4xl">
      {display}
      {suffix}
    </p>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 overflow-x-clip bg-white px-6 py-10 text-black sm:px-10 lg:scroll-mt-26 lg:px-16 lg:pb-20 lg:pt-4"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Eyebrow + huge heading */}
          <motion.div
            variants={fadeUp}
            className="flex items-baseline justify-between gap-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/60">
              01 / About
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-black/60 sm:inline">
              Bhilwara, Rajasthan, India
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpScale}
            className="mt-6 text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-5xl lg:text-6xl"
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
            I design and build performance-first React applications, turning
            rough ideas and Figma files into fast, modular products - with a
            bias toward clean architecture over shortcuts.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            variants={staggerFast}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-black bg-black sm:grid-cols-4"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUpScale}
                className="bg-white p-6"
              >
                <CountUp value={stat.value} />
                <p className="mt-1 text-xs text-black/60 sm:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Two-column: journey + focus / availability */}
          <div className="mt-14 grid gap-px overflow-hidden border border-black bg-black lg:grid-cols-[1.4fr_1fr]">
            <motion.div variants={fadeUp} className="bg-white p-8 sm:p-10">
              <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-black/60">
                My journey
              </h3>
              <p className="mt-4 text-base leading-relaxed text-black/80 sm:text-lg">
                Started freelancing in mid-2025, building production React apps
                for small teams and founders. Since then I&apos;ve shipped 20+
                projects, cut load times by ~40% through memoization and
                code-splitting, and picked up Node, PostgreSQL, and Prisma along
                the way to ship full-stack when a project calls for it.
              </p>
              <motion.div
                variants={staggerFast}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {FOCUS_AREAS.map((area) => (
                  <motion.span
                    key={area}
                    variants={chip}
                    className="rounded-full border border-black px-4 py-2 text-xs font-medium sm:text-sm"
                  >
                    {area}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col justify-between bg-black p-8 text-white sm:p-10"
            >
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-white/60">
                  Status
                </h3>
                <div className="mt-4 flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{
                      scale: [0.6, 1.3, 1],
                      opacity: 1,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    }}
                    viewport={{ once: true, amount: 0.6 }}
                    className="h-2.5 w-2.5 rounded-full bg-emerald-400"
                  />
                  <p className="text-lg font-bold sm:text-xl">
                    Available for freelance
                  </p>
                </div>
                <p className="mt-3 text-sm text-white/60">
                  Open to new projects starting immediately. Based in India,
                  working with clients worldwide.
                </p>
              </div>
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="mt-10 inline-flex w-fit items-center gap-1 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
              >
                Let&apos;s talk ↗
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Tech stack — outside the whileInView wrapper; it's already
           scroll-driven internally and shouldn't gate on its own height */}
      <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2">
        <TechStackWave />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TECH STACK WAVE */

function TechStackWave() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* Spring-smoothed progress: kills wheel/trackpad jitter */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  useEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      if (!row?.lastElementChild) return;
      const last = row.lastElementChild as HTMLElement;
      // offsetLeft is transform-independent (immune to the current x translate)
      const endX = last.offsetLeft + last.offsetWidth;
      setRange(Math.max(0, endX + TRAILING_GAP - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(smooth, [0.26, 0.95], [0, -range]);

  if (reduceMotion) {
    return (
      <div className="bg-white px-6 py-20 sm:px-10 lg:px-16">
        <StackHeading />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {STACK_CARDS.map((card, i) => (
            <StaticStackCard key={card.name} card={card} index={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={trackRef} className="relative h-[340vh] bg-white">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-6 sm:px-10 lg:px-16">
          <StackHeading />
        </div>

        <motion.div
          ref={rowRef}
          style={{ x }}
          className="relative mt-8 flex items-center gap-4 pl-6 will-change-transform sm:mt-12 sm:gap-6 sm:pl-10 lg:pl-16"
        >
          {STACK_CARDS.map((card, i) => (
            <WaveCard key={card.name} card={card} index={i} progress={smooth} />
          ))}
        </motion.div>

        {/* progress hairline — centered, half width, fills with raw scroll progress */}
        <div className="absolute bottom-10 left-1/2 w-1/2 -translate-x-1/2">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-px origin-left bg-black/25"
          />
        </div>
      </div>
    </div>
  );
}

function StackHeading() {
  return (
    <div>
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/60">
        Tech stack
      </span>
      <h2 className="mt-3 mb-8 text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-5xl lg:text-6xl">
        Stack{" "}
        <span className="[font-family:var(--font-display)] text-transparent [-webkit-text-stroke:1.5px_#000] sm:[-webkit-text-stroke:2px_#000]">
          wave
        </span>
      </h2>
    </div>
  );
}

function WaveCard({
  card,
  index,
  progress,
}: {
  card: StackCardData;
  index: number;
  progress: MotionValue<number>;
}) {
  /* Staggered entrance window per card */
  const start = 0.02 + index * 0.012;

  /* y = pop-up from below + single traveling wave */
  const y = useTransform(progress, (v) => {
    const t = Math.min(Math.max((v - start) / 0.12, 0), 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const pop = (1 - eased) * 180;
    const wave = Math.sin(index * STEP - v * TRAVEL) * AMP;
    return pop + wave;
  });

  const opacity = useTransform(progress, (v) =>
    Math.min(Math.max((v - start) / 0.1, 0), 1),
  );

  /* Tilt follows the wave's local slope + entrance straighten-out */
  const rotate = useTransform(progress, (v) => {
    const t = Math.min(Math.max((v - start) / 0.12, 0), 1);
    const entrance = 1 - t;
    const slope = Math.cos(index * STEP - v * TRAVEL);
    return entrance * 5 + slope * 1.5;
  });

  const style = CARD_STYLES[card.level];

  return (
    <motion.div
      style={{ y, opacity, rotate }}
      className="relative w-[72vw] shrink-0 pt-4 sm:w-[320px] lg:w-[360px]"
    >
      {/* Folder tab — sits behind the body */}
      <div
        aria-hidden
        className={`absolute top-0 z-0 h-10 w-28 rounded-t-2xl border-2 border-b-0 ${style}`}
      />

      {/* Card body */}
      <div
        className={`relative z-10 flex h-[300px] flex-col justify-between rounded-3xl border-2 p-5 sm:h-[360px] sm:p-7 ${style}`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-5xl font-black opacity-10 sm:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-2xl font-black uppercase leading-[0.95] tracking-tight sm:text-3xl">
          {card.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* Static card for the reduced-motion fallback */
function StaticStackCard({
  card,
  index,
}: {
  card: StackCardData;
  index: number;
}) {
  const style = CARD_STYLES[card.level];

  return (
    <motion.div variants={chip} className="relative pt-4">
      {/* Folder tab */}
      <div
        aria-hidden
        className={`absolute left-6 top-0 z-0 h-4 w-24 rounded-t-xl border-2 border-b-0 ${style}`}
      />

      {/* Card body */}
      <div
        className={`relative z-10 flex h-44 flex-col justify-between rounded-3xl border-2 p-5 sm:h-52 ${style}`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-4xl font-black opacity-10">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-lg font-black uppercase leading-tight tracking-tight sm:text-xl">
          {card.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-white/60">
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
}
