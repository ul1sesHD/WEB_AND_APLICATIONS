"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants/navigation";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-deep-blue/60 border-b border-neon-cyan/20 shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        <Logo />

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-neon-cyan transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-neon-gradient transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden p-2 text-white/80 hover:text-neon-cyan transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-neon-cyan/20 backdrop-blur-xl bg-deep-blue/80">
          <ul className="px-6 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-white/80 hover:text-neon-cyan transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
