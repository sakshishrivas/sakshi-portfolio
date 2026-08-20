'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PageLoader() {
  const [phase, setPhase] = useState<'s' | 'name' | 'done'>('s');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('name'), 300);
    const t2 = setTimeout(() => setPhase('done'), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-3">
            {/* S mark */}
            <motion.div
              className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="font-display font-bold text-accent text-lg leading-none">S</span>
            </motion.div>

            {/* Name text */}
            <AnimatePresence>
              {phase === 'name' && (
                <motion.span
                  className="font-display font-semibold text-foreground text-lg tracking-tight"
                  initial={{ opacity: 0, x: -8, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Sakshi Shrivastava
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
