"use client";

import Link from "next/link";
import Image from "next/image";
import { SHOW_ALL_PAGES } from "@/lib/siteConfig";

const ALL_FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Home Automation", href: "/home-automation" },
  { label: "uPVC", href: "/upvc", disabled: true },
  { label: "Lab & Equipment", href: "/lab-equipment" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_LINKS = SHOW_ALL_PAGES ? ALL_FOOTER_LINKS : ALL_FOOTER_LINKS.filter((l) => l.href === "/");

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16 text-center sm:text-left">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <Link href="/" className="inline-flex items-center justify-center">
              <Image
                src="/images/logos/Nsets logo_horizontal colored.png"
                alt="N-SETS"
                width={220}
                height={56}
                className="h-12 w-auto object-contain"
                priority
              />
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
            <ul className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-1">
              {FOOTER_LINKS.map(({ label, href, disabled }) => (
                <li key={href}>
                  {disabled ? (
                    <span className="text-sm text-accent-light/40 cursor-default" aria-disabled="true">
                      {label}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="text-sm text-accent-light/60 transition-colors hover:text-accent-blue"
                    >
                      {label}
                    </Link>
                  )}
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
              <p>
                <a
                  href="tel:+923373330197"
                  className="transition-colors hover:text-accent-blue"
                >
                  +92 337 3330197
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
