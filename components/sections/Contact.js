"use client";

import { useEffect } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import ScrollReveal from "../ui/ScrollReveal";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Inline SVG components for brand icons
function LinkedinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}



export default function Contact({ loaderComplete }) {
  useEffect(() => {
    if (!loaderComplete) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Delay initialization until layout height settles
    const timer = setTimeout(() => {
      // Draw the handwritten signature path dynamically on scroll
      const paths = document.querySelectorAll(".contact-signature-path");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        
        // Initialize GSAP fromTo animation
        gsap.fromTo(p, 
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: "none", // linear ease ensures drawing speed maps 1:1 to scroll speed
            scrollTrigger: {
              trigger: "#contact", // triggered by scroll position of the entire section
              start: "top bottom", // starts drawing as section enters viewport
              end: "bottom bottom", // completes exactly at the bottom of the page
              scrub: 1.5, // smooth liquid scroll tracking
            }
          }
        );
      });

      // Reveal the big contact headline on scroll
      gsap.fromTo(".contact-headline-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-headline-reveal",
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        }
      );

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === "#contact" || trigger.vars.trigger === ".contact-headline-reveal") {
          trigger.kill();
        }
      });
    };
  }, [loaderComplete]);

  return (
    <section
      id="contact"
      className="py-32 md:py-48 bg-background relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto select-none border-t border-black/5 overflow-hidden"
    >
      {/* Absolute Curvy Signature Overlay (Desktop) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          {/* Ambient glow stroke behind signature */}
          <path
            className="contact-signature-path opacity-20 blur-[3px]"
            style={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
            d="M 720,0 C 720,60 620,100 580,140 C 540,180 500,230 520,260 C 535,275 560,250 580,210 C 610,150 635,90 635,70 C 635,70 610,190 600,225 C 600,225 615,225 630,200 C 635,190 645,190 645,210 C 645,225 638,230 632,225 C 632,220 645,140 645,140 C 645,140 645,220 645,220 C 645,220 652,225 660,210 C 665,200 670,190 670,210 C 670,210 670,220 670,220 C 670,220 675,225 680,210 C 685,190 690,150 690,150 C 690,150 690,220 690,220 C 690,220 695,225 700,210 C 705,200 715,190 715,210 C 715,220 710,225 705,225 C 705,225 715,210 715,210 C 715,210 715,240 715,260 C 715,280 695,280 690,260 C 685,240 720,210 730,200 C 735,190 745,190 745,210 C 745,225 738,230 732,225 C 732,220 745,195 745,220 C 745,220 755,220 770,210 C 790,195 810,180 830,170 C 840,165 850,170 840,185 C 820,210 740,260 670,285 C 600,310 550,320 520,300 C 500,280 500,250 530,225 C 570,190 640,170 720,165"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Main solid drawing stroke spelling out Aditya in cursive */}
          <path
            className="contact-signature-path"
            style={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
            d="M 720,0 C 720,60 620,100 580,140 C 540,180 500,230 520,260 C 535,275 560,250 580,210 C 610,150 635,90 635,70 C 635,70 610,190 600,225 C 600,225 615,225 630,200 C 635,190 645,190 645,210 C 645,225 638,230 632,225 C 632,220 645,140 645,140 C 645,140 645,220 645,220 C 645,220 652,225 660,210 C 665,200 670,190 670,210 C 670,210 670,220 670,220 C 670,220 675,225 680,210 C 685,190 690,150 690,150 C 690,150 690,220 690,220 C 690,220 695,225 700,210 C 705,200 715,190 715,210 C 715,220 710,225 705,225 C 705,225 715,210 715,210 C 715,210 715,240 715,260 C 715,280 695,280 690,260 C 685,240 720,210 730,200 C 735,190 745,190 745,210 C 745,225 738,230 732,225 C 732,220 745,195 745,220 C 745,220 755,220 770,210 C 790,195 810,180 830,170 C 840,165 850,170 840,185 C 820,210 740,260 670,285 C 600,310 550,320 520,300 C 500,280 500,250 530,225 C 570,190 640,170 720,165"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Absolute Curvy Signature Overlay (Mobile) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible md:hidden">
        <svg className="w-full h-full" viewBox="0 0 375 900" fill="none" preserveAspectRatio="none">
          <path
            className="contact-signature-path opacity-20 blur-[2px]"
            style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
            d="M 187.5,0 C 187.5,60 120,120 100,150 C 85,170 85,190 100,200 C 115,210 125,180 125,150 C 125,140 120,140 115,160 C 110,180 105,200 110,205 C 115,210 125,200 130,180 C 135,170 145,170 145,185 C 145,195 140,200 135,200 C 135,195 145,145 145,145 C 145,145 145,200 145,200 C 145,200 150,200 155,190 C 155,180 160,170 160,185 C 160,185 160,200 160,200 C 160,200 165,200 170,190 C 170,180 175,150 175,150 C 175,150 175,200 175,200 C 175,200 180,200 185,190 C 185,180 190,170 190,185 C 190,195 185,200 180,200 C 180,195 190,145 190,145 C 190,145 190,200 190,200 C 190,200 195,200 200,190 C 200,180 205,170 205,185 C 205,185 205,200 205,200 C 205,200 210,200 215,190 C 215,190 225,180 235,170"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="contact-signature-path"
            style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
            d="M 187.5,0 C 187.5,60 120,120 100,150 C 85,170 85,190 100,200 C 115,210 125,180 125,150 C 125,140 120,140 115,160 C 110,180 105,200 110,205 C 115,210 125,200 130,180 C 135,170 145,170 145,185 C 145,195 140,200 135,200 C 135,195 145,145 145,145 C 145,145 145,200 145,200 C 145,200 150,200 155,190 C 155,180 160,170 160,185 C 160,185 160,200 160,200 C 160,200 165,200 170,190 C 170,180 175,150 175,150 C 175,150 175,200 175,200 C 175,200 180,200 185,190 C 185,180 190,170 190,185 C 190,195 185,200 180,200 C 180,195 190,145 190,145 C 190,145 190,200 190,200 C 190,200 195,200 200,190 C 200,180 205,170 205,185 C 205,185 205,200 205,200 C 205,200 210,200 215,190 C 215,190 225,180 235,170"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Big Headline (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left contact-headline-reveal">
          <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-foreground font-display">
            Let's Build
            <br />
            <span className="text-gradient">Something</span>
            <br />
            Great.
          </h2>
        </div>

        {/* Right Column: Contact info & Large Vertical Socials (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-10 text-left pl-0 lg:pl-16">
          
          {/* Direct Details */}
          <div className="space-y-4">
            <ScrollReveal delay={0.1}>
              <p className="text-xs uppercase font-bold tracking-widest text-muted">
                Direct Contact
              </p>
              
              {/* Email Link */}
              <a
                href="mailto:adityahosir@gmail.com"
                className="group flex items-center justify-between border-b border-black/10 py-2.5 text-base md:text-xl font-bold text-foreground hover:text-accent hover:border-accent transition-colors duration-300"
                data-cursor="pointer"
              >
                <span className="select-text">adityahosir@gmail.com</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              {/* Phone Link */}
              <a
                href="tel:+918229803378"
                className="group flex items-center justify-between border-b border-black/10 py-2.5 text-base md:text-xl font-bold text-foreground hover:text-accent hover:border-accent transition-colors duration-300"
                data-cursor="pointer"
              >
                <span className="select-text">+91 8229803378</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </ScrollReveal>
          </div>

          {/* Socials Connection (Vertical layout with roll hovers, large design) */}
          <div className="flex flex-col gap-3">
            <ScrollReveal delay={0.2}>
              <span className="text-xs uppercase font-bold tracking-widest text-muted block mb-3">
                Social Networks
              </span>
              <div className="flex flex-col gap-4">
                <SocialRollLink
                  href="https://www.linkedin.com/in/aditya-v27"
                  icon={<LinkedinIcon className="w-5.5 h-5.5" />}
                  name="LinkedIn"
                />
                <SocialRollLink
                  href="https://github.com/aditya-vrm"
                  icon={<GithubIcon className="w-5.5 h-5.5" />}
                  name="GitHub"
                />
                <SocialRollLink
                  href="mailto:adityahosir@gmail.com"
                  icon={<Mail className="w-5.5 h-5.5" />}
                  name="Gmail"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

// Inner component for magnetic social buttons with roll hover effect (large size)
function SocialRollLink({ href, icon, name }) {
  const containerRef = useMagnetic(0.3);

  return (
    <a
      ref={containerRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-5 group/roll w-fit"
      data-cursor="pointer"
    >
      {/* Larger Icon frame */}
      <div className="w-14 h-14 rounded-full border border-black/10 bg-white flex items-center justify-center text-foreground group-hover/roll:bg-accent group-hover/roll:border-accent group-hover/roll:text-white transition-all duration-300 shrink-0 shadow-sm">
        {icon}
      </div>
      
      {/* Larger Roll Text */}
      <div className="h-6 overflow-hidden relative text-lg font-bold text-foreground">
        <span className="block transition-transform duration-300 group-hover/roll:-translate-y-full">
          {name}
        </span>
        <span className="block absolute inset-0 text-accent transition-transform duration-300 translate-y-full group-hover/roll:translate-y-0">
          {name}
        </span>
      </div>
    </a>
  );
}
