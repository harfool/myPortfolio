"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SOCIALS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type HeroProps = {
  isLoaded: boolean;
};

export default function Hero({ isLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.5,
  });

  const imageY = useTransform(smoothProgress, [0, 0.4], [0, -140]);
  const contentY = useTransform(smoothProgress, [0, 0.4], [0, -180]);

  return (
    <main className="min-h-svh overflow-y-auto bg-white text-black sm:h-svh sm:overflow-hidden">
      {/* ---------- Desktop  ---------- */}
      <motion.section
        ref={sectionRef}
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="relative hidden h-full w-full lg:block"
      >
        <motion.h1
          variants={fadeUp}
          className="absolute inset-x-0 top-[10%] z-0 flex flex-col select-none items-center justify-between whitespace-nowrap px-4 sm:px-10"
        >
          <span className="[font-family:var(--font-display)] text-[10vw] font-black uppercase leading-none tracking-[-0.02em] text-transparent [-webkit-text-stroke:1.5px_#000] sm:[-webkit-text-stroke:2px_#000]">
            Harfool
          </span>
          <span className="font-[var(--font-display)] text-[10vw] font-black uppercase leading-none tracking-[-0.02em] text-black">
            Gurjar
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          style={{ translateY: imageY }}
          className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[52svh] w-auto -translate-x-1/2 sm:h-[64svh] will-change-transform"
        >
          <img
            src="/images/harfool-gurjar.png"
            alt="Harfool Gurjar"
            className="h-full w-auto object-cover object-top grayscale pt-16"
          />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 p-5 sm:p-10">
          <motion.div
            variants={fadeIn}
            style={{ translateY: contentY }}
            className="max-w-sm will-change-transform"
          >
            <h2 className="text-xl font-bold sm:text-3xl">
              Founder and software engineer
            </h2>
            <p className="mt-2 max-w-xs font-mono text-xs text-black/60 sm:text-sm">
              Building clean, fast, conversion-focused web experiences.
            </p>
            <a
              href="#work"
              className="mt-5 inline-flex items-center gap-1 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Let&apos;s collaborate ↗
            </a>
          </motion.div>

          <motion.div
            variants={fadeIn}
            style={{ translateY: contentY }}
            className="hidden flex-col gap-3 sm:flex will-change-transform"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="rounded-full border border-black/10 bg-white/60 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition hover:-translate-x-1 hover:border-black/30"
              >
                {s.label}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ---------- Mobile  ---------- */}
      <motion.section
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
        className="flex flex-col lg:hidden h-screen justify-between pt-24"
      >
        <motion.h1
          variants={fadeUp}
          className="mt-2 flex select-none flex-col items-center whitespace-nowrap px-4 text-center leading-none"
        >
          <span className="[font-family:var(--font-display)] text-[clamp(3rem,11vw,6rem)] font-black uppercase tracking-[-0.02em] text-transparent [-webkit-text-stroke:1.2px_#000]">
            Harfool
          </span>
          <span className="[font-family:var(--font-display)] text-[clamp(3rem,11vw,6rem)] font-black uppercase tracking-[-0.02em] text-black">
            Gurjar
          </span>
        </motion.h1>

        <motion.div variants={fadeUp} className="px-6 pt-6 text-center">
          <h2 className="text-2xl font-bold">Founder and software engineer</h2>
          <p className="mx-auto mt-2 max-w-xs font-mono text-xs text-black/60">
            Building clean, fast, conversion-focused web experiences.
          </p>
          <a
            href="#work"
            className="mt-5 inline-flex items-center gap-1 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
          >
            Let&apos;s collaborate ↗
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-wrap justify-center gap-3 px-6 pb-8"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="rounded-full border border-black/10 px-4 py-2 text-xs font-medium"
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-3 flex justify-center px-8"
        >
          <img
            src="/images/harfool-gurjar.png"
            alt="Harfool Gurjar"
            className="max-h-[40svh] w-auto object-contain grayscale"
          />
        </motion.div>
      </motion.section>
    </main>
  );
}
