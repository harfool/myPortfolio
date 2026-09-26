"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PIXEL_GRID } from "@/components/ui/pixel-portrait-data";

const REVEAL_SPREAD = 1900;
const POP_DURATION = 260;
const DONE_DELAY = 250;

type Pixel = { x: number; y: number; start: number; dur: number };

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// Measures the wrapping container (not the window) so the display size is
// fully owned by CSS (max-width + aspect-ratio on that container). This only
// figures out the canvas's internal drawing resolution for crispness.
function computeCanvasSize(container: HTMLDivElement, gw: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = container.getBoundingClientRect();
  const px = Math.max(2, Math.floor((rect.width * dpr) / gw));
  return { dpr, px };
}

export default function PixelLoader({
  onBuilt,
  contentReady,
}: {
  onBuilt?: () => void;
  contentReady: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onBuiltRef = useRef(onBuilt);
  const pixelsRef = useRef<Pixel[]>([]);
  const builtRef = useRef(false);
  const [built, setBuilt] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const waiting = built && !contentReady && !reducedMotion;

  useEffect(() => {
    onBuiltRef.current = onBuilt;
  }, [onBuilt]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      const t = setTimeout(() => onBuiltRef.current?.(), 400);
      return () => clearTimeout(t);
    }

    const gh = PIXEL_GRID.length;
    const gw = PIXEL_GRID[0].length;

    const rng = mulberry32(20260925);
    const cx = gw / 2;
    const cy = gh / 2;
    const maxD = Math.hypot(cx, cy);

    const pixels: Pixel[] = [];
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        if (PIXEL_GRID[y][x] !== "#") continue;
        const d = Math.hypot(x - cx, y - cy) / maxD;
        const key = d * 0.55 + rng() * 0.45;
        pixels.push({
          x,
          y,
          start: key * REVEAL_SPREAD,
          dur: POP_DURATION + rng() * 90,
        });
      }
    }
    pixels.sort((a, b) => a.start - b.start);
    pixelsRef.current = pixels;
    const lastFinish = Math.max(...pixels.map((p) => p.start + p.dur));

    const applySize = () => {
      const { dpr, px } = computeCanvasSize(container, gw);
      canvas.width = px * gw;
      canvas.height = px * gh;
      return px;
    };

    let px = applySize();
    ctx.fillStyle = "#000";

    const redrawComplete = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pixelsRef.current) {
        ctx.fillRect(p.x * px, p.y * px, px, px);
      }
    };

    const handleResize = () => {
      px = applySize();
      ctx.fillStyle = "#000";
      if (builtRef.current) redrawComplete();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReducedMotion(prefersReduced);

    if (prefersReduced) {
      redrawComplete();
      const t = setTimeout(() => {
        builtRef.current = true;
        setBuilt(true);
        onBuiltRef.current?.();
      }, 400);
      return () => {
        clearTimeout(t);
        resizeObserver.disconnect();
      };
    }

    let raf = 0;
    const t0 = performance.now();
    let finished = false;

    const frame = (now: number) => {
      const elapsed = now - t0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of pixelsRef.current) {
        if (p.start > elapsed) break;
        const t = Math.min((elapsed - p.start) / p.dur, 1);
        const s = Math.max(1, Math.round(px * easeOutBack(t)));
        const o = Math.round((px - s) / 2);
        ctx.fillRect(p.x * px + o, p.y * px + o, s, s);
      }

      if (!finished && elapsed >= lastFinish + 90) {
        finished = true;
        redrawComplete();
        builtRef.current = true;
        setBuilt(true);
        setTimeout(() => onBuiltRef.current?.(), DONE_DELAY);
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="aspect-[70/79] w-[55vw] max-w-[200px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[520px]"
    >
      <motion.canvas
        ref={canvasRef}
        aria-hidden="true"
        role="presentation"
        className="block h-full w-full"
        animate={waiting ? { opacity: [1, 0.82, 1] } : { opacity: 1 }}
        transition={
          waiting
            ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      />
    </div>
  );
}
