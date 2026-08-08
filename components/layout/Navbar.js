"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  // Intersection Observer for Active Section Tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Trigger when section occupies center of viewport
      threshold: 0.15,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_LINKS.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => {
      NAV_LINKS.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Smooth scroll handler
  const handleScroll = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-fit max-w-[95vw]">
      <div className="flex items-center justify-center w-full px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md shadow-lg shadow-black/5 hover:border-accent/20 transition-all duration-500">
        
        {/* Navigation Links with magnetic + roll hover */}
        <div className="flex items-center gap-1 md:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <NavLink
                key={link.name}
                link={link}
                isActive={isActive}
                onClick={(e) => handleScroll(e, link.href)}
              />
            );
          })}
        </div>

      </div>
    </nav>
  );
}

// Inner component for magnetic link behavior and text roll hover transitions
function NavLink({ link, isActive, onClick }) {
  const linkRef = useMagnetic(0.3);

  return (
    <div ref={linkRef} className="relative">
      <a
        href={link.href}
        onClick={onClick}
        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-extrabold tracking-widest uppercase transition-all duration-300 relative block overflow-hidden group select-none ${
          isActive
            ? "text-accent bg-accent/5"
            : "text-muted hover:text-foreground"
        }`}
      >
        {/* Active Underdot */}
        {isActive && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent animate-pulse" />
        )}
        
        {/* Text Roll Container */}
        <div className="h-3.5 overflow-hidden relative block px-0.5">
          <span className={`block transition-transform duration-300 group-hover:-translate-y-full ${isActive ? "text-accent" : ""}`}>
            {link.name}
          </span>
          <span className="block absolute inset-0 text-accent transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            {link.name}
          </span>
        </div>
      </a>
    </div>
  );
}
