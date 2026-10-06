import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { Terminal, Cpu, Sparkles, Layers } from 'lucide-react';

export const Skills: React.FC = () => {
  const { data, soundEnabled } = usePortfolio();
  const { skillCategories } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedCategory);

  const coreTools = [
    'TypeScript',
    'React 19',
    'Three.js',
    'WebGPU',
    'GLSL Shaders',
    'Tailwind CSS',
    'Node.js',
    'Figma Tokens',
    'Blender 3D',
    'Logic Pro / Web Audio',
    'Swift / VisionOS',
    'Vite'
  ];

  return (
    <section id="skills" className="py-28 border-b border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono-tabular block mb-3">
              Technical Stack & Repertoire
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
              Calibrated technical mastery.
            </h2>
          </div>

          {/* Interactive filter controls (Functional buttons, clean segmented control) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10">
            <button
              onClick={() => {
                playSound('switch', soundEnabled);
                setSelectedCategory('all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Domains
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playSound('switch', soundEnabled);
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="p-7 rounded-2xl glass-panel border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.07]">
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <Cpu size={16} style={{ color: 'var(--accent-color)' }} />
                    <span>{category.name}</span>
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono-tabular">
                    {category.skills.length} competencies
                  </span>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-200 font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2 font-mono-tabular text-zinc-400">
                          <span className="text-zinc-500">{skill.experience}</span>
                          <span className="text-zinc-300 font-semibold">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Progress bar with smooth settling curve */}
                      <div className="h-1.5 w-full bg-white/[0.07] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: 'var(--accent-color)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.05] text-[11px] text-zinc-500 font-mono-tabular flex items-center justify-between">
                <span>Evaluated against production SLA</span>
                <span className="text-zinc-400 font-medium">Rank Tier 1</span>
              </div>
            </div>
          ))}
        </div>

        {/* Core Architecture Matrix (Zero-pill metadata: clean unboxed text separated by ·) */}
        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 font-mono-tabular">
              <Terminal size={14} style={{ color: 'var(--accent-color)' }} />
              <span>Production Technology Ecosystem</span>
            </div>
            <span className="text-xs text-zinc-500 font-mono-tabular">Updated Q2 2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-300 leading-relaxed font-mono-tabular">
            {coreTools.map((tool, idx) => (
              <React.Fragment key={tool}>
                <span className="hover:text-white transition-colors cursor-default">{tool}</span>
                {idx < coreTools.length - 1 && (
                  <span aria-hidden="true" className="text-zinc-600 select-none">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
