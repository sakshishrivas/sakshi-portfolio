'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { experience } from '@/data/resume';
import { MapPin } from 'lucide-react';

function ExperienceItem({ 
  exp, 
  index, 
  scrollYProgress, 
  reduced 
}: { 
  exp: { id: string, company: string, duration: string, role: string, location: string, current: boolean, responsibilities: string[], technologies: string[] }, 
  index: number, 
  scrollYProgress: MotionValue<number>, 
  reduced: boolean | null 
}) {
  const start = index * 0.4;
  const dotScale = useTransform(scrollYProgress, [start, start + 0.2], [0, 1]);
  const isActive = useTransform(scrollYProgress, v => v >= start + 0.1);

  return (
    <ScrollReveal delay={index * 0.1} direction="left">
      <div className="relative">
        {/* Dot on rail */}
        <motion.div
          className={`absolute -left-[41px] top-2 w-4 h-4 rounded-full border-2 z-10
            ${exp.current
              ? 'border-accent bg-accent/20'
              : 'border-border bg-surface-alt'}`}
          style={reduced ? {} : { scale: dotScale }}
        >
            {/* Optional inner fill that appears when line passes */}
            {!exp.current && !reduced && (
                <motion.div
                  className="absolute inset-0 m-0.5 rounded-full bg-accent"
                  style={{ opacity: isActive ? 1 : 0 }}
                />
            )}
        </motion.div>
        
        {/* Current Role Pulse */}
        {exp.current && (
          <div className="absolute -left-[39px] top-3 w-2 h-2 rounded-full bg-accent z-20 anim-pulse-glow" />
        )}

        {/* Content - Staggered fade in */}
        <div>
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-bold text-2xl text-foreground">
              {exp.company}
            </h3>
            <span className="text-[11px] font-mono text-subtle whitespace-nowrap mt-1">
              {exp.duration}
            </span>
          </div>

          {/* Role + meta */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md
                              bg-accent/10 border border-accent/20
                              text-accent text-[12px] font-medium">
              {exp.role}
            </span>
            {exp.current && (
              <span className="text-[11px] font-mono text-warn">
                Current
              </span>
            )}
            <span className="flex items-center gap-1 text-[12px] text-subtle">
              <MapPin size={11} />
              {exp.location}
            </span>
          </div>

          {/* Responsibilities */}
          <ul className="space-y-2.5 mb-5">
            {exp.responsibilities.map((r: string, j: number) => (
              <motion.li
                key={j}
                className="flex items-start gap-3 text-[13px] text-muted leading-relaxed"
                initial={reduced ? {} : { opacity: 0, y: 5 }}
                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: 0.1 + j * 0.05 }}
              >
                <span className="w-1 h-1 rounded-full bg-accent/45 mt-[7px] flex-shrink-0" />
                {r}
              </motion.li>
            ))}
          </ul>

          {/* Tech chips */}
          <motion.div
              className="flex flex-wrap gap-1.5"
              initial={reduced ? {} : { opacity: 0 }}
              whileInView={reduced ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
          >
            {exp.technologies.map((t: string) => (
              <span key={t} className="text-[10px] font-mono text-subtle
                                        px-2 py-1 rounded border border-border bg-surface">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 50%'],
  });

  const travellingDotY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const travellingDotOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section id="experience" ref={sectionRef} className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <SectionLabel number="05" title="Experience" className="mb-14" />

        <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">

          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-foreground leading-tight">
              Professional<br />Journey.
            </h2>
            <p className="text-muted text-[13px] mt-4 leading-relaxed max-w-[230px]">
              Building real-world experience across engineering and system analysis.
            </p>
          </div>

          {/* Right — timeline */}
          <div className="relative">
            {/* Background vertical rail line */}
            <div className="absolute left-0 top-3 bottom-0 w-px bg-border z-0" />
            
            {/* Animated Draw Line */}
            {!reduced && (
               <motion.div
                 className="absolute left-0 top-3 bottom-0 w-px bg-accent z-0 origin-top"
                 style={{ scaleY: scrollYProgress }}
               />
            )}
            
            {/* Travelling decorative dot */}
            {!reduced && (
               <motion.div
                 className="absolute left-[-3px] w-2 h-2 rounded-full bg-accent z-10"
                 style={{
                   top: '12px',
                   y: travellingDotY,
                   opacity: travellingDotOpacity
                 }}
               />
            )}

            <div className="pl-9 space-y-14">
              {experience.map((exp, i) => (
                <ExperienceItem 
                  key={exp.id} 
                  exp={exp} 
                  index={i} 
                  scrollYProgress={scrollYProgress} 
                  reduced={reduced} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
