'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Capabilities } from '@/components/sections/Capabilities';
import { Projects } from '@/components/sections/Projects';
import { EngineeringMindset } from '@/components/sections/EngineeringMindset';
import { Experience } from '@/components/sections/Experience';
import { TechStack } from '@/components/sections/TechStack';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { AnimationProvider } from '@/components/ui/AnimationProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { PageLoader } from '@/components/ui/PageLoader';
import { SectionConnector } from '@/components/ui/SectionConnector';

export default function Home() {
  return (
    <AnimationProvider>
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden">

        {/* Page loader */}
        <PageLoader />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Living background */}
        <AnimatedBackground />

        {/* Global Background Grid/Noise Effect */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.02] z-50 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <Navbar />

        <main className="relative z-10 flex flex-col">
          {/* 01 — INTRO */}
          <Hero />

          <SectionConnector variant="hero-to-capabilities" />

          {/* 02 — WHAT I BUILD */}
          <Capabilities />

          <SectionConnector variant="capabilities-to-projects" />

          {/* 03 — SELECTED WORK */}
          <Projects />

          <SectionConnector variant="default" />

          {/* 04 — HOW I WORK */}
          <EngineeringMindset />

          <SectionConnector variant="process-to-experience" />

          {/* 05 — EXPERIENCE */}
          <Experience />

          <SectionConnector variant="default" />

          {/* 06 — TECH STACK */}
          <TechStack />

          <SectionConnector variant="default" />

          {/* 07 — EDUCATION & CERTIFICATIONS */}
          <Education />

          <SectionConnector variant="education-to-contact" />

          {/* 08 — CONTACT */}
          <Contact />
        </main>

        <Footer />
      </div>
    </AnimationProvider>
  );
}
