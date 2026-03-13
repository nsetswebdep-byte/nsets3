"use client";

import { useState, useEffect, useRef } from "react";

const DEFAULT_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];
const DEFAULT_BASE_PATHS = ["/images/sequence/"];

interface SeqImageProps {
  name: string;
  alt: string;
  className?: string;
  /** Base path(s) to try (e.g. ["/sequence/", "/images/sequence/"]). Tried in order. */
  basePaths?: string[];
  /** File extensions to try per path. Default: [".png", ".jpg", ".jpeg", ".webp"] */
  extensions?: string[];
  /** If true, encode name with encodeURIComponent (for filenames with spaces/special chars). */
  encodeName?: boolean;
}

export default function SeqImage({
  name,
  alt,
  className = "",
  basePaths = DEFAULT_BASE_PATHS,
  extensions = DEFAULT_EXTENSIONS,
  encodeName = false,
}: SeqImageProps) {
  const [pathIndex, setPathIndex] = useState(0);
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const tryingRef = useRef<string | null>(null);

  useEffect(() => {
    const base = basePaths[pathIndex];
    const ext = extensions[extIndex];
    const segment = encodeName ? encodeURIComponent(name) : name;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${base}${segment}${ext}`
        : `${base}${segment}${ext}`;
    setSrc(url);
    tryingRef.current = url;
  }, [name, pathIndex, extIndex, basePaths, extensions, encodeName]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.src !== tryingRef.current) return;
    if (extIndex < extensions.length - 1) {
      setExtIndex((i) => i + 1);
    } else if (pathIndex < basePaths.length - 1) {
      setPathIndex((i) => i + 1);
      setExtIndex(0);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className="flex min-h-[200px] w-full items-center justify-center bg-neutral-gray/40 text-center text-sm text-accent-light/40 px-4">
        Add image: public{basePaths[0]}{name}.jpg
      </div>
    );
  }
  if (src === null) {
    return (
      <div
        className="min-h-[200px] w-full animate-pulse bg-neutral-gray/20"
        aria-hidden
      />
    );
  }
  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      loading="eager"
    />
  );
}
