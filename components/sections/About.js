"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const paragraphRef = useRef(null);

  const paragraphText = "I’m a Full-Stack Software Developer and freelance developer based in India. I partner with businesses to design and build digital experiences that are fast, scalable, and crafted with intention. From architecture and backend systems to seamless interfaces and refined interactions, I enjoy bringing ambitious ideas to life.";
  const words = paragraphText.split(" ");

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Delay initialization until pinning layouts have settled
    const timer = setTimeout(() => {
      // 1. Draw the curvy connecting line downward as the section comes into view
      const paths = document.querySelectorAll(".about-connecting-path");
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
            end: "bottom top",
            scrub: 1.2,
          }
        });
      });

      // 2. Cinematic word-by-word text reveal (Optimized for mobile performance)
      const isMobile = window.innerWidth < 768;

      gsap.fromTo(".about-reveal-word", 
        {
          opacity: 0,
          color: "rgba(255, 255, 255, 0)",
          y: isMobile ? 8 : 0,
          scale: isMobile ? 1 : (i) => 2.0 + Math.random() * 1.5, // Random initial scale between 2.0 and 3.5
          filter: isMobile ? "none" : "blur(16px)",
        },
        {
          color: "#FFFFFF",
          opacity: 1,
          y: 0,
          scale: 1,
          filter: isMobile ? "none" : "blur(0px)",
          stagger: isMobile ? 0.03 : 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: isMobile ? "top 85%" : "top 80%",
            end: isMobile ? "bottom 65%" : "bottom 55%",
            scrub: isMobile ? false : 0.5, // Disable heavy scrub calculations on mobile
            toggleActions: isMobile ? "play none none reverse" : undefined,
          }
        }
      );

      // 3. Section background color fade to deep black on scroll
      gsap.to(sectionRef.current, {
        backgroundColor: "#060608",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
          end: "bottom 50%",
          scrub: 0.5,
        }
      });

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === sectionRef.current || t.vars.trigger === paragraphRef.current) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen w-full relative z-10 bg-[#161619] flex flex-col items-center justify-start overflow-hidden py-24 select-text"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-accent/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: "8s" }} />

      {/* Full-section curvy connecting line wrapping the text block (Desktop/Tablet) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          {/* Subtle glowing filter path */}
          <path
            className="about-connecting-path opacity-20 blur-[3px]"
            d="M 720,0 C 500,100 200,200 200,350 C 200,500 600,450 720,500 C 850,550 1240,600 1240,700 C 1240,800 850,850 720,900"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Main solid path */}
          <path
            className="about-connecting-path"
            d="M 720,0 C 500,100 200,200 200,350 C 200,500 600,450 720,500 C 850,550 1240,600 1240,700 C 1240,800 850,850 720,900"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>



      {/* Typography Block */}
      <div className="w-full max-w-6xl px-6 md:px-12 flex flex-col items-center justify-center flex-grow text-center">
        <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-6 block">
          Behind the Code
        </span>

        <h2 
          ref={paragraphRef}
          className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-display leading-[1.3] tracking-tight text-center flex flex-wrap justify-center select-text text-white"
        >
          {words.map((word, idx) => (
            <span
              key={idx}
              className="about-reveal-word inline-block mr-[0.25em]"
              style={{ 
                willChange: "transform, filter, opacity",
                opacity: 0,
                color: "rgba(255, 255, 255, 0)",
                filter: "blur(16px)",
                transform: "scale(2.5)",
                display: "inline-block"
              }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
