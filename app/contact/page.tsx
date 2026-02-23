"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const OFFICES = [
  {
    id: "head-office",
    title: "Head Office",
    subtitle: "Islamabad",
    address: "2nd Floor, KNZ Arcade, Plot 43 A, Sector C, Downtown Road, DHA 2, Islamabad",
    phone: "051-5916909",
    email: "sales.nsets@gmail.com",
    fax: null,
    mapQuery: "2nd Floor, KNZ Arcade, Plot 43 A, Sector C, Downtown Road, DHA 2, Islamabad",
  },
  {
    id: "office-2",
    title: "Office 2",
    subtitle: "Islamabad",
    address: "4th Floor, KNZ Arcade (Plaza MB-42), Commercial Block, (Opposite Defense Executive Apartments (Lignum Tower), Sector A, DHA 2, Islamabad",
    phone: "051-5916562",
    email: "sales.nsets@gmail.com",
    fax: "051-5916563",
    mapQuery: "4th Floor, KNZ Arcade, Commercial Block, Sector A, DHA 2, Islamabad",
  },
  {
    id: "office-3",
    title: "Office 3",
    subtitle: "Lahore",
    address: "N-Sets (Pvt) Limited. 5th Floor, 84-Block A, DHA Phase-8, Commercial Broadway, Lahore.",
    phone: null,
    email: null,
    fax: null,
    mapQuery: "N-Sets Limited. 5th Floor, 84-Block A, DHA Phase-8, Commercial Broadway, Lahore",
  },
  {
    id: "factory",
    title: "Factory",
    subtitle: "Rawalpindi",
    address: "Plot No 7, Main Road, Rawat Industrial State, District Rawalpindi",
    phone: null,
    email: null,
    fax: null,
    mapQuery: "Plot No 7, Main Road, Rawat Industrial State, District Rawalpindi",
  },
];

function MapEmbed({ query }: { query: string }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <iframe
      src={src}
      width="100%"
      height="220"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={`Map: ${query}`}
      className="w-full h-56 rounded-sm bg-neutral-gray"
    />
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-accent-light selection:bg-accent-blue selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            CONTACT US
          </h1>
          <p className="text-accent-light/60 text-lg max-w-2xl mx-auto">
            Visit our offices, reach out by phone or email, or send a message — we’re here to help.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 tracking-wide">SEND A MESSAGE</h2>
          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold tracking-widest text-accent-light/60 mb-2">
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-accent-light placeholder-accent-light/30 focus:border-accent-blue focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold tracking-widest text-accent-light/60 mb-2">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-accent-light placeholder-accent-light/30 focus:border-accent-blue focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-xs font-bold tracking-widest text-accent-light/60 mb-2">
                SUBJECT
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-accent-light placeholder-accent-light/30 focus:border-accent-blue focus:outline-none transition-colors"
                placeholder="Inquiry subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-bold tracking-widest text-accent-light/60 mb-2">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-accent-light placeholder-accent-light/30 focus:border-accent-blue focus:outline-none transition-colors resize-y min-h-[120px]"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-accent-blue hover:bg-accent-blue/90 text-white font-bold text-sm tracking-[0.2em] transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>

      {/* Offices & Maps */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent-blue font-orbitron text-xs tracking-[0.4em] mb-4 block">
              OUR LOCATIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-black">OFFICES & FACTORY</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {OFFICES.map((office, i) => (
              <motion.article
                key={office.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="hud-border rounded-sm overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-baseline gap-3 mb-4">
                    <h3 className="text-xl font-bold text-accent-light">{office.title}</h3>
                    <span className="text-accent-blue text-sm font-medium tracking-widest">
                      {office.subtitle}
                    </span>
                  </div>
                  <address className="not-italic text-accent-light/70 text-sm leading-relaxed mb-4">
                    {office.address}
                  </address>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {office.phone && (
                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="text-accent-blue hover:underline"
                      >
                        {office.phone}
                      </a>
                    )}
                    {office.email && (
                      <a
                        href={`mailto:${office.email}`}
                        className="text-accent-blue hover:underline"
                      >
                        {office.email}
                      </a>
                    )}
                    {office.fax && (
                      <span className="text-accent-light/50">Fax: {office.fax}</span>
                    )}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-xs font-bold tracking-widest text-accent-blue hover:underline"
                  >
                    OPEN IN GOOGLE MAPS →
                  </a>
                </div>
                <MapEmbed query={office.mapQuery} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Quick contact */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">PREFER TO CALL OR EMAIL?</h2>
          <p className="text-accent-light/60 mb-8">
            For sales and general inquiries, use the details above or reach us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="tel:0515916909"
              className="px-6 py-3 border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white transition-colors text-sm font-bold tracking-widest"
            >
              CALL 051-5916909
            </a>
            <a
              href="mailto:sales.nsets@gmail.com"
              className="px-6 py-3 border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white transition-colors text-sm font-bold tracking-widest"
            >
              sales.nsets@gmail.com
            </a>
          </div>
          <Link
            href="/"
            className="inline-block mt-12 text-accent-light/50 hover:text-accent-blue text-sm font-bold tracking-widest transition-colors"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
