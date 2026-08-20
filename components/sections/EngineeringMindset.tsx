'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { mindsetSteps } from '@/data/resume';

// Step micro SVGs
function StepMicro({ id, isActive, reduced }: { id: string; isActive: boolean, reduced: boolean | null }) {
  if (!isActive) return null;

  switch (id) {
    case 'understand':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute -top-3 -right-3 text-accent opacity-60">
          <motion.circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
          <motion.path d="M14.5 14.5 L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.4 }} />
        </svg>
      );
    case 'analyze':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute -top-3 -right-3 text-accent opacity-60">
          {[
            { cx: 12, cy: 6, d: 0 },
            { cx: 6, cy: 18, d: 0.2 },
            { cx: 18, cy: 18, d: 0.4 }
          ].map((n, i) => (
            <motion.circle key={i} cx={n.cx} cy={n.cy} r="3" fill="currentColor"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3, delay: n.d }} />
          ))}
          <motion.path d="M12 9 L8 15 M12 9 L16 15" stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
        </svg>
      );
    case 'design':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute -top-3 -right-3 text-accent opacity-60">
          {[4, 10, 16, 20].map((v, i) => (
            <motion.line key={`v${i}`} x1={v} y1="2" x2={v} y2="22" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: i * 0.1 }} />
          ))}
          {[4, 10, 16, 20].map((h, i) => (
            <motion.line key={`h${i}`} x1="2" y1={h} x2="22" y2={h} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} />
          ))}
        </svg>
      );
    case 'build':
      return (
        <div className="absolute -top-4 -right-12 w-[60px]">
          {reduced ? (
             <div className="text-[8px] font-mono text-accent/60 opacity-100">{'< code />'}</div>
          ) : (
            <motion.div
              className="text-[8px] font-mono text-accent/60"
              initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
               {'< code />'}
            </motion.div>
          )}
        </div>
      );
    case 'test':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute -top-3 -right-3 text-accent opacity-60">
          <motion.path d="M6 12 L10 16 L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
        </svg>
      );
    case 'debug':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute -top-3 -right-3 text-accent opacity-60">
          <motion.g initial={{ x: 0, opacity: 1 }} animate={{ x: 15, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 12 L4 12 M20 12 L16 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M10 8 L7 5 M14 8 L17 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M10 16 L7 19 M14 16 L17 19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </motion.g>
        </svg>
      );
    case 'deliver':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="absolute -top-5 -right-3 text-accent opacity-60">
           <motion.g initial={{ y: 0, opacity: 1 }} animate={{ y: -15, opacity: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <path d="M12 2 L12 18 M8 6 L12 2 L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
           </motion.g>
        </svg>
      );
    default: return null;
  }
}

