"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppLink from "@/components/WhatsAppLink";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cog,
  Cpu,
  Cable,
  Zap,
  Gauge,
  Layers,
  Globe,
  Microchip,
  Factory,
  Ship,
  type LucideIcon,
} from "lucide-react";
import {
  SUPPLY_COUNTRIES,
  TRADING_INTRO,
  TRADING_SECTIONS,
  type TradingSection,
} from "@/lib/tradingData";

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-48px" },
};

const SECTION_ICONS: Record<string, LucideIcon> = {
  cnc: Cog,
  electronics: Cpu,
  cables: Cable,
  electrical: Zap,
  instruments: Gauge,
  metals: Layers,
};

const HIGHLIGHTS = [
  { value: "2015", label: "Established" },
  { value: "5+", label: "Supply countries" },
  { value: "6", label: "Product divisions" },
  { value: "360°", label: "Supply chain" },
];

const CHIP_TO_SHIP = [
  { icon: Microchip, label: "Chip", desc: "Electronic components & automation" },
  { icon: Factory, label: "Manufacture", desc: "CNC, tools & industrial supply" },
  { icon: Ship, label: "Ship", desc: "Logistics & delivery nationwide" },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-accent-light/75 leading-relaxed">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionHeader({
  index,
  section,
}: {
  index: number;
  section: TradingSection;
}) {
  const Icon = SECTION_ICONS[section.id] ?? Cog;
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-accent-blue/30 bg-accent-blue/10">
        <Icon className="h-6 w-6 text-accent-blue" aria-hidden />
      </div>
      <div>
        <span className="text-accent-blue font-orbitron text-[10px] tracking-[0.35em]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-2xl md:text-3xl font-black mt-1">{section.title}</h2>
        {section.intro && (
          <p className="text-accent-light/70 leading-relaxed mt-3 max-w-3xl">{section.intro}</p>
        )}
      </div>
    </div>
  );
}

