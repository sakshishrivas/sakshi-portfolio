'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { capabilities } from '@/data/resume';
import { Server, Zap, Building2, Database, TestTube2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  backend:          Server,
  'rest-apis':      Zap,
  'enterprise-saas':Building2,
  'data-sql':       Database,
  testing:          TestTube2,
};

/* ─── Capability-specific hover micro SVGs ───────────────────── */
function CapabilityMicro({ id, active }: { id: string; active: boolean }) {
  if (!active) return null;

  const shared = { className: "absolute right-4 top-1/2 -translate-y-1/2 opacity-60" };

  switch (id) {
    case 'backend':
      return (
        <div {...shared}>
          <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
            {[0, 8, 16].map((y, i) => (
              <motion.rect key={i} x="0" y={y} width="32" height="5" rx="2"
                fill="var(--color-accent)" fillOpacity="0.15"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                style={{ transformOrigin: '0 50%' }}
              />
            ))}
            {[0, 8, 16].map((y, i) => (
              <motion.rect key={`bar-${i}`} x="0" y={y} width={[20, 28, 16][i]} height="5" rx="2"
                fill="var(--color-accent)" fillOpacity="0.35"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                style={{ transformOrigin: '0 50%' }}
              />
            ))}
          </svg>
        </div>
      );
    case 'rest-apis':
      return (
        <div {...shared}>
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
            <motion.circle cx="4" cy="6" r="3" fill="var(--color-accent)" fillOpacity="0.4"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line x1="7" y1="6" x2="33" y2="6" stroke="var(--color-accent)"
              strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 2"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
            <motion.circle cx="36" cy="6" r="3" fill="var(--color-accent)" fillOpacity="0.4"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.2, delay: 0.4 }}
            />
            {/* Traveling packet */}
            <motion.circle r="2" fill="var(--color-accent)" fillOpacity="0.7"
              initial={{ cx: 7, cy: 6 }} animate={{ cx: 33, cy: 6 }}
              transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatDelay: 0.4 }}
            />
          </svg>
        </div>
      );
    case 'enterprise-saas':
      return (
        <div {...shared}>
          <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
            {[[4, 4], [28, 4], [16, 24]].map(([cx, cy], i) => (
              <motion.circle key={i} cx={cx} cy={cy} r="3"
                fill="var(--color-accent)" fillOpacity="0.3"
                stroke="var(--color-accent)" strokeWidth="0.5" strokeOpacity="0.5"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
            ))}
            {[['4,4', '28,4'], ['28,4', '16,24'], ['16,24', '4,4']].map(([from, to], i) => (
              <motion.line key={i}
                x1={from.split(',')[0]} y1={from.split(',')[1]}
                x2={to.split(',')[0]} y2={to.split(',')[1]}
                stroke="var(--color-accent)" strokeWidth="0.5" strokeOpacity="0.3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              />
            ))}
          </svg>
        </div>
      );
    case 'data-sql':
      return (
        <div {...shared}>
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
            {[0, 6, 12, 18].map((y, i) => (
              <motion.g key={i}>
                <motion.line x1="0" y1={y + 2} x2="32" y2={y + 2}
                  stroke="var(--color-accent)" strokeWidth="0.5" strokeOpacity="0.2" />
                <motion.rect x="1" y={y} width={[12, 18, 8, 22][i]} height="4" rx="1"
                  fill="var(--color-accent)" fillOpacity="0.15"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.08 }}
                  style={{ transformOrigin: '0 50%' }}
                />
              </motion.g>
            ))}
          </svg>
        </div>
      );
    case 'testing':
      return (
        <div {...shared}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {/* Bug */}
            <motion.circle cx="12" cy="12" r="5"
              stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.4" fill="none"
              initial={{ scale: 1, x: 0 }} animate={{ scale: 0, x: -10 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            />
            {/* Checkmark */}
            <motion.path d="M7 12 L10 15 L17 8"
              stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

export function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX((e.clientX - rect.left) / rect.width - 0.5);
  }, []);

  return (
    <section id="capabilities" className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>

        <SectionLabel number="02" title="What I Build" className="mb-14" />

        <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">

          {/* Left — display heading with clip reveal */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.h2
              className="font-display font-extrabold text-5xl lg:text-6xl text-foreground leading-[1.0]"
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              What<br />I Build.
            </motion.h2>
            <motion.p
              className="text-muted text-sm mt-5 leading-relaxed max-w-[240px]"
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Backend engineering across APIs, databases, SaaS platforms and enterprise workflows.
            </motion.p>
          </div>

          {/* Right — capability strips */}
          <div>
            {capabilities.map((cap, i) => {
              const Icon = ICONS[cap.id] ?? Server;
              const isHovered = hoveredId === cap.id;
              return (
                <motion.div
                  key={cap.id}
                  initial={reduced ? {} : { opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div
                    className="group relative flex items-start gap-5 py-7 border-t border-border
                                last:border-b cursor-default
                                hover:pl-1.5 transition-all duration-300 overflow-hidden"
                    onMouseEnter={() => setHoveredId(cap.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onMouseMove={handleMouseMove}
                    data-cursor="explore"
                    style={{
                      transform: isHovered && !reduced ? `translateX(${mouseX * 3}px)` : undefined,
                      transition: 'transform 0.3s ease, padding-left 0.3s ease',
                    }}
                  >
                    {/* Icon box */}
                    <div className="mt-0.5 w-9 h-9 flex-shrink-0 rounded-lg border border-border bg-surface
                                    flex items-center justify-center
                                    group-hover:border-accent/35 group-hover:bg-accent/5
                                    transition-all duration-200">
                      <motion.div
                        animate={isHovered ? { rotate: [0, -8, 8, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon
                          size={16}
                          className="text-subtle group-hover:text-accent transition-colors duration-200"
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-1.5">
                        <h3 className="font-display font-bold text-[19px] text-foreground
                                       group-hover:text-accent transition-colors duration-200">
                          {cap.name}
                        </h3>
                        <div className="hidden sm:flex flex-wrap gap-1.5">
                          {cap.technologies.map(t => (
                            <span key={t} className="text-[10px] font-mono text-subtle px-2 py-0.5 rounded border border-border">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted text-[13px] leading-relaxed">{cap.description}</p>
                      <div className="sm:hidden flex flex-wrap gap-1.5 mt-3">
                        {cap.technologies.map(t => (
                          <span key={t} className="text-[10px] font-mono text-subtle px-2 py-0.5 rounded border border-border">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover micro-animation */}
                    <CapabilityMicro id={cap.id} active={isHovered} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
