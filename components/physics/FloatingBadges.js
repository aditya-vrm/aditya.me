"use client";

import { useEffect, useRef, useState } from "react";
import { TECH_BADGES } from "@/lib/constants";

export default function FloatingBadges() {
  const sceneRef = useRef(null);
  const containerRef = useRef(null);
  const badgeRefs = useRef([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;

    // Dynamically import Matter.js to avoid SSR issues
    let Matter;
    let engine;
    let runner;

    const initPhysics = async () => {
      Matter = await import("matter-js");
      const { Engine, World, Bodies, Mouse, MouseConstraint, Composite, Events } = Matter;

      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth || 800;
      const height = containerRef.current.clientHeight || 400;

      // 1. Create Engine
      engine = Engine.create({
        gravity: { y: 0.25, x: 0 } // Low gravity for floating/playful feel
      });
      const world = engine.world;

      // 2. Create Walls (Static Bodies)
      const wallThickness = 100;
      const floor = Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width * 2,
        wallThickness,
        { isStatic: true, label: "floor" }
      );
      const ceiling = Bodies.rectangle(
        width / 2,
        -wallThickness / 2,
        width * 2,
        wallThickness,
        { isStatic: true, label: "ceiling" }
      );
      const leftWall = Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height * 2,
        { isStatic: true, label: "leftWall" }
      );
      const rightWall = Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 2,
        { isStatic: true, label: "rightWall" }
      );

      Composite.add(world, [floor, ceiling, leftWall, rightWall]);

      // 3. Create Badge Bodies matching DOM dimensions
      const bodiesData = [];

      badgeRefs.current.forEach((el, index) => {
        if (!el) return;

        // Measure elements
        const rect = el.getBoundingClientRect();
        const w = rect.width || 100;
        const h = rect.height || 36;

        // Start at random coordinates in upper region
        const startX = Math.random() * (width - w) + w / 2;
        const startY = Math.random() * (height / 2 - h) + h / 2;

        const body = Bodies.rectangle(startX, startY, w, h, {
          restitution: 0.7, // Bounciness
          friction: 0.1,
          frictionAir: 0.02,
          density: 0.001,
          angle: (Math.random() - 0.5) * 0.5, // Slight initial rotation
        });

        bodiesData.push({ el, body });
        Composite.add(world, body);
      });

      // 4. Mouse Constraint for Dragging
      const mouse = Mouse.create(containerRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });

      Composite.add(world, mouseConstraint);

      // Keep mouse events in sync with CSS coordinates
      // Matter.js needs coordinates relative to the canvas/container
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      // 5. Update loop (updates absolute positioning of DOM elements)
      const updateDOM = () => {
        bodiesData.forEach(({ el, body }) => {
          const { x, y } = body.position;
          const angle = body.angle;

          // Align center of DOM element with Matter body center
          // We translate relative to top-left of container
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          el.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, 0) rotate(${angle}rad)`;
        });
      };

      Events.on(engine, "afterUpdate", updateDOM);

      // 6. Run Engine
      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      // Handle window resize dynamically
      const handleResize = () => {
        if (!containerRef.current) return;
        const newW = containerRef.current.clientWidth;
        const newH = containerRef.current.clientHeight;

        Matter.Body.setPosition(floor, { x: newW / 2, y: newH + wallThickness / 2 });
        Matter.Body.setPosition(leftWall, { x: -wallThickness / 2, y: newH / 2 });
        Matter.Body.setPosition(rightWall, { x: newW + wallThickness / 2, y: newH / 2 });
      };

      window.addEventListener("resize", handleResize);

      // Save references for cleanup
      sceneRef.current = {
        engine,
        runner,
        world,
        mouseConstraint,
        handleResize
      };
    };

    // Tiny delay to let DOM render and elements establish widths/heights
    const timer = setTimeout(() => {
      initPhysics();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (sceneRef.current) {
        const { engine: e, runner: r, world: w, handleResize } = sceneRef.current;
        window.removeEventListener("resize", handleResize);
        if (Matter) {
          Matter.Runner.stop(r);
          Matter.World.clear(w);
          Matter.Engine.clear(e);
        }
      }
    };
  }, [isMounted, prefersReducedMotion]);

  // Reduced motion mode fallback: simple static list
  if (prefersReducedMotion) {
    return (
      <div className="flex flex-wrap gap-2 justify-center py-8">
        {TECH_BADGES.map((badge, idx) => (
          <div
            key={idx}
            className="border border-black/10 bg-white hover:border-accent shadow-sm hover:shadow transition-all duration-300 font-semibold px-4 py-2 text-xs rounded-full cursor-pointer select-none text-foreground"
          >
            {badge.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] border border-black/5 bg-black/[0.01] rounded-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing"
      data-cursor="drag"
    >
      {/* Background hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <p className="text-[10px] tracking-widest uppercase font-bold text-muted">
          Drag & Toss Badges · Physics Sandbox
        </p>
      </div>

      {/* DOM Elements mapped in Physics */}
      {TECH_BADGES.map((badge, idx) => (
        <div
          key={idx}
          ref={(el) => (badgeRefs.current[idx] = el)}
          className="absolute top-0 left-0 border border-black/10 bg-white hover:border-accent/40 shadow-sm hover:shadow transition-shadow font-semibold px-4 py-2.5 text-xs rounded-full select-none text-foreground pointer-events-auto will-change-transform"
        >
          <span className="inline-block mr-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
          {badge.name}
        </div>
      ))}
    </div>
  );
}
