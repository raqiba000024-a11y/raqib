import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { Volume2, VolumeX, Command, Sliders, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, soundEnabled, toggleSound, toggleAdmin, setIsCommandPaletteOpen } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    playSound('click', soundEnabled);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#070709]/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-3 text-white transition-opacity hover:opacity-80"
          >
            <span className="font-display text-xl font-bold tracking-tight uppercase">
              {data.profile.logoText || 'VANCE'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
          </a>

          {/* Zone 2: Clean 4-6 nav links (Single-line, no pills) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <button
              onClick={() => handleNavClick('#projects')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Selected Works
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About & Direction
            </button>
            <button
              onClick={() => handleNavClick('#services')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('#skills')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Capabilities
            </button>
            <button
              onClick={() => handleNavClick('#experience')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Trajectory
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions & micro-controls */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Disable tactile sound effects' : 'Enable tactile sound effects'}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                playSound('switch', soundEnabled);
                setIsCommandPaletteOpen(true);
              }}
              title="Open Command Palette (Cmd+K)"
              className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 text-xs font-mono-tabular text-zinc-400 hover:text-white hover:border-white/25 transition-all cursor-pointer"
            >
              <Command size={13} />
              <span>⌘K</span>
            </button>

            {/* Admin Panel Trigger */}
            <button
              onClick={toggleAdmin}
              title="Open Admin Studio"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-zinc-300 hover:text-white hover:border-white/25 hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <Sliders size={13} style={{ color: 'var(--accent-color)' }} />
              <span className="hidden sm:inline">Admin Studio</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('#contact')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap shadow-sm"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <span>Initiate Project</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => {
                playSound('click', soundEnabled);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-zinc-300 hover:text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 bg-[#070709]/95 backdrop-blur-2xl md:hidden border-b border-white/10 p-6 flex flex-col justify-between animate-fadeIn">
          <div className="flex flex-col gap-5 pt-4">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tabular">Navigation</span>
            <button
              onClick={() => handleNavClick('#projects')}
              className="text-left text-xl font-medium text-zinc-200 hover:text-white transition-colors"
            >
              Selected Works
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="text-left text-xl font-medium text-zinc-200 hover:text-white transition-colors"
            >
              About & Manifesto
            </button>
            <button
              onClick={() => handleNavClick('#services')}
              className="text-left text-xl font-medium text-zinc-200 hover:text-white transition-colors"
            >
              Services & Engagement
            </button>
            <button
              onClick={() => handleNavClick('#skills')}
              className="text-left text-xl font-medium text-zinc-200 hover:text-white transition-colors"
            >
              Capabilities & Stack
            </button>
            <button
              onClick={() => handleNavClick('#experience')}
              className="text-left text-xl font-medium text-zinc-200 hover:text-white transition-colors"
            >
              Trajectory
            </button>
            <button
              onClick={() => handleNavClick('#contact')}
              className="text-left text-xl font-medium text-zinc-200 hover:text-white transition-colors"
            >
              Contact & Inquiries
            </button>
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{soundEnabled ? 'Acoustics On' : 'Acoustics Off'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleAdmin();
              }}
              className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              <Sliders size={15} style={{ color: 'var(--accent-color)' }} />
              <span>Admin Studio</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
