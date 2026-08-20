'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAnimation } from './AnimationProvider';

/* ─── Cursor States ─────────────────────────────────────── */
type CursorState = 'default' | 'text' | 'button' | 'project' | 'explore';

const RING_SIZE: Record<CursorState, number> = {
  default: 32,
  text: 40,
  button: 52,
  project: 60,
  explore: 60,
};

const LABELS: Partial<Record<CursorState, string>> = {
  project: 'VIEW',
  explore: 'EXPLORE',
};

export function CustomCursor() {
  const { isTouch, reducedMotion } = useAnimation();
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const magnetTarget = useRef<DOMRect | null>(null);

  /* Raw positions — updated on every mousemove */
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  /* Smooth dot position (fast spring) */
  const dotX = useSpring(rawX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(rawY, { stiffness: 500, damping: 28 });

  /* Smooth ring position (slower spring — trails dot) */
  const ringX = useSpring(rawX, { stiffness: 120, damping: 20 });
  const ringY = useSpring(rawY, { stiffness: 120, damping: 20 });

  /* Ring size spring */
  const ringSize = useSpring(RING_SIZE.default, { stiffness: 200, damping: 22 });

  const detectState = useCallback((el: Element | null): CursorState => {
    if (!el) return 'default';
    const node = el.closest<HTMLElement>(
      '[data-cursor], a, button, input, textarea, select, [role="button"]'
    );
    if (!node) return 'default';
    const attr = node.getAttribute('data-cursor') as CursorState | null;
    if (attr && attr in RING_SIZE) return attr;
    if (node.matches('a, button, [role="button"], input[type="submit"]')) return 'button';
    if (node.matches('input, textarea, select')) return 'text';
    return 'default';
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      const s = detectState(document.elementFromPoint(e.clientX, e.clientY));
      setState(s);
      ringSize.set(RING_SIZE[s]);

      /* Magnetic pull for buttons */
      if (s === 'button') {
        const target = (document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null)
          ?.closest<HTMLElement>('a, button, [role="button"], [data-cursor="button"]');
        if (target) {
          const rect = target.getBoundingClientRect();
          magnetTarget.current = rect;
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          /* Pull ring toward button center */
          rawX.set(cx);
          rawY.set(cy);
          return;
        }
      }
      magnetTarget.current = null;
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isTouch, reducedMotion, rawX, rawY, ringSize, detectState]);

  if (isTouch || reducedMotion) return null;

  const label = LABELS[state];
  const showDot = !label && state !== 'button';

  return (
    <>
      {/* Dot */}
      {showDot && (
        <motion.div
          className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
          style={{
            x: dotX,
            y: dotY,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#EEEDF5',
            translateX: '-50%',
            translateY: '-50%',
            opacity: visible ? 1 : 0,
          }}
        />
      )}

      {/* Ring / Label */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: label ? 'none' : '1.5px solid rgba(108,99,255,0.45)',
          backgroundColor: label ? 'rgba(108,99,255,0.85)' : 'transparent',
          opacity: visible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        {label && (
          <span className="text-[9px] font-mono font-bold text-white tracking-[0.15em] uppercase select-none">
            {label}
          </span>
        )}
        {state === 'button' && !label && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent">
            <path d="M1 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </motion.div>
    </>
  );
}
