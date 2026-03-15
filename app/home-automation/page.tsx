"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PdfBookViewer from "@/components/PdfBookViewer";
import SeqImage from "@/components/SeqImage";
import BuildingScrollCanvas from "@/components/BuildingScrollCanvas";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { useFrameScrollProgress } from "@/lib/useFrameScrollProgress";
import { NAVBAR_HEIGHT_PX } from "@/lib/siteConfig";

const CONTROL_CARDS = [
  {
    title: "MixPad Genie",
    points: [
      "Multiple installation methods (L&N / Type-C)",
      "Can be connected to a variety of speakers",
      "APP remote control",
      "Touch screen + buttons",
    ],
  },
  {
    title: "Smart Switch",
    points: [
      "Dual-screen intelligent switch",
      "200 keystrokes professional adjustment",
      "Hand paint material spraying process",
      "MixCtrl™ 2.0 button",
    ],
  },
  {
    title: "Smart Lock Series",
    points: [
      "Wi-Fi smart door lock, small lock body, US Type",
      "Support password, card unlock",
      "Extremely safe, extraordinary temperament",
    ],
  },
  {
    title: "Smart Sensor Series",
    points: [
      "Motion Sensor",
      "Door and Window Sensor",
      "Smart Temperature and Humidity Sensor",
      "Smart Water Leak Sensor",
    ],
  },
];

const SMART_SENSORS = [
  { name: "carbon monoxide", label: "Carbon Monoxide" },
  { name: "combustible gas sensor", label: "Combustible Gas Sensor" },
  { name: "emergency button", label: "Emergency Button" },
  { name: "motion sensor", label: "Motion Sensor" },
  { name: "water leak sensor", label: "Water Leak Sensor" },
  { name: "smoke sensor", label: "Smoke Sensor" },
];

// Home automation scroll sequence (0–287)
const HOME_AUTO_TOTAL_FRAMES = 288;

type HomeAutoPhase = {
  threshold: [number, number];
  title: string;
  subtitle: string;
};

const HOME_AUTO_PHASES: HomeAutoPhase[] = [
  {
    threshold: [0, 0.25],
    title: "CONTROL EVERYTHING",
    subtitle: "FROM YOUR FINGERTIPS",
  },
  {
    threshold: [0.25, 0.5],
    title: "HOMEAI OS 3.0",
    subtitle: "ACTIVE INTELLIGENCE SYSTEM",
  },
  {
    threshold: [0.5, 0.75],
    title: "MIXPAD SERIES",
    subtitle: "SUPER SMART PANELS",
  },
  {
    threshold: [0.75, 1],
    title: "SECURITY & SENSORS",
    subtitle: "LOCKS • CAMERAS • TRACKING",
  },
];

