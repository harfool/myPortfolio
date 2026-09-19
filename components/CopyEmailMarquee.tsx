"use client";

import { useState } from "react";

const EMAIL = "harfoolgujjar63@gmail.com";
const REPEAT_COUNT = 6;

export default function CopyEmailMarquee() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be unavailable outside a secure browser context.
    }
  };

  const label = copied ? "Copied" : EMAIL;

  const content = (
    <>
      {Array.from({ length: REPEAT_COUNT }).map((_, index) => (
        <span
          key={index}
          className="flex items-center gap-6 pr-6 text-6xl font-medium uppercase tracking-tight sm:gap-10 sm:pr-10 sm:text-7xl lg:text-8xl"
        >
          {label}
          <img
            src="/logo.png"
            alt=""
            className="h-10 w-10 shrink-0 animate-spin-slow object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          />
        </span>
      ))}
    </>
  );

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy email address"
      className="group relative flex w-full items-center overflow-hidden cursor-pointer my-10 lg:my-20 text-left "
    >
      <div className="animate-marquee flex w-max shrink-0 items-center whitespace-nowrap will-change-transform">
        {content}
        {content}
      </div>
    </button>
  );
}
