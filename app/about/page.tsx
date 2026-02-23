"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const CORE_CAPABILITIES = [
  "Fabrication & Sheet Metal Work",
  "CNC Machining (Milling, Turning, Drilling, Engraving)",
  "Precision Lathe & Die Manufacturing",
  "Design & Development of Moulds & Tools",
  "Mechanical Enclosures (Aluminum, M.S. & Stainless Steel)",
  "Machine Assembly and Integration",
  "Heat Treatment, Sand Blasting & Anodizing",
  "Welding (Argon, MIG, TIG, Electric)",
  "Industrial Furnaces and Custom Machinery Supply",
];

const EQUIPMENT_SUPPLY = [
  "CNC Milling & Turning Centers (3-axis, 4-axis, 5-axis)",
  "Industrial Furnaces (Electric, Induction, Heat Treatment)",
  "Hydraulic Press Machines & Bending Systems",
  "Sheet Metal Cutting and Laser Machines",
  "CNC Drilling & Engraving Machines",
  "Precision Tool Grinders and Surface Grinding Machines",
  "Custom Mechanical Fixtures & Automation Equipment",
];

const SCOPE_POF = [
  { title: "Technical Consultation", desc: "Machine selection as per operational need and capacity." },
  { title: "Procurement & Import Handling", desc: "Direct coordination with verified OEMs in China." },
  { title: "Installation & Commissioning", desc: "On-site setup and operator training by our engineers." },
  { title: "After-Sales Support", desc: "Local service, spare parts availability, and performance monitoring." },
  { title: "Quality Assurance", desc: "Each system is tested under standard mechanical and electrical protocols before handover." },
];

const MAJOR_CLIENTS = [
  "DGDP", "NDC", "MTC", "D & Wing NDC", "Comcept Pvt. Ltd", "Aksa Solutions Pvt. Ltd",
  "Care Pvt. Ltd", "RWR Pvt. Ltd", "OGDCL (Dakhni, Chanda & Sadqal Fields)",
  "Benazir International Airport (with China State)", "Terisols Pvt. Ltd", "RIMS",
  "CENTech", "Schlumberger Pakistan",
];

const MAJOR_PROJECTS = [
  "UPS Power Supply Housings – Comcept Pvt. Ltd",
  "Battery & Tilt Sensor Housings – Comcept Pvt. Ltd",
  "Heat Sinks and Simulator Boxes – NDC",
  "Transponder, HPA, SFIDU, Mach Meter, and HEU Housings – Aksa Solutions Pvt. Ltd",
  "ICB-3, LRU, and O-Level Tester – Aksa Solutions Pvt. Ltd",
  "Voltage Regulator & Transistor Driver Enclosures – Comcept Pvt. Ltd",
];

const CNC_MILLING = [
  "Cincinnati SABRE MILACRON 750 – USA",
  "Bridgeport Interact 516, 520, 308, 412 – UK",
  "DECKEL FP-2, FP-4, FP-5 – Germany",
  "DAHLIH – Taiwan",
  "Lab Volt PCB-1 – Hungary",
];

const MANUAL_MACHINES = [
  "Universal Milling Machine – Russia",
  "Deckel FP-1 – Germany",
  "Lathe (8 Feet – Pakistan, 4 Feet – China)",
  "Warner Drilling Machines – Germany",
  "DO ALL Hacksaw Machine – USA",
  "Miller Welding Plants (Argon & Electric) – USA",
  "Sand Blaster – Local Made",
  "Anodizing & Chemical Processing Setup – Complete Line",
];

const QUALITY_POINTS = [
  "ISO 9001:2015 aligned inspection processes",
  "Dimensional verification reports for CNC machined components",
  "Material traceability and hardness test records",
  "Final acceptance test reports before delivery",
  "Compliance with international educational equipment safety standards",
];

