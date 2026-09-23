"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { SERVICES } from "@/lib/data";

const N = SERVICES.length;
const M = N - 1;

/* Desktop: satellites fan across a 120° arc on the LEFT of the active logo */
const ARC = (2 * Math.PI) / 3;
const STEP = M > 1 ? ARC / (M - 1) : 0;

const desktopSlot = (offset: number) => {
  if (offset === 0) return { x: 0.5, y: 0.12 };
  const angle = Math.PI - (offset - (M + 1) / 2) * STEP;
  const x = Math.cos(angle);
  let y = Math.sin(angle);
  if (offset === M) y *= 0.8;
  return { x, y };
};

/* Mobile: satellites fan in a full arc ABOVE the centered active logo */
const MOBILE_ARC = Math.PI * 0.9;
const MOBILE_STEP = M > 1 ? MOBILE_ARC / (M - 1) : 0;

const mobileSlot = (satelliteIndex: number) => {
  const angle =
    Math.PI + Math.PI / 2 - ((M - 1) / 2 - satelliteIndex) * MOBILE_STEP;
  return { x: Math.cos(angle), y: Math.sin(angle) };
};

/* ================= SMALL CLUSTER (mobile + tablet) =================
   Same radial idea as desktop: active logo dead center, satellites
   arced above/around it, all absolutely positioned so nothing clips. */
function SmallCluster({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  const RADIUS = 110;
  let satelliteIndex = 0;

  return (
    <div className="relative mx-auto h-10 mb-50 max-w-[320px] sm:max-w-[384px]">
      {SERVICES.map((service, i) => {
        const isActive = i === active;
        const slot = isActive
          ? { x: 0.1, y: 0.5 }
          : mobileSlot(satelliteIndex++);

        return (
          <motion.button
            key={service.title}
            onClick={() => onSelect(i)}
            aria-label={`Show ${service.title}`}
            aria-pressed={isActive}
            className="absolute top-1/2 left-1/2 cursor-pointer"
            animate={{
              x: slot.x * RADIUS - 20,
              y: slot.y * RADIUS + 100,
              scale: isActive ? 0.8 : 0.55,
              opacity: isActive ? 1 : 0.95,
              zIndex: isActive ? 10 : 5,
            }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div
                className={`relative flex items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${
                  isActive
                    ? "h-32 w-32 p-8 sm:h-36 sm:w-36 sm:p-9"
                    : "h-26 w-26 p-5 sm:h-28 sm:w-28 sm:p-6"
                }`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={service.logo}
                    alt={service.title}
                    fill
                    sizes="144px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ================= DESKTOP CLUSTER (unchanged) ================= */
function DesktopCluster({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  const RADIUS = 185;

  return (
    <>
      {SERVICES.map((service, i) => {
        const offset = (i - active + N) % N;
        const slot = desktopSlot(offset);
        const isActive = offset === 0;

        return (
          <motion.button
            key={service.title}
            onClick={() => onSelect(i)}
            aria-label={`Show ${service.title}`}
            aria-pressed={isActive}
            className="absolute cursor-pointer"
            style={{ left: "68%", top: "48%" }}
            animate={{
              x: slot.x * RADIUS,
              y: slot.y * RADIUS,
              scale: isActive ? 1 : 0.48,
              opacity: isActive ? 1 : 0.95,
              zIndex: isActive ? 10 : 5,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:h-42 sm:w-42 sm:p-6">
                <div className="relative h-full w-full">
                  <Image
                    src={service.logo}
                    alt={service.title}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </>
  );
}

/* ================= SECTION ================= */
export default function Service() {
  const [active, setActive] = useState(0);
  const activeService = SERVICES[active];

  const sectionRef = useRef<HTMLElement>(null);
  const [bounds, setBounds] = useState({ start: 1152, full: 1152 });

  useEffect(() => {
    const updateBounds = () => {
      const viewportWidth = document.documentElement.clientWidth;
      setBounds({ start: Math.min(1152, viewportWidth), full: viewportWidth });
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const sectionWidth = useTransform(
    scrollYProgress,
    [0, 0.9, 1],
    [bounds.start, bounds.full, bounds.full],
  );

  return (
    <motion.section
      ref={sectionRef}
      id="service"
      style={{ width: sectionWidth }}
      className="scroll-mt-20 mx-auto rounded-[4rem] bg-black px-6 py-10 text-white sm:px-10 lg:scroll-mt-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-baseline justify-between gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            03 / Service
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-white/40 sm:inline">
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

        <div className="my-10 grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="lg:hidden">
            <SmallCluster active={active} onSelect={setActive} />
          </div>

          <div className="relative mx-auto hidden h-120 max-w-xl lg:block">
            <DesktopCluster active={active} onSelect={setActive} />
          </div>

          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-white/80">
                    {activeService.index}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold sm:text-3xl">
                      {activeService.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">
                      {activeService.tagline}
                    </p>
                  </div>
                </div>

                <div className="mt-8 ml-8 flex flex-col gap-5">
                  <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                    {activeService.description}
                  </p>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                      Includes
                    </p>
                    <ul className="mt-3 space-y-2">
                      {activeService.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm text-white/80"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/80" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
