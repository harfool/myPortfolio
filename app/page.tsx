"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Service from "@/components/Service";
import Experience from "@/components/Experience";
import CopyEmailMarquee from "@/components/CopyEmailMarquee";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";
import ScrollToTop from "@/components/ScrollToTop";

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
      <Loader isLoading={isLoading} />
      <ScrollToTop />
      <Hero isLoaded={!isLoading} />
      <About />
      <Work />
      <Service />
      <Experience />
      <CopyEmailMarquee />
      <Contact />
    </>
  );
}
