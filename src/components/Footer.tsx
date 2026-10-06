import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, soundEnabled } = usePortfolio();
  const { profile, socials } = data;

  const scrollToTop = () => {
    playSound('click', soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#060608] py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-zinc-500 font-mono-tabular">
          <span className="font-display font-bold text-white tracking-tight uppercase text-sm">
            {profile.logoText || 'VANCE'}
          </span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Crafted for high-calibre digital flagships.</span>
        </div>

        {/* Links & Back to Top */}
        <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono-tabular">
          <div className="flex items-center gap-4">
            {socials.map((soc, i) => (
              <a
                key={i}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {soc.platform}
              </a>
            ))}
          </div>

          <div className="h-3 w-px bg-white/15" />

          <button
            onClick={scrollToTop}
            title="Return to top of page"
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
