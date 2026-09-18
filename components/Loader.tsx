"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AnimatedGradient } from "@/components/ui/animated-gradient";

type LoaderProps = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white px-6"
        >
          <div className="relative h-105 w-full max-w-2xl overflow-hidden rounded-xl border border-black/10 bg-white">
            <AnimatedGradient
              config={{
                preset: "custom",
                color1: "#0a0a12",
                color2: "#1c2333",
                color3: "#f4f4f6",
                rotation: -45,
                proportion: 60,
                scale: 0.6,
                speed: 15,
                distortion: 40,
                swirl: 80,
                swirlIterations: 10,
                softness: 100,
                offset: 200,
                shape: "Edge",
                shapeSize: 50,
              }}
              radius="12px"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
