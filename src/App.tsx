/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AdminPanel } from './components/AdminPanel';
import { CommandPalette } from './components/CommandPalette';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#070709] text-[#ededef] selection:bg-amber-400/20 selection:text-white flex flex-col relative">
        {/* Top Navbar */}
        <Navbar />

        {/* Core Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <Projects />
          <About />
          <Services />
          <Skills />
          <Experience />
          <Testimonials />
          <Contact />
        </main>

        {/* Compliant Editorial Footer */}
        <Footer />

        {/* Global Overlays & Modals */}
        <ProjectModal />
        <AdminPanel />
        <CommandPalette />
      </div>
    </PortfolioProvider>
  );
}
