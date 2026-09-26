"use client";

import { useEffect, useState } from "react";

function waitForImages(signal: AbortSignal): Promise<void> {
  const images = Array.from(document.querySelectorAll("img"));

  const relevant = images.filter((img) => img.loading !== "lazy");
  const pending = relevant.filter((img) => !img.complete);

  if (pending.length === 0 || signal.aborted) return Promise.resolve();

  return new Promise((resolve) => {
    let remaining = pending.length;
    const cleanup = () =>
      pending.forEach((img) => {
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
      });
    const done = () => {
      remaining -= 1;
      if (remaining <= 0) {
        cleanup();
        resolve();
      }
    };
    signal.addEventListener("abort", cleanup, { once: true });
    pending.forEach((img) => {
      img.addEventListener("load", done);
      img.addEventListener("error", done);
    });
  });
}

function waitForWindowLoad(signal: AbortSignal): Promise<void> {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => {
    const onLoad = () => {
      window.removeEventListener("load", onLoad);
      resolve();
    };
    signal.addEventListener(
      "abort",
      () => window.removeEventListener("load", onLoad),
      { once: true },
    );
    window.addEventListener("load", onLoad, { once: true });
  });
}

function waitForFonts(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return Promise.resolve();
  }
  return document.fonts.ready.then(() => undefined);
}

function timeoutFallback(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });
}

export function usePageReady(minimumMs = 2800, maxWaitMs = 6000) {
  const [isReady, setIsReady] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const minimumTimer = new Promise<void>((resolve) => {
      const timer = window.setTimeout(resolve, minimumMs);
      controller.signal.addEventListener(
        "abort",
        () => window.clearTimeout(timer),
        { once: true },
      );
    });

    const contentReadyPromise = Promise.race([
      Promise.all([
        waitForWindowLoad(controller.signal),
        waitForImages(controller.signal),
        waitForFonts(),
      ]).then(() => undefined),
      timeoutFallback(maxWaitMs, controller.signal),
    ]);

    contentReadyPromise.then(() => {
      if (!cancelled) setContentReady(true);
    });

    Promise.all([minimumTimer, contentReadyPromise]).then(() => {
      if (!cancelled) setIsReady(true);
    });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [minimumMs, maxWaitMs]);

  return { isReady, contentReady };
}
