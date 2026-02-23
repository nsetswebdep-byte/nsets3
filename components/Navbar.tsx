"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SHOW_ALL_PAGES } from "@/lib/siteConfig";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const allNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Home automation", href: "/home-automation" },
  { label: "uPVC", href: "/upvc" },
  { label: "Electronics", href: "/electronics" },
  { label: "Equipment & tools", href: "/equipment-tools" },
  { label: "Digital logic design", href: "/digital-logic-design" },
  { label: "Equipment rental services", href: "/equipment-rental-services" },
  { label: "Contact", href: "/contact" },
] as const;

const navItems = SHOW_ALL_PAGES ? allNavItems : allNavItems.filter((item) => item.href === "/");

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-6 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <Link href="/" className="group">
            <h1 className="text-lg sm:text-xl font-bold tracking-[0.2em] text-accent-light flex items-center gap-2">
              <span className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-accent-blue flex items-center justify-center text-xs group-hover:bg-accent-blue transition-colors duration-500">
                N
              </span>
              N-SETS
            </h1>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-4 xl:gap-6 flex-wrap justify-end max-w-[70%]">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href || (href === "/" && pathname === "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm xl:text-base font-semibold tracking-widest transition-colors duration-300 whitespace-nowrap",
                  isActive ? "text-accent-blue" : "text-accent-light/60 hover:text-accent-blue"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <div className="pointer-events-auto lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded border border-white/20 hover:border-accent-blue/50 hover:bg-white/5 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span
                className={cn(
                  "block h-0.5 w-full bg-accent-light transition-all origin-center",
                  menuOpen && "rotate-45 translate-y-[0.35rem]"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full bg-accent-light transition-all opacity-100",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full bg-accent-light transition-all origin-center",
                  menuOpen && "-rotate-45 -translate-y-[0.35rem]"
                )}
              />
            </div>
          </button>
        </div>

        <motion.div
          style={{ opacity }}
          className="absolute inset-0 -z-10 glass-nav"
        />
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#0b0b0b]/98 backdrop-blur-md pt-20 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 max-w-md mx-auto" aria-label="Mobile navigation">
              {navItems.map(({ label, href }) => {
                const isActive = pathname === href || (href === "/" && pathname === "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block py-4 px-4 rounded-sm text-base font-semibold tracking-wider transition-colors",
                      isActive
                        ? "text-accent-blue bg-accent-blue/10"
                        : "text-accent-light/80 hover:text-accent-blue hover:bg-white/5"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
