"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";

const SPRING = { stiffness: 260, damping: 28, restDelta: 0.001, restSpeed: 0.002 };

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }, []);
  return isTouch;
}

/**
 * Returns scroll progress that works on both desktop and mobile.
 * On touch devices, useScroll can miss updates so we drive progress from a scroll listener.
 */
export function useFrameScrollProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const isTouch = useIsTouchDevice();
  const progress = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // On touch devices: drive progress from scroll/resize so frames update when user scrolls
  useEffect(() => {
    if (!isTouch) return;
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = rect.height - vh;
      if (range <= 0) {
        progress.set(0);
        return;
      }
      const p = -rect.top / range;
      progress.set(Math.max(0, Math.min(1, p)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isTouch, containerRef, progress]);

  // On non-touch: keep progress in sync with useScroll
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!isTouch) progress.set(v);
  });
  useEffect(() => {
    if (!isTouch) progress.set(scrollYProgress.get());
  }, [isTouch, scrollYProgress, progress]);

  const smoothProgress = useSpring(progress, SPRING);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.05], [0.3, 0]);

  return { scrollYProgress: progress, smoothProgress, scrollIndicatorOpacity };
}
