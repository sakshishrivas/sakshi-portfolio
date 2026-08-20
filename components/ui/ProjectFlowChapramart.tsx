'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

export function ProjectFlowChapramart() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 25%'],
  });

  const step1Opacity = useTransform(scrollYProgress, [0, 0.1], [0.1, 1]);
  const step2Opacity = useTransform(scrollYProgress, [0.12, 0.22], [0.1, 1]);
  const step3Opacity = useTransform(scrollYProgress, [0.24, 0.34], [0.1, 1]);
  const step4Opacity = useTransform(scrollYProgress, [0.36, 0.46], [0.1, 1]);
  const step5Opacity = useTransform(scrollYProgress, [0.48, 0.58], [0.1, 1]);
  const step6Opacity = useTransform(scrollYProgress, [0.60, 0.70], [0.1, 1]);
  const step7Opacity = useTransform(scrollYProgress, [0.72, 0.82], [0.1, 1]);

  const step1Scale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);
  const step2Scale = useTransform(scrollYProgress, [0.12, 0.22], [0.9, 1]);
  const step3Scale = useTransform(scrollYProgress, [0.24, 0.34], [0.9, 1]);
  const step4Scale = useTransform(scrollYProgress, [0.36, 0.46], [0.9, 1]);
  const step5Scale = useTransform(scrollYProgress, [0.48, 0.58], [0.9, 1]);
  const step6Scale = useTransform(scrollYProgress, [0.60, 0.70], [0.9, 1]);
  const step7Scale = useTransform(scrollYProgress, [0.72, 0.82], [0.9, 1]);

  const pathLength = useTransform(
    scrollYProgress,
    [0, 0.9],
    [0, 1]
  );

  const successOpacity = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    [0, 1]
  );

  const STEPS = [
    {
      id: 'store',
      label: 'Store',
      y: 20,
      opacity: step1Opacity,
      scale: step1Scale,
    },
    {
      id: 'product',
      label: 'Product',
      y: 60,
      opacity: step2Opacity,
      scale: step2Scale,
    },
    {
      id: 'cart',
      label: 'Cart',
      y: 100,
      opacity: step3Opacity,
      scale: step3Scale,
    },
    {
      id: 'order',
      label: 'Order',
      y: 140,
      opacity: step4Opacity,
      scale: step4Scale,
    },
    {
      id: 'api',
      label: 'API',
      y: 180,
      opacity: step5Opacity,
      scale: step5Scale,
    },
    {
      id: 'backend',
      label: 'Backend',
      y: 220,
      opacity: step6Opacity,
      scale: step6Scale,
    },
    {
      id: 'database',
      label: 'Database',
      y: 260,
      opacity: step7Opacity,
      scale: step7Scale,
    },
  ];

  return (
    <div
      ref={ref}
      className="relative mt-8 flex h-[300px] w-full select-none items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-alt/30"
      aria-hidden="true"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(var(--color-accent) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <svg
        width="200"
        height="300"
        viewBox="0 0 200 300"
        className="relative z-10 overflow-visible"
      >
        {/* Connection Line */}
        <motion.path
          d="M100 20 L100 260"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeOpacity="0.4"
          fill="none"
          style={reduced ? {} : { pathLength }}
        />

        {/* Animated Packet */}
        {!reduced && (
          <circle
            r="3"
            fill="#EEEDF5"
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M100 20 L100 260"
            />
          </circle>
        )}

        {/* Flow Steps */}
        {STEPS.map((step) => (
          <motion.g
            key={step.id}
            style={
              reduced
                ? {}
                : {
                    opacity: step.opacity,
                    scale: step.scale,
                    transformOrigin: `100px ${step.y}px`,
                  }
            }
          >
            <rect
              x="50"
              y={step.y - 14}
              width="100"
              height="28"
              rx="6"
              fill="var(--color-surface)"
              stroke="var(--color-accent)"
              strokeWidth="1"
            />

            <text
              x="100"
              y={step.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fontFamily="var(--font-mono)"
              letterSpacing="0.1em"
              fill="var(--color-foreground)"
              className="uppercase"
            >
              {step.label}
            </text>
          </motion.g>
        ))}

        {/* Final Success Checkmark */}
        <motion.g
          style={
            reduced
              ? { opacity: 1 }
              : { opacity: successOpacity }
          }
        >
          <circle
            cx="100"
            cy="260"
            r="14"
            fill="var(--color-accent)"
            fillOpacity="0.15"
          />

          <path
            d="M96 260 L99 263 L105 256"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>
      </svg>
    </div>
  );
}