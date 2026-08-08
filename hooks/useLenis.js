"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable custom scroll on mobile to allow native momentum scroll
    if (window.innerWidth < 768) return;

    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.8, // Luxurious, longer scroll transition
      easing: (t) => 1 - Math.pow(1 - t, 5), // Premium quintic ease-out (buttery smooth deceleration)
      smoothWheel: true,
      wheelMultiplier: 0.85, // Slightly slower, more controlled wheel response
      touchMultiplier: 1.2,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger updates
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Hook Lenis animation frame into GSAP ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable GSAP lag smoothing to prevent scroll desync
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);
}
