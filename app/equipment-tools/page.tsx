"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function EquipmentToolsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            SUPPLY & SOLUTIONS
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            EQUIPMENT & TOOLS
          </h1>
          <p className="text-accent-light/60 text-lg max-w-2xl mx-auto">
            Industrial and educational equipment and precision tools — backed by strong R&D and trusted by leading organizations across Pakistan.
          </p>
        </div>
      </section>

      {/* Industrial Equipment & Tools */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            INDUSTRIAL
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-6">
            INDUSTRIAL EQUIPMENT & TOOLS
          </h2>
          <p className="text-accent-light/70 leading-relaxed mb-8">
            We specialize in providing high-performance industrial equipment and precision tools, backed by strong R&D capabilities and trusted by leading companies across Pakistan.
          </p>
          <ul className="space-y-2 text-accent-light/60 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 shrink-0 bg-accent-blue" />
              Machinery, fabrication tools, and production systems
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 shrink-0 bg-accent-blue" />
              Technical support and after-sales service
            </li>
          </ul>
        </div>
      </section>

      {/* Educational Equipment & Tools */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            EDUCATION
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-6">
            EDUCATIONAL EQUIPMENT & TOOLS
          </h2>
          <p className="text-accent-light/70 leading-relaxed mb-8">
            We specialize in providing high-performance educational equipment and precision tools, backed by strong R&D capabilities and trusted by leading companies across Pakistan.
          </p>
          <ul className="space-y-2 text-accent-light/60 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 shrink-0 bg-accent-blue" />
              Lab and training equipment for institutes and vocational centers
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 shrink-0 bg-accent-blue" />
              Installation, training, and compliance support
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent-light/60 mb-8">
            For inquiries on industrial or educational equipment and tools, get in touch.
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
