"use client";

import { useState, useEffect, useRef } from "react";

interface PdfBookViewerProps {
  src: string;
  totalPages: number;
  title?: string;
  className?: string;
}

export default function PdfBookViewer({
  src,
  totalPages,
  title = "PDF catalog",
  className = "",
}: PdfBookViewerProps) {
  const [page, setPage] = useState(1);
  const [containerSize, setContainerSize] = useState<{ w: number; h: number } | null>(null);
  const [pdfAspectRatio, setPdfAspectRatio] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) setContainerSize({ w: width, h: height });
    };

    updateSize();
    // Re-measure after layout (fixes client-side nav where container can be 0 initially)
    let rafId = requestAnimationFrame(() => {
      updateSize();
      setTimeout(updateSize, 100);
    });
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    const io = new IntersectionObserver(
      () => updateSize(),
      { root: null, rootMargin: "0px", threshold: 0 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!src) return;
    const pdfUrl =
      typeof window !== "undefined" ? `${window.location.origin}${src}` : src;
    let cancelled = false;
    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        const doc = await pdfjsLib.getDocument(pdfUrl).promise;
        if (cancelled) return;
        const pdfPage = await doc.getPage(1);
        const viewport = pdfPage.getViewport({ scale: 1 });
        if (!cancelled) setPdfAspectRatio(viewport.width / viewport.height);
      } catch {
        if (!cancelled) setPdfAspectRatio(null);
      }
    })();
    return () => { cancelled = true; };
  }, [src]);

  useEffect(() => {
    if (!containerSize || !src) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const pdfUrl =
      typeof window !== "undefined" ? `${window.location.origin}${src}` : src;
    let cancelled = false;
    setError(null);
    setIsDrawing(true);

    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs";
        }

        const doc = await pdfjsLib.getDocument(pdfUrl).promise;
        if (cancelled) return;

        const pdfPage = await doc.getPage(page);
        if (cancelled) return;

        const viewport1 = pdfPage.getViewport({ scale: 1 });
        const scale = Math.min(
          containerSize.w / viewport1.width,
          containerSize.h / viewport1.height
        );
        const viewport = pdfPage.getViewport({ scale });

        if (cancelled) return;

        const ctx = canvas.getContext("2d");
        if (!ctx || cancelled) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await pdfPage.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        if (!cancelled) setIsDrawing(false);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load PDF");
          setIsDrawing(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src, page, containerSize]);

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full hud-border overflow-hidden bg-neutral-gray/20 flex items-center justify-center"
        style={
          containerSize?.w && pdfAspectRatio
            ? { height: containerSize.w / pdfAspectRatio, minHeight: 240, maxHeight: "min(65vh, 520px)" }
            : { aspectRatio: "4/3", minHeight: 240, maxHeight: "min(65vh, 520px)" }
        }
      >
        {error && (
          <div className="text-accent-light/50 text-sm text-center p-4">
            {error}. Ensure the PDF is at <code className="text-accent-blue">{src}</code>
          </div>
        )}
        {!error && containerSize && (
          <div className="absolute inset-0 flex items-center justify-center p-1">
            <canvas
              ref={canvasRef}
              aria-label={`${title} page ${page}`}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: "100%", opacity: isDrawing ? 0.6 : 1 }}
            />
            {isDrawing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}

        {page > 1 && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-0 bottom-0 w-12 md:w-16 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white transition-colors z-10"
            aria-label="Previous page"
          >
            <span className="text-2xl font-light">&lt;</span>
          </button>
        )}
        {page < totalPages && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-0 bottom-0 w-12 md:w-16 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white transition-colors z-10"
            aria-label="Next page"
          >
            <span className="text-2xl font-light">&gt;</span>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 mt-3 px-2 py-2 bg-white/5 border border-white/10">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage(1)}
            disabled={page <= 1}
            className="p-2 text-accent-light/70 hover:text-accent-blue disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="First page"
          >
            &laquo;
          </button>
          <button
            type="button"
            onClick={goPrev}
            disabled={page <= 1}
            className="p-2 text-accent-light/70 hover:text-accent-blue disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          <span className="text-sm text-accent-light/80 min-w-[4rem] text-center">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={page >= totalPages}
            className="p-2 text-accent-light/70 hover:text-accent-blue disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            &rsaquo;
          </button>
          <button
            type="button"
            onClick={() => setPage(totalPages)}
            disabled={page >= totalPages}
            className="p-2 text-accent-light/70 hover:text-accent-blue disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Last page"
          >
            &raquo;
          </button>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold tracking-widest text-accent-blue hover:underline"
        >
          DOWNLOAD PDF
        </a>
      </div>
    </div>
  );
}
