import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, Globe, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { playSound } from '../utils/sound';

export const About: React.FC = () => {
  const { data, soundEnabled } = usePortfolio();
  const { profile } = data;

  // Real-time clock for local time
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: profile.timezone || 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);
        setLocalTime(formatted);
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [profile.timezone]);

  const honors = [
    { award: 'Awwwards Site of the Year Nominee', project: 'Kronos Haute Horlogerie', year: '2025' },
    { award: 'Red Dot: Best of the Best (Spatial UI)', project: 'Aethelgard Mixed Reality', year: '2026' },
    { award: 'Cannes Lions Bronze (Digital Craft)', project: 'Hyperion Autonomous Telemetry', year: '2025' },
    { award: 'FWA of the Month', project: 'Monolith Architectural Archive', year: '2024' }
  ];

  return (
    <section id="about" className="py-28 border-b border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tabular block mb-3">
              Direction & Philosophy
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Engineering with poetic restraint.
            </h2>
          </div>

          {/* Time & Studio Location telemetry */}
          <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono-tabular border border-white/10 px-4 py-2.5 rounded-lg bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Globe size={14} style={{ color: 'var(--accent-color)' }} />
              <span>{profile.location}</span>
            </div>
            <div className="h-3 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-zinc-400" />
              <span>{localTime || '12:00:00 PM'}</span>
            </div>
          </div>
        </div>

        {/* Narrative & Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left Bio Prose */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
            {profile.bioParagraphs.map((para, i) => (
              <p key={i} className="text-pretty">
                {para}
              </p>
            ))}

            <div className="pt-4 flex items-center gap-4">
              <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono-tabular">Signature Directive</div>
              <div className="h-px flex-1 bg-white/10" />
              <div className="font-luxury text-base text-zinc-200 tracking-wider">
                {profile.signatureText || profile.name}
              </div>
            </div>
          </div>

          {/* Right Core Tenets */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl glass-panel space-y-8">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2 font-mono-tabular">
                <ShieldCheck size={16} style={{ color: 'var(--accent-color)' }} />
                <span>Foundational Disciplines</span>
              </h3>
              <div className="space-y-6 text-sm">
                <div>
                  <div className="text-white font-semibold mb-1">01. Architectural Acoustics & Motion Physics</div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Interfaces are spatial environments. We introduce kinetic damping, spring physics, and subtle micro-frequencies that mirror physical materials.
                  </p>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">02. Sub-Millisecond Latency Discipline</div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Zero tolerance for layout jank or sluggish frame pacing. High-frequency GPU shaders and optimized DOM lifecycles ensure absolute fluidity.
                  </p>
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">03. Enduring Typographic Gravitas</div>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    We avoid synthetic decoration in favor of calibrated proportions, Swiss baseline math, and high-contrast editorial hierarchy.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono-tabular">
              <span>Peer-reviewed methodology</span>
              <a
                href="#contact"
                onClick={() => playSound('click', soundEnabled)}
                className="flex items-center gap-1 hover:text-white transition-colors"
                style={{ color: 'var(--accent-color)' }}
              >
                <span>Schedule Briefing</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Selected Honors & Recognition (Attributable proof) */}
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tabular mb-6 flex items-center gap-2">
            <Award size={14} style={{ color: 'var(--accent-color)' }} />
            <span>Curated Honors & Industry Citations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {honors.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-zinc-500 font-mono-tabular mb-2">{item.year}</div>
                  <div className="text-white text-sm font-semibold mb-1">{item.award}</div>
                  <div className="text-xs text-zinc-400">{item.project}</div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-zinc-500 font-mono-tabular">
                  Verified International Jury
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
