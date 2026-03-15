"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
  /** Filename prefix before the frame number, e.g. "frame_" or "video2_" */
  frameFilePrefix?: string;
  /** Optional suffix inserted after the index but before the extension, e.g. "_delay-0.05s" */
  frameFileSuffix?: string;
  /** If true, frame numbers are 1-based (e.g. video2_001..video2_145). If false, 0-based (frame_000..frame_191). */
  frameIndexOneBased?: boolean;
  /** File extension without dot, defaults to "png" */
  fileExtension?: "png" | "webp" | "jpg" | "jpeg";
  /** When false, hides the "OPTIMIZING EXPERIENCE" loading overlay (e.g. for lab-equipment, same as home). Default true. */
  showLoadingOverlay?: boolean;
  /** Optional darkening overlay (0–1). 0 = none. */
  darkenOverlayOpacity?: number;
  /** When true, show a full-screen loader until enough frames are loaded (and minDisplayTimeMs has passed) to avoid scroll glitches. */
  preloadBeforeShow?: boolean;
  /** Minimum time (ms) to show the preload screen, e.g. 5000–10000. Only used when preloadBeforeShow is true. */
  minDisplayTimeMs?: number;
  /** Consider ready when this ratio of frames is loaded (0–1), e.g. 0.95. Only used when preloadBeforeShow is true. */
  targetLoadRatio?: number;
}

