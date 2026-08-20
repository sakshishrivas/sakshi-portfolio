'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

function ComplianceStep({ 
  step, 
  index, 
  total, 
  scrollYProgress, 
  reduced 
}: { 
  step: { id: string, label: string, desc: string }, 
  index: number, 
  total: number,
  scrollYProgress: MotionValue<number>,
  reduced: boolean | null
}) {
  const start = index * 0.2;
  const end = start + 0.15;
  const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);
  const dotScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const passOpac = useTransform(scrollYProgress, [end - 0.05, end], [0, 1]);
  const lineScaleY = useTransform(scrollYProgress, [end, end + 0.15], [0, 1]);

  return (
    <motion.div className="relative flex items-center gap-4" style={reduced ? {} : { opacity, scale }}>
      {/* Connector Line (except last) */}
      {index < total - 1 && (
        <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-px bg-border">
          {!reduced && (
            <motion.div
              className="w-full bg-accent origin-top"
              style={{
                scaleY: lineScaleY,
                height: '100%'
              }}
            />
          )}
        </div>
      )}

      {/* Status Node */}
      <div className="relative w-6 h-6 shrink-0 rounded-full bg-background border border-border flex items-center justify-center z-10">
        <motion.div
          className="w-3 h-3 rounded-full bg-accent"
          style={reduced ? {} : { scale: dotScale }}
        />
      </div>

      {/* Content Card */}
      <div className="flex-1 bg-surface border border-border rounded-lg p-3">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[12px] font-medium text-foreground">{step.label}</span>
          <motion.span
            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-accent/10 text-accent"
            style={reduced ? {} : { opacity: passOpac }}
          >
            PASS
          </motion.span>
        </div>
        <span className="text-[10px] font-mono text-subtle">{step.desc}</span>
      </div>
    </motion.div>
  );
}

export function ProjectFlowCompliance() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'end 20%'],
  });

  const STEPS = [
    { id: 'q', label: 'Questionnaire', desc: 'Vendor Assessment' },
    { id: 'a', label: 'Assessment', desc: 'Risk Scoring' },
    { id: 'r', label: 'Review', desc: 'Compliance Team' },
    { id: 'ap', label: 'Approval', desc: 'Final Sign-off' },
  ];

  return (
    <div ref={ref} className="relative w-full h-[320px] flex items-start justify-center bg-surface-alt/30 rounded-xl border border-border mt-8 overflow-hidden select-none py-6" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '100% 24px' }} />

      <div className="relative z-10 w-full max-w-[240px] flex flex-col gap-6">
        {STEPS.map((step, i) => (
          <ComplianceStep 
            key={step.id} 
            step={step} 
            index={i} 
            total={STEPS.length} 
            scrollYProgress={scrollYProgress} 
            reduced={reduced} 
          />
        ))}
      </div>
    </div>
  );
}
