"use client";

import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import Loader from "@/components/loader/Loader";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Story from "@/components/sections/Story";
import Archive from "@/components/sections/Archive";
import Contact from "@/components/sections/Contact";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  
  // Initialize Lenis smooth scroll synced with GSAP
  useLenis();

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
          {/* Main sections container */}
          <main className="flex-grow flex flex-col">
            <Hero />
            <Work />
            <Story />
            <Archive />
            <Contact />
          </main>

          {/* Bottom floating Navbar & Footer */}
          <Navbar />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