export default function BuildingScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
  frameFilePrefix = "frame_",
  frameFileSuffix = "",
  frameIndexOneBased = false,
  fileExtension = "png",
  showLoadingOverlay = true,
  darkenOverlayOpacity = 0,
  preloadBeforeShow = false,
  minDisplayTimeMs = 4000,
  targetLoadRatio = 0.95,
}: Props) {
  const EAGER_FRAME_COUNT = 60;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isExperienceReady, setIsExperienceReady] = useState(!preloadBeforeShow);
  const startTimeRef = useRef<number>(Date.now());
  const loadedCountRef = useRef(0);
  loadedCountRef.current = loadedCount;

  useEffect(() => {
    if (preloadBeforeShow) {
      startTimeRef.current = Date.now();
      setIsExperienceReady(false);
    }
  }, [preloadBeforeShow]);

  // Poll until both min time and frame count are met (effect only runs on dep change, so we need a timer)
  useEffect(() => {
    if (!preloadBeforeShow || isExperienceReady) return;
    const minLoaded = Math.ceil(totalFrames * targetLoadRatio);
    const check = () => {
      const currentLoaded = loadedCountRef.current;
      const elapsed = Date.now() - startTimeRef.current;
      if (currentLoaded >= minLoaded && elapsed >= minDisplayTimeMs) {
        setIsExperienceReady(true);
      }
    };
    check();
    const interval = setInterval(check, 300);
    return () => clearInterval(interval);
  }, [preloadBeforeShow, isExperienceReady, totalFrames, targetLoadRatio, minDisplayTimeMs]);

  // Prevent scroll while preload overlay is visible
  useEffect(() => {
    if (!preloadBeforeShow || isExperienceReady) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [preloadBeforeShow, isExperienceReady]);

  useEffect(() => {
    let cancelled = false;
    const initial: (HTMLImageElement | null)[] = Array(totalFrames).fill(null);
    setImages(initial);
    setLoadedCount(0);
    if (preloadBeforeShow) startTimeRef.current = Date.now();

    const loadFrame = (i: number) => {
      const num = frameIndexOneBased ? i + 1 : i;
      const frameIndex = num.toString().padStart(3, "0");
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setLoadedCount((prev) => Math.min(totalFrames, prev + 1));
        setImages((prev) => {
          const next = prev.slice();
          next[i] = img;
          return next;
        });
      };
      img.src = `${imageFolderPath}/${frameFilePrefix}${frameIndex}${frameFileSuffix}.${fileExtension}`;
    };

    if (preloadBeforeShow) {
      const BATCH = 48;
      let idx = 0;
      const schedule = () => {
        if (cancelled) return;
        const end = Math.min(idx + BATCH, totalFrames);
        for (let i = idx; i < end; i++) loadFrame(i);
        idx = end;
        if (idx < totalFrames) setTimeout(schedule, 30);
      };
      schedule();
      return () => { cancelled = true; };
    }

    const eagerCount = Math.min(EAGER_FRAME_COUNT, totalFrames);
    for (let i = 0; i < eagerCount; i++) loadFrame(i);

    let nextIndex = eagerCount;
    const BATCH_SIZE = 24;
    const BATCH_DELAY_MS = 150;
    let timeoutId: number | null = null;
    const scheduleBatch = () => {
      if (cancelled || nextIndex >= totalFrames) return;
      const end = Math.min(nextIndex + BATCH_SIZE, totalFrames);
      for (let i = nextIndex; i < end; i++) loadFrame(i);
      nextIndex = end;
      if (nextIndex < totalFrames && !cancelled) {
        timeoutId = window.setTimeout(scheduleBatch, BATCH_DELAY_MS);
      }
    };
    scheduleBatch();

    return () => {
      cancelled = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [totalFrames, imageFolderPath, frameFilePrefix, frameFileSuffix, frameIndexOneBased, fileExtension, preloadBeforeShow]);

  const rafRef = useRef<number | null>(null);
  const latestProgressRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  // Invalidate canvas size when preload overlay hides so next paint re-measures
  useEffect(() => {
    if (preloadBeforeShow && isExperienceReady) {
      sizeRef.current = { width: 0, height: 0, dpr: 1 };
    }
  }, [preloadBeforeShow, isExperienceReady]);

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      // High-quality scaling for clearer, less glitchy frames
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Prefer the requested index; if it's not loaded yet, fall back
      // to the nearest loaded frame so scrolling never shows a blank canvas.
      let img = images[index];
      if (!img) {
        for (let i = index; i >= 0 && !img; i--) {
          img = images[i];
        }
      }
      if (!img) {
        for (let i = index + 1; i < images.length && !img; i++) {
          img = images[i];
        }
      }
      if (!img) return;

      const dpr = window.devicePixelRatio || 1;
      let { width, height } = canvas.getBoundingClientRect();
      if (width <= 0 || height <= 0) {
        width = canvas.parentElement?.clientWidth ?? typeof window !== "undefined" ? window.innerWidth : 800;
        height = canvas.parentElement?.clientHeight ?? typeof window !== "undefined" ? window.innerHeight : 600;
      }

      // Only resize canvas when dimensions actually change (avoids layout thrash during scroll)
      if (sizeRef.current.width !== width || sizeRef.current.height !== height || sizeRef.current.dpr !== dpr) {
        sizeRef.current = { width, height, dpr };
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }

      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;
      if (canvasRatio > imgRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetY = 0;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [images]
  );

  // Throttle to requestAnimationFrame so we only draw once per display frame (smoother scroll)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    latestProgressRef.current = latest;
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(latestProgressRef.current * (totalFrames - 1)))
      );
      renderFrame(frameIndex);
    });
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const progress = scrollYProgress.get();
      const frameIndex = Math.floor(progress * (totalFrames - 1));
      renderFrame(frameIndex);
    };

    window.addEventListener("resize", handleResize);
    // Initial render when images are ready
    if (images.length > 0) handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [images, totalFrames, scrollYProgress, renderFrame]);

  // When preload overlay hides, force paint current frame so the canvas isn't left black.
  // Delay slightly so layout has completed and getBoundingClientRect() returns non-zero.
  useEffect(() => {
    if (!preloadBeforeShow || !isExperienceReady || images.length === 0) return;
    const paint = () => {
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(progress * (totalFrames - 1)))
      );
      renderFrame(frameIndex);
    };
    const t1 = setTimeout(paint, 50);
    const t2 = setTimeout(paint, 200);
    const t3 = requestAnimationFrame(() => {
      requestAnimationFrame(paint);
    });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(t3);
    };
  }, [preloadBeforeShow, isExperienceReady, images.length, totalFrames, scrollYProgress, renderFrame]);

  return (
    <div className="relative w-full h-full bg-[#0b0b0b] transform-gpu will-change-transform">
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-contain transform-gpu"
        aria-hidden="true"
      />

      {/* Full-screen preload: blocks interaction until enough frames loaded + min time */}
      {preloadBeforeShow && !isExperienceReady && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b0b] pointer-events-auto"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="w-56 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-accent-blue rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: `${Math.min(100, (Math.min(loadedCount, totalFrames) / totalFrames) * 100)}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="font-orbitron text-[10px] sm:text-xs tracking-[0.4em] text-accent-light/70 mb-1">
            LOADING EXPERIENCE
          </p>
          
        </div>
      )}

      {darkenOverlayOpacity > 0 && (
        <div
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: Math.min(Math.max(darkenOverlayOpacity, 0), 1) }}
        />
      )}
      
      {/* Loading Overlay – only cares about the first few frames */}
      {showLoadingOverlay && loadedCount < Math.min(24, totalFrames) && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b0b0b] z-20">
          <div className="text-center">
            <div className="w-48 h-[2px] bg-neutral-gray relative overflow-hidden mb-4">
              <motion.div 
                className="absolute inset-0 bg-accent-blue"
                initial={{ x: "-100%" }}
                animate={{ x: `${(Math.min(loadedCount, 24) / Math.min(24, totalFrames)) * 100 - 100}%` }}
              />
            </div>
            <p className="font-orbitron text-[10px] tracking-[0.5em] text-accent-light/50">
              OPTIMIZING EXPERIENCE...{" "}
              {Math.round(
                (Math.min(loadedCount, 24) / Math.min(24, totalFrames)) * 100
              )}
              %
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
