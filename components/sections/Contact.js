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

function InstagramIcon(props) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Contact() {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Draw the handwritten signature path dynamically on scroll
    const paths = document.querySelectorAll(".contact-signature-path");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}px`;
      p.style.strokeDashoffset = `${len}px`;
      
      gsap.to(p, {
        strokeDashoffset: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: p,
          start: "top 90%",
          end: "bottom 60%",
          scrub: 1.0,
        }
      });
    });
  }, []);

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-background relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto select-none border-t border-black/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Big Headline */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <ScrollReveal>
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-3 block">
              Get In Touch
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] text-foreground font-display">
              Let's Build
              <br />
              <span className="text-gradient">Something</span>
              <br />
              Great.
            </h2>
          </ScrollReveal>
        </div>

        {/* Right Column: Contact info & Magnetic Vertical Socials */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-12 text-left">
          
          {/* Direct Details */}
          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="text-xs uppercase font-bold tracking-widest text-muted">
                Direct Contact
              </p>
              
              {/* Email Link */}
              <a
                href="mailto:adityahosir@gmail.com"
                className="group flex items-center justify-between border-b border-black/10 py-3 text-lg md:text-2xl font-bold text-foreground hover:text-accent hover:border-accent transition-colors duration-300"
                data-cursor="pointer"
              >
                <span className="select-text">adityahosir@gmail.com</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              {/* Phone Link */}
              <a
                href="tel:+918229803378"
                className="group flex items-center justify-between border-b border-black/10 py-3 text-lg md:text-2xl font-bold text-foreground hover:text-accent hover:border-accent transition-colors duration-300"
                data-cursor="pointer"
              >
                <span className="select-text">+91 8229803378</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </ScrollReveal>
          </div>

          {/* Socials Connection (Vertical layout with roll hovers) */}
          <div className="flex flex-col gap-4">
            <ScrollReveal delay={0.2}>
              <span className="text-xs uppercase font-bold tracking-widest text-muted block mb-4">
                Social Networks
              </span>
              <div className="flex flex-col gap-5">
                <SocialRollLink
                  href="https://www.linkedin.com/in/aditya-v27"
                  icon={<LinkedinIcon className="w-4 h-4" />}
                  name="LinkedIn"
                  url="linkedin.com/in/aditya-v27"
                />
                <SocialRollLink
                  href="https://github.com/aditya-vrm"
                  icon={<GithubIcon className="w-4 h-4" />}
                  name="GitHub"
                  url="github.com/aditya-vrm"
                />
                <SocialRollLink
                  href="https://www.instagram.com/aditya_.vrm/"
                  icon={<InstagramIcon className="w-4 h-4" />}
                  name="Instagram"
                  url="instagram.com/aditya_.vrm/"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>

      {/* Signature Curvy Line Connecting End */}
      <div className="w-full max-w-7xl mx-auto mt-24 flex flex-col items-center justify-center relative overflow-visible pointer-events-none">
        <svg className="w-64 h-32 overflow-visible" viewBox="0 0 256 128" fill="none">
          {/* Connecting line coming down and writing signature "Aditya" */}
          <path
            className="contact-signature-path opacity-20 blur-[2px]"
            d="M 128,0 C 128,20 64,40 64,60 C 64,80 100,90 90,55 C 85,45 80,65 85,75 C 90,80 95,80 95,70 C 95,60 105,60 105,70 C 105,50 105,80 105,80 C 105,80 115,80 115,70 C 115,70 120,80 125,80 C 125,60 135,60 135,70 C 135,50 135,80 135,80 C 135,80 145,80 145,70 C 145,80 150,85 150,95 C 150,105 140,105 140,95 C 145,85 155,80 155,70 C 155,60 165,60 165,75 C 170,80 200,80 210,75"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="contact-signature-path"
            d="M 128,0 C 128,20 64,40 64,60 C 64,80 100,90 90,55 C 85,45 80,65 85,75 C 90,80 95,80 95,70 C 95,60 105,60 105,70 C 105,50 105,80 105,80 C 105,80 115,80 115,70 C 115,70 120,80 125,80 C 125,60 135,60 135,70 C 135,50 135,80 135,80 C 135,80 145,80 145,70 C 145,80 150,85 150,95 C 150,105 140,105 140,95 C 145,85 155,80 155,70 C 155,60 165,60 165,75 C 170,80 200,80 210,75"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-mono text-[9px] text-muted/40 tracking-widest uppercase font-bold mt-2">
          Handwritten Signature
        </span>
      </div>
    </section>
  );
}

// Inner component for magnetic social buttons with roll hover effect
function SocialRollLink({ href, icon, name, url }) {
  const containerRef = useMagnetic(0.3);

  return (
    <a
      ref={containerRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 group/roll w-fit select-text"
      data-cursor="pointer"
    >
      {/* Icon frame */}
      <div className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-foreground group-hover/roll:bg-accent group-hover/roll:border-accent group-hover/roll:text-white transition-all duration-300 shrink-0 shadow-sm">
        {icon}
      </div>
      
      {/* Roll Text */}
      <div className="flex flex-col select-text">
        <div className="h-5 overflow-hidden relative text-sm font-bold text-foreground">
          <span className="block transition-transform duration-300 group-hover/roll:-translate-y-full">
            {name}
          </span>
          <span className="block absolute inset-0 text-accent transition-transform duration-300 translate-y-full group-hover/roll:translate-y-0">
            {name}
          </span>
        </div>
        <span className="text-[11px] text-muted/60 font-mono tracking-wide font-light transition-colors duration-300 group-hover/roll:text-foreground">
          {url}
        </span>
      </div>
    </a>
  );
}
