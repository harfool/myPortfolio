"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
      className={`fixed right-6 bottom-6 z-40 grid h-14 w-14 cursor-pointer place-items-center mix-blend-difference transition-all duration-300 ease-out hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-8 sm:bottom-8 ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-75 opacity-0"
      }`}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M50 0L100 80L50 55L0 80L50 0Z" className="fill-white" />
      </svg>
    </button>
  );
}
