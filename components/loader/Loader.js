"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGES } from "@/lib/constants";
import { gsap } from "@/lib/gsap";

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [cycleCompleted, setCycleCompleted] = useState(false);

  // 1. Detect asset loading
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkLoading = async () => {
      try {
        // Wait for fonts to be ready
        if (document.fonts) {
          await document.fonts.ready;
        }
        
        // Wait for Hero image placeholder if any, or any R3F dependencies
        // We simulate a tiny delay to ensure critical layouts are ready
        setTimeout(() => {
          setAssetsLoaded(true);
        }, 800);
      } catch (err) {
        console.error("Asset loading check failed:", err);
        setAssetsLoaded(true); // Fail-safe
      }
    };

    checkLoading();
  }, []);

  // 2. Cycle through languages
  useEffect(() => {
    if (cycleCompleted && assetsLoaded) {
      // Trigger Exit Curtain wipe
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
        onComplete: () => {
          onComplete();
        }
      });
      return;
    }

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex === LANGUAGES.length - 1) {
          clearInterval(interval);
          setCycleCompleted(true);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 180); // Rapid, smooth cycles

    return () => clearInterval(interval);
  }, [cycleCompleted, assetsLoaded, onComplete]);

  // Fallback trigger if cycle is done but assets are still loading
  useEffect(() => {
    if (cycleCompleted && !assetsLoaded) {
      const timeout = setTimeout(() => {
        setAssetsLoaded(true); // Force finish after 2.5s to not block user forever
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [cycleCompleted, assetsLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center justify-center overflow-hidden h-24 md:h-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: "80%", opacity: 0, rotateX: -45 }}
            animate={{ y: "0%", opacity: 1, rotateX: 0 }}
            exit={{ y: "-80%", opacity: 0, rotateX: 45 }}
            transition={{ duration: 0.16, ease: "easeInOut" }}
            style={{ color: LANGUAGES[index].color }}
            className="text-4xl md:text-7xl font-extrabold text-center select-none font-display tracking-tight"
          >
            {/* Dot symbol decoration */}
            <span className="inline-block mr-3 w-3 h-3 rounded-full bg-current align-middle opacity-50" />
            {LANGUAGES[index].text}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Line Indicator at the bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-black/5 overflow-hidden">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: cycleCompleted ? "100%" : `${((index + 1) / LANGUAGES.length) * 100}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </div>
  );
}
