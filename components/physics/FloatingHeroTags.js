"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Inline SVG logo definitions for our tech stack
function ReactIcon({ className }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23 23 20.46" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle r="2.05" fill="currentColor" />
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </svg>
  );
}

function NextjsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="currentColor">
      <path d="M90 0a90 90 0 1 0 90 90A90 90 0 0 0 90 0zm37.3 110h-7.3V82.7L91.4 110H82.7V70h7.3v27.3L118.6 70h8.7v40z" />
    </svg>
  );
}

function NodeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function PythonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.3 2a5.4 5.4 0 0 0-3.7 1.5 5 5 0 0 0-1.3 3.5h5V8h-7A5.3 5.3 0 0 0 0 13.3a5.3 5.3 0 0 0 5.3 5.3H7v-2.3a2.3 2.3 0 0 1 2.3-2.3h5a2.3 2.3 0 0 0 2.3-2.3v-4A5.4 5.4 0 0 0 12.3 2z" />
      <path d="M11.7 22a5.4 5.4 0 0 0 3.7-1.5 5 5 0 0 0 1.3-3.5h-5v-1h7a5.3 5.3 0 0 0 5.3-5.3 5.3 5.3 0 0 0-5.3-5.3H17v2.3a2.3 2.3 0 0 1-2.3 2.3h-5A2.3 2.3 0 0 0 7.4 12v4a5.4 5.4 0 0 0 4.3 6z" />
    </svg>
  );
}

function DockerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 8.807h2.29v2.228h-2.29zm-2.337 0h2.29v2.228h-2.29zm-2.337 0h2.29v2.228h-2.29zm-2.336 0h2.29v2.228H6.973zm2.336-2.391h2.29V8.64h-2.29zm2.337 0h2.29V8.64h-2.29zm-4.673 0h2.29V8.64h-2.29zm7.01 0h2.29V8.64h-2.29zM1.16 11.23a2.35 2.35 0 0 0-1.16 2c0 5.38 6.47 7.74 13.25 7.74 7.63 0 10.74-4 10.74-7.58a5 5 0 0 0-.25-1.56 12 12 0 0 1-5.11 1.76c-3 0-5.59-1.92-7-3.95z" />
    </svg>
  );
}

function MongoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5a12.7 12.7 0 0 0-3.3 8.6c0 5.7 3.3 11 3.3 14.4 0-3.4 3.3-8.7 3.3-14.4a12.7 12.7 0 0 0-3.3-8.6zm.9 6.8c.2.3.4.6.4.9 0 1.2-1 2.2-2.2 2.2a.9.9 0 0 1-.9-.9c0-1.2 1-2.2 2.2-2.2.2 0 .4 0 .5.1z" />
    </svg>
  );
}

function GitIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
      <path d="M6 9a9 9 0 0 0 9 9" />
    </svg>
  );
}

function OpenCvIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="7" r="4" />
      <circle cx="7" cy="15" r="4" />
      <circle cx="17" cy="15" r="4" />
    </svg>
  );
}

const TAGS = [
  { name: "React", x: "12%", y: "22%", icon: ReactIcon, hoverColor: "#61DAFB" },
  { name: "Next.js", x: "78%", y: "18%", icon: NextjsIcon, hoverColor: "#000000" },
  { name: "Node.js", x: "18%", y: "65%", icon: NodeIcon, hoverColor: "#339933" },
  { name: "Python", x: "82%", y: "68%", icon: PythonIcon, hoverColor: "#3776AB" },
  { name: "Docker", x: "42%", y: "15%", icon: DockerIcon, hoverColor: "#2496ED" },
  { name: "MongoDB", x: "65%", y: "80%", icon: MongoIcon, hoverColor: "#47A248" },
  { name: "OpenCV", x: "32%", y: "78%", icon: OpenCvIcon, hoverColor: "#5C3EE8" },
  { name: "Git", x: "86%", y: "42%", icon: GitIcon, hoverColor: "#F05032" }
];

export default function FloatingHeroTags() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {TAGS.map((tag, idx) => (
        <RepulsionTag key={idx} tag={tag} />
      ))}
    </div>
  );
}

function RepulsionTag({ tag }) {
  const ref = useRef(null);
  const IconComponent = tag.icon;
  const [isHovered, setIsHovered] = useState(false);

  // Extremely fast, stiff spring config for explosive repulsion speed and quick return
  const springConfig = { stiffness: 350, damping: 15, mass: 0.3 };
  const xOffset = useSpring(0, springConfig);
  const yOffset = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Tight, basic proximity detection zone (130px)
      const radius = 130;
      if (distance < radius) {
        const force = (radius - distance) / radius;
        const angle = Math.atan2(distY, distX);

        // Huge, fast repulsion push (500px displacement)
        const pushX = Math.cos(angle) * -500 * force;
        const pushY = Math.sin(angle) * -500 * force;

        xOffset.set(pushX);
        yOffset.set(pushY);
      } else {
        xOffset.set(0);
        yOffset.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [xOffset, yOffset]);

  return (
    <motion.div
      ref={ref}
      style={{
        left: tag.x,
        top: tag.y,
        x: xOffset,
        y: yOffset,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute pointer-events-auto w-14 h-14 flex items-center justify-center select-none cursor-default transition-all duration-300"
      // Continuous floating loop
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <IconComponent 
        className="w-10 h-10 transition-colors duration-300"
        style={{
          color: isHovered ? tag.hoverColor : "rgba(0, 0, 0, 0.22)"
        }}
      />
    </motion.div>
  );
}
