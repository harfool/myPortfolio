"use client";

import { useEffect } from "react";
import { usePageReady } from "@/hooks/usePageReady";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Service from "@/components/Service";
import Experience from "@/components/Experience";
import CopyEmailMarquee from "@/components/CopyEmailMarquee";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";
import ScrollToTop from "@/components/ScrollToTop";
import BigStatementReveal from "@/components/BigStatementReveal";

export default function Home() {
  const isReady = usePageReady(2800);
  const isLoading = !isReady;

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <ScrollToTop />
      <Hero isLoaded={!isLoading} />
      <About />
      <Work />
      <Service />
      <Experience />
      <CopyEmailMarquee />
      <Contact />
      <BigStatementReveal />
    </>
  );
}
