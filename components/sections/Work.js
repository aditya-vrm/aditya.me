"use client";

import { useEffect, useRef } from "react";
import { WORK_EXPERIENCE } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ScrollReveal from "../ui/ScrollReveal";

export default function Work() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const progressLine = progressLineRef.current;
    const container = containerRef.current;
    if (!progressLine || !container) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // GSAP ScrollTrigger timeline to draw the line down the screen
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 45%",
        end: "bottom 55%",
        scrub: 0.5, // buttery smooth scrub
      }
    });

    tl.to(progressLine, {
      scaleY: 1,
      ease: "none"
    });

    // Light up nodes as the line passes them
    const nodes = container.querySelectorAll(".timeline-node");
    nodes.forEach((node) => {
      gsap.to(node, {
        backgroundColor: "var(--color-accent)",
        borderColor: "var(--color-accent)",
        scrollTrigger: {
          trigger: node,
          start: "top 45%",
          end: "top 44%",
          toggleActions: "play none none reverse"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container || trigger.vars.trigger?.classList?.contains("timeline-node")) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="work" className="py-24 md:py-36 bg-background relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto select-text">
      
      {/* Section Header */}
      <div className="mb-20 text-left">
        <ScrollReveal>
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-3 block">
            Career Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground font-display">
            Work <span className="text-gradient">Experience</span>.
          </h2>
        </ScrollReveal>
      </div>

      {/* Timeline Wrapper */}
      <div ref={containerRef} className="relative w-full flex flex-col justify-start">
        
        {/* Background Track Line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-black/5 -translate-x-1/2 rounded-full pointer-events-none" />
        
        {/* Animated Progress Line */}
        <div
          ref={progressLineRef}
          className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] bg-accent -translate-x-1/2 origin-top scale-y-0 rounded-full pointer-events-none"
        />

        {/* Experience Items */}
        {WORK_EXPERIENCE.map((exp, idx) => {
          // Alternating left/right positioning on desktop
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row w-full items-stretch relative min-h-[160px] pb-12 sm:pb-20 ${
                isLeft ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Date / Duration display */}
              <div className="w-full sm:w-1/2 flex items-center justify-start sm:justify-end sm:px-12 pl-12 sm:pl-0 mb-4 sm:mb-0">
                <ScrollReveal
                  xOffset={isLeft ? 30 : -30}
                  className={`flex flex-col ${
                    isLeft ? "sm:items-start text-left" : "sm:items-end text-right"
                  }`}
                >
                  <span className="font-mono text-xs font-bold tracking-widest text-accent uppercase">
                    {exp.duration}
                  </span>
                  <span className="text-xl font-extrabold text-foreground mt-1">
                    {exp.company}
                  </span>
                </ScrollReveal>
              </div>

              {/* Timeline Center Node */}
              <div className="absolute left-4 sm:left-1/2 top-2 w-6 h-6 -translate-x-1/2 flex items-center justify-center z-10 pointer-events-none">
                <div className="timeline-node w-3.5 h-3.5 rounded-full border-2 border-black/10 bg-white shadow-sm transition-colors duration-300" />
              </div>

              {/* Content Card */}
              <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-12 flex flex-col justify-center">
                <ScrollReveal
                  xOffset={isLeft ? -30 : 30}
                  className="p-6 md:p-8 rounded-3xl border border-black/5 bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-black/10 transition-all duration-300 flex flex-col"
                >
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="mt-4 space-y-2 text-xs text-muted/80 leading-relaxed list-none pl-0">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
