import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { Play, FileText, ExternalLink, Image as ImageIcon, ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '../types/portfolio';

export const Projects: React.FC = () => {
  const { projects, openProjectModal, soundEnabled } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const getMediaBadge = (type: Project['primaryMediaType']) => {
    switch (type) {
      case 'video':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono-tabular text-zinc-200">
            <Play size={11} className="fill-current text-amber-400" />
            <span>Motion / Reel</span>
          </div>
        );
      case 'pdf':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono-tabular text-zinc-200">
            <FileText size={11} style={{ color: 'var(--accent-color)' }} />
            <span>PDF Dossier</span>
          </div>
        );
      case 'url':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono-tabular text-zinc-200">
            <ExternalLink size={11} style={{ color: 'var(--accent-color)' }} />
            <span>Interactive URL</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono-tabular text-zinc-200">
            <ImageIcon size={11} className="text-zinc-300" />
            <span>Visual System</span>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-28 border-b border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tabular block mb-3">
              Selected Works & Case Studies
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Proven artifacts of enduring impact.
            </h2>
          </div>

          {/* Interactive filter controls (segmented control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playSound('switch', soundEnabled);
                  setActiveFilter(cat);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Box Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {filteredProjects.map((project, index) => {
            // Bento arrangement: Alternate wide cards for rhythmic visual pacing
            const isWide = index % 3 === 0;
            const colSpan = isWide ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4';

            return (
              <div
                key={project.id}
                onClick={() => openProjectModal(project)}
                className={`${colSpan} group cursor-pointer relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-white/25 transition-all duration-500 flex flex-col justify-between`}
              >
                {/* Media Container */}
                <div className={`relative w-full overflow-hidden bg-zinc-950 ${isWide ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Gradient Scrim for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-[#09090d]/30 to-transparent pointer-events-none" />

                  {/* Top Media Affordance Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    {getMediaBadge(project.primaryMediaType)}
                  </div>

                  {/* Featured Indicator if flagged */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-amber-500/30 text-[11px] font-mono-tabular text-amber-300">
                      <Sparkles size={11} />
                      <span>Featured Commission</span>
                    </div>
                  )}

                  {/* Corner Expand Action button */}
                  <div className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Content Metadata Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular mb-2.5">
                      <span>{project.client}</span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span>{project.category}</span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-amber-100 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2 mb-4">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Bottom tags (unboxed text) */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono-tabular">
                    <div className="truncate max-w-[80%]">
                      {project.tags.slice(0, 3).join('  ·  ')}
                    </div>
                    <span className="text-zinc-400 group-hover:text-white transition-colors">
                      View Study →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
