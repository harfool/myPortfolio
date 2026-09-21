"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useInView, animate } from "framer-motion";
import { FOCUS_AREAS, PROFICIENCY, STATS, TECH_STACK } from "@/lib/data";

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

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
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
      className="scroll-mt-20 lg:scroll-mt-26  bg-white px-6 py-10 lg:pt-4 lg:pb-20 text-black sm:px-10 lg:px-16 "
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-6xl"
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
              <CountUp value={stat.value} />
              <p className="mt-1 text-xs text-black/60 sm:text-sm">
                {stat.label}
              </p>
            </div>
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
              <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-white/60">
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
          <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-black/60">
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

        {/* Proficiency - horizontal meters */}
        <motion.div variants={fadeUp} className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-black/60">
            Proficiency
          </h3>
        </motion.div>

        <motion.div variants={container} className="mt-5 space-y-10">
          {PROFICIENCY.map((p) => (
            <motion.div key={p.level} variants={fadeUp}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h5 className="text-lg font-bold">{p.level}</h5>
                <span className="font-mono text-xs text-black/60">
                  {p.meter}%
                </span>
              </div>
              <p className="mt-1 text-xs text-black/60 sm:text-sm">{p.desc}</p>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left", width: `${p.meter}%` }}
                  className="h-full rounded-full bg-black"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