function DesktopStep({ 
  step, 
  index, 
  total, 
  stepFraction,
  scrollYProgress, 
  reduced 
}: { 
  step: { id: string, label: string, description: string }, 
  index: number, 
  total: number, 
  stepFraction: number,
  scrollYProgress: MotionValue<number>,
  reduced: boolean | null
}) {
  const start = index * stepFraction;
  const end = start + stepFraction;
  const isActive = useTransform(scrollYProgress, v => v >= start && v < end);
  const isLastActive = useTransform(scrollYProgress, v => (v >= start) && (index === total - 1));
  const activeOrPast = useTransform(scrollYProgress, v => v >= start);
  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1]);
  
  const isLast = index === total - 1;

  // Use state to track active value for colors since we can't easily animate color strings with useTransform without complex mappings
  // But Framer Motion handles it gracefully in style prop if we use motion components
  
  return (
    <div className="relative flex items-start">
      <div
        className="flex-1 group cursor-default pr-2 relative"
        tabIndex={0}
        role="button"
        aria-label={`Step ${index + 1}: ${step.label}`}
      >
        {/* Top bar background */}
        <div className="h-0.5 mb-5 rounded-full bg-border w-full relative overflow-hidden">
          {!reduced && (
            <motion.div
              className="absolute inset-0 bg-accent origin-left"
              style={{ scaleX }}
            />
          )}
          {reduced && (
            <motion.div
              className="absolute inset-0 bg-accent origin-left"
              style={{ opacity: activeOrPast ? 1 : 0 }}
            />
          )}
        </div>

        <span className="text-[9px] font-mono text-subtle tracking-widest block mb-2">
          {String(index + 1).padStart(2, '0')}
        </span>

        <motion.h3
          className="font-display font-bold text-[17px] mb-2.5 transition-colors duration-200"
          style={reduced ? {} : { color: isActive ? 'var(--color-accent)' : 'var(--color-foreground)' }}
        >
          {step.label}
        </motion.h3>

        <motion.p
          className="text-[12px] text-muted leading-relaxed pr-2 transition-all duration-300"
          style={reduced ? {} : {
              opacity: activeOrPast ? 1 : 0,
              y: activeOrPast ? 0 : 4
          }}
        >
          {step.description}
        </motion.p>
        
        <motion.div style={{ opacity: isActive || isLastActive ? 1 : 0 }}>
          <StepMicro id={step.id} isActive={true} reduced={reduced} />
        </motion.div>
      </div>

      {!isLast && (
        <div className="flex-shrink-0 mt-[18px] opacity-25">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
            <path d="M0 5 L12 5 M8 1 L12 5 L8 9"
              stroke="currentColor" strokeWidth="1"
              strokeLinecap="round" strokeLinejoin="round"
              className="text-muted"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function MobileStep({ 
  step, 
  index,
  total,
  stepFraction,
  scrollYProgress, 
  reduced 
}: { 
  step: { id: string, label: string, description: string }, 
  index: number, 
  total: number,
  stepFraction: number,
  scrollYProgress: MotionValue<number>,
  reduced: boolean | null
}) {
  const start = index * stepFraction;
  const isReached = useTransform(scrollYProgress, v => v >= start);
  const opacity = useTransform(scrollYProgress, [start - 0.1, start], [0.3, 1]);

  return (
    <motion.div className="flex gap-5 relative z-10"
      style={reduced ? {} : { opacity }}
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-8 h-8 rounded-full border border-border bg-surface
                          flex items-center justify-center
                          text-[10px] font-mono text-subtle transition-colors duration-300"
          style={reduced ? {} : {
            borderColor: isReached ? 'var(--color-accent)' : 'var(--color-border)',
            color: isReached ? 'var(--color-accent)' : 'var(--color-subtle)'
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
        {index < total - 1 && (
          <div className="w-px flex-1 my-1 min-h-[30px]" />
        )}
      </div>

      <div className="pb-10 pt-1">
        <h3 className="font-display font-bold text-[17px] text-foreground mb-1.5">
          {step.label}
        </h3>
        <p className="text-[13px] text-muted leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

export function EngineeringMindset() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 70%'],
  });

  const stepFraction = 1 / mindsetSteps.length;

  return (
    <section id="process" ref={sectionRef} className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <SectionLabel number="04" title="How I Work" className="mb-10" />

        <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-16 lg:mb-20">
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-foreground leading-tight">
            Engineering<br />Mindset.
          </h2>
          <p className="text-muted text-[13px] leading-relaxed max-w-xs lg:mb-1.5">
            A structured approach from requirement to delivery — combining
            technical precision with system-level thinking.
          </p>
        </div>

        {/* ── Desktop: horizontal step chain ────────────────── */}
        <div className="hidden lg:grid" style={{ gridTemplateColumns: `repeat(${mindsetSteps.length}, 1fr)` }}>
          {mindsetSteps.map((step, i) => (
            <DesktopStep 
              key={step.id} 
              step={step} 
              index={i} 
              total={mindsetSteps.length}
              stepFraction={stepFraction}
              scrollYProgress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </div>

        {/* ── Mobile: vertical stack ─────────────────────────── */}
        <div className="lg:hidden flex flex-col relative">
           <div className="absolute left-4 top-4 bottom-4 w-px bg-border z-0" />
           {!reduced && (
             <motion.div
               className="absolute left-4 top-4 bottom-4 w-px bg-accent origin-top z-0"
               style={{ scaleY: scrollYProgress }}
             />
           )}
           
          {mindsetSteps.map((step, i) => (
            <MobileStep 
              key={step.id} 
              step={step} 
              index={i} 
              total={mindsetSteps.length}
              stepFraction={stepFraction}
              scrollYProgress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
