"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import SeqImage from "@/components/SeqImage";

const PLC_MEMORY_MAP = [
  "Input/Output Relay",
  "Internal Relay",
  "Timers",
  "Counters",
  "Data registers",
  "File registers",
  "Index Registers",
];

const PLC_INPUTS_OUTPUTS = [
  { title: "Digital Inputs", sub: "Digital Inputs Wiring" },
  { title: "Digital Outputs", sub: "Digital Output Wiring" },
  { title: "Analog Inputs", sub: "Analog Input Wiring" },
  { title: "Analog Outputs", sub: "Analog Outputs Wiring" },
];

const PLC_SYSTEM = [
  "CPU components",
  "PLC indicators",
  "I/O indicators",
  "Peripheral port",
  "RS 232",
  "Battery",
  "Expansion Connector",
];

const POWER_MODULES = [
  "DC Power Supply Module",
  "SCR, DIAC, TRIAC IGBT Module",
  "Uncontrolled Rectifiers Module",
  "BUCK Module",
  "BOOST Module",
  "BUCK BOOST Module",
  "FLY BACK Module",
  "H BRIDGE Module",
  "Controlled Rectifiers Module",
  "POWER CONTROL Module",
  "MOSFET DRIVER Module",
  "SCR DRIVER Module",
  "APPLICATION MODULE",
  "LOAD Module",
];

const TRANSFORMER_ASPECTS = [
  "Basic design parameters: turn ratio calculation",
  "Core material selection",
  "Losses in different areas",
  "Full load / No load calculations",
  "Power input and power output calculations",
  "Wattage of the device",
  "Design optimization",
  "Lamination and air gap covering",
];

const TRANSFORMER_FEATURES = [
  "Single-Phase Multiple turn Transformer 3A",
  "2 Digital Volt Meter",
  "2 Digital Current Meter",
  "Resistive Load Bank with selector switch to vary resistive load",
  "Main Isolator",
  "Flexible to use as 3-Phase Transformer Trainer",
];

export default function ElectronicsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            TRAINERS & SYSTEMS
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            ELECTRONICS
          </h1>
          <p className="text-accent-light/60 text-lg max-w-2xl mx-auto">
            Industrial electronics, power electronics, and electric machines trainers for education and labs — from PLC systems to transformer design.
          </p>
        </div>
      </section>

      {/* 1. Industrial Electronics — PLC Trainer */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            INDUSTRIAL ELECTRONICS
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-10">
            PLC TRAINER
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] hud-border overflow-hidden bg-neutral-gray/20">
              <SeqImage
                name="electronics1"
                alt="PLC Trainer unit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">
                  ONBOARD PLC MEMORY MAP
                </h3>
                <ul className="space-y-1">
                  {PLC_MEMORY_MAP.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-accent-light/70 text-sm">
                      <span className="w-1.5 h-1.5 shrink-0 bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">
                  TRAINER CHARACTERISTICS
                </h3>
                <p className="text-accent-light/60 text-sm mb-3">Block diagram, sample connections</p>
                <ul className="space-y-2">
                  {PLC_INPUTS_OUTPUTS.map((item, i) => (
                    <li key={i} className="text-accent-light/70 text-sm">
                      <span className="text-accent-light">{item.title}</span>
                      <span className="text-accent-light/50"> — {item.sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">
                  ONBOARD PLC SYSTEM CONFIGURATION
                </h3>
                <ul className="space-y-1">
                  {PLC_SYSTEM.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-accent-light/70 text-sm">
                      <span className="w-1.5 h-1.5 shrink-0 bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Power Electronics */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            POWER ELECTRONICS
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-6">
            POWER ELECTRONICS TRAINER
          </h2>
          <p className="text-accent-light/70 leading-relaxed mb-10 max-w-2xl">
            The PE-1000 offers experiments for fundamental-level topics of a Power Electronics course. It enables students to acquire a clear experimental view of basic concepts and become familiar with the operative aspects of work in the Power Electronics laboratory.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] hud-border overflow-hidden bg-neutral-gray/20 order-2 lg:order-1">
              <SeqImage
                name="electronics2"
                alt="Power Electronics Trainer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">
                LIST OF MODULES
              </h3>
              <ul className="space-y-2">
                {POWER_MODULES.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-accent-light/70 text-sm">
                    <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Electric Machines — Basic Transformer Trainer */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            ELECTRIC MACHINES
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-6">
            BASIC TRANSFORMER TRAINER
          </h2>
          <p className="text-accent-light/70 leading-relaxed mb-10 max-w-2xl">
            The transformer is a major part of any linear power supply. This complete system demonstrates full transformer design with state-of-the-art technology — from basic principles to a working prototype.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] hud-border overflow-hidden bg-neutral-gray/20">
              <SeqImage
                name="electronics3"
                alt="Basic Transformer Trainer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">
                  MAIN ASPECTS
                </h3>
                <ul className="space-y-2">
                  {TRANSFORMER_ASPECTS.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-accent-light/70 text-sm">
                      <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-accent-blue mb-4">
                  FEATURES
                </h3>
                <ul className="space-y-2">
                  {TRANSFORMER_FEATURES.map((item, i) => (
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

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent-light/60 mb-8">
            For electronics trainers and lab equipment inquiries.
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
