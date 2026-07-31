"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const buttonRef = useMagnetic(0.4);

  const scrollToTop = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-6 border-t border-black/5 bg-background relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Name and Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-foreground tracking-tight">
            Aditya Verma
          </p>
          <p className="text-xs text-muted mt-1">
            © {currentYear} · Made with Next.js & GSAP. All rights reserved.
          </p>
        </div>

        {/* Right Side: Magnetic Back to Top Button */}
        <div className="flex items-center justify-center">
          <button
            ref={buttonRef}
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-black/10 bg-white shadow-sm hover:bg-accent hover:border-accent hover:text-white transition-colors duration-300 group"
            aria-label="Back to top"
            data-cursor="pointer"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </footer>
  );
}
