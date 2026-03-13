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
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Progressively preload images instead of blocking on all of them.
  // This makes first frames usable much sooner on slower networks.
  useEffect(() => {
    let cancelled = false;
    const initial: (HTMLImageElement | null)[] = Array(totalFrames).fill(null);
    setImages(initial);
    setLoadedCount(0);

    for (let i = 0; i < totalFrames; i++) {
      const num = frameIndexOneBased ? i + 1 : i;
      const frameIndex = num.toString().padStart(3, "0");
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setLoadedCount((prev) => prev + 1);
        setImages((prev) => {
          const next = prev.slice();
          next[i] = img;
          return next;
        });
      };
      img.src = `${imageFolderPath}/${frameFilePrefix}${frameIndex}${frameFileSuffix}.${fileExtension}`;
    }
    return () => {
      cancelled = true;
    };
  }, [totalFrames, imageFolderPath, frameFilePrefix, frameFileSuffix, frameIndexOneBased, fileExtension]);

  const rafRef = useRef<number | null>(null);
  const latestProgressRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

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
      const { width, height } = canvas.getBoundingClientRect();

      // Only resize canvas when dimensions actually change (avoids layout thrash during scroll)
      if (sizeRef.current.width !== width || sizeRef.current.height !== height || sizeRef.current.dpr !== dpr) {
        sizeRef.current = { width, height, dpr };
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
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

  return (
    <div className="relative w-full h-full bg-[#0b0b0b] transform-gpu will-change-transform">
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-contain transform-gpu"
        aria-hidden="true"
      />
      
      {/* Loading Overlay */}
      {showLoadingOverlay && loadedCount < Math.min(24, totalFrames) && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b0b0b] z-20">
          <div className="text-center">
            <div className="w-48 h-[2px] bg-neutral-gray relative overflow-hidden mb-4">
              <motion.div 
                className="absolute inset-0 bg-accent-blue"
                initial={{ x: "-100%" }}
                animate={{ x: `${(loadedCount / totalFrames) * 100 - 100}%` }}
              />
            </div>
            <p className="font-orbitron text-[10px] tracking-[0.5em] text-accent-light/50">
              OPTIMIZING EXPERIENCE... {Math.round((loadedCount / totalFrames) * 100)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
