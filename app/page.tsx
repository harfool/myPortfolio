"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
      <Hero />
    </>
  );
}
