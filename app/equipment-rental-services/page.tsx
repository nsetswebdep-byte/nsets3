"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const EQUIPMENT = [
  { name: "40 GHz VNA", updating: false },
  { name: "Spectrum Analyzer", updating: false },
  { name: "110 GHz VNA", updating: true },
  { name: "Probe Station", updating: true },
];

const WHY_CHOOSE = [
  {
    title: "Top-Quality Equipment",
    description: "Access state-of-the-art Keysight and R&S VNAs and Spectrum Analyzers with excellent performance and reliability.",
  },
  {
    title: "Flexible Rental Periods",
    description: "Rent for a duration that suits your project, starting from 1 month up to 1 year.",
  },
  {
    title: "Affordable and Convenient",
    description: "Save on capital expenses by renting instead of purchasing. Benefit from quick delivery and setup assistance.",
  },
  {
    title: "Dedicated Support",
    description: "Our technical team ensures the equipment is calibrated and ready for use, offering you seamless integration into your research.",
  },
];

export default function EquipmentRentalServicesPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            RENTAL SOLUTIONS
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            EQUIPMENT RENTAL SERVICES
          </h1>
          <p className="text-accent-light/60 text-lg max-w-2xl mx-auto">
            High-performance test and measurement equipment for research and industry — flexible terms, calibrated and ready to use.
          </p>
        </div>
      </section>

      {/* Available Equipment */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            AVAILABLE EQUIPMENT
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            RENTAL INVENTORY
          </h2>
          <ul className="space-y-4">
            {EQUIPMENT.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between gap-4 py-4 border-b border-white/5 last:border-0"
              >
                <span className="flex items-center gap-4">
                  <span className="w-10 h-10 border border-accent-blue flex items-center justify-center text-accent-blue text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-lg font-medium text-accent-light">{item.name}</span>
                </span>
                {item.updating && (
                  <span className="text-[10px] font-bold tracking-widest text-accent-blue/90 px-3 py-1 border border-accent-blue/50">
                    UPDATE IN PROCESS
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Choose Our Rental Services */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              WHY CHOOSE OUR RENTAL SERVICES
            </h2>
            <p className="text-accent-light/50 max-w-xl mx-auto text-sm">
              Flexible, reliable, and backed by technical support for your research and testing needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-8 hud-border hover:border-accent-blue/30 transition-all duration-500"
              >
                <div className="w-12 h-12 border border-accent-blue mb-6 flex items-center justify-center text-accent-blue text-lg font-bold group-hover:bg-accent-blue group-hover:text-white transition-all">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent-light">{item.title}</h3>
                <p className="text-accent-light/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Satisfied Customers */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            TRUSTED BY
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-8">
            SATISFIED CUSTOMERS OF OUR RENTAL SERVICES
          </h2>
          <p className="text-accent-light/60 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Universities, research institutions, and industrial labs rely on our rental services for high-frequency research, advanced communication testing, and temporary access to calibrated equipment.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-accent-light/50">
            <span className="px-4 py-2 border border-white/10 rounded-sm">Universities & research labs</span>
            <span className="px-4 py-2 border border-white/10 rounded-sm">Communication & electronics testing</span>
            <span className="px-4 py-2 border border-white/10 rounded-sm">Industrial R&D</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">READY TO RENT?</h2>
          <p className="text-accent-light/60 mb-8">
            Get in touch for availability, pricing, and rental terms.
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
