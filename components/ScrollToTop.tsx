"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const sampleBackground = () => {
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      // Sample just above the button so we hit whatever section is
      // rendered behind it, not the button itself.
      const x = rect.left + rect.width / 2;
      const y = rect.top - 24;

      const prevPointerEvents = btn.style.pointerEvents;
      btn.style.pointerEvents = "none";
      const el = document.elementFromPoint(x, y);
      btn.style.pointerEvents = prevPointerEvents;

      if (!el) return;

      let node: Element | null = el;
      let bg = "";
      while (node && node !== document.documentElement) {
        const computed = window.getComputedStyle(node);
        const color = computed.backgroundColor;
        if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
          bg = color;
          break;
        }
        node = node.parentElement;
      }
      if (!bg) bg = "rgb(255, 255, 255)";

      const match = bg.match(/\d+(\.\d+)?/g);
      if (!match) return;
      const [r, g, b] = match.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      setIsDarkBg(luminance < 0.5);
    };

    const onScroll = () => {
      setIsVisible(window.scrollY > 240);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(sampleBackground);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed right-6 bottom-6 z-40 grid h-14 w-14 place-items-center transition-all duration-300 ease-out hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 sm:right-8 sm:bottom-8 cursor-pointer ${
        isDarkBg ? "focus-visible:outline-white" : "focus-visible:outline-black"
      } ${
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
        <path
          d="M50 0L100 80L50 55L0 80L50 0Z"
          style={{
            fill: isDarkBg ? "white" : "black",
            transition: "fill 0.4s ease",
          }}
        />
      </svg>
    </button>
  );
}
