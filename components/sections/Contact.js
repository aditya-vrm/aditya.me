"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import ScrollReveal from "../ui/ScrollReveal";
import { Mail, Phone, Linkedin, Github, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-background relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto select-text border-t border-black/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Big Headline */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <ScrollReveal>
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-3 block">
              Get In Touch
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] text-foreground font-display">
              Let's Build
              <br />
              <span className="text-gradient">Something</span>
              <br />
              Great.
            </h2>
          </ScrollReveal>
        </div>

        {/* Right Column: Contact info & Magnetic Social Buttons */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-12 text-left">
          
          {/* Direct Details */}
          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <p className="text-xs uppercase font-bold tracking-widest text-muted">
                Direct Contact
              </p>
              
              {/* Email Link */}
              <a
                href="mailto:adityahosir@gmail.com"
                className="group flex items-center justify-between border-b border-black/10 py-3 text-lg md:text-2xl font-bold text-foreground hover:text-accent hover:border-accent transition-colors duration-300"
                data-cursor="pointer"
              >
                <span>adityahosir@gmail.com</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              {/* Phone Link */}
              <a
                href="tel:+918229803378"
                className="group flex items-center justify-between border-b border-black/10 py-3 text-lg md:text-2xl font-bold text-foreground hover:text-accent hover:border-accent transition-colors duration-300"
                data-cursor="pointer"
              >
                <span>+91 8229803378</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </ScrollReveal>
          </div>

          {/* Socials Connection */}
          <div>
            <ScrollReveal delay={0.2}>
              <p className="text-xs uppercase font-bold tracking-widest text-muted mb-4">
                Social Networks
              </p>
              <div className="flex items-center gap-4">
                <SocialButton
                  href="https://www.linkedin.com/in/aditya-v27"
                  icon={<Linkedin className="w-5 h-5" />}
                  label="LinkedIn"
                />
                <SocialButton
                  href="https://github.com/aditya-vrm"
                  icon={<Github className="w-5 h-5" />}
                  label="GitHub"
                />
                <SocialButton
                  href="mailto:adityahosir@gmail.com"
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                />
                <SocialButton
                  href="tel:+918229803378"
                  icon={<Phone className="w-5 h-5" />}
                  label="Phone"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

// Inner component for magnetic social buttons
function SocialButton({ href, icon, label }) {
  const socialRef = useMagnetic(0.4);

  return (
    <a
      ref={socialRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-12 h-12 rounded-full border border-black/10 bg-white flex items-center justify-center text-foreground hover:bg-accent hover:border-accent hover:text-white transition-colors duration-300"
      data-cursor="pointer"
    >
      {icon}
    </a>
  );
}
