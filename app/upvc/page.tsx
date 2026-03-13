"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import PdfBookViewer from "@/components/PdfBookViewer";

const PRODUCTS = [
  {
    id: "222",
    name: "222 Series",
    pdfPath: "/images/sequence/Penwood-222.pdf",
    pdfPages: 2,
    description:
      "A compact, cost-effective 2-chamber PVC profile system with a 60mm frame depth. Ideal for standard residential windows and doors in moderate climates. It offers solid thermal insulation (Uf value ~1.5 W/m²K), easy installation, and resistance to weathering. Perfect for budget-conscious projects without compromising on basic performance.",
  },
  {
    id: "632",
    name: "632 Series",
    pdfPath: "/images/sequence/Penwood-632.pdf",
    pdfPages: 2,
    description:
      "A mid-range 6-chamber profile with 70mm depth, engineered for enhanced energy efficiency (Uf ~1.2 W/m²K) and noise reduction (up to 40 dB). It supports larger glazing areas, multi-point locking, and customization options like tilt-and-turn mechanisms. Great for urban homes or apartments needing better insulation.",
  },
  {
    id: "750",
    name: "750 Series",
    pdfPath: "/images/sequence/Penwood-750.pdf",
    pdfPages: 2,
    description:
      "Premium 7-chamber profile featuring 76mm depth for top-tier performance (Uf ~1.0 W/m²K), superior thermal bridging resistance, and high wind load capacity. Suited for luxury builds or cold climates, with options for triple glazing and smart hardware integration. Emphasizes sustainability with recyclable PVC.",
  },
];

export default function UpvcPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            WINtech BY ADO GROUP
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            uPVC WINDOWS & DOORS
          </h1>
          <p className="text-accent-light/60 text-lg max-w-2xl mx-auto">
            Durable, energy-efficient, and stylish solutions by Wintech — trusted profiles for residential and commercial projects.
          </p>
        </div>
      </section>

      {/* Products */}
      {PRODUCTS.map((product, index) => (
        <section
          key={product.id}
          className={`py-16 sm:py-24 px-4 sm:px-6 md:px-8 ${index % 2 === 1 ? "bg-[#0d0d0d] border-y border-white/5" : ""}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={index === 1 ? "order-2 lg:order-2" : index % 2 === 1 ? "order-2 lg:order-1" : ""}>
                <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
                  WINtech PRODUCTS
                </span>
                <h2 className="text-2xl md:text-3xl font-black mb-6">
                  {product.name}
                </h2>
                <p className="text-accent-light/70 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className={index === 1 ? "order-1 lg:order-1" : index % 2 === 1 ? "order-1 lg:order-2" : ""}>
                <p className="text-xs font-bold tracking-widest text-accent-light/50 mb-3 uppercase">
                  Product catalog
                </p>
                <PdfBookViewer
                  src={product.pdfPath}
                  totalPages={product.pdfPages}
                  title={`${product.name} catalog`}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent-light/60 mb-8">
            Interested in Wintech uPVC profiles? NSETS is the authorized dealer in Pakistan — we can help with selection, supply, and installation.
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
