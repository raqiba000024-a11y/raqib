import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { ArrowUpRight, Check, Clock, Layers } from 'lucide-react';

export const Services: React.FC = () => {
  const { data, soundEnabled } = usePortfolio();
  const { services } = data;

  const handleSelectService = (title: string) => {
    playSound('click', soundEnabled);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Emit custom event to notify contact form
      window.dispatchEvent(new CustomEvent('select-service', { detail: title }));
    }
  };

  return (
    <section id="services" className="py-28 border-b border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tabular block mb-3">
              Practice Areas
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Disciplined execution across all touchpoints.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Engagements are structured as high-focus intensive sprints or embedded principal advisory. Limited to four tier-one commissions per year.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`p-8 rounded-2xl glass-panel relative flex flex-col justify-between transition-all duration-300 hover:border-white/20 group ${
                service.featured ? 'border-white/15 bg-white/[0.04]' : ''
              }`}
            >
              <div>
                {/* Header with index and timeline */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.07]">
                  <span className="text-xs font-bold text-zinc-500 font-mono-tabular tracking-wider">
                    {String(index + 1).padStart(2, '0')}. DISCIPLINE
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono-tabular">
                    <Clock size={13} style={{ color: 'var(--accent-color)' }} />
                    <span>{service.timeline}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-amber-200/90 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-mono-tabular mb-4">
                  {service.subtitle}
                </p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Deliverables List (unboxed list, no static pill spam) */}
                <div className="space-y-2.5 mb-8">
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono-tabular flex items-center gap-1.5">
                    <Layers size={12} />
                    <span>Key Deliverables</span>
                  </div>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check
                          size={14}
                          className="shrink-0 mt-0.5"
                          style={{ color: 'var(--accent-color)' }}
                        />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-white/[0.07] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono-tabular">Bespoke Scope</span>
                <button
                  onClick={() => handleSelectService(service.title)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer"
                >
                  <span>Select & Inquire</span>
                  <ArrowUpRight size={13} style={{ color: 'var(--accent-color)' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
