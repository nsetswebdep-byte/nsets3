"use client";

import { useEffect, useState } from "react";

/** Scroll position where the frame sequence ends (progress = 1). */
export function getSequenceEndScrollY(container: HTMLElement): number {
  const rect = container.getBoundingClientRect();
  const top = window.scrollY + rect.top;
  const range = container.offsetHeight - window.innerHeight;
  return Math.max(0, top + range);
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Options = {
  /** Start the intro once preload / experience is ready. */
  enabled: boolean;
  totalFrames: number;
  /** Seconds per frame (matches sequence export, e.g. 0.066). */
  frameIntervalS: number;
  /** Hold on frame 0 with welcome visible before auto-scroll (ms). */
  welcomeHoldMs?: number;
};

/**
 * On first paint after `enabled`, animates window scroll through the frame
 * sequence at source FPS, then releases control for manual scrolling.
 */
export function useHomeIntroAutoScroll(
  containerRef: React.RefObject<HTMLElement | null>,
  { enabled, totalFrames, frameIntervalS, welcomeHoldMs = 0 }: Options
) {
  const [introComplete, setIntroComplete] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const durationMs = totalFrames * frameIntervalS * 1000;

    const finish = () => {
      if (cancelled) return;
      setIsAutoScrolling(false);
      setIntroComplete(true);
    };

    const scrollToEnd = () => {
      const targetY = getSequenceEndScrollY(container);
      window.scrollTo(0, targetY);
      finish();
    };

    if (prefersReducedMotion()) {
      scrollToEnd();
      return () => {
        cancelled = true;
      };
    }

    window.scrollTo(0, 0);

    const blockUserScroll = (e: Event) => {
      e.preventDefault();
    };

    const blockKeys = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) e.preventDefault();
    };

    window.addEventListener("wheel", blockUserScroll, { passive: false });
    window.addEventListener("touchmove", blockUserScroll, { passive: false });
    window.addEventListener("keydown", blockKeys);

    let rafId = 0;
    let holdTimeoutId = 0;

    const runScroll = () => {
      if (cancelled) return;
      setIsAutoScrolling(true);
      const startTime = performance.now();

      const step = (now: number) => {
        if (cancelled) return;

        const startY = 0;
        const targetY = getSequenceEndScrollY(container);
        const distance = targetY - startY;
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / durationMs);
        window.scrollTo(0, startY + distance * t);

        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          cleanupListeners();
          finish();
        }
      };

      rafId = requestAnimationFrame(() => {
        if (cancelled) return;
        rafId = requestAnimationFrame(step);
      });
    };

    const cleanupListeners = () => {
      window.removeEventListener("wheel", blockUserScroll);
      window.removeEventListener("touchmove", blockUserScroll);
      window.removeEventListener("keydown", blockKeys);
    };

    // Hold on welcome at 000%, then auto-scroll the sequence
    holdTimeoutId = window.setTimeout(runScroll, welcomeHoldMs);

    return () => {
      cancelled = true;
      window.clearTimeout(holdTimeoutId);
      cancelAnimationFrame(rafId);
      cleanupListeners();
    };
  }, [enabled, containerRef, totalFrames, frameIntervalS, welcomeHoldMs]);

  return { introComplete, isAutoScrolling };
}
