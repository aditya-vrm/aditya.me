"use client";

import ScrollReveal from "../ui/ScrollReveal";
import FloatingBadges from "../physics/FloatingBadges";

const SKILL_GROUPS = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "PWA", "Responsive Web Design"]
  },
  {
    category: "Backend & Databases",
    skills: ["Node.js", "Python", "MongoDB", "REST APIs", "SQL"]
  },
  {
    category: "Tools & DevOps",
    skills: ["Docker", "Git & GitHub", "Vercel", "CI/CD", "Linux Shell"]
  },
  {
    category: "CS Fundamentals",
    skills: ["DSA (Data Structures & Algorithms)", "OOP (Object-Oriented Programming)", "System Design", "SEO"]
  }
];

export default function Story() {
  return (
    <section
      id="story"
      className="py-24 md:py-36 bg-background relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto select-text border-t border-black/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Short Personal Narrative & Tech Groups */}
        <div className="lg:col-span-6 flex flex-col text-left">
          <ScrollReveal>
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent mb-3 block">
              My Story
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground font-display">
              About <span className="text-gradient">Myself</span>.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="mt-8">
            <p className="text-base text-muted leading-relaxed">
              I am a dedicated software engineer who has mastered the full digital product spectrum. From writing high-performance client-side animations and semantic layouts to architecting robust REST APIs, modeling databases, and managing containerized deployments.
            </p>
            <p className="text-base text-muted leading-relaxed mt-4">
              My engineering philosophy revolves around combining the mathematical rigors of **Data Structures & Algorithms (DSA)** and **System Design** with the artistic touch of smooth micro-interactions and visually stunning modern web typography.
            </p>
          </ScrollReveal>

          {/* Grouped Skills List */}
          <div className="mt-12 space-y-6">
            {SKILL_GROUPS.map((group, gIdx) => (
              <ScrollReveal key={gIdx} delay={0.05 * gIdx} className="border-b border-black/5 pb-4 last:border-b-0">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2 flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-2" />
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs px-2.5 py-1 bg-black/[0.03] text-muted rounded-md hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Right Side: Matter.js Interactive Sandbox */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 w-full">
          <ScrollReveal delay={0.2}>
            <div className="mb-4">
              <h3 className="text-xs uppercase font-bold tracking-widest text-muted">
                Interactive Skills Sandbox
              </h3>
              <p className="text-xs text-muted/70 mt-1">
                Toss, grab, and drag the badges around to see physics-based collision math in real-time.
              </p>
            </div>
            
            {/* Mounted Physics Sandbox */}
            <FloatingBadges />
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
