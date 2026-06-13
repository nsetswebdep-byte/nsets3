"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useTransform, type MotionValue } from "framer-motion";
import BuildingScrollCanvas from "@/components/BuildingScrollCanvas";
import { useFrameScrollProgress } from "@/lib/useFrameScrollProgress";
import { generateLabEquipmentProfilePdf } from "@/lib/labEquipmentProfilePdf";
import { EXPERIENCE_PRELOAD } from "@/data/buildingData";

const LAB_TOTAL_FRAMES = 242;

/** R&D profile — right-side HUD summaries (from client trading / R&D profile) */
const RND_INTRO_SUMMARY = [
  "Innovative, reliable, and high-performance engineering solutions for industrial and educational sectors.",
  "Practical engineering experience combined with modern technologies to address real-world challenges.",
  "Strong focus on quality, efficiency, and continuous improvement in every project.",
];

const RND_MISSION_SUMMARY = [
  "Professional standards and client expectations guide all R&D activities.",
  "Supporting industries, laboratories, and technical institutions with advanced, dependable solutions.",
  "Structured development process ensuring accuracy, performance, and reliability.",
];

const RND_CAPABILITIES_SUMMARY = [
  "Electronic system design and development · Embedded systems engineering.",
  "Industrial automation and control systems · PCB design and manufacturing.",
  "Prototype development and testing · Engineering training and educational solutions.",
];

const RND_PRODUCTS_1_SUMMARY = [
  "RF Power Amplifiers — efficient, stable designs for industrial and communication applications.",
  "Development Boards & Kits — custom boards for learning, testing, and product development.",
  "PCB Design & Manufacturing — schematic, layout, fabrication, and testing for high-quality circuits.",
];

const RND_PRODUCTS_2_SUMMARY = [
  "Prototype Development — concept to functional product with testing and validation.",
  "Electronic Components & Modules — supply and integration for engineering applications.",
  "Embedded Systems — control, monitoring, and automation across industries.",
  "Engineering Training Kits — practical systems for hands-on institutional learning.",
];

const RND_PRODUCTS_3_SUMMARY = [
  "Automation & Control Systems — customized solutions for efficiency and reliability.",
  "Industrial Problem Solutions — engineering-based answers for process and performance challenges.",
  "Customized Engineering Solutions — tailored to each client's unique technical requirements.",
];

const RND_APPROACH_SUMMARY = [
  "Requirement analysis and consultation · System design and engineering.",
  "Development and integration · Testing and validation · Deployment and technical support.",
  "Research and Planning → System Design and Simulation → PCB Development and Integration → Testing and Validation → Final Implementation and Support.",
];

const RND_COMMITMENT_SUMMARY = [
  "Manufacturing and industrial operations · Educational institutions and universities.",
  "Research and development organizations · Automation and engineering companies.",
  "Committed to innovation, quality, and customer satisfaction — reliable, efficient, future-ready solutions.",
];

/** Scroll-reveal phases for R&D profile */
const SCROLL_REVEAL_STEPS: { label: string; title: string; summary?: readonly string[] }[] = [
  { label: "R & D PROFILE", title: "RESEARCH & DEVELOPMENT", summary: RND_INTRO_SUMMARY },
  { label: "INTRODUCTION", title: "N-SETS R&D DIVISION", summary: RND_MISSION_SUMMARY },
  { label: "CORE CAPABILITIES", title: "TECHNICAL SERVICES", summary: RND_CAPABILITIES_SUMMARY },
  { label: "PRODUCTS & DEVELOPMENT", title: "RF & PCB SOLUTIONS", summary: RND_PRODUCTS_1_SUMMARY },
  { label: "PRODUCTS & DEVELOPMENT", title: "PROTOTYPES & TRAINING", summary: RND_PRODUCTS_2_SUMMARY },
  { label: "CUSTOMIZED SOLUTIONS", title: "AUTOMATION & INDUSTRIAL", summary: RND_PRODUCTS_3_SUMMARY },
  { label: "OUR APPROACH", title: "DEVELOPMENT PROCESS", summary: RND_APPROACH_SUMMARY },
  { label: "OUR COMMITMENT", title: "INDUSTRIES WE SERVE", summary: RND_COMMITMENT_SUMMARY },
];

const PROFILE_PDF_FILENAME = "Lab-Equipment-Profile.pdf";

