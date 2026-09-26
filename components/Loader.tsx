"use client";

import { AnimatePresence, motion } from "framer-motion";
import PixelLoader from "@/components/ui/PixelLoader";

type LoaderProps = {
  isLoading: boolean;
  contentReady: boolean;
  onAnimationDone?: () => void;
};

export default function Loader({
  isLoading,
  contentReady,
  onAnimationDone,
}: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <PixelLoader onBuilt={onAnimationDone} contentReady={contentReady} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
