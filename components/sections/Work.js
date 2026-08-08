import { useEffect, useRef, useState } from "react";
import { WORK_EXPERIENCE } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Calendar, Briefcase, Sparkles, Building2 } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Work({ loaderComplete }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!loaderComplete) return;

    // Delay initialization until layout height settles
    const timer = setTimeout(() => {
      const cards = gsap.utils.toArray(".experience-card");
      if (!cards.length || !containerRef.current) return;

      // Disable card unstacking/pinning ScrollTrigger on mobile devices
      if (window.innerWidth < 768) return;

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

      // Keep card texts static and instantly visible as requested
      tl.fromTo(".work-section-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0
      );

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // The last card stays in place

        // 1. Current card slides up and away with Snappy slide-out
        tl.to(card, {
          yPercent: -140,
          rotate: index % 2 === 0 ? -9 : 9, // clean alternating tilt (prevents random rebuild lag)
          opacity: 0,
          scale: 0.9,
          ease: "power2.inOut",
        }, index);

        // 2. Next card scales up and centers cleanly (transitioning from pre-rendered stack style)
        const nextCard = cards[index + 1];
        tl.to(nextCard, {
          scale: 1,
          y: 0,
          rotate: 0,
          ease: "power2.out",
        }, index);

        // 3. Shift subsequent cards in the stack up slightly
        for (let i = index + 2; i < cards.length; i++) {
          const remainingCard = cards[i];
          const targetScale = 1 - (i - index - 1) * 0.05;
          const targetY = (i - index - 1) * 24;
          
          tl.to(remainingCard, {
            scale: targetScale,
            y: targetY,
            ease: "power2.out"
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

  const getCompanyLogo = (index) => {
    switch (index) {
      case 0:
        return (
          <svg className="w-6 h-6 text-amber-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M30 40 L15 50 L30 60 M70 40 L85 50 L70 60 M45 70 L55 30" />
            <circle cx="50" cy="50" r="4" fill="currentColor" className="animate-pulse" />
          </svg>
        );
      case 1:
        return (
          <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="50" cy="50" r="30" />
            <ellipse cx="50" cy="50" rx="10" ry="30" />
            <ellipse cx="50" cy="50" rx="30" ry="10" />
          </svg>
        );
      case 2:
        return (
          <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M40 30 C30 30 20 40 20 50 C20 60 30 70 40 70 M60 30 C70 30 80 40 80 50 C80 60 70 70 60 70" />
            <circle cx="40" cy="50" r="5" fill="currentColor" />
            <circle cx="60" cy="50" r="5" fill="currentColor" />
            <line x1="40" y1="50" x2="60" y2="50" stroke="currentColor" strokeDasharray="3 3" />
          </svg>
        );
      case 3:
        return (
          <svg className="w-6 h-6 text-rose-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" />
            <circle cx="50" cy="50" r="12" stroke="currentColor" />
            <path d="M50 38 L50 62 M38 50 L62 50" />
          </svg>
        );
      case 4:
        return (
          <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M30 50 C30 35 45 35 50 50 C55 65 70 65 70 50 C70 35 55 35 50 50 C45 65 30 65 30 50 Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section 
      ref={containerRef}
      id="work" 
      className="min-h-screen w-full relative bg-[#F9F9FB] flex flex-col justify-center items-center overflow-hidden py-24 select-none"
    >
      {/* Bobbing animation styles for tech stack logos */}
      <style>{`
        @keyframes float-bob {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0px); }
        }
        .animate-bob {
          animation: float-bob ease-in-out infinite;
        }
      `}</style>

      {/* Floating Stack Logos (Left Side) */}
      <div className="absolute left-[3vw] lg:left-[5vw] top-1/2 -translate-y-1/2 flex flex-col gap-14 z-30 hidden md:flex opacity-75 hover:opacity-100 transition-opacity duration-300">
        <MagneticLogo label="React">
          <svg className="w-12 h-12 text-[#61DAFB] animate-bob" style={{ animationDelay: "0s", animationDuration: "5s" }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <ellipse cx="50" cy="50" rx="15" ry="38" transform="rotate(30 50 50)" />
            <ellipse cx="50" cy="50" rx="15" ry="38" transform="rotate(90 50 50)" />
            <ellipse cx="50" cy="50" rx="15" ry="38" transform="rotate(150 50 50)" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </MagneticLogo>

        <MagneticLogo label="Node.js">
          <svg className="w-12 h-12 text-[#339933] animate-bob" style={{ animationDelay: "1s", animationDuration: "5.8s" }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M50 15 L80 32 L80 68 L50 85 L20 68 L20 32 Z" />
            <path d="M50 15 L50 85 M20 32 L80 68 M80 32 L20 68" opacity="0.3" />
          </svg>
        </MagneticLogo>

        <MagneticLogo label="MongoDB">
          <svg className="w-12 h-12 text-[#47A248] animate-bob" style={{ animationDelay: "2s", animationDuration: "6.4s" }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M50 10 C50 10 30 35 30 55 C30 75 40 85 50 90 C60 85 70 75 70 55 C70 35 50 10 50 10 Z" />
            <path d="M50 10 L50 90" opacity="0.3" />
          </svg>
        </MagneticLogo>
      </div>

      {/* Floating Stack Logos (Right Side) */}
      <div className="absolute right-[3vw] lg:right-[5vw] top-1/2 -translate-y-1/2 flex flex-col gap-14 z-30 hidden md:flex opacity-75 hover:opacity-100 transition-opacity duration-300">
        <MagneticLogo label="Next.js">
          <svg className="w-12 h-12 text-black animate-bob" style={{ animationDelay: "0.5s", animationDuration: "5.2s" }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="50" cy="50" r="40" />
            <path d="M35 65 L35 35 L62 65 M62 35 L62 55" />
          </svg>
        </MagneticLogo>

        <MagneticLogo label="Python">
          <svg className="w-12 h-12 text-[#3776AB] animate-bob" style={{ animationDelay: "1.5s", animationDuration: "6s" }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M30 15 C30 15 45 10 50 15 C55 20 50 35 50 35 L30 35 Z M70 85 C70 85 55 90 50 85 C45 80 50 65 50 65 L70 65 Z" />
            <circle cx="38" cy="23" r="3" fill="currentColor" />
            <circle cx="62" cy="77" r="3" fill="currentColor" />
          </svg>
        </MagneticLogo>

        <MagneticLogo label="Docker">
          <svg className="w-12 h-12 text-[#2496ED] animate-bob" style={{ animationDelay: "2.5s", animationDuration: "6.6s" }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="25" y="45" width="10" height="10" rx="1" />
            <rect x="38" y="45" width="10" height="10" rx="1" />
            <rect x="51" y="45" width="10" height="10" rx="1" />
            <rect x="38" y="32" width="10" height="10" rx="1" />
            <rect x="51" y="32" width="10" height="10" rx="1" />
            <rect x="64" y="45" width="10" height="10" rx="1" />
            <path d="M15 60 C25 60 20 75 50 75 C80 75 90 60 90 60" />
          </svg>
        </MagneticLogo>
      </div>

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

      {/* Decorative top soft accent light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="absolute top-12 left-6 md:left-12 z-30 select-text work-section-header">
        <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent mb-2 block">
          Professional Path
        </span>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-black font-display">
          Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">Experience</span>.
        </h2>
      </div>

      {/* Stacked Cards Container (Vertical list on mobile, absolute stack on desktop) */}
      <div className="relative w-[90vw] md:w-[75vw] max-w-4xl h-auto md:h-[56vh] flex flex-col md:block mt-20 z-20 gap-6 md:gap-0">
        {WORK_EXPERIENCE.map((exp, idx) => {
          // Pre-calculate initial styles for stacked layout preview
          const initialScale = 1 - idx * 0.05;
          const initialY = idx * 24;
          const initialRotate = idx === 0 ? 0 : idx === 1 ? 2 : idx === 2 ? -2 : 1;

          return (
            <div
              key={idx}
              onMouseMove={handleCardMouseMove}
              className={`experience-card group relative md:absolute md:inset-0 w-full md:w-auto h-auto md:h-full rounded-[32px] p-6 md:p-9 flex flex-col justify-between items-stretch overflow-hidden border bg-black shadow-2xl transition-all duration-300 ${getBorderColor(idx)}`}
              style={isMobile ? { zIndex: 1 } : {
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
                className="absolute -bottom-6 -right-6 text-7xl sm:text-8xl md:text-9xl font-black font-display tracking-wider uppercase select-none pointer-events-none opacity-[0.02] leading-none z-0"
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
                <div className="card-header flex items-start justify-between gap-4 border-b border-white/5 pb-5 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] font-bold tracking-widest text-accent uppercase bg-accent/10 px-2.5 py-1 rounded-full w-fit flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight mt-1.5">
                      {exp.role}
                    </h3>
                    <p className="text-xs md:text-sm font-semibold text-muted/70 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-muted/40" />
                      {exp.company}
                    </p>
                  </div>
                  
                  {/* Brand Logo Container */}
                  <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0 shadow-inner">
                    {getCompanyLogo(idx)}
                  </div>
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
                      className="card-highlight-item p-3.5 rounded-2xl border border-white/5 bg-white/[0.01] flex items-start gap-2.5 transition-colors duration-300 hover:bg-white/[0.03]"
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

// Helper component for magnetic logo effect on hover
function MagneticLogo({ children, label }) {
  const ref = useMagnetic(0.9);
  return (
    <div 
      ref={ref}
      className="flex flex-col items-center gap-2 cursor-pointer"
      data-cursor="pointer"
    >
      {children}
      <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-black/40">
        {label}
      </span>
    </div>
  );
}
