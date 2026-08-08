"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Inline brand logo SVGs
const LOGOS = {
  react: (
    <svg className="w-10 h-10 text-[#61DAFB] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <ellipse cx="50" cy="50" rx="15" ry="38" transform="rotate(30 50 50)" />
      <ellipse cx="50" cy="50" rx="15" ry="38" transform="rotate(90 50 50)" />
      <ellipse cx="50" cy="50" rx="15" ry="38" transform="rotate(150 50 50)" />
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  ),
  node: (
    <svg className="w-10 h-10 text-[#339933] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z" />
      <path d="M50 15 L50 85 M20 32 L80 68 M80 32 L20 68" opacity="0.3" />
    </svg>
  ),
  mongodb: (
    <svg className="w-10 h-10 text-[#47A248] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M50 10 C50 10 30 35 30 55 C30 75 40 85 50 90 C60 85 70 75 70 55 C70 35 50 10 50 10 Z" />
      <path d="M50 10 L50 90" opacity="0.3" />
    </svg>
  ),
  nextjs: (
    <svg className="w-10 h-10 text-white shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="50" cy="50" r="40" />
      <path d="M35 65 L35 35 L62 65 M62 35 L62 55" />
    </svg>
  ),
  python: (
    <svg className="w-10 h-10 text-[#3776AB] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M30 15 C30 15 45 10 50 15 C55 20 50 35 50 35 L30 35 Z M70 85 C70 85 55 90 50 85 C45 80 50 65 50 65 L70 65 Z" />
      <circle cx="38" cy="23" r="3" fill="currentColor" />
      <circle cx="62" cy="77" r="3" fill="currentColor" />
    </svg>
  ),
  docker: (
    <svg className="w-10 h-10 text-[#2496ED] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="25" y="45" width="10" height="10" rx="1" />
      <rect x="38" y="45" width="10" height="10" rx="1" />
      <rect x="51" y="45" width="10" height="10" rx="1" />
      <rect x="38" y="32" width="10" height="10" rx="1" />
      <rect x="51" y="32" width="10" height="10" rx="1" />
      <rect x="64" y="45" width="10" height="10" rx="1" />
      <path d="M15 60 C25 60 20 75 50 75 C80 75 90 60 90 60" />
    </svg>
  ),
  javascript: (
    <svg className="w-10 h-10 text-[#F7DF1E] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="20" y="20" width="60" height="60" rx="5" />
      <path d="M45 68 C45 72 41 74 36 74 C31 74 30 70 30 68" />
      <path d="M55 70 C55 73 57 74 61 74 C65 74 66 72 66 69 C66 65 55 64 55 58 C55 54 59 52 62 52 C65 52 66 54 66 56" />
    </svg>
  ),
  html5: (
    <svg className="w-10 h-10 text-[#E34F26] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 15 L26 80 L50 87 L74 80 L80 15 Z" />
      <path d="M50 25 L32 25 L34 45 L50 45 L50 57 L38 53 L37 40" opacity="0.3" />
      <path d="M50 25 L68 25 L66 45 L50 45 L50 57 L62 53 L63 40" opacity="0.3" />
    </svg>
  ),
  css3: (
    <svg className="w-10 h-10 text-[#1572B6] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 15 L26 80 L50 87 L74 80 L80 15 Z" />
      <path d="M50 25 L32 25 L33 35 L50 35 M50 45 L35 45 L36 55 L50 55 M50 65 L40 62 L39 52" opacity="0.3" />
    </svg>
  ),
  tailwind: (
    <svg className="w-10 h-10 text-[#06B6D4] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M50 30 C35 30 25 45 25 55 C25 65 35 70 50 70 C65 70 75 55 75 45 C75 35 65 30 50 30 Z" />
      <path d="M40 40 C32 40 28 50 28 55 C28 60 32 62 40 62 C48 62 52 50 52 45 C52 40 48 40 40 40 Z" opacity="0.4" />
    </svg>
  ),
  git: (
    <svg className="w-10 h-10 text-[#F05032] shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="25" y="25" width="50" height="50" rx="8" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      <circle cx="38" cy="38" r="6" fill="currentColor" />
      <circle cx="62" cy="62" r="6" fill="currentColor" />
      <line x1="38" y1="38" x2="50" y2="50" stroke="currentColor" strokeWidth="3" />
      <line x1="50" y1="50" x2="62" y2="62" stroke="currentColor" strokeWidth="3" />
    </svg>
  ),
  threejs: (
    <svg className="w-10 h-10 text-white shrink-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polygon points="50,15 80,45 80,75 50,85 20,75 20,45" />
      <line x1="50" y1="15" x2="50" y2="85" opacity="0.3" />
      <line x1="20" y1="45" x2="80" y2="75" opacity="0.3" />
      <line x1="80" y1="45" x2="20" y2="75" opacity="0.3" />
    </svg>
  ),
};

