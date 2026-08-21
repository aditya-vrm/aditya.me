"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ScrollReveal from "../ui/ScrollReveal";
import { ExternalLink } from "lucide-react";

export default function Archive({ loaderComplete }) {
  const containerRef = useRef(null);
  const scrollWrapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileOrTouch, setIsMobileOrTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch or small screen
    const checkTouch = () => {
      const match = window.matchMedia("(max-width: 1024px), (hover: none)").matches;
      setIsMobileOrTouch(match);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Mobile Heading Reveal Scroll Trigger
  useEffect(() => {
    if (!loaderComplete || !isMobileOrTouch) return;

    const timer = setTimeout(() => {
      gsap.fromTo(".archive-section-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".archive-section-header",
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, 200);

    return () => clearTimeout(timer);
  }, [isMobileOrTouch, loaderComplete]);

  useEffect(() => {
    if (!loaderComplete || isMobileOrTouch) return;

    let ctx;
    const timer = setTimeout(() => {
      const scrollWrap = scrollWrapRef.current;
      const container = containerRef.current;
      if (!scrollWrap || !container) return;

      const projectsCount = PROJECTS.length;

      // GSAP context to handle cleanups
      ctx = gsap.context(() => {
        // Pin the entire section and slide the right text column up
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${projectsCount * 100}%`,
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const activeIdx = Math.min(
                projectsCount - 1,
                Math.floor(progress * (projectsCount + 0.1)) // slight padding to make last card linger
              );
              setActiveIndex(activeIdx);
            }
          }
        });

        // Translate the vertical details column upward
        tl.to(scrollWrap, {
          yPercent: -80, // brings the 5th project detail block to the center
          ease: "none",
        }, 0);

        gsap.fromTo(".archive-section-header",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%", // slides up instantly as section enters screen
              toggleActions: "play none none reverse",
            }
          }
        );

        // Draw the curvy connecting line in the Archive section dynamically
        const paths = document.querySelectorAll(".archive-connecting-path");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len}px`;
          p.style.strokeDashoffset = `${len}px`;
          
          tl.to(p, {
            strokeDashoffset: 0,
            ease: "none",
          }, 0);
        });

      }, container);

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [isMobileOrTouch, loaderComplete]);

  // Accent glow matching each project brand
  const getGlowColor = (index) => {
    switch (index) {
      case 0: return "bg-amber-500/10";      // Virtual Mouse
      case 1: return "bg-emerald-500/10";    // ChatGPT Clone
      case 2: return "bg-indigo-500/10";     // GoldenHire
      case 3: return "bg-cyan-500/10";       // DevHub
      case 4: return "bg-pink-500/10";       // Click1Studio
      default: return "bg-accent/10";
    }
  };

  return (
    <div id="archive" className="select-text overflow-visible relative">
      {isMobileOrTouch ? (
        // Mobile Layout: Normal Horizontal Swipeable Carousel (Light theme matches previous)
        <section className="py-24 px-6 w-full max-w-7xl mx-auto flex flex-col justify-start bg-background border-t border-black/5">
          <div className="mb-12 archive-section-header">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-3 block">
              Featured Work
            </span>
            <h2 className="text-4xl font-black tracking-tight text-foreground font-display">
              Projects <span className="text-gradient">Archive</span>.
            </h2>
          </div>

          {/* Swipe Container */}
          <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-none pb-8 pr-6">
            {PROJECTS.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="snap-start shrink-0 w-[85vw] max-w-[340px] rounded-3xl border border-black/5 bg-white shadow-sm overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-video w-full bg-gray-50 border-b border-black/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="340px"
                    className="object-cover transition-all duration-300"
                    unoptimized={true}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-muted font-mono uppercase mt-1 tracking-wider">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-muted/80 mt-3 leading-relaxed line-clamp-3 font-light">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[8px] px-2 py-0.5 bg-black/[0.03] text-muted rounded font-semibold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-full py-2.5 rounded-xl bg-accent text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <span>View Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : (
        // Desktop Layout: Awwwards-style Split Screen Showroom (Dark theme background)
        <section 
          ref={containerRef} 
          className="min-h-screen w-full relative bg-[#060608] flex items-center overflow-hidden border-t border-white/5 py-0"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

          {/* Dynamic Curvy Connecting Line (Desktop) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-visible hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
              <path
                className="archive-connecting-path opacity-20 blur-[3px]"
                d="M 720,0 C 400,150 100,300 100,450 C 100,600 600,550 720,600 C 850,650 1200,800 720,900"
                stroke="var(--color-accent, #F59E0B)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                className="archive-connecting-path"
                d="M 720,0 C 400,150 100,300 100,450 C 100,600 600,550 720,600 C 850,650 1200,800 720,900"
                stroke="var(--color-accent, #F59E0B)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Background Soft Glow aura that morphs color */}
          <div 
            className={`absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-1000 ease-in-out ${getGlowColor(activeIndex)}`} 
          />

          {/* Section Header */}
          <div className="absolute top-12 left-6 md:left-12 z-30 select-text archive-section-header">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent mb-2 block">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-display">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">Projects</span>.
            </h2>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full h-full flex flex-row items-stretch relative z-10">
            
            {/* Left Column: device Showcase (50% width, remains centered in viewport) */}
            <div className="w-[50%] flex flex-col justify-center items-center relative pr-8">
              
              {/* High-Fidelity Glassmorphic Browser Frame Mockup */}
              <div className="w-full aspect-video rounded-2xl border border-white/10 bg-[#111113]/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col relative">
                
                {/* Browser Header Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/40 flex-shrink-0 relative z-10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  {/* URL Address Bar */}
                  <div className="mx-auto w-[60%] h-4.5 rounded-md bg-white/[0.03] border border-white/5 flex items-center justify-center text-[9px] font-mono text-muted/50 select-none">
                    {PROJECTS[activeIndex].link.replace("https://", "").split("/")[0]}
                  </div>
                </div>

                {/* Device Content: Morphing Screens */}
                <div className="flex-1 relative bg-black/40 overflow-hidden">
                  {PROJECTS.map((proj, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <div
                        key={proj.id}
                        className="absolute inset-0 transition-all duration-700 ease-in-out"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "scale(1) translateY(0px)" : "scale(0.96) translateY(20px)",
                          pointerEvents: isActive ? "auto" : "none"
                        }}
                      >
                        {/* Project screenshot */}
                        <Image
                          src={proj.image}
                          alt={proj.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                          unoptimized={true}
                        />
                        {/* Shadow mask */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* Right Column: Sliding Project Narrative Details (50% width) */}
            <div className="w-[50%] h-screen relative overflow-hidden pl-8 border-l border-white/5">
              
              {/* Scrollable Container (GSAP translates this upward) */}
              <div ref={scrollWrapRef} className="w-full flex flex-col justify-start select-text">
                {PROJECTS.map((proj, idx) => (
                  <div 
                    key={proj.id}
                    className="h-screen w-full flex flex-col justify-center relative select-text"
                  >
                    <div className="max-w-md flex flex-col justify-start">
                      <span className="font-mono text-[9px] font-bold text-accent tracking-widest uppercase mb-4 bg-accent/15 px-2.5 py-1 rounded-full w-fit">
                        PROJECT 0{idx + 1}
                      </span>
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
                        {proj.title}
                      </h3>
                      
                      <span className="text-[10px] font-mono tracking-widest text-muted uppercase font-bold mt-1.5 block">
                        {proj.subtitle}
                      </span>

                      <p className="text-xs md:text-sm text-muted/80 mt-6 leading-relaxed font-light">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-6">
                        {proj.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="text-[9px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Visit Link button */}
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 py-3 px-6 rounded-xl bg-accent text-white text-[10px] font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 w-fit transition-all duration-300 hover:bg-amber-600 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-accent/5"
                      >
                        <span>EXPLORE PROJECT</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>
      )}
    </div>
  );
}
