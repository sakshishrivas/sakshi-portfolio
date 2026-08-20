'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useSpring, useTransform, useInView } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { education, certifications } from '@/data/resume';
import { GraduationCap, Clock } from 'lucide-react';

function CGPACounter({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState("0.00");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !isInView) {
      setVal(target);
      return;
    }
    
    let startTime: number;
    const num = parseFloat(target);
    const duration = 1500; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal((num * ease).toFixed(2));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };
    
    requestAnimationFrame(step);
  }, [isInView, reduced, target]);

  return <span ref={ref}>{val}</span>;
}

export function Education() {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  
  // 3D Tilt state
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [reduced, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section id="education" className="py-24 lg:py-36 border-t border-border perspective-1000">
      <div className="max-w-7xl mx-auto px-6">

        <SectionLabel number="07" title="Education & Certifications" className="mb-14" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left — Degree card */}
          <motion.div
             ref={cardRef}
             initial={reduced ? {} : { opacity: 0, x: -40, rotateZ: 2 }}
             animate={isInView ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
             transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
             style={{
               rotateX: reduced ? 0 : rotateX,
               rotateY: reduced ? 0 : rotateY,
               transformStyle: 'preserve-3d'
             }}
             className="h-full"
          >
            <div className="rounded-2xl border border-border bg-surface p-8 lg:p-10 h-full shadow-2xl shadow-background"
                 style={{ transform: reduced ? 'none' : 'translateZ(20px)' }}>
                 
              <div className="w-11 h-11 rounded-xl border border-accent/20 bg-accent/5
                              flex items-center justify-center mb-7">
                <GraduationCap size={22} className="text-accent" />
              </div>

              <h2 className="font-display font-bold text-[22px] text-foreground mb-1">
                {education.degree}
              </h2>
              <p className="text-muted text-base mb-1">{education.field}</p>
              <p className="text-subtle text-[13px] leading-relaxed mb-8">
                {education.university}
              </p>

              <div className="flex items-center gap-8 pt-6 border-t border-border">
                <div>
                  <p className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-foreground font-semibold text-sm">{education.duration}</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-1">CGPA</p>
                  <p className="text-foreground font-semibold text-sm">
                     <CGPACounter target={education.cgpa} />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Certifications */}
          <div>
            <ScrollReveal direction="right">
               <h3 className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-6">
                 Certifications &amp; Learning
               </h3>
            </ScrollReveal>

            <div className="space-y-3">
              {certifications.map((cert, i) => {
                const done = cert.status === 'completed';
                return (
                  <ScrollReveal key={cert.id} delay={0.1 + i * 0.15} direction="up">
                    <div
                      className={`flex items-start gap-4 p-5 rounded-xl border transition-all duration-300
                        ${done
                          ? 'border-border bg-surface hover:border-accent/22 hover:bg-surface-alt hover:-translate-y-0.5 shadow-lg shadow-transparent hover:shadow-accent/5'
                          : 'border-border/50 bg-surface/50'}`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {done
                          ? (
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <motion.path d="M7 12 L10 15 L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                                   initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }} />
                             </svg>
                          )
                          : <Clock size={18} className="text-warn anim-spin-slow" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <h4 className={`font-medium text-[13px] ${done ? 'text-foreground' : 'text-muted'}`}>
                            {cert.name}
                          </h4>
                          {!done && (
                            <span className="flex-shrink-0 text-[9px] font-mono text-warn
                                             px-2 py-0.5 rounded border border-warn/25 bg-warn/5">
                              In Progress
                            </span>
                          )}
                        </div>
                        {cert.issuer && (
                          <p className="text-[11px] text-subtle mt-0.5">{cert.issuer}</p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
