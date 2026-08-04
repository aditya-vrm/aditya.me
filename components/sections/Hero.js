"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FloatingHeroTags from "../physics/FloatingHeroTags";

export default function Hero() {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate coordinates in pixels relative to the card container
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom CSS variables for high-performance spotlight coordinate updates in pixels
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col justify-center items-center relative py-20 px-6 md:px-12 select-none overflow-hidden bg-background"
    >
      {/* Soft Blurry Ambient Gradient Blobs (Background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-70">
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-accent/10 blur-[100px] sm:blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-amber-500/5 blur-[120px] sm:blur-[150px] animate-pulse" style={{ animationDelay: "2.5s" }} />
      </div>

      {/* Floating Physics Tech Badges (Interact on Mouse Over) */}
      <FloatingHeroTags />

      {/* Corner Titles (Modern Editorial Index Style) */}
      
      {/* Top Left */}
      <div className="absolute top-12 left-8 md:left-12 z-20 font-mono text-[9px] md:text-[10px] tracking-widest text-muted uppercase font-bold">
        <span>Aditya Verma</span>
        <span className="mx-2 text-accent">/</span>
        <span className="opacity-60">Index 2026</span>
      </div>

      {/* Top Right */}
      <div className="absolute top-12 right-8 md:right-12 z-20 text-right font-mono text-[9px] md:text-[10px] tracking-widest text-muted uppercase font-bold">
        <span className="opacity-60">Available For</span>
        <span className="text-accent ml-1.5 animate-pulse">Freelance</span>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-28 left-8 md:left-12 z-20 font-mono text-[9px] md:text-[10px] tracking-widest text-muted uppercase font-bold hidden md:block">
        <span className="opacity-60">Creative Portfolio</span>
        <span className="mx-2 text-accent">·</span>
        <span>Full Stack Developer</span>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-28 right-8 md:right-12 z-20 text-right font-mono text-[9px] md:text-[10px] tracking-widest text-muted uppercase font-bold hidden md:block">
        <span className="opacity-60">Location:</span>
        <span className="ml-1 text-accent">India</span>
      </div>

      {/* Main Center Poster Layout */}
      <div className="relative flex flex-col items-center justify-center min-h-[50vh] w-full z-10 select-none">
        
        {/* Giant display name */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[90vw] md:max-w-5xl flex flex-col font-display select-none relative z-10 px-4 mb-8 sm:mb-0"
        >
          <span 
            className="text-[13vw] sm:text-[10vw] font-light uppercase tracking-widest text-transparent leading-[0.9]"
            style={{ WebkitTextStroke: "1.2px var(--color-foreground, #0A0A0A)" }}
          >
            Aditya
          </span>
          <span className="text-[16vw] sm:text-[14vw] font-black uppercase tracking-tighter text-gradient bg-clip-text text-transparent self-end leading-[0.8] -mt-2 sm:-mt-4">
            Verma
          </span>
        </motion.h1>

        {/* Styled Editorial Portrait Card with CSS-based Spotlight Reveal */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[52%] left-[62%] sm:left-[58%] md:left-[55%] -translate-x-1/2 -translate-y-1/2 w-32 sm:w-40 md:w-56 aspect-[9/16] rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-md p-1.5 shadow-2xl hover:scale-[1.05] hover:rotate-2 transition-all duration-500 z-20 cursor-none"
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100/50">
            {/* Base Portrait Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/portrait.jpg"
                alt="Aditya Verma Portrait Base"
                fill
                priority
                sizes="(max-width: 768px) 160px, 224px"
                className="object-cover brightness-95 contrast-[1.05] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Hover Reveal Image - Suit Portrait revealed via smooth organic liquid blob mask */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none transition-[mask-size,opacity] duration-500 ease-out"
              style={{
                WebkitMaskImage: "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 C 68 8, 78 16, 84 28 C 90 40, 72 46, 86 60 C 100 74, 76 86, 56 84 C 36 82, 16 92, 10 74 C 4 56, 24 48, 16 34 C 8 20, 32 12, 50 10 Z' fill='black'/%3E%3C/svg%3E\")",
                maskImage: "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 C 68 8, 78 16, 84 28 C 90 40, 72 46, 86 60 C 100 74, 76 86, 56 84 C 36 82, 16 92, 10 74 C 4 56, 24 48, 16 34 C 8 20, 32 12, 50 10 Z' fill='black'/%3E%3C/svg%3E\")",
                WebkitMaskPosition: "calc(var(--mouse-x, 112px) - 130px) calc(var(--mouse-y, 199px) - 130px)",
                maskPosition: "calc(var(--mouse-x, 112px) - 130px) calc(var(--mouse-y, 199px) - 130px)",
                WebkitMaskSize: isHovered ? "260px" : "0px",
                maskSize: isHovered ? "260px" : "0px",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <Image
                src="/images/suit_portrait.jpg"
                alt="Aditya Verma Suit Portrait Hover"
                fill
                priority
                sizes="(max-width: 768px) 160px, 224px"
                className="object-cover"
              />
            </div>

            {/* Iridescent Light Glass Reflection Overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-500"
              style={{
                opacity: isHovered ? 0.3 : 0.08,
                background: "radial-gradient(circle at var(--mouse-x, 112px) var(--mouse-y, 199px), rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)",
              }}
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
