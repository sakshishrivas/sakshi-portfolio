'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { personal } from '@/data/resume';
import { Mail, Github, Linkedin, Send, ArrowRight, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const reduced = useReducedMotion();
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  // Basic form state (not actually submitting in this demo)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const InputMicro = ({ id }: { id: string }) => {
    const isFocused = focusedInput === id;
    const isHovered = hoveredInput === id && !isFocused;
    
    if (reduced) return null;
    
    return (
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isFocused ? 1 : isHovered ? 0.5 : 0, scale: isFocused ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {id === 'name' && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
              <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {id === 'email' && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent">
              <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
          {id === 'message' && (
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent" style={{ marginTop: '-40px' }}>
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <section id="contact" className="py-24 lg:py-36 border-t border-border relative overflow-hidden">
      {/* Background glow */}
      {!reduced && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      )}
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionLabel number="08" title="Contact" className="mb-14" />

        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_480px] gap-16 lg:gap-20 items-start">
          
          {/* Left — Form */}
          <div>
            <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-foreground leading-tight mb-4">
              Let&apos;s Build<br />Something.
            </h2>
            <p className="text-muted text-[13px] leading-relaxed max-w-md mb-10">
              I&apos;m always open to discussing new projects, system architecture challenges, or opportunities to collaborate.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div 
                  className="relative group"
                  onMouseEnter={() => setHoveredInput('name')}
                  onMouseLeave={() => setHoveredInput(null)}
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    className="w-full bg-surface-alt/50 border border-border rounded-xl px-4 py-3.5
                               text-[13px] text-foreground placeholder:text-subtle
                               focus:outline-none focus:border-accent focus:bg-surface transition-all duration-300"
                  />
                  <InputMicro id="name" />
                </div>
                
                <div 
                  className="relative group"
                  onMouseEnter={() => setHoveredInput('email')}
                  onMouseLeave={() => setHoveredInput(null)}
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    className="w-full bg-surface-alt/50 border border-border rounded-xl px-4 py-3.5
                               text-[13px] text-foreground placeholder:text-subtle
                               focus:outline-none focus:border-accent focus:bg-surface transition-all duration-300"
                  />
                  <InputMicro id="email" />
                </div>
              </div>
              
              <div 
                className="relative group"
                onMouseEnter={() => setHoveredInput('message')}
                onMouseLeave={() => setHoveredInput(null)}
              >
                <textarea
                  placeholder="Tell me about your project or requirement..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  onFocus={() => setFocusedInput('message')}
                  onBlur={() => setFocusedInput(null)}
                  required
                  rows={4}
                  className="w-full bg-surface-alt/50 border border-border rounded-xl px-4 py-3.5
                             text-[13px] text-foreground placeholder:text-subtle resize-none
                             focus:outline-none focus:border-accent focus:bg-surface transition-all duration-300"
                />
                <InputMicro id="message" />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSent}
                whileHover={reduced || isSubmitting || isSent ? {} : { scale: 1.02 }}
                whileTap={reduced || isSubmitting || isSent ? {} : { scale: 0.98 }}
                className="relative w-full sm:w-auto overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3.5
                           bg-accent text-white text-[13px] font-semibold rounded-xl
                           transition-all duration-300 hover:bg-accent-soft disabled:opacity-80 disabled:cursor-not-allowed"
                data-cursor="button"
              >
                {isSent ? (
                  <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                    Message Sent <CheckCircle2 size={16} />
                  </motion.span>
                ) : isSubmitting ? (
                  <span className="flex items-center gap-2">
                    Sending... <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Send size={14} /></motion.div>
                  </span>
                ) : (
                  <span className="flex items-center gap-2 group">
                    Send Message 
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </motion.button>
            </form>
          </div>

          {/* Right — Alternative Contacts */}
          <div className="flex flex-col h-full justify-between gap-10">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">
                  Direct Email
                </p>
                <a
                  href={`mailto:${personal.email}`}
                  className="group flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                  data-cursor="button"
                >
                  <div className="w-10 h-10 rounded-full border border-border bg-surface-alt flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
                    <Mail size={16} className="text-muted group-hover:text-accent transition-colors" />
                  </div>
                  <span className="text-[15px] font-medium animated-underline">{personal.email}</span>
                </a>
              </div>

              <div>
                <p className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">
                  Social Profiles
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'LinkedIn', icon: Linkedin, href: personal.linkedin },
                    { label: 'GitHub', icon: Github, href: personal.github },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-foreground hover:text-accent transition-colors w-fit"
                      data-cursor="button"
                    >
                      <div className="w-10 h-10 rounded-full border border-border bg-surface-alt flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
                        <social.icon size={16} className="text-muted group-hover:text-accent transition-colors" />
                      </div>
                      <span className="text-[15px] font-medium animated-underline">{social.label} Profile</span>
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative data grid */}
            {!reduced && (
               <div className="h-32 rounded-xl border border-border/50 bg-surface-alt/30 overflow-hidden relative" aria-hidden="true">
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3 }} />
                  <motion.div
                     className="absolute top-0 left-0 w-full h-[20px] bg-accent/10"
                     animate={{ y: ['0%', '500%', '0%'] }}
                     transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute bottom-3 left-3 text-[9px] font-mono text-subtle">
                     STATUS: ONLINE
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


