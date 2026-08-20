'use client';

import { useRef, useCallback } from 'react';
import type {
  ReactNode,
  MouseEvent,
  MouseEventHandler,
} from 'react';

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';

import { SystemVisualization } from '@/components/hero/SystemVisualization';
import { personal } from '@/data/resume';


function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
  });
}


/* ─── Stagger container ──────────────────────────────────────── */

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};


/* ─── Word-by-word reveal for hero text ──────────────────────── */

function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            initial={{
              y: '100%',
              opacity: 0,
            }}
            animate={{
              y: '0%',
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>

          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}


/* ─── Magnetic button wrapper ────────────────────────────────── */

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
};

function MagneticButton({
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, {
    stiffness: 200,
    damping: 15,
  });

  const sy = useSpring(y, {
    stiffness: 200,
    damping: 15,
  });

  const handleMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      const px =
        e.clientX -
        rect.left -
        rect.width / 2;

      const py =
        e.clientY -
        rect.top -
        rect.height / 2;

      x.set(px * 0.25);
      y.set(py * 0.25);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={className}
      style={{
        x: sx,
        y: sy,
      }}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="button"
    >
      {children}
    </motion.button>
  );
}


/* ─── Magnetic link wrapper ──────────────────────────────────── */

type MagneticLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
};

