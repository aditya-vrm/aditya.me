"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [cursorType, setCursorType] = useState("default"); // default, pointer, view, drag
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Detect touch device to disable custom cursor
    const isTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };

    if (isTouch()) {
      return; // Do not mount cursor elements or track position
    }

    setHidden(false);

    // Initial position setters
    const dot = dotRef.current;
    const ring = ringRef.current;

    // Quick setters for smooth animations
    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    const xRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    const onMouseMove = (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    // Detect hover targets to update cursor style
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Check for specific data-cursor attributes
      const cursorAttr = target.closest("[data-cursor]");
      if (cursorAttr) {
        setCursorType(cursorAttr.getAttribute("data-cursor"));
      } else if (target.closest("a, button, input[type='submit'], [role='button']")) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    // Hide/show cursor when leaving/entering window
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (hidden) return null;

  // Set style based on hover type
  let ringClasses = "border border-accent ";
  let dotClasses = "bg-accent ";
  let labelText = "";

  if (cursorType === "pointer") {
    ringClasses += "w-14 h-14 bg-accent/10 border-accent scale-100 mix-blend-multiply";
    dotClasses += "scale-0";
  } else if (cursorType === "view") {
    ringClasses += "w-16 h-16 bg-accent border-accent scale-100";
    dotClasses += "scale-0";
    labelText = "View";
  } else if (cursorType === "drag") {
    ringClasses += "w-16 h-16 bg-foreground border-foreground scale-100";
    dotClasses += "scale-0";
    labelText = "Drag";
  } else {
    // Default
    ringClasses += "w-8 h-8 scale-100 border-accent/60";
    dotClasses += "scale-100";
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 mix-blend-normal">
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-300 ease-out flex items-center justify-center ${ringClasses}`}
      >
        {labelText && (
          <span
            ref={labelRef}
            className="text-[10px] uppercase font-bold tracking-widest text-background"
          >
            {labelText}
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-300 ease-out ${dotClasses}`}
      />
    </div>
  );
}
