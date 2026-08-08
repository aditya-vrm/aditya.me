"use client";

import { useState, useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import Loader from "@/components/loader/Loader";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Story from "@/components/sections/Story";
import TechTicker from "@/components/sections/TechTicker";
import Archive from "@/components/sections/Archive";
import Contact from "@/components/sections/Contact";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "@/lib/gsap";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  
  // Initialize Lenis smooth scroll synced with GSAP
  useLenis();

  useEffect(() => {
    if (loaderComplete) {
      // Force ScrollTrigger to recalculate metrics after loader is unmounted and content displays
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [loaderComplete]);

  return (
    <>
      {/* Entrance multilingual loader gate */}
      <AnimatePresence mode="wait">
        {!loaderComplete && (
          <Loader onComplete={() => setLoaderComplete(true)} />
        )}
      </AnimatePresence>

      {/* Global premium Custom Cursor */}
      <CustomCursor />

      {/* Main site fade-in after loader completes */}
      {loaderComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-col min-h-screen"
        >
          {/* Main sections container (Standard block layout to support GSAP ScrollTrigger pinning) */}
          <main className="flex-grow relative w-full block">
            <Hero loaderComplete={loaderComplete} />
            <About />
            <Work loaderComplete={loaderComplete} />
            <Story />
            <TechTicker />
            <Archive loaderComplete={loaderComplete} />
            <Contact loaderComplete={loaderComplete} />
          </main>

          {/* Bottom floating Navbar & Footer */}
          <Navbar />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
