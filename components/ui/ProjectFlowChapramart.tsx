'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export function ProjectFlowChapramart() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 25%'],
  });

  const STEPS = [
    { id: 'store', label: 'Store', y: 20 },
    { id: 'product', label: 'Product', y: 60 },
    { id: 'cart', label: 'Cart', y: 100 },
    { id: 'order', label: 'Order', y: 140 },
    { id: 'api', label: 'API', y: 180 },
    { id: 'backend', label: 'Backend', y: 220 },
    { id: 'database', label: 'Database', y: 260 },
  ];

  // Map scroll progress to each step's activation (opacity and scale)
  const getOpac = (index: number) => {
    // Each step takes ~1/7th of the scroll progress to activate
    const start = index * 0.12;
    const end = start + 0.1;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [start, end], [0.1, 1]);
  };

  const getScale = (index: number) => {
    const start = index * 0.12;
    const end = start + 0.1;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTransform(scrollYProgress, [start, end], [0.9, 1]);
  };

  // Line path drawing
  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <div ref={ref} className="relative w-full h-[300px] flex items-center justify-center bg-surface-alt/30 rounded-xl border border-border mt-8 overflow-hidden select-none" aria-hidden="true">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

      <svg width="200" height="300" viewBox="0 0 200 300" className="relative z-10 overflow-visible">
        {/* Connection Line */}
        <motion.path
          d="M100 20 L100 260"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeOpacity="0.4"
          fill="none"
          style={reduced ? {} : { pathLength }}
        />
        
        {/* Animated Packet along line */}
        {!reduced && (
          <motion.circle r="3" fill="#EEEDF5">
             <motion.animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M100 20 L100 260"
             />
          </motion.circle>
        )}

        {STEPS.map((step, i) => (
          <motion.g
            key={step.id}
            style={reduced ? {} : { opacity: getOpac(i), scale: getScale(i), transformOrigin: `100px ${step.y}px` }}
          >
            <rect
              x={50} y={step.y - 14} width="100" height="28" rx="6"
              fill="var(--color-surface)"
              stroke="var(--color-accent)"
              strokeWidth="1"
            />
            <text
              x="100" y={step.y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em" fill="var(--color-foreground)"
              className="uppercase"
            >
              {step.label}
            </text>
          </motion.g>
        ))}

        {/* Final Success Checkmark */}
        <motion.g style={{ opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]) }}>
           <circle cx="100" cy="260" r="14" fill="var(--color-accent)" fillOpacity="0.15" />
           <path d="M96 260 L99 263 L105 256" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </motion.g>
      </svg>
    </div>
  );
}
