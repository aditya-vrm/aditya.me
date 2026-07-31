"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMagnetic } from "@/hooks/useMagnetic";
import ScrollReveal from "../ui/ScrollReveal";
import { ExternalLink } from "lucide-react";

export default function Archive() {
  const triggerRef = useRef(null);
  const wrapRef = useRef(null);
  const [isMobileOrTouch, setIsMobileOrTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch or small screen
    const checkTouch = () => {
      const match = window.matchMedia("(max-width: 768px), (hover: none)").matches;
      setIsMobileOrTouch(match);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (isMobileOrTouch) return;

    const wrap = wrapRef.current;
    const trigger = triggerRef.current;
    if (!wrap || !trigger) return;

    // Calculate how much the container needs to translate horizontally
    const scrollAmount = wrap.scrollWidth - window.innerWidth;
    if (scrollAmount <= 0) return;

    // GSAP context to handle cleanups
    const ctx = gsap.context(() => {
      gsap.to(wrap, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1, // Sync translation 1:1 with scroll position
          start: "top top",
          end: () => `+=${scrollAmount}`,
          invalidateOnRefresh: true,
        }
      });
    }, trigger);

    return () => ctx.revert();
  }, [isMobileOrTouch]);

  return (
    <div id="archive" className="bg-background select-text border-t border-black/5">
      {isMobileOrTouch ? (
        // Mobile Layout: Normal Horizontal Swipeable Carousel
        <section className="py-24 px-6 w-full max-w-7xl mx-auto flex flex-col justify-start">
          <div className="mb-12">
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
              <div
                key={project.id}
                className="snap-start shrink-0 w-[85vw] max-w-[340px] rounded-3xl border border-black/5 bg-white shadow-sm overflow-hidden flex flex-col"
              >
                <div className="relative aspect-video w-full bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="340px"
                    className="object-cover grayscale"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                    <p className="text-xs text-muted font-medium mt-1 uppercase tracking-wider">{project.subtitle}</p>
                    <p className="text-sm text-muted mt-3 leading-relaxed line-clamp-3">{project.description}</p>
                  </div>
                  <div className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] px-2 py-0.5 bg-black/[0.03] text-muted rounded font-semibold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full py-2.5 rounded-xl bg-accent text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                      <span>View Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        // Desktop Layout: GSAP Scroll-Jack Horizontal Translation
        <section ref={triggerRef} className="relative z-10">
          <div className="h-screen sticky top-0 overflow-hidden flex flex-col justify-center">
            
            {/* Section Title Header */}
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-12 flex-shrink-0">
              <ScrollReveal>
                <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-3 block">
                  Featured Work
                </span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground font-display">
                  Projects <span className="text-gradient">Archive</span>.
                </h2>
              </ScrollReveal>
            </div>

            {/* Horizontal Wrap Container */}
            <div
              ref={wrapRef}
              className="pin-wrap flex gap-12 pl-[10vw] pr-[20vw] items-stretch flex-shrink-0"
            >
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

          </div>
        </section>
      )}
    </div>
  );
}

// Project Card with Magnetic Button and Cursor Morph
function ProjectCard({ project }) {
  const btnRef = useMagnetic(0.35);

  return (
    <div
      className="w-[30vw] min-w-[420px] shrink-0 h-[50vh] min-h-[380px] rounded-3xl border border-black/5 bg-white/40 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col group relative transition-all duration-500 hover:border-black/10 hover:shadow-md cursor-pointer select-none"
      data-cursor="view"
    >
      {/* Background Image Container */}
      <div className="relative w-full h-[60%] overflow-hidden bg-gray-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1200px) 420px, 30vw"
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        
        {/* Floating Accent tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[9px] uppercase font-extrabold tracking-widest bg-accent text-white px-2.5 py-1 rounded-full shadow-sm">
            Interactive
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-6 flex flex-col justify-between h-[40%] bg-white/80">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-[10px] font-mono text-muted uppercase font-bold tracking-widest">
              {project.subtitle.split(" ")[0]}
            </span>
          </div>
          <p className="text-xs text-muted/80 mt-1 uppercase font-semibold tracking-wider">
            {project.subtitle}
          </p>
        </div>

        {/* Lower row: tags and quick link */}
        <div className="flex items-center justify-between border-t border-black/5 pt-4 mt-2">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="text-[9px] px-2 py-0.5 bg-black/[0.03] text-muted rounded font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Magnetic View Button on Hover */}
          <div ref={btnRef} className="w-8 h-8 rounded-full border border-black/10 bg-white flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors duration-300">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
