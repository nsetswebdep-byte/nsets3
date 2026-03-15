"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useTransform, type MotionValue } from "framer-motion";
import BuildingScrollCanvas from "@/components/BuildingScrollCanvas";
import { useFrameScrollProgress } from "@/lib/useFrameScrollProgress";
import { generateLabEquipmentProfilePdf } from "@/lib/labEquipmentProfilePdf";

const LAB_TOTAL_FRAMES = 242;

/** Short in-page summaries for trainers (few main points); full detail stays in PDF */
const PLC_TRAINER_SUMMARY = [
  "Trainer Characteristics: Block Diagram, Inputs, Digital Inputs, Digital Inputs Wiring, Digital Outputs, Digital Output Wiring, Analog Inputs, Analog Input Wiring, Analog Outputs, Analog Outputs Wiring, Sample Connections.",
  "Onboard PLC System Configuration: CPU components, PLC indicators, I/O indicators, Peripheral port, RS 232, Battery, Expansion Connector.",
  "Onboard PLC Memory Map: Input/Output Relay, Internal Relay, Timers, Counters, Data registers, File registers, Index Registers.",
];
const POWER_ELECTRONICS_SUMMARY = [
  "List Of Modules: DC Power Supply Module, SCR DIAC TRIAC IGBT Module, Uncontrolled Rectifiers Module, BUCK, BOOST, BUCK BOOST, FLY BACK, H BRIDGE, Controlled Rectifiers, POWER CONTROL, MOSFET DRIVER, SCR DRIVER, APPLICATION MODULE, LOAD Module.",
];
const TRANSFORMER_SUMMARY = [
  "Main Aspects: Basic design parameters (Turn ratio calculation), Core material selection, Losses in different areas, Full load / No load calculations, Power input power output calculations, Wattage of the device, Design optimization, Lamination and air gap covering.",
  "Features: Single-Phase Multiple turn Transformer 3A, 2 Digital Volt Meter, 2 Digital Current Meter, Resistive Load Bank with selector switch to vary Resistive Load, Main Isolator, Flexible to Used as 3-Phase Transformer Trainer.",
  "Transformer is a major part of any linear power supply. To become familiar with this part here is a complete system in which complete transformer design is demonstrated with state of the art technology. We give complete basics as well as students at the end come up with a good working prototype.",
];
const DIGITAL_LOGIC_SUMMARY = [
  "Main Aspects: Suitable for combinational logic, sequential logic, and microprocessor circuit experimentation and Design; ideal for learning digital logic basics; integrated training system with complete curriculum; comprehensive power supply, signal supply, and testing devices; large breadboard for expandability; use with TTL, CMOS, NMOS, PMOS and ECL circuits; all supplies equipped with overload protection.",
  "Features: Power Switch with Inner Light Indicator; Input Power Supply 110/220V AC ±10% 50/60Hz & Fuse Protected; Fixed DC +5V, -5V, +12V, -12V (1A for +5V rail, 300mA others); Output overload Protection; Logic Switches with +5V and Inverted Output.",
  "Digital Logic Design Trainer is a major part of Digital Lab — a comprehensive, self-contained system with power supply, signal generator, switches and displays installed on the main unit.",
];
const FPGA_SUMMARY = [
  "Main Aspects: IC Xilinx Spartan-3E FPGA 500K or 1200K gates; Connectors: USB2 Port, Hirose FX2, Four 12-pin Pmod, VGA, PS/2, serial; Programming via Digilent USB2 (board power, programming, data transfers).",
  "Features: 16MB fast SDRAM, 16MB Flash ROM; works with ISE/Webpack and EDK; 75 FPGA I/O's to expansion connectors; ESD and short-circuit protected; on-board eight LEDs, four-digit seven-segment display, four pushbuttons, eight slide switches; ships in DVD case with USB2 cable.",
  "The Nexys-2 is a powerful digital system design platform built around a Xilinx Spartan 3E FPGA, suited to embedded processors like Microblaze™ — wide range of designs without additional components.",
];
const RENTAL_INVENTORY_SUMMARY = [
  
  "1. 40 GHz VNA",
  "2. Spectrum Analyzer",
  "3. 110 GHz VNA (Update in Process)",
  "4. Probe Station (Update in Process)",
];

/** Scroll-reveal: title only for trainers; optional short summary below */
const SCROLL_REVEAL_STEPS: { label: string; title: string; summary?: readonly string[] }[] = [
  { label: "LAB & EQUIPMENT", title: "ELECTRONICS, TOOLS & RENTAL" },
  { label: "INDUSTRIAL ELECTRONICS CATEGORY", title: "PLC TRAINER", summary: PLC_TRAINER_SUMMARY },
  { label: "POWER ELECTRONICS CATEGORY", title: "Power Electronics Trainer", summary: POWER_ELECTRONICS_SUMMARY },
  { label: "ELECTRIC MACHINES CATEGORY", title: "Basic Transformer Trainer", summary: TRANSFORMER_SUMMARY },
  { label: "DIGITAL LOGIC DESIGN", title: "Digital Logic Design Trainer", summary: DIGITAL_LOGIC_SUMMARY },
  { label: "FPGA BOARD", title: "FPGA Board (Field Programmable Gate Array)", summary: FPGA_SUMMARY },
  { label: "EQUIPMENT & TOOLS", title: "Industrial · Educational Equipment & Tools" },
  { label: "EQUIPMENT RENTAL SERVICES", title: "Available Equipment (Rental Inventory)", summary: RENTAL_INVENTORY_SUMMARY },
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
            minDisplayTimeMs={6000}
            targetLoadRatio={0.45}
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
          key={phase.title}
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
