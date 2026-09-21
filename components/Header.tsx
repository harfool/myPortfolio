"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About" },
  { label: "Work", count: 3 },
  { label: "Service", count: 4 },
  { label: "Experience" },
  { label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      {/* Floating pill bar */}
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl bg-white/75 px-4 py-3 border border-gray-100 backdrop-blur-md transition-shadow duration-300 sm:rounded-full sm:px-6 ${
          scrolled ? "sm:shadow-lg" : "sm:shadow-none"
        }`}
      >
        <a href="/#">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 text-sm font-medium text-black/70 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={`#${link.label.toLowerCase()}`}
              className="flex items-center gap-1 transition hover:text-black"
            >
              {link.label}
              {link.count && (
                <span className="font-mono text-xs text-black/40">
                  [{link.count}]
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Let&apos;s Talk ↗
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-black/10 lg:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-4 bg-black"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-4 bg-black"
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-black/10 bg-white/95 p-4 shadow-lg backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={`#${link.label.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-black/5 py-3 text-sm font-medium text-black/70 transition hover:text-black"
                >
                  {link.label}
                  {link.count && (
                    <span className="font-mono text-xs text-black/40">
                      [{link.count}]
                    </span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
