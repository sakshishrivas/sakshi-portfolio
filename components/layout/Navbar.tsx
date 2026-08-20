'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV = [
  { num: '01', label: 'Home',       href: '#intro'      },
  { num: '02', label: 'Build',      href: '#capabilities'},
  { num: '03', label: 'Work',       href: '#work'       },
  { num: '04', label: 'Process',    href: '#process'    },
  { num: '05', label: 'Experience', href: '#experience' },
  { num: '06', label: 'Stack',      href: '#stack'      },
  { num: '07', label: 'Education',  href: '#education'  },
  { num: '08', label: 'Contact',    href: '#contact'    },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [open, setOpen]                 = useState(false);
  const [active, setActive]             = useState('intro');

  // Compact on scroll
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV.map(n => n.href.slice(1));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'py-3 bg-background/88 backdrop-blur-xl border-b border-border'
            : 'py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#intro"
            onClick={e => { e.preventDefault(); scrollTo('intro'); }}
            className="flex items-center gap-2.5 group focus-visible:outline-none"
            aria-label="Sakshi Shrivastava — home"
          >
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center
                            group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-200">
              <span className="font-display font-bold text-accent text-sm leading-none">S</span>
            </div>
            <span className="hidden sm:block text-[13px] font-medium text-muted group-hover:text-foreground transition-colors">
              Sakshi Shrivastava
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV.map(({ num, label, href }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={e => { e.preventDefault(); scrollTo(id); }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3 py-1.5 rounded-md text-[11px] font-medium tracking-wide transition-colors duration-200
                    ${isActive ? 'text-foreground' : 'text-subtle hover:text-muted'}`}
                >
                  <span className="font-mono text-[9px] mr-1.5 opacity-50">{num}</span>
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-px rounded-full bg-accent" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-muted hover:text-foreground transition-colors rounded-md"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-background/96 backdrop-blur-xl flex flex-col pt-24 px-6 pb-10">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {NAV.map(({ num, label, href }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={e => { e.preventDefault(); scrollTo(id); setOpen(false); }}
                  className={`flex items-center gap-4 py-4 border-b border-border text-base font-medium transition-colors
                    ${isActive ? 'text-foreground' : 'text-muted hover:text-foreground'}`}
                >
                  <span className="font-mono text-[10px] text-subtle w-5">{num}</span>
                  {label}
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
