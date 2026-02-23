"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
  /** Filename prefix before the frame number, e.g. "frame_" or "video2_" */
  frameFilePrefix?: string;
  /** If true, frame numbers are 1-based (e.g. video2_001..video2_145). If false, 0-based (frame_000..frame_191). */
  frameIndexOneBased?: boolean;
}

export default function BuildingScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
  frameFilePrefix = "frame_",
  frameIndexOneBased = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  // Preload images: PNG only
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let resolved = 0;

    const checkComplete = () => {
      resolved++;
      setLoadedCount(resolved);
      if (resolved === totalFrames) {
        setImages(loadedImages);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const num = frameIndexOneBased ? i + 1 : i;
      const frameIndex = num.toString().padStart(3, "0");
      const img = new Image();
      loadedImages[i] = img;
      img.onload = checkComplete;
      img.src = `${imageFolderPath}/${frameFilePrefix}${frameIndex}.png`;
    }
  }, [totalFrames, imageFolderPath, frameFilePrefix, frameIndexOneBased]);

  const rafRef = useRef<number | null>(null);
  const latestProgressRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[index] ?? images[0];
      if (!img?.complete) return;

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
      {loadedCount < totalFrames && (
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
