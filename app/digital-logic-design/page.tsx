"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const IMG_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const IMG_PATHS = ["/sequence/", "/images/sequence/"];

function DldImage({
  name,
  alt,
  className,
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  const [pathIndex, setPathIndex] = useState(0);
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const tryingRef = useRef<string | null>(null);

  // Set image src only after mount so the request always runs on the client with correct origin (fixes reload)
  useEffect(() => {
    const base = IMG_PATHS[pathIndex];
    const ext = IMG_EXTENSIONS[extIndex];
    const url = typeof window !== "undefined"
      ? `${window.location.origin}${base}${name}${ext}`
      : `${base}${name}${ext}`;
    setSrc(url);
    tryingRef.current = url;
  }, [name, pathIndex, extIndex]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Only react to error for the src we're currently trying (avoids spurious onError on reload)
    if (e.currentTarget.src !== tryingRef.current) return;

    if (extIndex < IMG_EXTENSIONS.length - 1) {
      setExtIndex((i) => i + 1);
    } else if (pathIndex < IMG_PATHS.length - 1) {
      setPathIndex((i) => i + 1);
      setExtIndex(0);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className="flex w-full h-full min-h-[200px] items-center justify-center bg-neutral-gray/40 text-accent-light/40 text-sm text-center px-4">
        Add image: public/sequence/{name}.jpg or public/images/sequence/{name}.png
      </div>
    );
  }

  if (src === null) {
    return (
      <div className="w-full h-full min-h-[200px] bg-neutral-gray/20 animate-pulse" aria-hidden />
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

const DLD_MAIN_ASPECTS = [
  "Suitable for combinational logic, sequential logic, and microprocessor circuit experimentation and design.",
  "Ideal tool for learning the basics of digital logic circuits.",
  "Integrated training system, with complete curriculum.",
  "Comprehensive power supply, signal supply, and testing devices for convenient experimentation.",
  "Expandability and flexibility of experiments greatly increased by large breadboard.",
  "Use with TTL, CMOS, NMOS, PMOS and ECL circuits.",
  "All supplies equipped with overload protection.",
];

const DLD_FEATURES = [
  "Power Switch with Inner Light Indicator",
  "Input Power Supply: 110/220V AC ±10% 50/60Hz & Fuse Protected",
  "Fixed DC Power Supply: Voltage range +5V, -5V, +12V and -12V. Max current: 1A for +5V rail, 300mA for others. Output overload protection (fuses).",
  "Logic Switches with +5V",
  "Logic Switches with Inverted Output",
  "FPGA Board (Field Programmable Gate Array) — see below.",
];

const FPGA_MAIN_ASPECTS = [
  "IC: Xilinx Spartan-3E FPGA, 500K or 1200K gates",
  "Connectors: USB2 Port, Hirose FX2, four 12-pin Pmod connectors, VGA, PS/2, and serial ports",
  "Programming: Digilent USB2 port providing board power, programming, and data transfers",
];

const FPGA_FEATURES = [
  "Xilinx Spartan-3E FPGA, 500K or 200K gate",
  "USB2 port providing board power, device configuration, and high-speed data transfers",
  "Works with ISE/Webpack and EDK",
  "16MB fast Micron PSRAM",
  "16MB Intel StrataFlash Flash ROM",
  "Xilinx Platform Flash ROM",
  "50MHz oscillator, plus socket for second oscillator",
  "75 FPGA I/O's routed to expansion connectors (one high-speed Hirose FX2 with 43 signals, four 2×6 Pmod connectors)",
  "All I/O signals ESD and short-circuit protected",
  "On-board I/O: eight LEDs, four-digit seven-segment display, four pushbuttons, eight slide switches",
  "Ships in DVD case with high-speed USB2 cable",
];

export default function DigitalLogicDesignPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            DIGITAL LAB
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            DIGITAL LOGIC DESIGN TRAINER
          </h1>
          <p className="text-accent-light/60 text-lg max-w-3xl mx-auto">
            A comprehensive, self-contained system for digital logic experiments. Power supply, signal generator, switches, and displays are integrated on the main unit — suitable for anyone engaged in digital logic training.
          </p>
        </div>
      </section>

      {/* Section 1: Digital Logic Design Trainer + Image dld1 */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] hud-border overflow-hidden bg-neutral-gray/20">
              <DldImage
                name="dld1"
                alt="Digital Logic Design Trainer unit"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-6">
                DIGITAL LOGIC DESIGN TRAINER
              </h2>
              <p className="text-accent-light/70 leading-relaxed mb-10">
                Digital Logic Design Trainer is a major part of the Digital Lab. It is a comprehensive and self-contained system suitable for anyone engaged in digital logic experiments. All necessary equipment — power supply, signal generator, switches, and displays — is installed on the main unit.
              </p>
              <div className="mb-8">
                <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">MAIN ASPECTS</h3>
                <ul className="space-y-2">
                  {DLD_MAIN_ASPECTS.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-accent-light/70 text-sm">
                      <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">FEATURES</h3>
                <ul className="space-y-2">
                  {DLD_FEATURES.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-accent-light/70 text-sm">
                      <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: FPGA Board (Nexys-2) + Image dld2 */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-black mb-6">
                FPGA BOARD (FIELD PROGRAMMABLE GATE ARRAY)
              </h2>
              <p className="text-accent-light/70 leading-relaxed mb-8">
                The Nexys-2 is a powerful digital system design platform built around a Xilinx Spartan 3E FPGA. With 16Mbytes of fast SDRAM and 16Mbytes of Flash ROM, it is ideally suited to embedded processors like Xilinx’s 32-bit RISC Microblaze™. The on-board high-speed USB2 port, together with a collection of I/O devices, data ports, and expansion connectors, allows a wide range of designs to be completed without any additional components.
              </p>
              <div className="mb-8">
                <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">MAIN ASPECTS</h3>
                <ul className="space-y-2">
                  {FPGA_MAIN_ASPECTS.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-accent-light/70 text-sm">
                      <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">FEATURES</h3>
                <ul className="space-y-2">
                  {FPGA_FEATURES.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-accent-light/70 text-sm">
                      <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative aspect-[4/3] hud-border overflow-hidden bg-neutral-gray/20 order-1 lg:order-2">
              <DldImage
                name="dld2"
                alt="Nexys-2 FPGA Board"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent-light/60 mb-8">
            Interested in our Digital Logic Design systems or curriculum support?
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold text-sm tracking-[0.2em] transition-colors"
          >
            CONTACT US
          </Link>
          <Link
            href="/"
            className="block mt-6 text-accent-light/50 hover:text-accent-blue text-sm font-bold tracking-widest transition-colors"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
