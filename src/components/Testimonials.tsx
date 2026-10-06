import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { data } = usePortfolio();
  const { testimonials } = data;

  return (
    <section id="testimonials" className="py-28 border-b border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tabular block mb-3">
              Executive Endorsements
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Trusted by leaders & visionaries.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Direct feedback from venture partners, engineering executives, and historic European luxury directors.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="p-8 rounded-2xl glass-panel border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                <Quote size={24} className="mb-6 opacity-40" style={{ color: 'var(--accent-color)' }} />
                <p className="text-sm text-zinc-200 leading-relaxed italic mb-8">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              {/* Attribution Author Block */}
              <div className="pt-6 border-t border-white/[0.07] flex items-center gap-4">
                <img
                  src={test.avatarUrl}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-white/20 grayscale"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div>
                  <div className="text-white text-sm font-semibold tracking-tight">{test.name}</div>
                  <div className="text-xs text-zinc-400 font-mono-tabular">{test.role}</div>
                  <div className="text-xs text-zinc-500 font-mono-tabular">{test.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