const ROW_ONE = [
  { id: "r1", name: "Next.js", logo: LOGOS.nextjs, color: "shadow-[0_8px_30px_rgba(255,255,255,0.15)]" },
  { id: "r2", name: "React", logo: LOGOS.react, color: "shadow-[0_8px_30px_rgba(97,218,251,0.2)]" },
  { id: "r3", name: "Node.js", logo: LOGOS.node, color: "shadow-[0_8px_30px_rgba(51,153,51,0.2)]" },
  { id: "r4", name: "MongoDB", logo: LOGOS.mongodb, color: "shadow-[0_8px_30px_rgba(71,162,72,0.2)]" },
  { id: "r5", name: "Python", logo: LOGOS.python, color: "shadow-[0_8px_30px_rgba(55,118,171,0.2)]" },
  { id: "r6", name: "Docker", logo: LOGOS.docker, color: "shadow-[0_8px_30px_rgba(36,150,237,0.2)]" },
];

const ROW_TWO = [
  { id: "r7", name: "JavaScript", logo: LOGOS.javascript, color: "shadow-[0_8px_30px_rgba(247,223,30,0.15)]" },
  { id: "r8", name: "HTML5", logo: LOGOS.html5, color: "shadow-[0_8px_30px_rgba(227,79,38,0.2)]" },
  { id: "r9", name: "CSS3", logo: LOGOS.css3, color: "shadow-[0_8px_30px_rgba(21,114,182,0.2)]" },
  { id: "r10", name: "Tailwind CSS", logo: LOGOS.tailwind, color: "shadow-[0_8px_30px_rgba(6,182,212,0.2)]" },
  { id: "r11", name: "Git", logo: LOGOS.git, color: "shadow-[0_8px_30px_rgba(240,80,50,0.2)]" },
  { id: "r12", name: "Three.js", logo: LOGOS.threejs, color: "shadow-[0_8px_30px_rgba(255,255,255,0.15)]" },
];

export default function TechTicker() {
  const sectionRef = useRef(null);

  // Duplicate lists multiple times to ensure seamless infinite looping
  const listOne = [...ROW_ONE, ...ROW_ONE, ...ROW_ONE, ...ROW_ONE];
  const listTwo = [...ROW_TWO, ...ROW_TWO, ...ROW_TWO, ...ROW_TWO];

  useEffect(() => {
    // ScrollTrigger reveal drawing of the curvy line
    const paths = document.querySelectorAll(".ticker-connecting-path");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}px`;
      p.style.strokeDashoffset = `${len}px`;

      gsap.to(p, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#060608] py-24 select-none relative overflow-hidden z-10 border-t border-white/5"
    >
      <style>{`
        /* Infinite Marquee Loop Left-to-Right */
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        /* Infinite Marquee Loop Right-to-Left */
        @keyframes marquee-rtl {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track-ltr {
          animation: marquee-ltr 22s linear infinite;
        }
        .marquee-track-rtl {
          animation: marquee-rtl 22s linear infinite;
        }

        /* 5x Slowdown Coasting on Hover */
        .marquee-container:hover .marquee-track-ltr,
        .marquee-container:hover .marquee-track-rtl {
          animation-duration: 130s;
        }

        /* Explicit card hover pop-up override rules */
        .marquee-container .tech-item-card:hover {
          opacity: 1 !important;
          filter: none !important;
          transform: scale(1.35) translateY(-10px) !important;
          border-color: rgba(245, 158, 11, 0.4) !important;
          z-index: 50 !important;
        }

        /* Adjacent dimming and blurring when any item is hovered */
        .marquee-container:hover .tech-item-card:not(:hover) {
          opacity: 0.3 !important;
          filter: blur(0.8px) grayscale(40%) !important;
          transform: scale(0.9) !important;
        }
      `}</style>

      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[300px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Full-section curvy connecting line (Desktop/Tablet) */}
      <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-0 overflow-visible hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          <path
            className="ticker-connecting-path opacity-20 blur-[3px]"
            d="M 720,0 C 650,200 790,400 720,600"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            className="ticker-connecting-path"
            d="M 720,0 C 650,200 790,400 720,600"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-left select-text relative z-10">
        <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent mb-2 block">
          Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-display">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">Stack</span>.
        </h2>
      </div>

      <div className="w-full flex flex-col gap-8 relative z-10">
        {/* Row 1: Left-to-Right Scrolling */}
        <div className="marquee-container w-full overflow-hidden flex relative py-3">
          {/* Fades on the edges for premium blending */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060608] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060608] to-transparent z-20 pointer-events-none" />

          <div className="marquee-track-ltr flex gap-8 whitespace-nowrap">
            {listOne.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className={`tech-item-card inline-flex items-center gap-4 bg-[#111114] border border-white/5 py-4 px-6 md:py-5 md:px-8 rounded-2xl cursor-pointer transition-all duration-500 ${item.color}`}
              >
                {item.logo}
                <span className="text-sm md:text-base font-bold text-white/90 font-mono tracking-tight">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right-to-Left Scrolling */}
        <div className="marquee-container w-full overflow-hidden flex relative py-3">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060608] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060608] to-transparent z-20 pointer-events-none" />

          <div className="marquee-track-rtl flex gap-8 whitespace-nowrap">
            {listTwo.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className={`tech-item-card inline-flex items-center gap-4 bg-[#111114] border border-white/5 py-4 px-6 md:py-5 md:px-8 rounded-2xl cursor-pointer transition-all duration-500 ${item.color}`}
              >
                {item.logo}
                <span className="text-sm md:text-base font-bold text-white/90 font-mono tracking-tight">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
