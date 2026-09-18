"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const tick = 30;
    const increment = 100 / (duration / tick);

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + increment, 100);

        if (next >= 100) {
          window.clearInterval(timer);
        }

        return next;
      });
    }, tick);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#020817]"
      >
        <div className="w-full max-w-md px-6 text-center text-white">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-500 text-lg font-black text-white shadow-lg shadow-sky-500/25">
              HG
            </div>
            <span className="text-lg font-semibold tracking-[0.2em] text-slate-200 uppercase">
              Harfool
            </span>
          </div>

          <div className="mb-4 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.24em] text-slate-300">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800/80 shadow-inner shadow-slate-950/80">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
