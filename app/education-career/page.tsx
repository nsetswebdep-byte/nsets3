"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

const INSTITUTION_OFFERINGS = [
  {
    title: "Electronics & PLC Trainers",
    desc: "Industrial electronics, PLC systems, and power electronics trainers for hands-on undergraduate and postgraduate labs.",
  },
  {
    title: "Digital Logic & FPGA",
    desc: "Combinational and sequential logic trainers, FPGA boards, and complete digital lab setups aligned with modern curricula.",
  },
  {
    title: "Electric Machines",
    desc: "Transformer design trainers, motor control modules, and electric machines benches for power and machines courses.",
  },
  {
    title: "Equipment Rental",
    desc: "Short-term access to spectrum analyzers, VNAs, and specialized test gear for research projects and capstone work.",
  },
];

const PARTNERSHIP_BENEFITS = [
  "Turnkey lab design, supply, and commissioning support",
  "Training for faculty and lab technicians on supplied equipment",
  "Documentation, safety compliance, and after-sales service in Pakistan",
  "Flexible procurement for single units or full department upgrades",
  "Experience serving defense, industry, and higher-education clients nationwide",
];

const CAREER_AREAS = [
  {
    title: "Engineering & R&D",
    desc: "Mechanical design, CNC programming, electronics integration, and product development for smart systems and industrial solutions.",
  },
  {
    title: "Technical Sales & Applications",
    desc: "Support universities, industry, and government clients with specifications, demos, and project quotations.",
  },
  {
    title: "Installation & Field Service",
    desc: "On-site commissioning for smart home, uPVC, and lab equipment projects across Islamabad, Lahore, and beyond.",
  },
  {
    title: "Operations & Quality",
    desc: "Workshop operations, inspection, procurement, and logistics within a precision manufacturing environment.",
  },
];

const OPEN_ROLES = [
  "Graduate Engineer — Mechanical / Mechatronics",
  "Graduate Engineer — Electronics / Electrical",
  "Technical Sales Executive",
  "Lab Solutions Specialist (Education Sector)",
  "CNC Machinist / Workshop Technician",
];

export default function EducationCareerPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/sequence/aboutus.png')] bg-cover bg-center opacity-80"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0b0b0b]/90"
          aria-hidden
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent-blue/60 to-transparent"
          aria-hidden
        />
        <div className="relative px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 md:px-8 md:pt-32 md:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
              LEARN · BUILD · GROW
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              EDUCATION & CAREER
            </h1>
            <p className="text-lg text-accent-light/60 max-w-2xl mx-auto leading-relaxed">
              N-SETS partners with universities, technical institutes, and vocational centers to equip the next generation of engineers — and offers career paths for people who want to shape Pakistan&apos;s industrial and smart-technology future.
            </p>
          </div>
        </div>
      </section>

      {/* For institutions */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              FOR INSTITUTIONS
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              LAB & TRAINING SOLUTIONS FOR EDUCATION
            </h2>
            <p className="text-accent-light/70 leading-relaxed mb-10 max-w-3xl">
              From electronics and digital logic to power systems and research-grade test equipment, we help institutions build capable, industry-relevant labs. Our trainers and tools are used in universities and training centers that demand reliability, safety, and long-term support.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {INSTITUTION_OFFERINGS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="hud-border rounded-2xl p-5 sm:p-6 hover:border-accent-blue/30 transition-colors"
                >
                  <span className="text-accent-blue text-[10px] font-bold tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold mt-2 mb-2">{item.title}</h3>
                  <p className="text-accent-light/65 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/lab-equipment"
                className="inline-block px-8 py-3 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold text-xs tracking-[0.2em] transition-colors"
              >
                VIEW LAB & EQUIPMENT
              </Link>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 border border-white/20 hover:border-accent-blue/50 text-accent-light font-bold text-xs tracking-[0.2em] transition-colors"
              >
                REQUEST A QUOTE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership benefits */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
                WHY N-SETS
              </span>
              <h2 className="text-2xl md:text-3xl font-black mb-4">
                A TRUSTED EDUCATION PARTNER
              </h2>
              <p className="text-accent-light/70 leading-relaxed">
                We understand academic timelines, tender processes, and the need for equipment that lasts beyond a single semester. N-SETS combines import capability, in-house fabrication, and local service so your department can focus on teaching and research.
              </p>
            </div>
            <ul className="space-y-3">
              {PARTNERSHIP_BENEFITS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-accent-light/75 text-sm">
                  <span className="text-accent-blue font-bold shrink-0" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              WHO WE SERVE
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-8">
              IDEAL FOR THESE INSTITUTIONS
            </h2>
            <motion.div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                "Universities & degree colleges",
                "Engineering & technology institutes",
                "Polytechnics & vocational centers",
                "Defense & government training schools",
                "Private R&D and innovation labs",
                "Industry-linked apprenticeship programs",
              ].map((label) => (
                <span
                  key={label}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-accent-light/70 text-sm"
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              CAREERS AT N-SETS
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              BUILD YOUR CAREER WITH US
            </h2>
            <p className="text-accent-light/70 leading-relaxed mb-10 max-w-3xl">
              Join a DGDP-registered team that works at the intersection of precision manufacturing, smart building technology, and advanced lab systems. We value disciplined engineers, curious technicians, and professionals who take ownership from quotation to delivery.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
              {CAREER_AREAS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="hud-border rounded-2xl p-5 sm:p-6"
                >
                  <h3 className="text-base font-bold text-accent-blue mb-2">{item.title}</h3>
                  <p className="text-accent-light/65 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div className="hud-border rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-4">Roles we often recruit for</h3>
              <ul className="space-y-2 mb-6">
                {OPEN_ROLES.map((role) => (
                  <li key={role} className="flex items-start gap-3 text-accent-light/75 text-sm">
                    <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                    {role}
                  </li>
                ))}
              </ul>
              <p className="text-accent-light/50 text-sm mb-6">
                Positions are based primarily in Islamabad and Rawalpindi, with project travel as required. We welcome fresh graduates and experienced professionals.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold text-xs tracking-[0.2em] transition-colors"
              >
                APPLY OR INQUIRE
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <motion.div
          {...fadeIn}
          className="max-w-3xl mx-auto text-center hud-border rounded-2xl p-8 sm:p-12"
        >
          <h2 className="text-xl sm:text-2xl font-black mb-4">
            PARTNER WITH US OR JOIN THE TEAM
          </h2>
          <p className="text-accent-light/60 mb-8 leading-relaxed">
            Whether you are equipping a new lab or looking for your next engineering role, N-SETS is ready to talk. Reach out with your institution name, department, or CV.
          </p>
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
