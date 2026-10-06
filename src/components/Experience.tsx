import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const { experience } = data;

  return (
    <section id="experience" className="py-28 border-b border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tabular block mb-3">
              Professional Trajectory
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Decade of leadership & execution.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Directing engineering, creative direction, and design engineering across Europe and North America.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8">
          {experience.map((item, idx) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl glass-panel border border-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Column 1: Timeframe & Company */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
                    <span className="text-white font-semibold">{item.period}</span>
                    <span aria-hidden="true" className="text-zinc-600">/</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} style={{ color: 'var(--accent-color)' }} />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {item.role}
                  </h3>

                  <div className="text-sm font-medium text-zinc-300 flex items-center gap-1.5 font-mono-tabular">
                    <Briefcase size={14} className="text-zinc-500" />
                    <span>{item.company}</span>
                  </div>
                </div>

                {/* Column 2: Overview Description */}
                <div className="lg:col-span-4 text-sm text-zinc-300 leading-relaxed">
                  <p>{item.description}</p>
                </div>

                {/* Column 3: Highlights & Measurable Proof */}
                <div className="lg:col-span-4 space-y-2.5">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono-tabular block">
                    Key Outcomes & Impact
                  </span>
                  <ul className="space-y-2">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-normal">
                        <CheckCircle2
                          size={13}
                          className="shrink-0 mt-0.5"
                          style={{ color: 'var(--accent-color)' }}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
