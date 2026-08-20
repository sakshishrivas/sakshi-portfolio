'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function ProjectFlowHotel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const NODES = [
    { id: 'booking', label: 'Booking', x: 40, icon: '📅' },
    { id: 'room', label: 'Room', x: 120, icon: '🚪' },
    { id: 'payment', label: 'Payment', x: 200, icon: '💳' },
    { id: 'invoice', label: 'Invoice', x: 280, icon: '🧾' },
  ];

  return (
    <div className="relative w-full h-[180px] flex items-center justify-center bg-surface-alt/30 rounded-xl border border-border mt-8 overflow-hidden select-none" aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

      <svg viewBox="0 0 320 180" className="w-full h-full relative z-10" overflow="visible">
        {/* Base Connection Line */}
        <line x1="40" y1="90" x2="280" y2="90" stroke="var(--color-border)" strokeWidth="2" />
        
        {/* Animated Connection Line on hover */}
        {!reduced && (
          <motion.line
            x1="40" y1="90" x2="280" y2="90"
            stroke="var(--color-accent)" strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ strokeDashoffset: 16 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ opacity: hovered ? 0.6 : 0 }}
          />
        )}

        {NODES.map((node) => {
          const isHovered = hovered === node.id;
          
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              {/* Glow */}
              <motion.circle
                cx={node.x} cy="90" r="24"
                fill="var(--color-accent)"
                initial={false}
                animate={{ opacity: isHovered ? 0.15 : 0, scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Node bg */}
              <motion.circle
                cx={node.x} cy="90" r="18"
                fill={isHovered ? 'var(--color-surface)' : 'var(--color-background)'}
                stroke={isHovered ? 'var(--color-accent)' : 'var(--color-border)'}
                strokeWidth="1.5"
                initial={false}
                animate={{ y: isHovered ? -4 : 0 }}
              />
              
              {/* Icon */}
              <motion.text
                x={node.x} y="90"
                textAnchor="middle" dominantBaseline="central"
                fontSize="14"
                initial={false}
                animate={{ y: isHovered ? -4 : 0 }}
              >
                {node.icon}
              </motion.text>
              
              {/* Label */}
              <motion.text
                x={node.x} y="125"
                textAnchor="middle"
                fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.05em"
                fill={isHovered ? 'var(--color-foreground)' : 'var(--color-subtle)'}
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? -2 : 0 }}
              >
                {node.label}
              </motion.text>
            </g>
          );
        })}

        {/* Floating Refund Node (connected to payment) */}
        <g
            onMouseEnter={() => setHovered('refund')}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'default' }}
        >
          <path d="M200 90 L200 130" stroke={hovered === 'refund' || hovered === 'payment' ? 'var(--color-accent)' : 'var(--color-border)'} strokeWidth="1.5" strokeDasharray="2 2" />
          <motion.rect
            x="175" y="130" width="50" height="20" rx="4"
            fill={hovered === 'refund' ? 'var(--color-surface)' : 'var(--color-background)'}
            stroke={hovered === 'refund' ? 'var(--color-accent)' : 'var(--color-border)'}
            initial={false}
            animate={{ y: hovered === 'refund' ? -2 : 0 }}
          />
          <motion.text
            x="200" y="140"
            textAnchor="middle" dominantBaseline="central"
            fontSize="9" fontFamily="var(--font-mono)"
            fill={hovered === 'refund' ? 'var(--color-foreground)' : 'var(--color-subtle)'}
            initial={false}
            animate={{ y: hovered === 'refund' ? -2 : 0 }}
          >
            REFUND
          </motion.text>
        </g>
      </svg>
    </div>
  );
}
