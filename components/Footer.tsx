"use client";

import Link from "next/link";
import { SHOW_ALL_PAGES } from "@/lib/siteConfig";

const ALL_FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Home Automation", href: "/home-automation" },
  { label: "uPVC", href: "/upvc" },
  { label: "Electronics", href: "/electronics" },
  { label: "Equipment & Tools", href: "/equipment-tools" },
  { label: "Digital Logic Design", href: "/digital-logic-design" },
  { label: "Equipment Rental", href: "/equipment-rental-services" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_LINKS = SHOW_ALL_PAGES ? ALL_FOOTER_LINKS : ALL_FOOTER_LINKS.filter((l) => l.href === "/");

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-accent-blue text-sm font-bold text-accent-light transition-colors hover:bg-accent-blue hover:text-[#0b0b0b]">
                N
              </span>
              <span className="text-xl font-bold tracking-[0.2em] text-accent-light">
                N-SETS
              </span>
            </Link>
            <p className="mt-4 text-xs font-medium tracking-widest text-accent-blue">
              ENGINEERING THE FUTURE
            </p>
            <p className="mt-2 text-sm leading-relaxed text-accent-light/50">
              Smart solutions for industry and education.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-light/40">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-1">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-accent-light/60 transition-colors hover:text-accent-blue"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-light/40">
              Contact
            </h3>
            <div className="mt-4 space-y-3 text-sm text-accent-light/60">
              <p>
                <a
                  href="mailto:sales.nsets@gmail.com"
                  className="transition-colors hover:text-accent-blue"
                >
                  sales.nsets@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:0515916909"
                  className="transition-colors hover:text-accent-blue"
                >
                  051-5916909
                </a>
              </p>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-light/40">
              Head Office
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-accent-light/60">
              2nd Floor, KNZ Arcade, Plot 43 A, Sector C, Downtown Road, DHA 2, Islamabad
            </p>
            <h3 className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-accent-light/40">
              Factory
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-accent-light/60">
              Plot No 7, Main Road, Rawat Industrial State, District Rawalpindi
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-14 flex justify-center border-t border-white/5 pt-6 sm:pt-8">
          <p className="text-[10px] tracking-[0.2em] text-accent-light/30">
            © {new Date().getFullYear()} N-SETS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
