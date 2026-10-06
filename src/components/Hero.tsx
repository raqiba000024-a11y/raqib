import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { ArrowDown, ArrowUpRight, FileDown, Sparkles, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data, soundEnabled } = usePortfolio();
  const { profile, metrics } = data;

  const scrollToSection = (id: string) => {
    playSound('click', soundEnabled);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center pt-8 pb-16 overflow-hidden border-b border-white/[0.07]">
      {/* Cinematic subtle background grid & ambient illumination */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-1000 opacity-20"
        style={{ backgroundColor: 'var(--accent-color)' }}
      />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full blur-[120px] bg-blue-500/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col justify-between">
        {/* Availability status line (No pill capsule, clean unboxed metadata) */}
        <div className="flex items-center gap-3 text-xs text-zinc-400 mb-8 font-mono-tabular">
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: 'var(--accent-color)' }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: 'var(--accent-color)' }}
            />
          </span>
          <span className="text-zinc-300 font-medium">{profile.availability}</span>
          <span aria-hidden="true" className="text-zinc-600">/</span>
          <span>{profile.location}</span>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bold Typographic Impact */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 text-balance">
              Architecting <br className="hidden sm:inline" />
              <span
                className="italic font-luxury font-medium"
                style={{ color: 'var(--accent-color)' }}
              >
                cinematic
              </span>{' '}
              digital flagships & spatial systems.
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl mb-10 text-pretty">
              {profile.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-black transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer shadow-lg whitespace-nowrap"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <span>Explore Selected Works</span>
                <ArrowDown size={16} />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-medium text-white border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>Initiate Advisory</span>
                <ArrowUpRight size={16} />
              </button>

              {profile.resumePdfUrl && (
                <a
                  href={profile.resumePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('open', soundEnabled)}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <FileDown size={15} />
                  <span>Dossier (PDF)</span>
                </a>
              )}
            </div>

            {/* Quote / Manifesto snippet */}
            <div className="border-l-2 pl-4 py-1 text-xs sm:text-sm text-zinc-400 italic max-w-lg border-white/20">
              &ldquo;{profile.manifesto}&rdquo;
            </div>
          </div>

          {/* Right Column: Spatial Visual Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl">
              <div className="relative rounded-xl overflow-hidden bg-[#0c0c10] border border-white/10 group">
                {/* Visual Media Framing */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    onError={(e) => {
                      // Fallback container when URL fails
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent pointer-events-none" />

                  {/* Top-Right Badge (Affordance) */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono-tabular text-zinc-300">
                    <Compass size={13} style={{ color: 'var(--accent-color)' }} />
                    <span>Creative Technologist</span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-black/50 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-base font-semibold tracking-tight">{profile.name}</div>
                        <div className="text-xs text-zinc-400 font-mono-tabular">{profile.role}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-zinc-500 font-mono-tabular">Practice Era</span>
                        <div className="text-xs font-semibold text-white font-mono-tabular">2015 — 2026</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-bar with Live Coordinates */}
                <div className="px-5 py-3 bg-[#0a0a0e] flex items-center justify-between text-xs font-mono-tabular text-zinc-500 border-t border-white/5">
                  <span className="flex items-center gap-2">
                    <Sparkles size={12} style={{ color: 'var(--accent-color)' }} />
                    Spatial Systems & Creative Code
                  </span>
                  <span>47.3769° N, 8.5417° E</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quantitative Metrics Strip (Adjacency & Tabular Rigor) */}
        <div className="mt-20 pt-10 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono-tabular mb-1 tracking-tight">
                {metric.value}
              </span>
              <span className="text-sm font-medium text-zinc-300 mb-0.5">{metric.label}</span>
              <span className="text-xs text-zinc-500">{metric.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
