'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type Variant =
  | 'default'
  | 'hero-to-capabilities'
  | 'capabilities-to-projects'
  | 'process-to-experience'
  | 'education-to-contact';

interface Props {
  variant?: Variant;
}

export function SectionConnector({ variant = 'default' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Hook calls for specific variants that we need to execute unconditionally
  const heroDataDotDist = useTransform(scrollYProgress, [0, 0.6], ['0%', '100%']);
  
  const capProjScale1 = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const capProjScale2 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const capProjScale3 = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  
  const procExpScale = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const eduContScale = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  if (reduced) return <div className="h-12" />;

  return (
    <div ref={ref} className="relative w-full flex justify-center" style={{ height: 80 }}>
      <motion.svg
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        className="overflow-visible"
        style={{ opacity }}
      >
        {variant === 'hero-to-capabilities' && (
          <>
            {/* Central line with branching */}
            <motion.path
              d="M60 0 L60 35 M60 35 L30 55 M60 35 L90 55 M30 55 L60 80 M90 55 L60 80"
              stroke="var(--color-accent)"
              strokeWidth="0.75"
              strokeOpacity="0.3"
              style={{ pathLength }}
            />
            {/* Data packet dot */}
            <motion.circle
              r="2"
              fill="var(--color-accent)"
              fillOpacity="0.6"
              style={{
                offsetPath: "path('M60 0 L60 35 L30 55 L60 80')",
                offsetDistance: heroDataDotDist,
              }}
            />
          </>
        )}

        {variant === 'capabilities-to-projects' && (
          <>
            {/* Architecture-like branching paths */}
            <motion.path
              d="M60 0 L60 20 M40 20 L80 20 M40 20 L40 60 M80 20 L80 60 M40 60 L60 80 M80 60 L60 80"
              stroke="var(--color-accent)"
              strokeWidth="0.75"
              strokeOpacity="0.25"
              style={{ pathLength }}
            />
            <motion.circle r="1.5" fill="var(--color-accent)" fillOpacity="0.5" cx="60" cy="20"
              style={{ scale: capProjScale1 }} />
            <motion.circle r="1.5" fill="var(--color-accent)" fillOpacity="0.5" cx="40" cy="60"
              style={{ scale: capProjScale2 }} />
            <motion.circle r="1.5" fill="var(--color-accent)" fillOpacity="0.5" cx="80" cy="60"
              style={{ scale: capProjScale3 }} />
          </>
        )}

        {variant === 'process-to-experience' && (
          <>
            {/* Process line morphs into timeline */}
            <motion.path
              d="M60 0 L60 40 M50 40 L70 40 M60 40 L60 80"
              stroke="var(--color-accent)"
              strokeWidth="0.75"
              strokeOpacity="0.3"
              style={{ pathLength }}
            />
            {/* Timeline marker dots */}
            <motion.circle r="2.5" cx="60" cy="40" fill="var(--color-background)"
              stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.4"
              style={{ scale: procExpScale }}
            />
          </>
        )}

        {variant === 'education-to-contact' && (
          <>
            {/* Converging paths toward center */}
            <motion.path
              d="M20 0 L60 40 M100 0 L60 40 M60 40 L60 80"
              stroke="var(--color-accent)"
              strokeWidth="0.75"
              strokeOpacity="0.25"
              style={{ pathLength }}
            />
            <motion.circle r="2" cx="60" cy="40" fill="var(--color-accent)" fillOpacity="0.5"
              style={{ scale: eduContScale }}
            />
          </>
        )}

        {variant === 'default' && (
          <motion.line
            x1="60" y1="0" x2="60" y2="80"
            stroke="var(--color-border)"
            strokeWidth="0.75"
            style={{ pathLength }}
          />
        )}
      </motion.svg>
    </div>
  );
}