const WHY_CHOOSE = [
  "Proven supplier to defense and industrial sectors",
  "Full in-house CNC machining & fabrication facilities",
  "Access to high-quality Chinese and international machinery",
  "End-to-end solutions — design to commissioning",
  "Technical compliance and reliable after-sales service",
];

const fadeIn = { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" } };

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Hero — full bleed with accent rail */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent-blue/60 to-transparent" aria-hidden />
        <div className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 md:px-8 md:pt-32 md:pb-24">
          <div className="max-w-4xl mx-auto pl-6 sm:pl-8">
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-4 block">
              WHO WE ARE
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              ABOUT US
            </h1>
            <p className="text-lg text-accent-light/60 max-w-2xl leading-relaxed">
              A Pakistan-based engineering company specialized in mechanical fabrication, CNC machining, precision manufacturing, and industrial equipment supply.
            </p>
          </div>
        </div>
      </section>

      {/* Company intro — two-column on large screens */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeIn}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
          >
            <div className="lg:col-span-4">
              <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
                COMPANY
              </span>
              <h2 className="text-xl md:text-2xl font-black text-accent-light">
                NSETS (PRIVATE) LIMITED
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5 text-accent-light/70 leading-relaxed">
              <p>
                NSETS (Private) Limited is a Pakistan-based engineering company specialized in mechanical fabrication, CNC machining, precision manufacturing, and industrial equipment supply.
              </p>
              <p>
                With a strong technical foundation and a complete in-house CNC mechanical setup, we provide customized mechanical job services and supply solutions for industrial machines, furnaces, and production systems.
              </p>
              <p>
                Our engineering team consists of highly skilled professionals capable of delivering both local fabrication projects and international machinery sourcing with full technical compliance, installation, and after-sales support.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wintech / ADO Partnership — card with clear subsections */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="hud-border rounded-sm p-6 sm:p-8 md:p-10">
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              OUR PARTNERSHIP
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-8">
              WINtech UPVC Profile — Powered by ADO Group
            </h2>

            <div className="space-y-8 text-accent-light/70 leading-relaxed">
              <div>
                <h3 className="text-accent-blue font-bold text-sm tracking-widest mb-3">Our Legacy and Vision</h3>
                <p>
                  Wintech UPVC Profile is a premier brand under the renowned ADO Group, a leading international industrial powerhouse headquartered in Antalya, Turkey. Founded in 1956 with the establishment of Çağlar Plastics—pioneering plastics for footwear soles—ADO Group has evolved over nearly seven decades into a global leader in building materials. Today, as one of Turkey's top 280 companies (Istanbul Chamber of Commerce), ADO Group operates across four continents, employing over 3,000 professionals and serving more than 80 countries with innovative, sustainable solutions.
                </p>
                <p className="mt-4">
                  Wintech UPVC Profile, launched in 1997, specializes in high-performance unplasticized polyvinyl chloride (UPVC) profiles for windows and doors. With state-of-the-art facilities in Europe's largest industrial zones, we blend Turkish craftsmanship with cutting-edge technology to deliver products that enhance comfort, durability, and environmental responsibility.
                </p>
              </div>

              <div>
                <h3 className="text-accent-blue font-bold text-sm tracking-widest mb-3">Core Expertise and Products</h3>
                <p className="mb-4">
                  At Wintech, we focus on superior UPVC profiles for double-glazed windows and doors, offering thermal insulation, soundproofing, and weather resistance. Our product range includes:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                    <span><strong className="text-accent-light">Window and Door Systems:</strong> Profiles such as 750 series, 222 series, and 632 series—engineered for energy efficiency and aesthetic versatility.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                    <span><strong className="text-accent-light">Shutter and Blind Systems:</strong> Complementary hardware for seamless integration in modern architecture.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                    <span><strong className="text-accent-light">Custom Solutions:</strong> Tailored UPVC profiles, including composite reinforced options, for diverse climatic and structural needs.</span>
                  </li>
                </ul>
                <p>
                  Backed by ADO Group's integrated ecosystem, we produce core profiles, accessories, aluminum reinforcements, and eco-friendly variants. All products adhere to international standards such as ISO 9001, with freeze-proof and impact-resistant options for harsh or high-security applications.
                </p>
              </div>

              <div>
                <h3 className="text-accent-blue font-bold text-sm tracking-widest mb-3">Global Reach and Innovation</h3>
                <p>
                  Wintech's footprint spans seven countries: Turkey (flagship in Antalya), Iran, Russia, Ukraine, Azerbaijan, Tunisia, and India—exporting to over 60 nations. In 2023 we expanded into Algeria and announced investments in Egypt. Leveraging ADO Group's R&D, we incorporate fire-resistant materials, smart home compatibility, and 100% recyclable composites, with rigorous testing for thermal performance, UV stability, and longevity.
                </p>
              </div>

              <div>
                <h3 className="text-accent-blue font-bold text-sm tracking-widest mb-3">Sustainability and Community</h3>
                <p>
                  As part of ADO Group, Wintech upholds environmental and social stewardship: eco-friendly production, closed-loop recycling, and energy-efficient manufacturing. We support community projects in education and workforce development across our regions and believe in long-term partnerships through reliability, quality, and customer-centric service.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-accent-blue font-bold text-sm tracking-widest mb-3">NSETS: Your Authorized Dealer in Pakistan</h3>
                <p>
                  As the official authorized dealer and trusted business partner of Wintech UPVC Profile in Pakistan, NSETS Pvt. Ltd. brings the full spectrum of Wintech's innovation and quality to the Pakistani market. With our expertise in precision manufacturing, technical compliance, and after-sales support, we ensure seamless sourcing, installation, and maintenance of Wintech products tailored to local needs—from the 750 series for superior thermal performance to the 222 series for sleek designs and the 632 series for robust durability. NSETS guarantees authentic, high-standard solutions backed by ADO Group's global warranty.
                </p>
                <p className="mt-4 text-accent-light/80">
                  Wintech UPVC Profile—powered by ADO Group—invites you to experience world-class engineering rooted in Turkish innovation. For more information, visit{" "}
                  <a href="https://wintechpvc.com" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">wintechpvc.com</a> or contact NSETS today.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities — compact grid of items */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              OUR EXPERTISE
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              CORE CAPABILITIES
            </h2>
            <p className="text-accent-light/60 mb-8 max-w-2xl">
              Full spectrum of mechanical engineering and fabrication:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {CORE_CAPABILITIES.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-accent-light/70 text-sm">
                  <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Equipment Supply */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              GLOBAL SOURCING
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              EQUIPMENT SUPPLY (CHINA & INTERNATIONAL)
            </h2>
            <p className="text-accent-light/70 leading-relaxed mb-6 max-w-2xl">
              NSETS Pvt. Ltd has strategic sourcing partnerships with leading mechanical equipment manufacturers in China, enabling us to offer reliable, cost-effective, and high-performance machinery for defense and industrial use.
            </p>
            <p className="text-accent-light/60 mb-6">
              We have successfully developed a procurement network in Shenzhen, Guangzhou, Ningbo, and Suzhou, which allows us to supply high-quality Chinese machines and systems such as:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-8">
              {EQUIPMENT_SUPPLY.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-accent-light/70 text-sm">
                  <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-accent-light/60 text-sm">
              All machines are sourced from ISO-certified Chinese manufacturers with full technical documentation, installation training, and spare parts support. Before shipment, each machine is technically inspected and tested by our engineering team to ensure compliance with the required standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scope POF — value cards */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              VALUE ADDITIONS
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              SCOPE OF WORK FOR POF WAH
            </h2>
            <p className="text-accent-light/60 mb-8 max-w-2xl">
              NSETS Pvt. Ltd proposes to supply and support mechanical machines and furnaces to POF Wah with the following value additions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SCOPE_POF.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 hud-border rounded-sm border-white/10 hover:border-accent-blue/30 transition-colors"
                >
                  <span className="text-accent-blue font-bold text-xs tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-accent-light font-bold text-sm mt-1 mb-2">{item.title}</h3>
                  <p className="text-accent-light/70 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Major Clients — pill grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              TRUSTED BY
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              MAJOR CLIENTS
            </h2>
            <p className="text-accent-light/60 mb-8 max-w-2xl">
              Our reputation and experience are built on years of service to Pakistan's top defense and industrial institutions:
            </p>
            <div className="flex flex-wrap gap-2">
              {MAJOR_CLIENTS.map((name, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-accent-light/70 text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Major Projects */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              DELIVERED
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-6">
              MAJOR PROJECTS EXECUTED
            </h2>
            <ul className="space-y-2">
              {MAJOR_PROJECTS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-accent-light/70 text-sm py-2 border-b border-white/5 last:border-0">
                  <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* In-House Machinery — two columns */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
              WORKSHOP
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-6">
              IN-HOUSE MACHINERY SETUP
            </h2>
            <p className="text-accent-light/60 mb-8 max-w-2xl">
              Our advanced workshop is equipped with a wide range of CNC and manual machines:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="hud-border rounded-sm p-6">
                <h3 className="text-accent-blue font-bold text-sm tracking-widest mb-4">CNC Milling Machines</h3>
                <ul className="space-y-2">
                  {CNC_MILLING.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-accent-light/70 text-sm">
                      <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <div className="hud-border rounded-sm p-6">
                  <h3 className="text-accent-blue font-bold text-sm tracking-widest mb-2">CNC Turning Machine</h3>
                  <p className="text-accent-light/70 text-sm">Colchester 2000L – UK</p>
                </div>
                <div className="hud-border rounded-sm p-6">
                  <h3 className="text-accent-blue font-bold text-sm tracking-widest mb-4">Manual Machines & Support</h3>
                  <ul className="space-y-2">
                    {MANUAL_MACHINES.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-accent-light/70 text-sm">
                        <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality & Why Choose — side by side on large */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div {...fadeIn}>
              <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
                STANDARDS
              </span>
              <h2 className="text-2xl font-black mb-4">
                QUALITY & TECHNICAL COMPLIANCE
              </h2>
              <p className="text-accent-light/70 mb-6 text-sm">
                Our QC team ensures each job and supplied system meets mechanical tolerances, finish standards, and educational safety requirements. We follow:
              </p>
              <ul className="space-y-2">
                {QUALITY_POINTS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-accent-light/70 text-sm">
                    <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeIn}>
              <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
                OUR EDGE
              </span>
              <h2 className="text-2xl font-black mb-4">
                WHY CHOOSE NSETS PVT. LTD
              </h2>
              <ul className="space-y-3">
                {WHY_CHOOSE.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-accent-light/80 text-sm">
                    <span className="text-accent-blue font-bold shrink-0" aria-hidden>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conclusion — single block, two columns */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <span className="font-orbitron text-xs tracking-[0.4em] text-accent-blue mb-3 block">
                CONCLUSION
              </span>
              <h2 className="text-xl font-black mb-4">
                DEFENSE & INDUSTRIAL PARTNERSHIP
              </h2>
              <p className="text-accent-light/70 leading-relaxed text-sm">
                With our strong engineering background, in-house CNC capabilities, and established sourcing links in China, NSETS Pvt. Ltd is fully capable of supplying POF Wah with robust, precise, and efficient mechanical machines and furnaces. We look forward to a long-term technical partnership with Pakistan Ordnance Factories, contributing to local defense production and industrial self-reliance.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-black mb-4">
                EDUCATION & TRAINING
              </h2>
              <p className="text-accent-light/70 leading-relaxed text-sm">
                We are fully capable of supplying educational institutions with robust, precise, and efficient mechanical machines, furnaces, and training systems. We look forward to a long-term technical partnership with technical institutes and vocational centers, contributing to skill development, technical education, and institutional self-reliance in Pakistan.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
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
