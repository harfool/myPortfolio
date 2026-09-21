"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";
import { lenisStore } from "@/lib/lenisStore";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenisStore.current = lenis;

    function onFrame(data: { timestamp: number }) {
      lenis.raf(data.timestamp);
    }

    frame.update(onFrame, true);

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    window.addEventListener("load", () => lenis.resize());

    return () => {
      cancelFrame(onFrame);
      resizeObserver.disconnect();
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  return <>{children}</>;
}
