"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    function onFrame(data: { timestamp: number }) {
      lenis.raf(data.timestamp);
    }

    frame.update(onFrame, true);

    return () => {
      cancelFrame(onFrame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
