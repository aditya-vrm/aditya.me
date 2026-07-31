"use client";

import { motion } from "framer-motion";

/**
 * Premium ScrollReveal utility wrapper component using Framer Motion.
 * Animates children elements when they enter the viewport.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  xOffset = 0,
  scale = 1,
  className = "",
  once = true,
  margin = "-15%"
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        x: xOffset,
        scale: scale,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: once, margin: margin }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom premium cubic bezier easeOutExpo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