function TradingSectionBlock({ section, index }: { section: TradingSection; index: number }) {
  return (
    <section
      id={section.id}
      className={`py-16 sm:py-20 px-4 sm:px-6 md:px-8 scroll-mt-28 ${
        index % 2 === 1 ? "bg-[#0d0d0d] border-y border-white/5" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeIn}>
          <SectionHeader index={index} section={section} />

          {section.blocks && section.blocks.length > 0 && (
            <div
              className={`grid gap-4 sm:gap-5 ${
                section.blocks.length >= 6
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {section.blocks.map((block, i) => (
                <div
                  key={block.title}
                  className="hud-border rounded-2xl p-5 sm:p-6 hover:border-accent-blue/25 transition-colors"
                >
                  <span className="text-[10px] font-bold tracking-widest text-accent-blue/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-bold text-accent-light mt-2 mb-3">{block.title}</h3>
                  <BulletList items={block.items} />
                </div>
              ))}
            </div>
          )}

          {section.application && (
            <p className="mt-8 px-4 py-3 rounded-sm border border-white/10 bg-white/[0.02] text-xs font-bold tracking-widest text-accent-light/50 uppercase text-center sm:text-left">
              Applications — {section.application}
            </p>
          )}

          {section.partners && section.partners.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xs font-bold tracking-[0.25em] text-accent-light/40 uppercase mb-4">
                Partner Brands
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.partners.map((partner) => (
                  <span
                    key={partner}
                    className="px-3 py-2 rounded-sm border border-white/10 bg-white/[0.03] text-xs text-accent-light/70"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          )}

          {section.services && section.services.length > 0 && (
            <div className="mt-8 hud-border rounded-2xl p-5 sm:p-6">
              <h3 className="text-xs font-bold tracking-[0.25em] text-accent-light/40 uppercase mb-4">
                Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {section.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2 text-sm text-accent-light/75"
                  >
                    <span className="text-accent-blue" aria-hidden>
                      ✓
                    </span>
                    {service}
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.valueProps && section.valueProps.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.valueProps.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 hud-border rounded-2xl p-4 sm:p-5"
                >
                  <span className="text-accent-blue font-bold shrink-0" aria-hidden>
                    ✓
                  </span>
                  <span className="text-sm text-accent-light/75 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function TradingPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      <section className="relative border-b border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/sequence/aboutus.png')] bg-cover bg-center opacity-80"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0b0b0b]/90" aria-hidden />
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent-blue/60 to-transparent"
          aria-hidden
        />
        <div className="relative px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 md:px-8 md:pt-32 md:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
              N-SETS (PVT.) LTD.
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">TRADING PROFILE</h1>
            <p className="text-lg text-accent-light/60 max-w-2xl mx-auto leading-relaxed">
              Sourcing, trading, and industrial supply — from electronic components to heavy machinery and metals.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="hud-border rounded-2xl px-4 py-5 text-center bg-black/20"
              >
                <p className="text-2xl sm:text-3xl font-black text-accent-blue">{item.value}</p>
                <p className="mt-1 text-[10px] font-bold tracking-widest text-accent-light/50 uppercase">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn}>
            <p className="text-accent-light/70 leading-relaxed text-center max-w-3xl mx-auto mb-12">
              {TRADING_INTRO.description}
            </p>

            <div className="hud-border rounded-2xl p-6 sm:p-10 mb-10">
              <h2 className="text-xl sm:text-2xl font-black text-center mb-2">
                Our Concept: <span className="text-accent-blue">{TRADING_INTRO.tagline}</span>
              </h2>
              <p className="text-accent-light/65 text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto mb-10">
                {TRADING_INTRO.concept}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
                {CHIP_TO_SHIP.map(({ icon: Icon, label, desc }, i) => (
                  <div key={label} className="relative flex flex-col items-center text-center">
                    {i < CHIP_TO_SHIP.length - 1 && (
                      <span
                        className="hidden sm:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-accent-blue/40 to-transparent"
                        aria-hidden
                      />
                    )}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-blue/40 bg-accent-blue/10 mb-3">
                      <Icon className="h-5 w-5 text-accent-blue" aria-hidden />
                    </div>
                    <h3 className="font-bold text-accent-light">{label}</h3>
                    <p className="mt-1 text-xs text-accent-light/55 leading-relaxed max-w-[200px]">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hud-border rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent-blue/10 border border-accent-blue/30">
                  <Globe className="h-5 w-5 text-accent-blue" aria-hidden />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Global Supply Network</h2>
                  <p className="text-sm text-accent-light/60 mt-1">{TRADING_INTRO.network}</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {SUPPLY_COUNTRIES.map((country) => (
                  <span
                    key={country}
                    className="px-4 py-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 text-sm font-medium text-accent-light/80"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-4 px-4 sm:px-6 md:px-8 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <nav
            className="flex gap-2 sm:gap-3 min-w-max py-2 justify-center sm:justify-start"
            aria-label="Trading sections"
          >
            {TRADING_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase rounded-sm border border-white/10 text-accent-light/60 hover:border-accent-blue/50 hover:text-accent-blue hover:bg-accent-blue/5 transition-colors whitespace-nowrap"
              >
                {s.title.split(" ")[0]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {TRADING_SECTIONS.map((section, index) => (
        <TradingSectionBlock key={section.id} section={section} index={index} />
      ))}

      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center hud-border rounded-2xl p-8 sm:p-12">
          <h2 className="text-xl sm:text-2xl font-black mb-4">REQUEST A QUOTE</h2>
          <p className="text-accent-light/60 mb-8 leading-relaxed">
            For CNC, electronics, cables, electrical equipment, instruments, or metals — contact our trading team.
          </p>
          <div className="space-y-3 text-sm text-accent-light/60 mb-8 text-left sm:text-center">
            <p>
              <span className="text-accent-light/40 font-bold tracking-widest text-[10px] uppercase block sm:inline sm:mr-2">
                Islamabad
              </span>
              43-A, KNZ Arcade, Downtown Road, Sector A, DHA Phase-II
            </p>
            <p>
              <span className="text-accent-light/40 font-bold tracking-widest text-[10px] uppercase block sm:inline sm:mr-2">
                Rawalpindi
              </span>
              Plot 7, Main Street, Rawat Industrial Estate
            </p>
            <p>
              <a href="mailto:nsets.info@gmail.com" className="hover:text-accent-blue transition-colors">
                nsets.info@gmail.com
              </a>
              {" · "}
              <a
                href="https://www.nsets.com.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-blue transition-colors"
              >
                www.nsets.com.pk
              </a>
            </p>
            <p className="flex justify-center sm:justify-center pt-2">
              <WhatsAppLink variant="compact" />
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold text-xs tracking-[0.2em] transition-colors"
            >
              CONTACT US
            </Link>
            <Link
              href="/about"
              className="inline-block px-8 py-3 border border-white/20 hover:border-accent-blue/50 text-accent-light font-bold text-xs tracking-[0.2em] transition-colors"
            >
              ABOUT N-SETS
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
