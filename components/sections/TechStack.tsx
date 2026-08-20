'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { techStack } from '@/data/resume';

export function TechStack() {
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const categories = Object.entries(techStack);
  const reduced = useReducedMotion();

  // Constellation logic: if hovered item is in the same category, lightly highlight the category
  const activeCategory = highlighted
    ? categories.find(([, techs]) => techs.includes(highlighted))?.[0]
    : null;

  return (
    <section id="stack" className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <SectionLabel number="06" title="Tech Stack" className="mb-10" />

        <ScrollReveal>
          <h2 className="font-display font-extrabold text-4xl lg:text-6xl text-foreground leading-tight mb-16">
            Technologies<br />I Work With.
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 relative">
          {categories.map(([cat, techs], ci) => (
            <ScrollReveal key={cat} delay={ci * 0.15}>
              <div
                className="relative z-10 transition-colors duration-500"
                style={{
                   opacity: activeCategory && activeCategory !== cat ? 0.4 : 1
                }}
              >
                <h3 className="text-[10px] font-mono text-subtle uppercase tracking-[0.18em] mb-4 pb-2 border-b border-border">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-2 relative">
                  {techs.map((t, ti) => {
                     const isHovered = highlighted === t;
                     const isRelated = activeCategory === cat && !isHovered;

                     return (
                        <motion.button
                          key={t}
                          initial={reduced ? {} : { opacity: 0, scale: 0.8 }}
                          whileInView={reduced ? {} : { opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: ti * 0.05 }}
                          className={`relative px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-300 cursor-default
                            ${isHovered
                              ? 'border-accent/55 bg-accent/10 text-accent-soft shadow-sm shadow-accent/10 z-20'
                              : isRelated
                              ? 'border-accent/30 bg-surface-alt text-foreground z-10'
                              : 'border-border text-muted hover:border-accent/30 hover:text-foreground hover:bg-surface-alt z-0'
                            }`}
                          onMouseEnter={() => setHighlighted(t)}
                          onMouseLeave={() => setHighlighted(null)}
                          onFocus={() => setHighlighted(t)}
                          onBlur={() => setHighlighted(null)}
                          aria-label={t}
                          style={!reduced && isHovered ? { scale: 1.05 } : {}}
                        >
                          {t}
                          
                          {/* Tooltip for hover */}
                          {isHovered && !reduced && (
                             <motion.div
                               className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-accent text-white text-[9px] font-mono whitespace-nowrap pointer-events-none"
                               initial={{ opacity: 0, y: 5 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ duration: 0.2 }}
                             >
                               {cat}
                             </motion.div>
                          )}
                        </motion.button>
                     );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Background SVG for Tech Constellation effect */}
          {!reduced && activeCategory && (
             <motion.div 
               className="absolute inset-0 pointer-events-none z-0"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.4 }}
             >
                <svg width="100%" height="100%" className="opacity-20">
                   <defs>
                      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                         <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.4" />
                         <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                      </radialGradient>
                   </defs>
                   <rect width="100%" height="100%" fill="url(#glow)" />
                </svg>
             </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
