"use client";

import Link from "next/link";
import Image from "next/image";
import WhatsAppLink from "@/components/WhatsAppLink";
import { SHOW_ALL_PAGES } from "@/lib/siteConfig";

type FooterLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

const ALL_FOOTER_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "UPVC", href: "/upvc" },
  { label: "Home Automation", href: "/home-automation" },
  { label: "Trading", href: "/trading" },
  { label: "R & D", href: "/lab-equipment" },
  { label: "Education & Career", href: "/education-career" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_LINKS = SHOW_ALL_PAGES ? ALL_FOOTER_LINKS : ALL_FOOTER_LINKS.filter((l) => l.href === "/");

const linkClass =
  "text-sm text-accent-light/60 transition-colors hover:text-accent-blue";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-10 text-center sm:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="inline-flex">
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
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-accent-light/50">
              Smart solutions for industry and education.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-light/40">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map(({ label, href, disabled }) => (
                <li key={href}>
                  {disabled ? (
                    <span className={`${linkClass} cursor-default opacity-50`} aria-disabled="true">
                      {label}
                    </span>
                  ) : (
                    <Link href={href} className={linkClass}>
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
            <ul className="mt-4 space-y-2.5 text-sm text-accent-light/60">
              <li>
                <a href="mailto:sales.nsets@gmail.com" className={linkClass}>
                  sales.nsets@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:0515916909" className={linkClass}>
                  051-5916909
                </a>
              </li>
              <li>
                <a href="tel:+923373330197" className={linkClass}>
                  +92 337 3330197
                </a>
              </li>
              <li>
                <WhatsAppLink variant="compact" />
              </li>
            </ul>
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

        <div className="mt-10 sm:mt-14 flex justify-center border-t border-white/5 pt-6 sm:pt-8">
          <p className="text-[10px] tracking-[0.2em] text-accent-light/30">
            © {new Date().getFullYear()} N-SETS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
