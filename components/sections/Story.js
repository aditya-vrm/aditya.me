"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { GraduationCap, Cpu, Terminal, BrainCircuit, Sparkles, Code2, Server } from "lucide-react";

export default function Story() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [activeWidget, setActiveWidget] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const timer = setTimeout(() => {
      // 1. Draw the curvy connecting line dynamically inside the Story section
      const paths = document.querySelectorAll(".story-connecting-path");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}px`;
        p.style.strokeDashoffset = `${len}px`;
        
        gsap.to(p, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5,
          }
        });
      });

      // 2. Pin the section on desktop and trigger widget transitions
      const blockElements = gsap.utils.toArray(".story-narrative-block");
      blockElements.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveWidget(index),
          onEnterBack: () => setActiveWidget(index),
        });
      });

      // Pin stage on desktop
      if (window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".story-interactive-showcase",
          pinSpacing: false,
        });
      }

      // 3. Scroll Reveal for About Myself Header
      gsap.fromTo(".story-section-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".story-section-header",
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 4. Scroll Reveal for Narrative Blocks (Random scale & tilt reveals)
      blockElements.forEach((block) => {
        const textElements = block.querySelectorAll("span, h3, p");
        textElements.forEach((el, elIdx) => {
          const startScale = 0.8 + Math.random() * 0.12; // unique random scale (0.80 to 0.92)
          const startRot = -3 + Math.random() * 6;       // unique random rotation tilt (-3deg to +3deg)
          const delay = elIdx * 0.12;                    // staggered progressive entrance delay

          gsap.fromTo(el,
            { 
              opacity: 0, 
              scale: startScale, 
              rotate: startRot,
              y: 24 
            },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: 0,
              duration: 1.0,
              ease: "power3.out", // smooth deceleration curve
              scrollTrigger: {
                trigger: block,
                start: "top 85%", // reveals as block comes into view
                toggleActions: "play none none reverse",
              },
              delay: delay
            }
          );
        });
      });

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current || trigger.vars.trigger?.classList?.contains("story-narrative-block")) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleTiltMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg)`;
  };

  const handleTiltMouseLeave = (e) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      ref={sectionRef}
      id="story"
      className="min-h-[220vh] lg:min-h-[300vh] w-full bg-[#060608] relative z-10 select-none overflow-visible py-24 border-t border-white/5"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      {/* Dynamic Curvy Connecting Line (Desktop) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-visible hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 1440 1800" fill="none" preserveAspectRatio="none">
          <path
            className="story-connecting-path opacity-20 blur-[3px]"
            d="M 720,0 C 400,300 100,500 100,800 C 100,1100 600,1050 720,1200 C 850,1350 1200,1400 720,1800"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            className="story-connecting-path"
            d="M 720,0 C 400,300 100,500 100,800 C 100,1100 600,1050 720,1200 C 850,1350 1200,1400 720,1800"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Dynamic Curvy Connecting Line (Mobile) */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0 overflow-visible md:hidden">
        <svg className="w-full h-full" viewBox="0 0 375 1800" fill="none" preserveAspectRatio="none">
          <path
            className="story-connecting-path opacity-20 blur-[3px]"
            d="M 187.5,0 C 80,300 295,700 187.5,1000 C 80,1200 187.5,1500 187.5,1800"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            className="story-connecting-path"
            d="M 187.5,0 C 80,300 295,700 187.5,1000 C 80,1200 187.5,1500 187.5,1800"
            stroke="var(--color-accent, #F59E0B)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 h-full">
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-12 lg:gap-16 h-full">
          
          {/* Left Side: Scrolling Narrative Content (60% width) */}
          <div ref={scrollContainerRef} className="w-full lg:w-[55%] flex flex-col justify-start gap-36 md:gap-56 z-10 select-text">
            
            {/* Header */}
            <div className="mb-[-40px] story-section-header">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent mb-2 block">
                My Story
              </span>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white font-display">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-500">Myself</span>.
              </h2>
            </div>

            {/* Narrative Block 1: SBU SBU */}
            <div className="story-narrative-block flex flex-col justify-start">
              <span className="font-mono text-[10px] font-bold text-accent tracking-widest uppercase mb-4">
                01 / ACADEMIC FOUNDATION
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                BCA Candidate at Sarala Birla University
              </h3>
              <p className="text-sm md:text-base text-muted/80 mt-4 leading-relaxed font-light">
                Currently in my 2nd year of the Bachelor of Computer Applications (BCA) program at Sarala Birla University. I use my academic path as a launchpad, combining formal computer science principles with hands-on building to explore the cutting edge of modern software architecture.
              </p>
            </div>

            {/* Narrative Block 2: Tech Mastery */}
            <div className="story-narrative-block flex flex-col justify-start">
              <span className="font-mono text-[10px] font-bold text-accent tracking-widest uppercase mb-4">
                02 / SOFTWARE ENGINEERING
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                Full-Stack Systems & DevOps
              </h3>
              <p className="text-sm md:text-base text-muted/80 mt-4 leading-relaxed font-light">
                I have mastered the complete product spectrum of a Software Developer. This includes implementing high-performance client-side animations in Frontend, writing scalable Server logic and Database schemas in Backend, modeling secure DBMS, containerizing pipelines in DevOps, and designing modular, reliable System Designs.
              </p>
            </div>

            {/* Narrative Block 3: DSA Coding */}
            <div className="story-narrative-block flex flex-col justify-start">
              <span className="font-mono text-[10px] font-bold text-accent tracking-widest uppercase mb-4">
                03 / ALGORITHMIC RIGOR
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
                Data Structures & Algorithms (DSA)
              </h3>
              <p className="text-sm md:text-base text-muted/80 mt-4 leading-relaxed font-light">
                Actively training my algorithmic problem-solving capabilities. Focusing on space-time complexity analysis, array-manipulations, tree and graph searches, and implementing dynamic programming patterns. This training sharpens my code efficiency and helps me design highly optimized production architectures.
              </p>
            </div>

            {/* Narrative Block 4: AI & ML (Highlighted) */}
            <div className="story-narrative-block border border-accent/20 rounded-3xl p-6 md:p-8 bg-accent/[0.02] shadow-[0_0_24px_rgba(245,158,11,0.02)] flex flex-col justify-start">
              <span className="font-mono text-[10px] font-bold text-accent tracking-widest uppercase mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: "3s" }} />
                04 / FUTURE FRONTIERS (ACTIVE)
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug flex items-center gap-2">
                Artificial Intelligence & Machine Learning
              </h3>
              <p className="text-sm md:text-base text-white/90 mt-4 leading-relaxed font-light">
                Expanding my developer capabilities into AI and Machine Learning. Diving deep into statistical model training, neural networks, predictive algorithms, and building intelligent web agents. I am deeply passionate about how intelligent automation transforms user interactions, making AI & ML my core growth frontier.
              </p>
            </div>

          </div>

          {/* Right Side: Interactive Holographic Showcase (40% width, pinned) */}
          <div className="story-interactive-showcase w-full lg:w-[40%] h-[50vh] lg:h-[80vh] flex items-center justify-center lg:sticky lg:top-16 z-20">
            <div 
              onMouseMove={handleTiltMouseMove}
              onMouseLeave={handleTiltMouseLeave}
              className="w-full aspect-square max-w-sm rounded-[32px] border border-white/10 bg-[#111113]/80 backdrop-blur-xl p-8 flex flex-col justify-between items-center shadow-2xl relative transition-transform duration-200 ease-out select-none cursor-grab"
            >
              {/* Radial gradient background aura (Highlighted Indigo/Amber for AI/ML) */}
              <div 
                className={`absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-700 blur-[80px] -z-10 ${
                  activeWidget === 3 ? "bg-accent/15 opacity-100" : "bg-indigo-500/10 opacity-70"
                }`} 
              />

              {/* Top border ambient highlight */}
              <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              {/* Widget 0: Sarala Birla University Academic Card */}
              {activeWidget === 0 && (
                <div className="w-full h-full flex flex-col justify-between items-center animate-fade-in text-center py-4">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    <GraduationCap className="w-8 h-8 text-accent" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                      Sarala Birla University
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2 tracking-tight">
                      BCA Student
                    </h4>
                    <p className="text-xs text-muted mt-1">
                      Bachelor of Computer Applications
                    </p>
                  </div>
                  <div className="w-full py-2.5 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-[10px] text-muted/70 flex justify-around">
                    <span>YEAR: II (2nd)</span>
                    <span className="w-[1px] h-3 bg-white/10 self-center" />
                    <span>STATUS: ACTIVE</span>
                  </div>
                </div>
              )}

              {/* Widget 1: Full-Stack Developer Orb Mesh */}
              {activeWidget === 1 && (
                <div className="w-full h-full flex flex-col justify-between items-center animate-fade-in py-2">
                  <span className="text-[9px] font-mono tracking-wider text-muted uppercase font-bold">
                    SYSTEM ARCHITECTURE
                  </span>
                  
                  {/* Floating Connected Bubble Network */}
                  <div className="relative w-full h-[55%] flex items-center justify-center">
                    <div className="absolute w-20 h-20 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center text-[10px] font-bold text-white shadow-lg animate-pulse">
                      Frontend
                    </div>
                    <div className="absolute top-2 left-6 w-14 h-14 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center text-[9px] text-muted flex-col">
                      <Server className="w-3.5 h-3.5 mb-0.5 text-indigo-400" />
                      Backend
                    </div>
                    <div className="absolute bottom-2 right-4 w-14 h-14 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center text-[9px] text-muted">
                      Database
                    </div>
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center text-[8px] text-muted">
                      DevOps
                    </div>
                    <div className="absolute bottom-6 left-4 w-12 h-12 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center text-[8px] text-muted">
                      Systems
                    </div>
                    
                    {/* SVG Connector lines behind */}
                    <svg className="absolute inset-0 w-full h-full -z-10 opacity-30" viewBox="0 0 300 150">
                      <line x1="150" y1="75" x2="80" y2="40" stroke="white" strokeWidth="1" strokeDasharray="3" />
                      <line x1="150" y1="75" x2="220" y2="120" stroke="white" strokeWidth="1" strokeDasharray="3" />
                      <line x1="150" y1="75" x2="240" y2="50" stroke="white" strokeWidth="1" strokeDasharray="3" />
                      <line x1="150" y1="75" x2="60" y2="110" stroke="white" strokeWidth="1" strokeDasharray="3" />
                    </svg>
                  </div>

                  <div className="text-center">
                    <h4 className="text-sm font-bold text-white">Full Software Stack</h4>
                    <p className="text-[10px] text-muted mt-1 leading-relaxed font-light max-w-[250px]">
                      Frontend, Backend, DBMS, DevOps, and System Design integrations.
                    </p>
                  </div>
                </div>
              )}

              {/* Widget 2: DSA Code Trace Console */}
              {activeWidget === 2 && (
                <div className="w-full h-full flex flex-col justify-between items-stretch animate-fade-in py-2">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[9px] font-mono tracking-wider text-muted uppercase font-bold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-accent" />
                      DSA CONSOLE
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  
                  {/* Scrolling Code Trace Output */}
                  <div className="flex-1 my-3 bg-black/40 rounded-xl p-3 font-mono text-[9px] text-emerald-400/90 overflow-hidden flex flex-col justify-end leading-relaxed">
                    <p className="opacity-40">&gt; initial root node = BSTNode(50)</p>
                    <p className="opacity-60">&gt; insert keys: [30, 70, 20, 40]</p>
                    <p className="opacity-80">&gt; BST.search(40) =&gt; searching...</p>
                    <p className="text-accent">&gt; node.val (50) &gt; 40, go left</p>
                    <p className="text-accent">&gt; node.val (30) &lt; 40, go right</p>
                    <p className="text-emerald-400 font-bold">&gt; node.val (40) == 40, match found!</p>
                    <p className="animate-pulse">&gt; process completed in 0.04ms_</p>
                  </div>

                  <div className="text-center flex-shrink-0">
                    <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
                      <Code2 className="w-4 h-4 text-accent" />
                      Algorithmic Rigor
                    </h4>
                  </div>
                </div>
              )}

              {/* Widget 3: AI & ML Neural Matrix (Highlighted) */}
              {activeWidget === 3 && (
                <div className="w-full h-full flex flex-col justify-between items-center animate-fade-in py-2">
                  <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                    AI ML CORE ACTIVE
                  </span>
                  
                  {/* Glowing Neural Matrix Display */}
                  <div className="relative w-full h-[55%] flex items-center justify-center">
                    <div className="absolute w-24 h-24 rounded-full border-2 border-accent/40 bg-accent/10 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.25)] animate-pulse">
                      <BrainCircuit className="w-10 h-10 text-accent animate-bounce" style={{ animationDuration: "2s" }} />
                    </div>
                    
                    {/* Floating neural nodes surrounding */}
                    <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                    <div className="absolute bottom-4 left-10 w-2.5 h-2.5 rounded-full bg-accent/80 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                    <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-accent/60 shadow-[0_0_4px_rgba(245,158,11,0.4)]" />
                    <div className="absolute bottom-8 right-6 w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                    <div className="absolute top-1/2 left-4 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                    <div className="absolute top-1/3 right-4 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                    
                    {/* SVG Connector lines */}
                    <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 300 150">
                      <path d="M 80,40 Q 150,75 150,75" stroke="var(--color-accent, #F59E0B)" strokeWidth="1" strokeDasharray="2" />
                      <path d="M 100,120 Q 150,75 150,75" stroke="var(--color-accent, #F59E0B)" strokeWidth="1" strokeDasharray="2" />
                      <path d="M 230,120 Q 150,75 150,75" stroke="var(--color-accent, #F59E0B)" strokeWidth="1" strokeDasharray="2" />
                      <path d="M 240,40 Q 150,75 150,75" stroke="var(--color-accent, #F59E0B)" strokeWidth="1" strokeDasharray="2" />
                      <path d="M 60,75 Q 150,75 150,75" stroke="#6366F1" strokeWidth="1" strokeDasharray="2" />
                      <path d="M 250,55 Q 150,75 150,75" stroke="#6366F1" strokeWidth="1" strokeDasharray="2" />
                    </svg>
                  </div>

                  <div className="text-center">
                    <h4 className="text-sm font-bold text-white tracking-wide">Intelligent Systems</h4>
                    <p className="text-[10px] text-muted/90 mt-1 leading-relaxed font-light max-w-[260px]">
                      Predictive model training, deep learning neural nets, and autonomous agents.
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Widget Navigation Dots indicator */}
              <div className="flex gap-2.5 z-10">
                {[0, 1, 2, 3].map((idx) => (
                  <span 
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeWidget === idx 
                        ? "bg-accent scale-125 shadow-[0_0_6px_var(--color-accent)]" 
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
