"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { BUILDING_PHASES } from "@/data/buildingData";
import { NAVBAR_HEIGHT_PX } from "@/lib/siteConfig";
import { useEffect, useState } from "react";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function BuildingExperience({ scrollYProgress }: Props) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-16"
      style={{ paddingTop: `${NAVBAR_HEIGHT_PX}px` }}
    >
      <div className="flex justify-end items-start">
        <motion.div className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-black text-accent-light opacity-20">
          <ScrollPercent scrollYProgress={scrollYProgress} />
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row justify-end md:justify-between items-center md:items-end w-full">
        {/* Bottom: Title & Subtitle — centered on mobile, left on desktop */}
        <div className="w-full max-w-md md:max-w-[85%] sm:max-w-xl mx-auto md:mx-0 text-center md:text-left">
          <PhaseContent scrollYProgress={scrollYProgress} />
        </div>

        {/* Bottom Right: Decorative Rail */}
        <div className="hidden md:flex flex-col items-center gap-4">
          <div className="h-32 w-[1px] bg-gradient-to-t from-accent-blue to-transparent" />
          <span className="rotate-90 origin-center text-[10px] tracking-[0.5em] text-accent-blue/50 whitespace-nowrap mb-8 uppercase">
            N-SETS ENGINEERING
          </span>
        </div>
      </div>
      
      {/* Visual Rails / Border accents */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-accent-light/5 to-transparent" />
    </div>
  );
}

function ScrollPercent({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => setPercent(Math.floor(v * 100)));
  }, [scrollYProgress]);
  return <>{percent.toString().padStart(3, '0')}%</>;
}

function PhaseContent({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="relative h-28 sm:h-32 md:h-40">
      {BUILDING_PHASES.map((phase, i) => (
        <PhaseBlock key={i} phase={phase} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

function PhaseBlock({ phase, scrollYProgress }: { phase: typeof BUILDING_PHASES[0], scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(
    scrollYProgress,
    [phase.threshold[0], phase.threshold[0] + 0.05, phase.threshold[1] - 0.05, phase.threshold[1]],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress,
    [phase.threshold[0], phase.threshold[0] + 0.05, phase.threshold[1] - 0.05, phase.threshold[1]],
    [20, 0, 0, -20]
  );

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-left">
      <h2 className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-black mb-1 sm:mb-2 leading-none uppercase tracking-tighter">
        {phase.title}
      </h2>
      <p className="text-accent-blue text-sm sm:text-sm md:text-lg font-medium tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-6 uppercase">
        {phase.subtitle}
      </p>
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center md:justify-start">
        {phase.details?.map((detail, idx) => (
          <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1 h-1 bg-accent-blue shrink-0" />
            <span className="text-[9px] sm:text-[10px] tracking-widest text-accent-light/60 uppercase">{detail}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
