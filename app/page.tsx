"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useFrameScrollProgress } from "@/lib/useFrameScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BuildingScrollCanvas from "@/components/BuildingScrollCanvas";
import BuildingExperience from "@/components/BuildingExperience";
import { TOTAL_FRAMES } from "@/data/buildingData";
import { SHOW_ALL_PAGES } from "@/lib/siteConfig";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress, smoothProgress, scrollIndicatorOpacity } = useFrameScrollProgress(containerRef);

  return (
    <main className="relative bg-[#0b0b0b] min-h-screen text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Fixed Background Experience — own layer + paint containment for smooth scroll */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0 will-change-transform transform-gpu contain-paint">
        <div className="absolute inset-0 will-change-transform transform-gpu">
          <BuildingScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={TOTAL_FRAMES}
            imageFolderPath="/images/sequence/newframes3"
            frameFilePrefix="frame_"
            frameFileSuffix="_delay-0.066s"
            fileExtension="webp"
            darkenOverlayOpacity={0.20}
            showLoadingOverlay={false}
            preloadBeforeShow
            minDisplayTimeMs={6000}
            targetLoadRatio={0.45}
          />
        </div>
        <BuildingExperience scrollYProgress={smoothProgress} />
      </div>

      {/* Scrollable Content Spacer - Drives the sequence; touch-none so mobile scroll drives frames */}
      <section ref={containerRef} className="h-[500vh] relative z-10 pointer-events-none" aria-hidden="true">
        {/* Subtle scroll indicator */}
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
        {/* Transparent Spacer to let the fixed background be seen initially */}
        <div className="h-screen w-full pointer-events-none" /> 
        
        <div className="bg-[#0b0b0b]/80 backdrop-blur-sm border-t border-white/5">
          {/* About Section */}
          <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
              <div>
                <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-3 sm:mb-4 block">LEGACY & VISION</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 leading-tight">WE BUILD THE FUTURE OF LIVING.</h2>
                <p className="text-accent-light/60 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  N-SETS Pvt. Ltd. stands at the intersection of engineering excellence and smart innovation. 
                  From architectural blueprints to fully integrated smart environments, we deliver end-to-end 
                  solutions for the modern era.
                </p>
                <Link href="/about" className="group flex items-center gap-4 text-xs font-bold tracking-[0.3em] hover:text-accent-blue transition-colors">
                  LEARN OUR STORY
                  <div className="w-8 h-[1px] bg-accent-light group-hover:bg-accent-blue group-hover:w-12 transition-all" />
                </Link>
              </div>
              <div className="mt-8 md:mt-0 overflow-hidden rounded-xl md:rounded-2xl ring-1 ring-white/10 ring-inset shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="aspect-square w-full max-w-[280px] md:max-w-none mx-auto flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/images/sequence/buildfuture.png"
                    alt="N-SETS - We build the future of living"
                    fill
                    className="object-cover opacity-90"
                    priority
                  />
                  <div className="absolute inset-0 bg-accent-blue/10 mix-blend-overlay" />
                </div>
              </div>
            </div>
          </section>

          {/* Who Can Benefit */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto border-t border-white/5">
            <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-3 sm:mb-4 block">WHO CAN BENEFIT</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 sm:mb-12 leading-tight">IDEAL FOR RESEARCH & INDUSTRY</h2>
            <ul className="space-y-4 sm:space-y-6">
              {[
                "Universities conducting high-frequency research.",
                "Research institutions involved in advanced communication and electronics testing.",
                "Industrial labs requiring temporary access to advanced testing tools.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 sm:gap-4 text-accent-light/70 text-base sm:text-lg leading-relaxed">
                  <span className="w-1.5 h-1.5 mt-2.5 shrink-0 bg-accent-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Services Grid */}
          <section className="py-16 sm:py-24 lg:py-32 bg-[#0d0d0d] border-y border-white/5">
            <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
              <div className="mb-12 sm:mb-16 lg:mb-24 text-center">
                <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-3 sm:mb-4 block">OUR EXPERTISE</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">CORE SOLUTIONS</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {[
                  { title: "Smart Homes", desc: "Automated living systems integrated with precision.", href: "/home-automation" },
                  { title: "Engineering", desc: "Structural integrity and architectural mastery.", href: "/about" },
                  { title: "uPVC Systems", desc: "Premium window and door solutions for modern insulation.", href: "/upvc" },
                  { title: "Lab & Equipment", desc: "Electronics trainers, tools, and rental services in one place.", href: "/lab-equipment" },
                ].map((service, i) =>
                  SHOW_ALL_PAGES ? (
                    <Link key={i} href={service.href} className="group p-5 sm:p-6 md:p-8 border border-white/5 hover:border-accent-blue/30 transition-all duration-500 hover:bg-white/[0.02] block">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 border border-accent-blue mb-5 sm:mb-8 flex items-center justify-center text-accent-blue text-sm group-hover:bg-accent-blue group-hover:text-white transition-all">
                        0{i + 1}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{service.title}</h3>
                      <p className="text-accent-light/40 text-sm leading-relaxed">{service.desc}</p>
                    </Link>
                  ) : (
                    <div key={i} className="group p-5 sm:p-6 md:p-8 border border-white/5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 border border-accent-blue mb-5 sm:mb-8 flex items-center justify-center text-accent-blue text-sm">
                        0{i + 1}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{service.title}</h3>
                      <p className="text-accent-light/40 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Why N-SETS */}
          <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto border-t border-white/5">
            <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-3 sm:mb-4 block">WHY N-SETS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 sm:mb-14 leading-tight">ENGINEERING EXCELLENCE, DELIVERED</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {[
                { title: "Proven expertise", desc: "Decades of experience in smart systems, uPVC, and industrial equipment supply across Pakistan and beyond." },
                { title: "End-to-end solutions", desc: "From design and procurement to installation and support — one partner for your entire project." },
                { title: "Trusted by institutions", desc: "Serving defense, education, and industry with quality products and reliable service." },
              ].map((item, i) => (
                <div key={i} className="hud-border p-5 sm:p-6 hover:border-accent-blue/30 transition-colors">
                  <span className="text-accent-blue text-[10px] font-bold tracking-widest">0{i + 1}</span>
                  <h3 className="text-base sm:text-lg font-bold mt-3 mb-2">{item.title}</h3>
                  <p className="text-accent-light/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sectors We Serve */}
          <section className="py-16 sm:py-24 lg:py-32 bg-[#0d0d0d] border-y border-white/5">
            <div className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
              <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-3 sm:mb-4 block">SECTORS WE SERVE</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-10 sm:mb-16 leading-tight">INDUSTRY, DEFENSE & EDUCATION</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: "Defense", brief: "Secure, reliable solutions for critical infrastructure and research." },
                  { label: "Education", brief: "Labs, trainers, and equipment for universities and institutions." },
                  { label: "Industrial", brief: "Heavy machinery, testing equipment, and smart automation." },
                  { label: "Commercial", brief: "uPVC, smart buildings, and integrated systems for modern spaces." },
                ].map((sector, i) => (
                  <div key={i} className="p-5 sm:p-6 border border-white/10 rounded-sm hover:border-accent-blue/40 transition-colors">
                    <span className="text-[10px] font-bold tracking-widest text-accent-blue">{sector.label}</span>
                    <p className="mt-2 sm:mt-3 text-accent-light/70 text-sm leading-relaxed">{sector.brief}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 md:px-8 max-w-3xl mx-auto border-t border-white/5 text-center">
            <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-3 sm:mb-4 block">GET IN TOUCH</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-4 sm:mb-6 leading-tight">READY TO BUILD WITH N-SETS?</h2>
            <p className="text-accent-light/60 mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base">
              Whether you need smart home systems, uPVC solutions, or specialized equipment — we deliver engineering the future.
            </p>
            {SHOW_ALL_PAGES ? (
              <Link
                href="/contact"
                className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold text-xs sm:text-sm tracking-[0.2em] transition-colors"
              >
                CONTACT US
              </Link>
            ) : (
              <span className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-accent-blue/80 text-white font-bold text-xs sm:text-sm tracking-[0.2em] cursor-default">
                CONTACT US
              </span>
            )}
          </section>

          <Footer />
        </div>
      </div>
    </main>
  );
}