export default function HomeAutomationPage() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress, smoothProgress, scrollIndicatorOpacity } = useFrameScrollProgress(containerRef);

  return (
    <main className="relative min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Fixed Background Sequence — starts below navbar so frames aren't cut; frame-viewport-below-nav for mobile */}
      <div
        className="fixed left-0 right-0 w-full overflow-hidden pointer-events-none z-0 will-change-transform transform-gpu contain-paint frame-viewport-below-nav"
        style={{ top: NAVBAR_HEIGHT_PX }}
      >
        <div className="absolute inset-0 will-change-transform transform-gpu">
          <BuildingScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={HOME_AUTO_TOTAL_FRAMES}
            imageFolderPath="/images/sequence/homeautomation"
            frameFilePrefix="frame_"
            frameFileSuffix="_delay-0.041s"
            fileExtension="webp"
            darkenOverlayOpacity={0.2}
            showLoadingOverlay={false}
            preloadBeforeShow
            minDisplayTimeMs={6000}
            targetLoadRatio={0.45}
          />
        </div>
        {/* Text overlay pinned over the sequence, phase-based like home page */}
        <HomeAutomationOverlay scrollYProgress={smoothProgress} />
      </div>

      {/* Scrollable Content Spacer - Drives the sequence; touch-action so mobile scroll works */}
      <section ref={containerRef} className="h-[500vh] relative z-10 pointer-events-none" aria-hidden="true">
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 opacity-30 sm:bottom-8"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-[8px] tracking-[0.5em] font-bold">SCROLL</span>
          <div className="w-[1px] h-8 bg-accent-light/50" />
        </motion.div>
      </section>

      {/* Post-Sequence Content - Overlays the background */}
      <div className="relative z-20 mt-[-100vh]">
        {/* Spacer to let sequence play under navbar before content */}
        <div className="h-screen w-full pointer-events-none" />

        {/* Control Everything + Product Cards */}
        <section className="border-b border-white/5 px-4 py-16 sm:px-6 sm:py-24 md:px-8 bg-[#0b0b0b]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center md:mb-20">
            <h2 className="mb-4 text-3xl font-black md:text-4xl">
              CONTROL EVERYTHING FROM YOUR FINGERTIPS
            </h2>
            <p className="text-accent-light/60">
              Turn on your light, play your favorite music, or change your room temperature.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTROL_CARDS.map((card, i) => (
              <div
                key={card.title}
                className="hud-border p-6 transition-colors hover:border-accent-blue/30"
              >
                <h3 className="mb-4 font-bold text-accent-light">{card.title}</h3>
                <ul className="space-y-2 text-sm text-accent-light/70">
                  {card.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-blue" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* HomeAI OS 3.0 */}
        <section className="border-b border-white/5 bg-[#0d0d0d]/90 px-4 py-16 sm:px-6 sm:py-24 md:px-8 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent-blue/50 text-accent-blue">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h2 className="mb-6 text-2xl font-black md:text-3xl">HomeAI OS 3.0</h2>
          <p className="mb-6 leading-relaxed text-accent-light/70">
            N-SETS is committed to reshaping the connection between people and environment with
            technological aesthetics to make life better.
          </p>
          <p className="leading-relaxed text-accent-light/70">
            HomeAI OS 3.0, the active intelligence system, is a global leader in active intelligence
            and whole-house system capability, with strong technical research and development
            strength.
          </p>
        </div>
      </section>

        {/* MixPad X Full Screen Super Smart Panel — dark promo layout */}
        <section className="border-b border-white/5 bg-[#08090c]/90 px-4 py-14 sm:px-6 sm:py-20 md:px-8 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: badge, title, bullets, VRV panel */}
            <div className="flex flex-col">
              <div className="mb-6 inline-block w-fit rounded-sm bg-black/60 px-4 py-2 text-center text-[11px] font-bold tracking-[0.2em] text-accent-light">
                5G SMART LIFE IN ONE STEP
              </div>
              <h2 className="mb-8 text-2xl font-black uppercase leading-tight tracking-tight text-white md:text-3xl lg:text-[1.75rem]">
                MixPad X Full Screen
                <br />
                Super Smart Panel
              </h2>
              <ul className="mb-10 space-y-4 text-base text-accent-light/90">
                {[
                  "12.3 inches widescreen",
                  "Smart Super Screen — the perfection of technology and aesthetics",
                  "Intelligent Central Control of thousands of devices",
                  "Hi-Fi stereo wall sound",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 bg-accent-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto w-full max-w-sm rounded-lg border border-white/10 bg-black/30 p-4">
                <p className="mb-3 text-[10px] font-bold tracking-widest text-accent-light/50 uppercase">VRV AC panel</p>
                <div className="relative flex min-h-[140px] items-center justify-center overflow-hidden rounded">
                  <SeqImage name="maxd2" alt="VRV AC panel" className="max-h-[140px] max-w-full object-contain" encodeName />
                </div>
              </div>
            </div>
            {/* Right: main panel — prominent, full visibility */}
            <div className="relative flex min-h-[380px] items-center justify-center lg:min-h-[480px]">
              <div className="relative w-full max-w-[280px] rounded-lg border border-white/10 bg-black/20 p-4 shadow-2xl lg:max-w-[320px]">
                <SeqImage
                  name="maxd"
                  alt="MixPad X Full Screen Super Smart Panel"
                  className="w-full max-h-[65vh] object-contain"
                  encodeName
                />
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* MixPad M2 + OLOCK — with product images */}
        <section className="border-b border-white/5 bg-[#0d0d0d]/90 px-4 py-16 sm:px-6 sm:py-24 md:px-8 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl space-y-24">
          {/* MixPad M2 — full product shot, no heavy background frame */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-lg p-2">
              <SeqImage
                name="mixpadm2"
                alt="MixPad M2 Smart Voice Control Panel"
                className="max-h-[420px] w-full max-w-md object-contain"
                encodeName
              />
            </div>
            <div>
              <h2 className="mb-6 text-xl font-black md:text-2xl">
                MixPad M2 Smart Voice Control Panel
              </h2>
              <ul className="space-y-2 text-accent-light/70">
                {[
                  "Four-way high-power light control",
                  "Smart control of whole-house infrared home appliances",
                  "Touch screen, APP multi-dimensional interaction",
                  "400W high power load",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Smart Door Lock — OLOCK */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <h2 className="mb-6 text-xl font-black md:text-2xl">Smart Door Lock — OLOCK</h2>
              <ul className="space-y-2 text-accent-light/70">
                {[
                  "Extremely safe, extraordinary temperament",
                  "Wi-Fi smart door lock, small lock body, US Type",
                  "Support password, card unlock",
                  "Realize the linkage of the whole house smart home",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 flex min-h-[260px] flex-col items-center justify-center gap-4 lg:order-2 lg:flex-row">
              <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg p-2">
                <SeqImage
                  name="smartdoorlock"
                  alt="OLOCK Smart Door Lock"
                  className="max-h-[280px] w-full max-w-sm object-contain"
                  encodeName
                />
              </div>
              
            </div>
          </div>
        </div>
      </section>

        {/* MixPad S — one image, then grey color image below */}
        <section className="border-b border-white/5 px-4 py-16 sm:px-6 sm:py-24 md:px-8 bg-[#0b0b0b]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center text-2xl font-black md:text-3xl">
            MixPad S Super Smart Panel
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-accent-light/60">
            AI voice and APP multi-dimensional interaction. Ready to use without modification.
          </p>

          <div className="flex flex-col items-center gap-10">
            <div className="relative flex w-full min-h-[280px] items-center justify-center overflow-hidden p-8 sm:min-h-[340px]">
              <SeqImage
                name="activeintelligence"
                alt="MixPad S Active intelligence"
                className="max-h-[360px] w-full object-contain"
                encodeName
              />
            </div>
            <div className="relative flex w-full max-w-sm min-h-[140px] items-center justify-center overflow-hidden p-6">
              <SeqImage
                name="grey"
                alt="MixPad S Grey"
                className="max-h-[200px] w-full object-contain"
                encodeName
              />
            </div>
          </div>
        </div>
      </section>

        {/* Smart Security: 360° Protection — banner + two lock images */}
        <section className="border-b border-white/5">
        <div className="bg-[#161a22] py-6 md:py-8">
          <h2 className="text-center text-xl font-bold text-white md:text-2xl">
            Smart Security: 360° Protection
          </h2>
        </div>
        <div className="bg-[#0d0d0d] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-6xl grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col">
              <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden">
                <SeqImage
                  name="smartsecurity1"
                  alt="ORVIBO Smart Door Lock S2"
                  className="max-h-[320px] w-full object-contain"
                  encodeName
                />
              </div>
              <p className="mt-4 text-xs font-bold tracking-widest text-accent-blue">
                MORE SAFE & MORE ADVANCED
              </p>
              <h3 className="mt-1 text-lg font-bold text-accent-light">
                ORVIBO Smart Door Lock S2
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-accent-light/70">
                {[
                  "Independent verification of smart lock cylinder",
                  "Real gold plating armor handle",
                  "MAX 800 long battery life",
                  "Full house smart linkage",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-accent-light/50">
                Technology and Art — iF International Gold Award Team 2020
              </p>
            </div>
            <div className="flex items-center justify-center overflow-hidden">
              <SeqImage
                name="smartsecurity2"
                alt="ORVIBO Smart Door Lock on door"
                className="max-h-[380px] w-full object-contain"
                encodeName
              />
            </div>
          </div>
        </div>
      </section>

        {/* Smart Camera + Smart Sensors */}
        <section className="border-b border-white/5 px-4 py-16 sm:px-6 sm:py-24 md:px-8 bg-[#0b0b0b]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-black">Smart Camera</h2>
          <p className="mb-8 text-center leading-relaxed text-accent-light/70">
            Smart cameras are revolutionizing modern smart homes by enhancing security, convenience, and peace of mind. These advanced cameras are equipped with features such as motion detection, night vision, and real-time video streaming, allowing homeowners to monitor their property remotely from smartphones or other devices. As a key component of the connected home ecosystem, smart cameras seamlessly combine technology and safety to create a smarter, more secure living environment.
          </p>
          <div className="relative mb-12 flex min-h-[200px] items-center justify-center overflow-hidden">
            <SeqImage
              name="smartcamera"
              alt="Smart Camera"
              className="max-h-[280px] w-full object-contain"
              encodeName
            />
          </div>
          <div className="mb-16 h-px bg-white/10" />
          <h2 className="mb-8 bg-white/5 py-4 text-center text-xl font-black tracking-wide">
            Smart Sensors
          </h2>
          <div className="overflow-x-auto pb-4 -mx-6 px-6 md:-mx-8 md:px-8">
            <div className="flex gap-6 min-w-max justify-center">
              {SMART_SENSORS.map((item) => (
                <div
                  key={item.name}
                  className="hud-border flex w-44 shrink-0 flex-col overflow-hidden rounded-lg transition-colors hover:border-accent-blue/30"
                >
                  <div className="relative flex min-h-[140px] items-center justify-center bg-neutral-gray/10 p-4">
                    <SeqImage
                      name={item.name}
                      alt={item.label}
                      className="max-h-[160px] w-full object-contain"
                      encodeName
                    />
                  </div>
                  <p className="p-3 text-center text-sm font-medium text-accent-light/80">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* Lighting - Track — ha1, ha2, ha3 collage */}
        <section className="border-b border-white/5 bg-[#0d0d0d]/90 px-4 py-16 sm:px-6 sm:py-24 md:px-8 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-2xl font-black">Smart Lighting & Track</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden lg:min-h-[320px]">
              <SeqImage
                name="ha1"
                alt="Smart Lighting & Track"
                className="max-h-[340px] w-full object-contain"
                encodeName
              />
            </div>
            <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden">
              <SeqImage
                name="ha2"
                alt="Smart Lighting & Track"
                className="max-h-[280px] w-full object-contain"
                encodeName
              />
            </div>
            <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden">
              <SeqImage
                name="ha3"
                alt="Smart Lighting & Track"
                className="max-h-[280px] w-full object-contain"
                encodeName
              />
            </div>
          </div>
        </div>
      </section>

        {/* PDFs: Jie Tech & ORVIBO — stacked vertically, compact */}
        <section className="border-b border-white/5 px-4 py-16 sm:px-6 sm:py-24 md:px-8 bg-[#0b0b0b]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 block font-orbitron text-xs tracking-[0.4em] text-accent-blue">
            CATALOGS
          </span>
          <h2 className="mb-8 text-2xl font-black md:text-3xl">Jie Tech & ORVIBO</h2>
          <div className="flex flex-col gap-10">
            <div className="w-full">
              <h3 className="mb-4 text-lg font-bold text-accent-light">Jie Tech</h3>
              <PdfBookViewer
                src="/images/sequence/jietech.pdf"
                totalPages={21}
                title="Jie Tech catalog"
              />
            </div>
            <div className="w-full">
              <h3 className="mb-4 text-lg font-bold text-accent-light">ORVIBO</h3>
              <PdfBookViewer
                src="/images/sequence/orvibo.pdf"
                totalPages={42}
                title="ORVIBO catalog"
              />
            </div>
          </div>
        </div>
      </section>

        {/* CTA */}
        <section className="border-t border-white/5 px-4 py-14 sm:px-6 sm:py-20 md:px-8 bg-[#0b0b0b]/90 backdrop-blur-sm">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-8 text-accent-light/60">
              Ready to make your home a decade ahead? Get in touch for HomeAI OS and smart solutions.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-accent-blue px-10 py-4 text-sm font-bold tracking-[0.2em] text-white transition-colors hover:bg-accent-blue/90"
            >
              CONTACT US
            </Link>
            <Link
              href="/"
              className="mt-6 block text-sm font-bold tracking-widest text-accent-light/50 transition-colors hover:text-accent-blue"
            >
              ← BACK TO HOME
            </Link>
          </div>
        </section>
      </div>

      {/* Footer outside content wrapper so it's always visible at bottom */}
      <div className="relative z-30">
        <Footer />
      </div>
    </main>
  );
}

function HomeAutomationOverlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-16">
      {HOME_AUTO_PHASES.map((phase, i) => (
        <HomeAutomationPhaseBlock
          key={phase.title}
          phase={phase}
          index={i}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function HomeAutomationPhaseBlock({
  phase,
  index,
  scrollYProgress,
}: {
  phase: HomeAutoPhase;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // First phase ("CONTROL EVERYTHING") is visible from the very first frame; others fade in
  const isFirstPhase = index === 0;
  const opacity = useTransform(
    scrollYProgress,
    isFirstPhase
      ? [phase.threshold[0], phase.threshold[1] - 0.05, phase.threshold[1]]
      : [phase.threshold[0], phase.threshold[0] + 0.05, phase.threshold[1] - 0.05, phase.threshold[1]],
    isFirstPhase ? [1, 1, 0] : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    isFirstPhase
      ? [phase.threshold[0], phase.threshold[1] - 0.05, phase.threshold[1]]
      : [phase.threshold[0], phase.threshold[0] + 0.05, phase.threshold[1] - 0.05, phase.threshold[1]],
    isFirstPhase ? [0, 0, -20] : [20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-16 text-left"
    >
      <div className="max-w-xl">
        <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
          HOME AUTOMATION
        </span>
        <h2 className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-black mb-1 sm:mb-2 leading-none uppercase tracking-tighter">
          {phase.title}
        </h2>
        <p className="text-accent-blue text-sm sm:text-sm md:text-lg font-medium tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-2">
          {phase.subtitle}
        </p>
        <p className="text-accent-light/70 text-xs sm:text-sm max-w-md">
          N-SETS HomeAI OS connects panels, switches, locks, cameras, and sensors into one
          intelligent ecosystem for smarter living.
        </p>
      </div>
    </motion.div>
  );
}
