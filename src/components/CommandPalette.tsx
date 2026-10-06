import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import {
  Search,
  Sliders,
  Volume2,
  VolumeX,
  FileDown,
  Mail,
  ArrowRight,
  Palette,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    data,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    toggleAdmin,
    soundEnabled,
    toggleSound,
    updateAppearance
  } = usePortfolio();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  const handleSelect = (action: () => void) => {
    playSound('click', soundEnabled);
    setIsCommandPaletteOpen(false);
    action();
  };

  const scrollTo = (id: string) => {
    handleSelect(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const commands = [
    {
      label: 'Jump to Selected Works',
      category: 'Navigation',
      action: () => scrollTo('projects')
    },
    {
      label: 'Jump to About & Direction',
      category: 'Navigation',
      action: () => scrollTo('about')
    },
    {
      label: 'Jump to Services & Engagement',
      category: 'Navigation',
      action: () => scrollTo('services')
    },
    {
      label: 'Jump to Technical Stack & Skills',
      category: 'Navigation',
      action: () => scrollTo('skills')
    },
    {
      label: 'Jump to Professional Trajectory',
      category: 'Navigation',
      action: () => scrollTo('experience')
    },
    {
      label: 'Jump to Executive Endorsements',
      category: 'Navigation',
      action: () => scrollTo('testimonials')
    },
    {
      label: 'Jump to Contact & Briefing Form',
      category: 'Navigation',
      action: () => scrollTo('contact')
    },
    {
      label: 'Open Studio Admin CMS',
      category: 'Management',
      action: () => handleSelect(() => toggleAdmin()),
      icon: Sliders
    },
    {
      label: soundEnabled ? 'Mute Tactile Acoustics' : 'Enable Tactile Acoustics',
      category: 'System',
      action: () => toggleSound(),
      icon: soundEnabled ? VolumeX : Volume2
    },
    {
      label: 'Switch Accent: Champagne Gold',
      category: 'Aesthetic',
      action: () => handleSelect(() => updateAppearance({ accentColor: '#d4af37', accentName: 'gold' }))
    },
    {
      label: 'Switch Accent: Monaco Emerald',
      category: 'Aesthetic',
      action: () => handleSelect(() => updateAppearance({ accentColor: '#10b981', accentName: 'emerald' }))
    },
    {
      label: 'Switch Accent: Electric Cobalt',
      category: 'Aesthetic',
      action: () => handleSelect(() => updateAppearance({ accentColor: '#3b82f6', accentName: 'cobalt' }))
    },
    {
      label: 'Switch Accent: Solar Amber',
      category: 'Aesthetic',
      action: () => handleSelect(() => updateAppearance({ accentColor: '#f59e0b', accentName: 'amber' }))
    },
    {
      label: 'Copy Direct Studio Email',
      category: 'Action',
      action: () => {
        navigator.clipboard.writeText(data.profile.email);
        alert(`Studio address copied: ${data.profile.email}`);
      },
      icon: Mail
    }
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Spotlight Palette"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCommandPaletteOpen(false);
      }}
    >
      <div className="w-full max-w-xl rounded-2xl bg-[#0b0b10] border border-white/15 shadow-2xl overflow-hidden flex flex-col">
        {/* Search input bar */}
        <div className="px-4 py-3.5 border-b border-white/10 flex items-center gap-3 bg-[#08080c]">
          <Search size={16} className="text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, sections, theme accents..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono-tabular"
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] text-zinc-500 bg-white/5 border border-white/10 font-mono-tabular">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500 font-mono-tabular">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={cmd.action}
                className="w-full px-3 py-2.5 rounded-lg flex items-center justify-between text-left hover:bg-white/10 transition-colors text-xs text-zinc-300 hover:text-white cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                    {cmd.category}
                  </span>
                  <span>{cmd.label}</span>
                </div>
                <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
              </button>
            ))
          )}
        </div>

        {/* Footer helper */}
        <div className="px-4 py-2.5 bg-[#07070a] border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500 font-mono-tabular">
          <span>Use ⌘K or Ctrl+K to toggle anytime</span>
          <span>Alexander Vance Studio</span>
        </div>
      </div>
    </div>
  );
};
