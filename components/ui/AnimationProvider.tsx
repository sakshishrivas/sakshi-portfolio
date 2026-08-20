'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  useMotionValue,
  useScroll,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';

/* ─── Types ─────────────────────────────────────────────── */
interface AnimationContextValue {
  /** Normalised page scroll 0 → 1 */
  scrollYProgress: MotionValue<number>;
  /** Raw scroll Y px (spring-smoothed) */
  smoothScrollY: MotionValue<number>;
  /** Mouse position — viewport-relative, normalised -0.5 → 0.5 */
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  /** Whether the user prefers reduced motion */
  reducedMotion: boolean;
  /** Whether the device is touch-primary */
  isTouch: boolean;
}

const AnimationContext = createContext<AnimationContextValue | null>(null);

export function useAnimation() {
  const ctx = useContext(AnimationContext);
  if (!ctx) throw new Error('useAnimation must be used within <AnimationProvider>');
  return ctx;
}

/* ─── Provider ──────────────────────────────────────────── */
export function AnimationProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion() ?? false;

  /* Scroll tracking */
  const { scrollYProgress, scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 60, damping: 20, mass: 0.5 });

  /* Mouse tracking — global */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* Touch detection */
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || isTouch) return;
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, [reducedMotion, isTouch, mouseX, mouseY]);

  return (
    <AnimationContext.Provider
      value={{ scrollYProgress, smoothScrollY, mouseX, mouseY, reducedMotion, isTouch }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
