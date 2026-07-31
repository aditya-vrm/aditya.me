"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { SPECIALTY_TAGS } from "@/lib/constants";
import { useMagnetic } from "@/hooks/useMagnetic";
import { ChevronDown } from "lucide-react";

// Lazy-load the Three.js Canvas to optimize initial load times and prevent SSR errors
const HeroScene = dynamic(() => import("../three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-48 h-48 rounded-full bg-accent/5 blur-xl animate-pulse" />
    </div>
  )
});

export default function Hero() {
  const [tagIndex, setTagIndex] = useState(0);
  const scrollBtnRef = useMagnetic(0.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % SPECIALTY_TAGS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = (e) => {
    e.preventDefault();
    const nextSection = document.querySelector("#work");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col justify-between relative py-12 md:py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background 3D Scene */}
      <HeroScene />

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto relative z-10 w-full">
        
        {/* Left Side Text Content */}
        <div className="lg:col-span-7 flex flex-col text-left select-text">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-3 block">
              Full Stack Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] text-foreground font-display"
          >
            Aditya
            <br />
            <span className="text-gradient">Verma</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg text-muted max-w-lg leading-relaxed flex flex-wrap items-center"
          >
            Building high-performance end-to-end applications. Specialized in
            <span className="inline-flex min-w-[140px] pl-2 font-bold font-mono text-accent">
              <AnimatePresence mode="wait">
                <motion.span
                  key={tagIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {SPECIALTY_TAGS[tagIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex gap-4"
          >
            <a
              href="#contact"
              className="px-6 py-3 bg-accent text-white font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-accent-hover transition-colors duration-300 shadow-sm shadow-accent/20 hover:shadow-lg"
              data-cursor="pointer"
            >
              Get In Touch
            </a>
            <a
              href="#archive"
              className="px-6 py-3 border border-black/10 bg-white/50 hover:bg-white text-foreground font-semibold text-xs uppercase tracking-widest rounded-full transition-colors duration-300"
              data-cursor="pointer"
            >
              View Work
            </a>
          </motion.div>
        </div>

        {/* Right Side Portrait and Floating Element Container */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[380px] sm:h-[450px] lg:h-[550px] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[240px] sm:w-[280px] h-[320px] sm:h-[380px] rounded-3xl overflow-hidden border border-black/10 bg-white/30 backdrop-blur-sm p-3 shadow-xl hover:scale-[1.03] hover:rotate-1 transition-all duration-500 relative z-10"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src="/images/portrait.jpg"
                alt="Aditya Verma Portrait Placeholder"
                fill
                priority
                sizes="(max-width: 768px) 240px, 280px"
                className="object-cover transition-transform duration-700 hover:scale-105 grayscale hover:grayscale-0"
              />
            </div>
          </motion.div>

          {/* Abstract floating blur background decorations */}
          <div className="absolute top-1/4 left-1/4 w-36 h-36 rounded-full bg-accent/10 blur-3xl pointer-events-none -z-10 animate-pulse" />
        </div>
      </div>

      {/* Bottom Scroll Down Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="w-full flex justify-center mt-auto"
      >
        <button
          ref={scrollBtnRef}
          onClick={handleScrollDown}
          className="flex flex-col items-center text-[10px] uppercase font-bold tracking-widest text-muted hover:text-accent transition-colors duration-300 gap-1.5 focus:outline-none"
          aria-label="Scroll to Work experience section"
          data-cursor="pointer"
        >
          <span>Scroll Down</span>
          <div className="w-7 h-7 rounded-full border border-black/10 bg-white flex items-center justify-center shadow-sm">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce mt-[2px]" />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
