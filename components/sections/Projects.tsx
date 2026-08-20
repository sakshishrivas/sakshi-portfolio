import { SectionLabel } from '@/components/ui/SectionLabel';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { projects } from '@/data/resume';
import { Github, ArrowRight } from 'lucide-react';
import { ProjectFlowChapramart } from '@/components/ui/ProjectFlowChapramart';
import { ProjectFlowHotel } from '@/components/ui/ProjectFlowHotel';
import { ProjectFlowCompliance } from '@/components/ui/ProjectFlowCompliance';

export function Projects() {
  const featured   = projects.find(p => p.featured)!;
  const secondary  = projects.filter(p => !p.featured);

  return (
    <section id="work" className="py-24 lg:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <SectionLabel number="03" title="Selected Work" className="mb-14" />

        {/* ── ChapraMart — Featured case study ─────────────── */}
        <ScrollReveal direction="up">
          <div className="relative rounded-2xl bg-surface border border-border overflow-hidden mb-10" data-cursor="project">
            {/* Accent gradient top bar */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/45 to-transparent" />

            <div className="p-8 lg:p-12">

              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md
                                 bg-accent/10 border border-accent/20
                                 text-accent text-[10px] font-mono tracking-widest uppercase">
                  Featured Project
                </span>
                <span className="text-[11px] font-mono text-subtle">{featured.type}</span>
              </div>

              {/* Title + stack */}
              <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-foreground mb-4">
                {featured.name}
              </h2>
              <div className="flex flex-wrap gap-2 mb-10">
                {featured.technologies.map(t => (
                  <span key={t} className="text-[11px] font-mono text-subtle px-2.5 py-1
                                           rounded-full border border-border bg-surface-alt">
                    {t}
                  </span>
                ))}
              </div>

              {/* Case study — two columns */}
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Left: problem + architecture + FLOW */}
                <div>
                  <h3 className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">
                    The Problem
                  </h3>
                  <p className="text-muted text-sm leading-[1.8] mb-8">
                    {featured.problem}
                  </p>
                  <h3 className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">
                    Architecture Overview
                  </h3>
                  <p className="text-muted text-sm leading-[1.8]">
                    {featured.architecture}
                  </p>
                  
                  {/* Animated Flow component */}
                  <ProjectFlowChapramart />
                </div>

                {/* Right: key engineering decisions */}
                <div>
                  <h3 className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-5">
                    Key Engineering Decisions
                  </h3>
                  <ul className="space-y-3.5">
                    {featured.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                        <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded bg-accent/10 border border-accent/20
                                         flex items-center justify-center text-accent text-[9px] font-mono font-bold">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              {featured.github && (
                <div className="mt-10 pt-7 border-t border-border">
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[13px] text-muted hover:text-foreground transition-colors"
                  >
                    <Github size={15} />
                    View on GitHub
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Secondary projects ────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-5">
          {secondary.map((proj, i) => (
            <ScrollReveal key={proj.id} delay={i * 0.1} direction={i === 0 ? 'left' : 'right'}>
              <div className="group h-full relative rounded-xl bg-surface border border-border
                              hover:border-accent/22 hover:-translate-y-1
                              hover:shadow-xl hover:shadow-accent/5
                              transition-all duration-300 overflow-hidden flex flex-col" data-cursor="project">

                {/* Top colored stripe — subtle */}
                <div className={`h-px w-full ${i === 0
                  ? 'bg-gradient-to-r from-accent/30 via-accent/10 to-transparent'
                  : 'bg-gradient-to-r from-transparent via-accent/10 to-accent/30'}`}
                />

                <div className="p-7 flex flex-col flex-1">
                  <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">
                    {proj.type}
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3
                                 group-hover:text-accent transition-colors duration-200">
                    {proj.name}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-5 flex-1">
                    {proj.problem}
                  </p>
                  
                  {/* Flow Visualization */}
                  {proj.id === 'hotel-saas' && <ProjectFlowHotel />}
                  {proj.id === 'compliance' && <ProjectFlowCompliance />}

                  {/* Feature bullets */}
                  <ul className="space-y-1.5 mb-6 mt-6">
                    {proj.features.slice(0, 4).map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[12px] text-subtle leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-accent/40 mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                    {proj.technologies.map(t => (
                      <span key={t} className="text-[10px] font-mono text-subtle px-2 py-0.5 rounded border border-border bg-surface-alt">
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.github && (
                    <div className="mt-2">
                        <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] text-subtle hover:text-accent transition-colors"
                        >
                        <Github size={13} />
                        GitHub
                        </a>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
