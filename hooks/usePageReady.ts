"use client";

import { useEffect, useState } from "react";

function waitForImages(): Promise<void> {
  const images = Array.from(document.querySelectorAll("img"));

  const relevant = images.filter((img) => img.loading !== "lazy");
  const pending = relevant.filter((img) => !img.complete);

  if (pending.length === 0) return Promise.resolve();

  return new Promise((resolve) => {
    let remaining = pending.length;
    const done = () => {
      remaining -= 1;
      if (remaining <= 0) resolve();
    };
    pending.forEach((img) => {
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    });
  });
}

function waitForWindowLoad(): Promise<void> {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitForFonts(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return Promise.resolve();
  }
  return document.fonts.ready.then(() => undefined);
}

function timeoutFallback(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function usePageReady(minimumMs = 2800, maxWaitMs = 6000) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const minimumTimer = new Promise<void>((resolve) => {
      window.setTimeout(resolve, minimumMs);
    });

    const contentReady = Promise.race([
      Promise.all([waitForWindowLoad(), waitForImages(), waitForFonts()]).then(
        () => undefined,
      ),
      timeoutFallback(maxWaitMs),
    ]);

    Promise.all([minimumTimer, contentReady]).then(() => {
      if (!cancelled) setIsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [minimumMs, maxWaitMs]);

  return isReady;
}
