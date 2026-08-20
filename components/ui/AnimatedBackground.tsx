'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useAnimation } from './AnimationProvider';

/* ─── Floating Particles (CSS-only, no JS ticking) ────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 1.5 + Math.random() * 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 20,
  dur: 25 + Math.random() * 35,
  opacity: 0.12 + Math.random() * 0.18,
}));

export function AnimatedBackground() {
  const { mouseX, mouseY, reducedMotion, isTouch } = useAnimation();

  /* Cursor-follow glow — very subtle */
  const smX = useSpring(mouseX, { stiffness: 20, damping: 25 });
  const smY = useSpring(mouseY, { stiffness: 20, damping: 25 });
  const glowX = useTransform(smX, v => `${(v + 0.5) * 100}%`);
  const glowY = useTransform(smY, v => `${(v + 0.5) * 100}%`);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">

      {/* Slow-moving technical grid */}
      {!reducedMotion && (
        <div
          className="absolute inset-[-50%] w-[200%] h-[200%] opacity-[0.025] anim-grid-drift"
          style={{
            backgroundImage: `
              linear-gradient(rgba(108,99,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108,99,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {/* Gradient blobs */}
      {!reducedMotion && (
        <>
          <div
            className="absolute w-[600px] h-[600px] rounded-full anim-blob-1"
            style={{
              background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)',
              top: '10%',
              left: '15%',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full anim-blob-2"
            style={{
              background: 'radial-gradient(circle, rgba(155,148,255,0.04) 0%, transparent 70%)',
              top: '50%',
              right: '10%',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full anim-blob-3"
            style={{
              background: 'radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)',
              bottom: '20%',
              left: '40%',
              filter: 'blur(70px)',
            }}
          />
        </>
      )}

      {/* Floating particles */}
      {!reducedMotion &&
        PARTICLES.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full anim-particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: 'rgba(108,99,255,0.55)',
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}

      {/* Cursor-follow glow */}
      {!reducedMotion && !isTouch && (
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(108,99,255,0.04) 0%, transparent 60%)',
            left: glowX,
            top: glowY,
            translateX: '-50%',
            translateY: '-50%',
            filter: 'blur(40px)',
          }}
        />
      )}
    </div>
  );
}
