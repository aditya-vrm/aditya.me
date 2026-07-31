"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom hook to apply a premium magnetic pull effect to a DOM element using GSAP quickTo.
 * @param {number} pullStrength - Multiplier for the pull effect (0.1 to 0.5 is usually best).
 * @returns {import("react").RefObject} React ref to attach to the target element.
 */
export function useMagnetic(pullStrength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Ensure we don't run on touch devices
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };
    if (isTouchDevice()) return;

    // Initialize GSAP quickTo tweens for buttery smooth physics
    const xTo = gsap.quickTo(element, "x", {
      duration: 0.8,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 0.8,
      ease: "power3.out",
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      // Apply the magnetic pull
      xTo(distanceX * pullStrength);
      yTo(distanceY * pullStrength);
    };

    const handleMouseLeave = () => {
      // Elastic snap-back
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pullStrength]);

  return ref;
}