function MagneticLink({
  children,
  href,
  className,
  download,
  target,
  rel,
  'aria-label': ariaLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, {
    stiffness: 200,
    damping: 15,
  });

  const sy = useSpring(y, {
    stiffness: 200,
    damping: 15,
  });

  const handleMove = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      const px =
        e.clientX -
        rect.left -
        rect.width / 2;

      const py =
        e.clientY -
        rect.top -
        rect.height / 2;

      x.set(px * 0.2);
      y.set(py * 0.2);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={className}
      style={{
        x: sx,
        y: sy,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="button"
    >
      {children}
    </motion.a>
  );
}


/* ─── Hero ───────────────────────────────────────────────────── */

export function Hero() {
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);

  /* Subtle parallax for the background grid inside hero */

  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);

  const sbgX = useSpring(bgX, {
    stiffness: 15,
    damping: 20,
  });

  const sbgY = useSpring(bgY, {
    stiffness: 15,
    damping: 20,
  });

  const gridX = useTransform(sbgX, (v) => v * 8);
  const gridY = useTransform(sbgY, (v) => v * 8);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (reduced) return;

      const rect =
        sectionRef.current?.getBoundingClientRect();

      if (!rect) return;

      bgX.set(
        (e.clientX - rect.left) /
          rect.width -
          0.5
      );

      bgY.set(
        (e.clientY - rect.top) /
          rect.height -
          0.5
      );
    },
    [reduced, bgX, bgY]
  );

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      onMouseMove={onMouseMove}
    >

      {/* Subtle top-left accent glow */}

      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(108,99,255,0.09) 0%, transparent 65%)',
        }}
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />


      {/* Moving technical grid behind hero */}

      {!reduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(108,99,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(108,99,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            x: gridX,
            y: gridY,
          }}
        />
      )}


      <div className="max-w-7xl mx-auto px-6 w-full py-16 grid lg:grid-cols-[55%_45%] gap-10 lg:gap-6 items-center">

        {/* ── Text column ─────────────────────────────────── */}

        <motion.div
          variants={reduced ? {} : container}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1 flex flex-col"
        >

          {/* Role label */}

          <motion.div
            variants={reduced ? {} : item}
            className="flex items-center gap-3 mb-7"
          >
            <motion.span
              className="block h-px bg-accent flex-shrink-0"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />

            <span className="text-[11px] font-mono text-accent tracking-[0.2em] uppercase">
              Software Engineer &amp; System Analyst
            </span>
          </motion.div>


          {/* Main heading — word reveal */}

          <motion.h1
            variants={reduced ? {} : item}
            className="font-display font-extrabold leading-[0.95] mb-6"
          >
            {reduced ? (
              <>
                <span className="block text-muted text-4xl sm:text-5xl lg:text-[3.5rem] mb-0.5">
                  Hi, I&apos;m
                </span>

                <span className="block text-foreground text-6xl sm:text-7xl lg:text-[5.5rem]">
                  Sakshi.
                </span>
              </>
            ) : (
              <>
                <WordReveal
                  text="Hi, I'm"
                  className="block text-muted text-4xl sm:text-5xl lg:text-[3.5rem] mb-0.5"
                  delay={0.3}
                />

                <WordReveal
                  text="Sakshi."
                  className="block text-foreground text-6xl sm:text-7xl lg:text-[5.5rem]"
                  delay={0.5}
                />
              </>
            )}
          </motion.h1>


          {/* Supporting text — word reveal */}

          <motion.p
            variants={reduced ? {} : item}
            className="text-muted text-base sm:text-[17px] leading-[1.75] max-w-[460px] mb-9"
          >
            {reduced ? (
              'I build backend systems, design APIs and analyse enterprise workflows — turning complex requirements into reliable, scalable software.'
            ) : (
              <WordReveal
                text="I build backend systems, design APIs and analyse enterprise workflows — turning complex requirements into reliable, scalable software."
                delay={0.7}
              />
            )}
          </motion.p>


          {/* CTA buttons — magnetic hover */}

          <motion.div
            variants={reduced ? {} : item}
            className="flex flex-wrap gap-3 mb-9"
          >
            <MagneticButton
              onClick={() => scrollTo('work')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-soft
                         text-white text-[13px] font-semibold rounded-xl
                         transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
            >
              View My Work

              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </MagneticButton>


            <MagneticLink
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 border border-border
                         hover:border-accent/35 text-muted hover:text-foreground
                         text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              <Download size={15} />

              Resume
            </MagneticLink>
          </motion.div>


          {/* Social links */}

          <motion.div
            variants={reduced ? {} : item}
            className="flex items-center gap-0.5"
          >
            {[
              {
                href: personal.github,
                icon: Github,
                label: 'GitHub',
              },
              {
                href: personal.linkedin,
                icon: Linkedin,
                label: 'LinkedIn',
              },
              {
                href: `mailto:${personal.email}`,
                icon: Mail,
                label: 'Email',
              },
            ].map(
              ({ href, icon: Icon, label }, i, arr) => (
                <motion.span
                  key={label}
                  className="flex items-center"
                  initial={
                    reduced
                      ? {}
                      : {
                          opacity: 0,
                          scale: 0.8,
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 1.2 + i * 0.1,
                    duration: 0.4,
                  }}
                >
                  <a
                    href={href}
                    target={
                      href.startsWith('http')
                        ? '_blank'
                        : undefined
                    }
                    rel={
                      href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    aria-label={label}
                    className="group flex items-center gap-1.5 px-3 py-2 text-subtle hover:text-foreground
                               text-[12px] font-medium rounded-lg hover:bg-surface transition-all duration-200
                               animated-underline"
                  >
                    <Icon
                      size={15}
                      className="group-hover:text-accent transition-colors"
                    />

                    {label}
                  </a>

                  {i < arr.length - 1 && (
                    <span className="w-px h-4 bg-border mx-0.5" />
                  )}
                </motion.span>
              )
            )}
          </motion.div>
        </motion.div>


        {/* ── Visualization column ─────────────────────────── */}

        <motion.div
          className="order-1 lg:order-2 flex items-center justify-center"
          initial={
            reduced
              ? {}
              : {
                  opacity: 0,
                  scale: 0.96,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.25,
            ease: 'easeOut',
          }}
        >
          <div className="w-full max-w-md lg:max-w-none">
            <SystemVisualization />
          </div>
        </motion.div>

      </div>


      {/* Scroll indicator */}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35 pointer-events-none">
        <motion.div
          animate={
            reduced
              ? {}
              : {
                  y: [0, 7, 0],
                }
          }
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-px h-8 bg-muted rounded-full"
        />
      </div>

    </section>
  );
}