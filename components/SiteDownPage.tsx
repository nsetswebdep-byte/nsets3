"use client";

import Image from "next/image";

/** Standalone “site unavailable” screen — no nav or links to other pages. */
export default function SiteDownPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-accent-light flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-10 opacity-90">
          <Image
            src="/images/logos/Nsets logo_horizontal white.png"
            alt="N-SETS"
            width={180}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/[0.03] mb-8">
          <svg
            className="w-7 h-7 text-accent-light/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
          Website Temporarily Unavailable
        </h1>
        <p className="text-accent-light/55 text-sm sm:text-base leading-relaxed mb-8">
          This site is currently offline for maintenance. We apologise for the inconvenience — please try again later.
        </p>

        <div className="hud-border rounded-sm px-4 py-3 text-[11px] tracking-widest text-accent-light/35 uppercase">
          Error 503 · Service Unavailable
        </div>
      </div>
    </main>
  );
}
