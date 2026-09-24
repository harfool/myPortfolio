"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";

const TEXT = "Got an idea? Let's make it real.";
const WORDS = TEXT.split(" ");
const TOTAL_CHARS = TEXT.replace(/\s/g, "").length;

const REVEAL_END = 0.9; // letters fully revealed by 90% scroll

function Letter({
  char,
  globalIndex,
  progress,
}: {
  char: string;
  globalIndex: number;
  progress: MotionValue<number>;
}) {
  const start = (globalIndex / TOTAL_CHARS) * REVEAL_END;
  const end = Math.min(start + 0.06, REVEAL_END);

  const opacity = useTransform(progress, [start, end, 1], [0, 1, 1]);
  const y = useTransform(progress, [start, end], [40, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: "inline-block", willChange: "transform" }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
}

export default function BigStatementReveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, REVEAL_END], ["2vw", "-2vw"]);

  const buttonOpacity = useTransform(
    scrollYProgress,
    [REVEAL_END, REVEAL_END + 0.1, 1],
    [0, 1, 1],
  );
  const buttonY = useTransform(
    scrollYProgress,
    [REVEAL_END, REVEAL_END + 0.1],
    [24, 0],
  );

  const offsets = useMemo(() => {
    let running = 0;
    return WORDS.map((w) => {
      const o = running;
      running += w.replace(/\s/g, "").length;
      return o;
    });
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[190vh] bg-white">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-6">
        <motion.span
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]),
          }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-black/40 sm:mb-8"
        >
          Harfool Gurjar
        </motion.span>

        <motion.h2
          style={{ x }}
          className="max-w-6xl text-center text-[11vw] font-black uppercase leading-[0.95] tracking-tight text-black text-balance sm:text-[8vw] lg:text-[6.5vw]"
        >
          {WORDS.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((char, ci) => (
                <Letter
                  key={ci}
                  char={char}
                  globalIndex={offsets[wi] + ci}
                  progress={scrollYProgress}
                />
              ))}
              {wi < WORDS.length - 1 && "\u00A0"}
            </span>
          ))}
        </motion.h2>

        <motion.div
          style={{ opacity: buttonOpacity, y: buttonY }}
          className="pointer-events-none mt-10 sm:mt-14"
        >
          <button
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="pointer-events-auto group inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Start a project
            <span className="transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
