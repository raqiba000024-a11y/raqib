import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import { X, ExternalLink, FileText, Video, Image as ImageIcon, ArrowUpRight, Play, Eye } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { activeProjectModal, closeProjectModal, soundEnabled } = usePortfolio();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  if (!activeProjectModal) return null;

  const project = activeProjectModal;
  const currentMedia = project.media[activeMediaIndex] || {
    type: project.primaryMediaType,
    url: project.coverImage
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProjectModal();
      }}
    >
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#0b0b10] border border-white/15 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08080c] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tabular text-zinc-400">
              {project.category}
            </span>
            <span aria-hidden="true" className="text-zinc-600">/</span>
            <span className="text-xs text-zinc-300 font-medium">{project.client}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-400 font-mono-tabular">{project.year}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('open', soundEnabled)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors cursor-pointer"
              >
                <span>Launch Live</span>
                <ExternalLink size={13} />
              </a>
            )}

            <button
              onClick={closeProjectModal}
              title="Close (Esc)"
              aria-label="Close Case Study"
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/15 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          {/* Main Media Showcase Container */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-black relative">
            {currentMedia.type === 'video' ? (
              <div className="aspect-video w-full bg-black flex items-center justify-center relative">
                {currentMedia.url.includes('youtube.com') || currentMedia.url.includes('youtu.be') ? (
                  <iframe
                    src={currentMedia.url.replace('watch?v=', 'embed/')}
                    title={project.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : currentMedia.url.includes('vimeo.com') ? (
                  <iframe
                    src={currentMedia.url.replace('vimeo.com/', 'player.vimeo.com/video/')}
                    title={project.title}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    controls
                    playsInline
                    className="w-full h-full object-contain max-h-[65vh]"
                    poster={currentMedia.thumbnailUrl || project.coverImage}
                  >
                    <source src={currentMedia.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ) : currentMedia.type === 'pdf' ? (
              <div className="aspect-[16/10] w-full bg-[#121218] p-6 flex flex-col items-center justify-center text-center">
                <FileText size={48} className="mb-4" style={{ color: 'var(--accent-color)' }} />
                <h4 className="text-white text-lg font-bold mb-2">Archival PDF Dossier</h4>
                <p className="text-xs text-zinc-400 max-w-md mb-6">
                  {currentMedia.caption || 'Comprehensive architectural specification, research findings, and technical design schematics.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={currentMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound('open', soundEnabled)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-black transition-all hover:opacity-90 shadow-md"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                  >
                    <Eye size={14} />
                    <span>Open PDF Document in New Tab</span>
                  </a>
                  <a
                    href={currentMedia.url}
                    download
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span>Download Specimen</span>
                  </a>
                </div>
              </div>
            ) : currentMedia.type === 'url' ? (
              <div className="aspect-[16/9] w-full bg-[#121218] p-8 flex flex-col items-center justify-center text-center">
                <ExternalLink size={48} className="mb-4" style={{ color: 'var(--accent-color)' }} />
                <h4 className="text-white text-lg font-bold mb-2">Interactive Live Deployment</h4>
                <p className="text-xs text-zinc-400 max-w-md mb-6">
                  {currentMedia.caption || 'This engagement features an active cloud sandbox deployment.'}
                </p>
                <a
                  href={currentMedia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('open', soundEnabled)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  <span>Launch Live Deployment</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            ) : (
              <div className="aspect-[16/10] w-full bg-black relative flex items-center justify-center overflow-hidden">
                <img
                  src={currentMedia.url}
                  alt={currentMedia.caption || project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center max-h-[65vh]"
                  onError={(e) => {
                    e.currentTarget.src = project.coverImage;
                  }}
                />
              </div>
            )}

            {/* Media Caption */}
            {currentMedia.caption && (
              <div className="px-4 py-2.5 bg-black/90 border-t border-white/10 text-xs text-zinc-400 font-mono-tabular">
                {currentMedia.caption}
              </div>
            )}
          </div>

          {/* Media Switcher Thumbnails (if multiple media assets exist) */}
          {project.media.length > 1 && (
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono-tabular">
                Media Reel ({project.media.length} artifacts)
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {project.media.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playSound('click', soundEnabled);
                      setActiveMediaIndex(idx);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeMediaIndex === idx
                        ? 'border-white/40 bg-white/15 text-white'
                        : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.type === 'video' && <Video size={13} style={{ color: 'var(--accent-color)' }} />}
                    {item.type === 'pdf' && <FileText size={13} style={{ color: 'var(--accent-color)' }} />}
                    {item.type === 'url' && <ExternalLink size={13} style={{ color: 'var(--accent-color)' }} />}
                    {item.type === 'image' && <ImageIcon size={13} style={{ color: 'var(--accent-color)' }} />}
                    <span>
                      {item.type.toUpperCase()} 0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Case Study Editorial Content */}
          <div className="space-y-6">
            <div>
              <h2 id="modal-title" className="font-display text-2xl sm:text-4xl font-bold text-white mb-3">
                {project.title}
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* Impact Metrics Row */}
            {project.impactMetrics && project.impactMetrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                {project.impactMetrics.map((met, i) => (
                  <div key={i}>
                    <div className="font-display text-xl sm:text-2xl font-bold text-white font-mono-tabular">
                      {met.value}
                    </div>
                    <div className="text-xs text-zinc-400">{met.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Detailed narrative */}
            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              <p>{project.description}</p>

              {project.challenge && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tabular">
                    The Challenge
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono-tabular">
                    The Architecture
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">{project.solution}</p>
                </div>
              )}
            </div>

            {/* Tags (Zero-pill discipline: unboxed text with · separators) */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-xs text-zinc-500 font-mono-tabular mb-2">Architectural Tags</div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-mono-tabular">
                {project.tags.map((tag, tIdx) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {tIdx < project.tags.length - 1 && (
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#08080c] border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono-tabular">
          <span>Commission Vault Record</span>
          <button
            onClick={closeProjectModal}
            className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            Press Esc to close
          </button>
        </div>
      </div>
    </div>
  );
};
