"use client";

import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import BuildingScrollCanvas from "@/components/BuildingScrollCanvas";
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

export default function LabEquipmentPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    restDelta: 0.001,
    restSpeed: 0.002,
  });

  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.05], [0.3, 0]);

  return (
    <main className="relative bg-[#0b0b0b] min-h-screen text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Fixed Background — video scrolls with page */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0 will-change-transform transform-gpu contain-paint">
        <div className="absolute inset-0 will-change-transform transform-gpu">
          <BuildingScrollCanvas
            scrollYProgress={smoothProgress}
            totalFrames={LAB_TOTAL_FRAMES}
            imageFolderPath="/images/sequence/labequipmentframes"
            frameFilePrefix="frame_"
            frameFileSuffix="_delay-0.05s"
            fileExtension="webp"
            showLoadingOverlay={false}
          />
        </div>
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

      <div ref={containerRef} className="relative z-20">

        {/* 1. Hero title */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
              LAB & EQUIPMENT
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              ELECTRONICS, TOOLS & RENTAL
            </h1>
            <p className="text-accent-light/70 text-lg max-w-2xl mx-auto">
              A single view of our electronics trainers, digital logic systems, equipment &amp; tools, and
              specialized rental services.
            </p>
          </div>
        </section>

        {/* 2. Scroll-reveal: section titles one by one (video behind); trainers get short summary below title */}
        <section className="relative" aria-label="Overview">
          {SCROLL_REVEAL_STEPS.slice(1).map((step, i) => (
            <div
              key={i}
              className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-24"
            >
              <div className="max-w-3xl mx-auto text-center">
                <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
                  {step.label}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-6">
                  {step.title}
                </h2>
                {step.summary && (
                  <div
                    className={`text-accent-light/80 text-sm sm:text-base space-y-3 max-w-2xl mx-auto mt-6 ${
                      step.label === "EQUIPMENT RENTAL SERVICES" ? "text-center" : "text-left"
                    }`}
                  >
                    {step.summary.map((line, j) => (
                      <p key={j} className="leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Download Profile — clicking generates and downloads the PDF */}
        <section className="border-t border-white/10 py-16 sm:py-24 px-4 sm:px-6 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            DOWNLOAD
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            DOWNLOAD LAB & EQUIPMENT PROFILE
          </h2>
          <p className="text-accent-light/60 text-sm sm:text-base mb-4 max-w-lg mx-auto">
            The profile PDF contains the full document: all trainer characteristics, memory map, system configuration, list of modules, main aspects, features, plus digital logic, FPGA, equipment & tools, and rental inventory. Download below.
          </p>
          <p className="text-accent-light/50 text-xs sm:text-sm mb-8 max-w-md mx-auto">
            One PDF — categories, modules, features, and rental information in detail.
          </p>
          <button
            type="button"
            onClick={handleDownloadProfile}
            disabled={downloading}
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent-blue hover:bg-accent-blue/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm tracking-[0.2em] transition-colors"
          >
            {downloading ? (
              "Checking…"
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                DOWNLOAD PROFILE
              </>
            )}
          </button>
          {downloadError && (
            <p className="mt-4 text-sm text-amber-400/90 max-w-md mx-auto" role="alert">
              {downloadError}
            </p>
          )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

