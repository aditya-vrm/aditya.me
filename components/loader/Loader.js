"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGES } from "@/lib/constants";
import { gsap } from "@/lib/gsap";

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [exitTriggered, setExitTriggered] = useState(false);
 
  // 1. Detect asset loading
  useEffect(() => {
    if (typeof window === "undefined") return;
 
    const checkLoading = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
        // Simulated layout render delay
        setTimeout(() => {
          setAssetsLoaded(true);
        }, 800);
      } catch (err) {
        console.error("Asset loading check failed:", err);
        setAssetsLoaded(true);
      }
    };
 
    checkLoading();
  }, []);
 
  // 2. Count up progress from 0 to 100 uniformly
  useEffect(() => {
    if (progress >= 100) {
      if (assetsLoaded && !exitTriggered) {
        setExitTriggered(true);
        
        // 1. First fade out the loader content smoothly
        gsap.to(contentRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => {
            // 2. Then split the panels (left goes up, right goes down)
            const tl = gsap.timeline({
              onComplete: () => {
                onComplete();
              }
            });
 
            tl.to(leftPanelRef.current, {
              borderBottomRightRadius: "300px",
              yPercent: -100,
              duration: 1.2,
              ease: "power4.inOut"
            }, 0);
 
            tl.to(rightPanelRef.current, {
              borderTopLeftRadius: "300px",
              yPercent: 100,
              duration: 1.2,
              ease: "power4.inOut"
            }, 0);
          }
        });
      }
      return;
    }
 
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Pause at 99% if assets aren't loaded yet
        if (prev === 99 && !assetsLoaded) {
          return 99;
        }
        return prev + 1;
      });
    }, 40); // 100 steps * 40ms = 4 seconds uniform run time
 
    return () => clearInterval(interval);
  }, [progress, assetsLoaded, exitTriggered, onComplete]);
 
  // Map progress directly to index to give every text identical timing (500ms per word)
  const index = Math.min(
    Math.floor((progress / 100) * LANGUAGES.length),
    LANGUAGES.length - 1
  );
 
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden select-none"
    >
      {/* Left split panel */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0A0A0A] z-10"
      />
      {/* Right split panel */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0A0A0A] z-10"
      />
 
      {/* Content wrapper sitting above panels */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
      >
        {/* Greetings Text Container (Relative wrapper for seamless absolute transitions) */}
        <div className="relative w-full h-24 md:h-32 flex items-center justify-center overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ y: "80%", opacity: 0, rotateX: -30 }}
              animate={{ y: "0%", opacity: 1, rotateX: 0 }}
              exit={{ y: "-80%", opacity: 0, rotateX: 30 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }} // Smooth, organic ease
              style={{ color: LANGUAGES[index].color }}
              className="absolute inset-0 flex items-center justify-center text-4xl md:text-7xl font-extrabold text-center select-none font-display tracking-tight"
            >
              {/* Dot symbol decoration */}
              <span className="inline-block mr-3 w-3 h-3 rounded-full bg-current align-middle opacity-50" />
              {LANGUAGES[index].text}
            </motion.div>
          </AnimatePresence>
        </div>
 
        {/* Percentage Count-up Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
          <p className="font-mono text-5xl md:text-7xl font-black text-white/90 tracking-tighter select-none">
            {progress}
            <span className="text-accent text-2xl md:text-4xl ml-1 font-bold">%</span>
          </p>
          <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 mt-2 block opacity-40">
            Loading
          </span>
        </div>

        {/* Scroll Smoothly label at center bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase font-bold text-white/40 animate-pulse">
          Scroll Smoothly
        </div>
      </div>
    </div>
  );
}
