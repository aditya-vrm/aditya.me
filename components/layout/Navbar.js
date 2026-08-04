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
      rootMargin: "-20% 0px -60% 0px", // Trigger when section occupies the middle of viewport
      threshold: 0.1,
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
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-[90vw] md:max-w-xs">
      <div className="flex items-center justify-center w-full px-4 py-2.5 rounded-full bg-glass-bg border border-glass-border backdrop-blur-md shadow-lg shadow-black/5 hover:border-accent/30 transition-colors duration-300">
        {/* Navigation Links */}
        <div className="flex items-center gap-1 md:gap-1.5">
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

// Inner component for magnetic link behavior and hover transitions
function NavLink({ link, isActive, onClick }) {
  const linkRef = useMagnetic(0.3);

  return (
    <div ref={linkRef} className="relative">
      <a
        href={link.href}
        onClick={onClick}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 relative block overflow-hidden ${
          isActive
            ? "text-white"
            : "text-foreground hover:text-accent"
        }`}
      >
        {/* Animated background pill for active state */}
        {isActive && (
          <span className="absolute inset-0 bg-accent rounded-full -z-10 layoutId" />
        )}
        
        {/* Text container */}
        <span className="relative z-10 block transition-transform duration-300 hover:scale-105">
          {link.name}
        </span>
      </a>
    </div>
  );
}
