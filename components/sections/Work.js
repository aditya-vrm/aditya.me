"use client";

import { useEffect, useRef } from "react";
import { WORK_EXPERIENCE } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Calendar, Briefcase, Sparkles, Building2 } from "lucide-react";

export default function Work({ loaderComplete }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!loaderComplete) return;

    // Delay initialization until layout height settles
    const timer = setTimeout(() => {
      const cards = gsap.utils.toArray(".experience-card");
      if (!cards.length || !containerRef.current) return;

      // Respect prefers-reduced-motion
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Pin the entire work section, letting scroll drive card unstacking
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        }
      });

      // Initial state of other cards' contents to opacity 0 so they don't flash and can stagger in
      cards.forEach((card, idx) => {
        if (idx > 0) {
          gsap.set(card.querySelector(".card-header"), { opacity: 0, y: 15 });
          gsap.set(card.querySelector(".card-desc"), { opacity: 0, y: 15 });
          gsap.set(card.querySelectorAll(".card-highlight-item"), { opacity: 0, x: -15 });
        }
      });

      // First card content entrance reveal (instantly starts revealing on load)
      const firstCard = cards[0];
      if (firstCard) {
        tl.fromTo(firstCard.querySelector(".card-header"),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0
        );
        tl.fromTo(firstCard.querySelector(".card-desc"),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.1
        );
        tl.fromTo(firstCard.querySelectorAll(".card-highlight-item"),
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" },
          0.2
        );
      }

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // The last card stays in place

        // 1. Current card slides up and away
        tl.to(card, {
          yPercent: -130,
          rotate: () => -8 - Math.random() * 8, // slight random rotation tilt as it flies away
          opacity: 0,
          scale: 0.9,
          ease: "power1.inOut",
        }, index);

        // 2. Next card slides up and scales up to normal size
        const nextCard = cards[index + 1];
        tl.fromTo(nextCard,
          {
            scale: index === 0 ? 0.95 : index === 1 ? 0.90 : 0.85,
            y: index === 0 ? 24 : index === 1 ? 48 : 72,
            rotate: index % 2 === 0 ? 2 : -2,
          },
          {
            scale: 1,
            y: 0,
            rotate: 0,
            ease: "power1.out",
          },
          index
        );

        // Animate inner text elements of the next card to reveal on active
        const header = nextCard.querySelector(".card-header");
        const desc = nextCard.querySelector(".card-desc");
        const highlights = nextCard.querySelectorAll(".card-highlight-item");

        tl.fromTo(header, 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          index + 0.2
        );
        tl.fromTo(desc, 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          index + 0.3
        );
        tl.fromTo(highlights, 
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" },
          index + 0.4
        );

        // 3. Shift subsequent cards in the stack up slightly
        for (let i = index + 2; i < cards.length; i++) {
          const remainingCard = cards[i];
          const prevScale = 1 - (i - index) * 0.05;
          const targetScale = 1 - (i - index - 1) * 0.05;
          const prevY = (i - index) * 24;
          const targetY = (i - index - 1) * 24;
          
          tl.to(remainingCard, {
            scale: targetScale,
            y: targetY,
            ease: "power1.out"
          }, index);
        }
      });

      // 4. Dummy pause at the end of the timeline so the last card remains active/pinned on screen
      tl.to({}, { duration: 1 }, cards.length - 1);

      // 5. Draw the curvy connecting line in the Work section dynamically
      const paths = document.querySelectorAll(".work-connecting-path");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}px`;
        p.style.strokeDashoffset = `${len}px`;
        
        tl.to(p, {
          strokeDashoffset: 0,
          ease: "none",
        }, 0); // draw continuously throughout the scroll duration
      });

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [loaderComplete]);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // Accent gradient background spotlight styles for each card
  const getSpotlightColor = (index) => {
    switch (index) {
      case 0: return "rgba(245, 158, 11, 0.12)"; // Amber (Freelance)
      case 1: return "rgba(99, 102, 241, 0.12)";  // Indigo (Global Webify)
      case 2: return "rgba(6, 182, 212, 0.12)";  // Cyan (Cognifyz)
      case 3: return "rgba(16, 185, 129, 0.12)";  // Emerald (SIH)
      case 4: return "rgba(244, 63, 94, 0.12)";   // Rose (INNO-8)
      default: return "rgba(255, 255, 255, 0.08)";
    }
  };

  const getBorderColor = (index) => {
    switch (index) {
      case 0: return "border-amber-500/20 hover:border-amber-500/40"; // Amber (Freelance)
      case 1: return "border-indigo-500/20 hover:border-indigo-500/40"; // Indigo (Global Webify)
      case 2: return "border-cyan-500/20 hover:border-cyan-500/40";  // Cyan (Cognifyz)
      case 3: return "border-emerald-500/20 hover:border-emerald-500/40"; // Emerald (SIH)
      case 4: return "border-rose-500/20 hover:border-rose-500/40";  // Rose (INNO-8)
      default: return "border-white/10 hover:border-white/20";
    }
  };

  const getCompanyShortName = (company) => {
    if (company.includes("Hackathon")) return "SIH";
    if (company.includes("INNO")) return "INNO-8";
    if (company.includes("Cognifyz")) return "Cognifyz";
    if (company.includes("Global")) return "Webify";
    return "Freelance";
  };

  return (
    <section 
      ref={containerRef}
      id="work" 
      className="min-h-screen w-full relative bg-[#F9F9FB] flex flex-col justify-center items-center overflow-hidden py-24 select-none"
    >
      {/* Background Grid Pattern (Light theme optimized) */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      {/* Full-section curvy connecting line wrapping the cards (Desktop/Tablet) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          {/* Subtle glowing filter path */}
          <path
            className="work-connecting-path opacity-20 blur-[3px]"
            d="M 720,0 C 500,100 150,200 150,450 C 150,700 940,750 1290,650 C 1290,800 940,850 720,900"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Main solid path */}
          <path
            className="work-connecting-path"
            d="M 720,0 C 500,100 150,200 150,450 C 150,700 940,750 1290,650 C 1290,800 940,850 720,900"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Full-section curvy connecting line wrapping the cards (Mobile) */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0 overflow-visible md:hidden">
        <svg className="w-full h-full" viewBox="0 0 375 900" fill="none" preserveAspectRatio="none">
          {/* Subtle glowing filter path */}
          <path
            className="work-connecting-path opacity-20 blur-[3px]"
            d="M 187.5,0 C 80,200 295,400 187.5,600 C 80,700 187.5,800 187.5,900"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Main solid path */}
          <path
            className="work-connecting-path"
            d="M 187.5,0 C 80,200 295,400 187.5,600 C 80,700 187.5,800 187.5,900"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Decorative top soft accent light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="absolute top-12 left-6 md:left-12 z-30 select-text">
        <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent mb-2 block">
          Professional Path
        </span>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-black font-display">
          Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">Experience</span>.
        </h2>
      </div>

      {/* Stacked Cards Container */}
      <div className="relative w-[90vw] md:w-[75vw] max-w-4xl h-[70vh] md:h-[56vh] flex justify-center items-center mt-20 z-20">
        {WORK_EXPERIENCE.map((exp, idx) => {
          // Pre-calculate initial styles for stacked layout preview
          const initialScale = 1 - idx * 0.05;
          const initialY = idx * 24;
          const initialRotate = idx === 0 ? 0 : idx === 1 ? 2 : idx === 2 ? -2 : 1;

          return (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              className={`experience-card group absolute inset-0 rounded-[32px] p-6 md:p-9 flex flex-col justify-between items-stretch overflow-hidden border bg-[#111113]/90 backdrop-blur-xl shadow-2xl transition-all duration-300 ${getBorderColor(idx)}`}
              style={{
                zIndex: WORK_EXPERIENCE.length - idx,
                transform: `scale(${initialScale}) translateY(${initialY}px) rotate(${initialRotate}deg)`,
                transformOrigin: "bottom center"
              }}
            >
              {/* Card Spotlight Glass Overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle 350px at var(--mouse-x, 150px) var(--mouse-y, 150px), ${getSpotlightColor(idx)} 0%, rgba(0, 0, 0, 0) 80%)`,
                }}
              />

              {/* Giant Outline Company Name Background */}
              <div 
                className="absolute -bottom-6 -right-6 text-7xl sm:text-8xl md:text-9xl font-black font-display tracking-wider uppercase select-none pointer-events-none opacity-[0.03] leading-none z-0"
                style={{ 
                  WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.4)", 
                  WebkitTextFillColor: "transparent" 
                }}
              >
                {getCompanyShortName(exp.company)}
              </div>

              {/* Content Wrapper (Unified Vertical Flow) */}
              <div className="w-full h-full flex flex-col justify-between relative z-10 select-text">
                
                {/* Header Bar */}
                <div className="card-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4 border-b border-white/5 pb-4 mb-4">
                  <div>
                    <span className="font-mono text-[9px] font-bold tracking-widest text-accent uppercase bg-accent/10 px-2.5 py-1 rounded-full w-fit mb-3 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-accent/80 shrink-0" />
                      {exp.role}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-muted/80 flex items-center gap-1.5 sm:self-end">
                    <Building2 className="w-4 h-4 text-muted/50" />
                    {exp.company}
                  </p>
                </div>

                {/* Description */}
                <p className="card-desc text-xs md:text-sm text-muted/80 leading-relaxed font-light mb-4 md:mb-6">
                  {exp.description}
                </p>

                {/* Accomplishments Grid (Unified 3 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  {exp.highlights.map((highlight, hIdx) => (
                    <div 
                      key={hIdx} 
                      className="card-highlight-item p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-2.5 transition-colors duration-300 hover:bg-white/[0.04]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                      <p className="text-[10px] md:text-[11px] text-muted/80 leading-relaxed font-light">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Mini bottom deck scroll helper progress */}
      <div className="absolute bottom-12 flex items-center gap-3 z-30 font-mono text-[9px] md:text-[10px] tracking-widest text-black/60 uppercase font-bold">
        <span>Scroll to explore journey</span>
      </div>
    </section>
  );
}