type LabPhase = {
  threshold: [number, number];
  label: string;
  title: string;
  summary?: readonly string[];
};

const LAB_PHASES: LabPhase[] = SCROLL_REVEAL_STEPS.map((step, index, arr) => {
  const start = index / arr.length;
  const end = (index + 1) / arr.length;
  return {
    threshold: [start, end],
    label: step.label,
    title: step.title,
    summary: step.summary,
  };
});

export default function LabEquipmentPage() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  function handleDownloadProfile(e: React.MouseEvent) {
    e.preventDefault();
    setDownloadError(null);
    setDownloading(true);
    try {
      const blob = generateLabEquipmentProfilePdf();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = PROFILE_PDF_FILENAME;
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadError("Failed to generate profile PDF. Please try again.");
      console.error(err);
    } finally {
      setDownloading(false);
    }
  }

  const { scrollYProgress, smoothProgress, scrollIndicatorOpacity } = useFrameScrollProgress(containerRef);

  return (
    <main className="relative bg-[#0b0b0b] min-h-screen text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Fixed Background — frame-viewport for mobile */}
      <div className="fixed inset-0 w-full overflow-hidden pointer-events-none z-0 will-change-transform transform-gpu contain-paint frame-viewport">
        <div className="absolute inset-0 will-change-transform transform-gpu">
          <BuildingScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={LAB_TOTAL_FRAMES}
            imageFolderPath="/images/sequence/labequipmentframes"
            frameFilePrefix="frame_"
            frameFileSuffix="_delay-0.05s"
            fileExtension="webp"
            darkenOverlayOpacity={0.3}
            showLoadingOverlay={false}
            preloadBeforeShow
            minDisplayTimeMs={EXPERIENCE_PRELOAD.minDisplayTimeMs}
            targetLoadRatio={EXPERIENCE_PRELOAD.targetLoadRatio}
            minFramesToStart={EXPERIENCE_PRELOAD.minFramesToStart}
          />
        </div>
        {/* Bottom-left phase titles animating with scroll */}
        <LabEquipmentOverlay scrollYProgress={smoothProgress} />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 opacity-30 sm:bottom-8 z-30 pointer-events-none"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <span className="text-[8px] tracking-[0.5em] font-bold">SCROLL</span>
        <div className="w-[1px] h-8 bg-accent-light/50" />
      </motion.div>

      <div className="relative z-20">

        {/* Scroll drivers for phase overlays; touch-none so mobile scroll drives frames */}
        <section ref={containerRef} aria-hidden="true">
          {SCROLL_REVEAL_STEPS.map((_, i) => (
            <div
              key={i}
              className="min-h-screen"
            />
          ))}
        </section>

        <Footer />
      </div>
    </main>
  );
}

function LabEquipmentOverlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-16 lg:pl-20 lg:pr-20 xl:pl-24 xl:pr-24">
      {LAB_PHASES.map((phase, index) => (
        <LabPhaseBlock
          key={`${phase.label}-${index}`}
          phase={phase}
          index={index}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function LabPhaseBlock({
  phase,
  index,
  scrollYProgress,
}: {
  phase: LabPhase;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const [start, end] = phase.threshold;

  const opacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0.02, end - 0.05, end]
      : [start, start + 0.05, end - 0.05, end],
    isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [0, 0.02, end - 0.05, end]
      : [start, start + 0.05, end - 0.05, end],
    isFirst ? [0, 0, 0, -20] : [20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-16 lg:pl-20 lg:pr-20 xl:pl-24 xl:pr-24 text-left"
    >
      <div className="w-full flex flex-col md:flex-row justify-between gap-6 md:gap-12">
        <div className="max-w-xl pl-2 sm:pl-4">
          <span className="font-orbitron text-xs font-semibold tracking-[0.4em] text-blue-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mb-3 block">
            {phase.label}
          </span>
          <h2 className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-black mb-1 sm:mb-2 leading-none uppercase tracking-tighter">
            {phase.title}
          </h2>
        </div>
        {phase.summary && (
          <div className="ml-auto max-w-xl min-w-0 rounded-lg bg-black/25 backdrop-blur-sm px-4 py-3 pr-4 sm:pr-6 text-right">
            <div className="text-[11px] sm:text-xs md:text-sm text-accent-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] space-y-1 md:space-y-2">
              {phase.summary.map((line, idx) => (
                <p key={idx} className="leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
