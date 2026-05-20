"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

type SpecRow = { label: string; value: string };

type UpvcProduct = {
  id: string;
  name: string;
  series: string;
  imagePath: string;
  description: string;
  specs: SpecRow[];
};

const PRODUCTS: UpvcProduct[] = [
  {
    id: "222",
    name: "W 222 Rail Series",
    series: "PVC Profile System",
    imagePath: "/images/logos/222.png",
    description:
      "Rail sliding PVC profile system for residential and light commercial sliding windows and doors. Three-chamber construction with installed bristle wick sealing and B-class certification.",
    specs: [
      {
        label: "Profile width",
        value: "63 mm double rail frame; 111 mm triple rail frame; 38 mm sliding system sash profile",
      },
      { label: "Number of chambers", value: "3" },
      { label: "Profile class", value: "B Class (TS EN 12608-1)" },
      { label: "Seal type", value: "Installed bristle wick system" },
      { label: "Glass thickness (mm)", value: "4–6, 15, 17 mm" },
    ],
  },
  {
    id: "232",
    name: "W 232 Double and Single",
    series: "Rail Sliding Series",
    imagePath: "/images/logos/232.png",
    description:
      "Versatile rail sliding series with double- and single-rail frame options. Insulated bristle wick sealing and TPE gaskets in grey or black for reliable weather performance.",
    specs: [
      {
        label: "Profile width",
        value: "75 mm double rail frame; 92.5 mm single rail frame; 50 mm sliding system sash profile",
      },
      { label: "Number of chambers", value: "3" },
      { label: "Profile class", value: "B Class (TS EN 12608-1)" },
      { label: "Seal type", value: "Insulated bristle wick system" },
      { label: "Seal type and color", value: "TPE — Grey / Black" },
      { label: "Glass thickness (mm)", value: "4–6, 20, 24 mm" },
    ],
  },
  {
    id: "632",
    name: "W 632 / W 630 Series",
    series: "PVC Profile System",
    imagePath: "/images/logos/632.png",
    description:
      "Compact 60 mm profile system with external and internal double sealing. W 632 (B class) and W 630 (C class) options for cost-effective casement and tilt-and-turn applications.",
    specs: [
      { label: "Profile width", value: "60 mm" },
      { label: "Number of chambers", value: "3" },
      { label: "Profile class", value: "W 632 B Class / W 630 C Class (TS EN 12608-1)" },
      { label: "Seal type", value: "External / Internal double seal system" },
      { label: "Seal type and color", value: "TPE — Grey / Black" },
      { label: "Glass thickness (mm)", value: "4, 20, 24, 30, 32 mm" },
      { label: "Thermal insulation", value: "1.58 W/m²K" },
    ],
  },
  {
    id: "750",
    name: "Penwood 750",
    series: "PVC Profile System",
    imagePath: "/images/logos/750.png",
    description:
      "Premium five-chamber 70 mm profile for high thermal performance. Ideal for energy-conscious homes and commercial façades requiring superior U-values and wide glazing options.",
    specs: [
      { label: "Profile width", value: "70 mm" },
      { label: "Number of chambers", value: "5" },
      { label: "Profile class", value: "B Class (TS EN 12608-1)" },
      { label: "Seal type", value: "External / Internal double seal system" },
      { label: "Seal type and color", value: "TPE — Grey / Black" },
      { label: "Glass thickness (mm)", value: "4, 20, 24, 28, 32, 40, 42 mm" },
      { label: "Thermal insulation", value: "Uf: 1.1 W/m²K · Uw: 0.89 W/m²K" },
    ],
  },
];

const PROFILE_COLORS = [
  { name: "Black", style: "bg-[#1a1a1a]" },
  { name: "Grey", style: "bg-[#6b6b6b]" },
  { name: "White", style: "bg-[#f5f5f0] border border-white/20" },
  { name: "Brown", style: "bg-gradient-to-br from-[#5c4033] via-[#6b4a35] to-[#4a3528]", texture: true },
];

function SpecTable({ specs }: { specs: SpecRow[] }) {
  return (
    <dl className="mt-6 border border-white/10 rounded-sm overflow-hidden divide-y divide-white/10">
      {specs.map((row) => (
        <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[minmax(9rem,38%)_1fr] gap-1 sm:gap-4 px-4 py-3 bg-white/[0.02]">
          <dt className="text-accent-light/50 text-xs sm:text-sm font-medium">{row.label}</dt>
          <dd className="text-accent-light/85 text-sm leading-relaxed">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ColorSwatch({ name, style, texture }: { name: string; style: string; texture?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`w-full aspect-square max-w-[140px] mx-auto rounded-sm shadow-md ${style} ${
          texture ? "bg-[length:8px_8px] [background-image:repeating-linear-gradient(90deg,transparent,transparent_3px,rgba(0,0,0,0.06)_3px,rgba(0,0,0,0.06)_4px)]" : ""
        }`}
        aria-hidden
      />
      <p className="mt-3 text-[11px] sm:text-xs text-accent-light/70 leading-snug">{name}</p>
    </div>
  );
}

export default function UpvcPage() {
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
        <div className="relative px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 md:px-8 md:pt-32 md:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
              WINtech BY ADO GROUP
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              uPVC WINDOWS & DOORS
            </h1>
            <p className="text-accent-light/60 text-lg max-w-2xl mx-auto">
              Durable, energy-efficient Wintech profiles — 222, 232, 632, and 750 series for residential and commercial projects across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {PRODUCTS.map((product, index) => (
        <section
          key={product.id}
          className={`py-16 sm:py-24 px-4 sm:px-6 md:px-8 ${index % 2 === 1 ? "bg-[#0d0d0d] border-y border-white/5" : ""}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-2 block">
                  {product.series.toUpperCase()}
                </span>
                <h2 className="text-2xl md:text-3xl font-black mb-4">{product.name}</h2>
                <p className="text-accent-light/70 leading-relaxed">{product.description}</p>
                <SpecTable specs={product.specs} />
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-xs font-bold tracking-widest text-accent-light/50 mb-3 uppercase">
                  Profile cross-section
                </p>
                <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto bg-black rounded-sm overflow-hidden border border-white/10">
                  <Image
                    src={product.imagePath}
                    alt={`${product.name} uPVC profile`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-3 block">
            FINISH OPTIONS
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-4">AVAILABLE COLORS</h2>
          <p className="text-accent-light/70 leading-relaxed max-w-3xl mb-10">
            Wintech profiles are available in black, grey, white, and brown finishes. Seal gaskets are supplied in TPE grey or black to match your specification.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-2xl">
            {PROFILE_COLORS.map((color) => (
              <ColorSwatch key={color.name} name={color.name} style={color.style} texture={color.texture} />
            ))}
          </div>
          <p className="mt-8 text-accent-light/45 text-xs">
            Contact N-SETS for samples and project-specific matching.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent-light/60 mb-8">
            Interested in Wintech uPVC profiles? N-SETS is the authorized dealer in Pakistan — we can help with selection, supply, and installation.
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
