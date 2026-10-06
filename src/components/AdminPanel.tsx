import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { playSound } from '../utils/sound';
import {
  X,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Download,
  Upload,
  Palette,
  Briefcase,
  Layers,
  Cpu,
  User,
  Quote,
  Check,
  Video,
  FileText,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import { Project, MediaType, Service, ExperienceItem, Testimonial } from '../types/portfolio';

const ACCENT_PRESETS = [
  { name: 'gold', label: 'Champagne Gold', hex: '#d4af37' },
  { name: 'emerald', label: 'Monaco Emerald', hex: '#10b981' },
  { name: 'cobalt', label: 'Electric Cobalt', hex: '#3b82f6' },
  { name: 'amber', label: 'Solar Amber', hex: '#f59e0b' },
  { name: 'violet', label: 'Imperial Violet', hex: '#8b5cf6' },
  { name: 'crimson', label: 'Haute Crimson', hex: '#f43f5e' }
];

export const AdminPanel: React.FC = () => {
  const {
    data,
    updateProfile,
    updateAppearance,
    projects,
    addProject,
    updateProject,
    deleteProject,
    services,
    addService,
    updateService,
    deleteService,
    skillCategories,
    updateSkillCategories,
    experience,
    addExperience,
    updateExperience,
    deleteExperience,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    isAdminOpen,
    setIsAdminOpen,
    soundEnabled
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'profile' | 'appearance' | 'projects' | 'services' | 'skills' | 'experience' | 'testimonials' | 'backup'
  >('profile');

  // Editing state for projects
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProjectForm, setNewProjectForm] = useState<Partial<Project> | null>(null);

  // Status message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!isAdminOpen) return null;

  const handleExport = () => {
    playSound('click', soundEnabled);
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Configuration exported as JSON');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importConfigJson(content);
      if (res.success) {
        showToast('Configuration restored successfully');
      } else {
        alert('Import Error: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio Admin Panel"
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAdminOpen(false);
      }}
    >
      <div className="w-full max-w-4xl h-full bg-[#0a0a0e] border-l border-white/10 shadow-2xl flex flex-col">
        {/* Admin Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#07070a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: 'var(--accent-color)' }}
            />
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              Studio Content Management Engine
            </h2>
            <span className="text-[11px] text-zinc-500 font-mono-tabular px-2 py-0.5 rounded bg-white/5 border border-white/10">
              Live Persistence (localStorage)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {toastMessage && (
              <span className="text-xs text-emerald-400 font-mono-tabular mr-2 flex items-center gap-1">
                <Check size={13} /> {toastMessage}
              </span>
            )}
            <button
              onClick={() => {
                playSound('close', soundEnabled);
                setIsAdminOpen(false);
              }}
              title="Close Admin Panel"
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 py-2.5 border-b border-white/10 bg-[#09090c] overflow-x-auto shrink-0">
          {[
            { id: 'profile', label: 'Brand & Bio', icon: User },
            { id: 'appearance', label: 'Theme & Accent', icon: Palette },
            { id: 'projects', label: 'Projects (Multi-Media)', icon: Briefcase },
            { id: 'services', label: 'Services', icon: Layers },
            { id: 'skills', label: 'Skills & Stack', icon: Cpu },
            { id: 'experience', label: 'Trajectory', icon: Briefcase },
            { id: 'testimonials', label: 'Testimonials', icon: Quote },
            { id: 'backup', label: 'Export / Reset', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSound('switch', soundEnabled);
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={13} style={{ color: isActive ? 'var(--accent-color)' : undefined }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* TAB 1: Profile & Identity */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Identity & Editorial Profile</h3>
                <p className="text-xs text-zinc-400">
                  Update primary credentials, narrative copy, logo display, and contact info.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Logo Wordmark
                  </label>
                  <input
                    type="text"
                    value={data.profile.logoText}
                    onChange={(e) => updateProfile({ logoText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Executive Title & Role
                  </label>
                  <input
                    type="text"
                    value={data.profile.role}
                    onChange={(e) => updateProfile({ role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Hero Hook Tagline
                  </label>
                  <textarea
                    rows={2}
                    value={data.profile.tagline}
                    onChange={(e) => updateProfile({ tagline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Profile Photo / Avatar URL
                  </label>
                  <input
                    type="text"
                    value={data.profile.avatarUrl}
                    onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Electronic Mail
                  </label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Telephony Line
                  </label>
                  <input
                    type="text"
                    value={data.profile.phone}
                    onChange={(e) => updateProfile({ phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Studio Location
                  </label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Availability Broadcast
                  </label>
                  <input
                    type="text"
                    value={data.profile.availability}
                    onChange={(e) => updateProfile({ availability: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Core Manifesto Statement
                  </label>
                  <input
                    type="text"
                    value={data.profile.manifesto}
                    onChange={(e) => updateProfile({ manifesto: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono-tabular text-zinc-400 mb-1.5">
                    Resume / Dossier PDF URL
                  </label>
                  <input
                    type="text"
                    value={data.profile.resumePdfUrl}
                    onChange={(e) => updateProfile({ resumePdfUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Appearance & Theme */}
          {activeTab === 'appearance' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Aesthetic Calibration</h3>
                <p className="text-xs text-zinc-400">
                  Refine the focal accent color, auditory feedback, and typographic system.
                </p>
              </div>

              {/* Accent Color Presets */}
              <div className="space-y-3">
                <span className="text-xs font-mono-tabular text-zinc-400 block">
                  Focal Accent Color Palette
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ACCENT_PRESETS.map((p) => {
                    const isSelected = data.appearance.accentColor.toLowerCase() === p.hex.toLowerCase();
                    return (
                      <button
                        key={p.name}
                        onClick={() => {
                          playSound('click', soundEnabled);
                          updateAppearance({ accentColor: p.hex, accentName: p.name as typeof data.appearance.accentName });
                        }}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'border-white/40 bg-white/10 text-white'
                            : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: p.hex }}
                        />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Hex Color Picker */}
                <div className="pt-3 flex items-center gap-3">
                  <span className="text-xs font-mono-tabular text-zinc-400">Custom Accent Hex:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={data.appearance.accentColor}
                      onChange={(e) => updateAppearance({ accentColor: e.target.value, accentName: 'custom' })}
                      className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={data.appearance.accentColor}
                      onChange={(e) => updateAppearance({ accentColor: e.target.value, accentName: 'custom' })}
                      className="w-28 px-2 py-1 rounded bg-black/40 border border-white/15 text-xs text-white font-mono-tabular uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div>
                    <div className="text-xs font-semibold text-white">Tactile Crystalline Sound Synthesizer</div>
                    <div className="text-xs text-zinc-400">Micro-acoustic synthesis via Web Audio API for clicks and navigation.</div>
                  </div>
                  <button
                    onClick={() => updateAppearance({ soundEffectsEnabled: !data.appearance.soundEffectsEnabled })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      data.appearance.soundEffectsEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/5 text-zinc-400 border border-white/10'
                    }`}
                  >
                    {data.appearance.soundEffectsEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div>
                    <div className="text-xs font-semibold text-white">Atmospheric Ambient Illumination</div>
                    <div className="text-xs text-zinc-400">Subtle background radial light gradients reflecting accent color.</div>
                  </div>
                  <button
                    onClick={() => updateAppearance({ ambientGlowEnabled: !data.appearance.ambientGlowEnabled })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      data.appearance.ambientGlowEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/5 text-zinc-400 border border-white/10'
                    }`}
                  >
                    {data.appearance.ambientGlowEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Projects (Multi-Media) */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Commissioned Works ({projects.length})
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Supports <strong>Images, MP4/YouTube/Vimeo Videos, PDF Dossiers, and Live URLs</strong>.
                  </p>
                </div>

                <button
                  onClick={() => {
                    playSound('click', soundEnabled);
                    const newProj: Project = {
                      id: `proj-${Date.now()}`,
                      title: 'New Flagship Study',
                      slug: `new-study-${Date.now()}`,
                      subtitle: 'Comprehensive brand and spatial interactive exploration.',
                      category: 'Digital Experience',
                      client: 'Bespoke Client',
                      year: '2026',
                      featured: false,
                      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                      primaryMediaType: 'image',
                      media: [
                        {
                          type: 'image',
                          url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                          caption: 'Primary system overview'
                        }
                      ],
                      tags: ['Architecture', 'Interface', 'Performance'],
                      description: 'Project case study overview detailing technical challenges and creative breakthroughs.',
                      order: projects.length + 1
                    };
                    addProject(newProj);
                    setEditingProjectId(newProj.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-black cursor-pointer shadow-md"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {projects.map((proj) => {
                  const isEditing = editingProjectId === proj.id;

                  return (
                    <div
                      key={proj.id}
                      className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.coverImage}
                            alt={proj.title}
                            className="w-12 h-12 rounded-lg object-cover border border-white/10"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              <span>{proj.title}</span>
                              {proj.featured && (
                                <span className="text-[10px] text-amber-400 font-mono-tabular border border-amber-400/30 px-1 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-zinc-400 font-mono-tabular">
                              {proj.client} · {proj.category} · {proj.primaryMediaType.toUpperCase()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              playSound('switch', soundEnabled);
                              setEditingProjectId(isEditing ? null : proj.id);
                            }}
                            className="px-3 py-1 rounded-lg border border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-white/5 cursor-pointer"
                          >
                            {isEditing ? 'Collapse' : 'Edit Details'}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Editing Panel for this project */}
                      {isEditing && (
                        <div className="pt-4 border-t border-white/10 space-y-4 animate-fadeIn">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                Project Title
                              </label>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                Client / Organisation
                              </label>
                              <input
                                type="text"
                                value={proj.client}
                                onChange={(e) => updateProject(proj.id, { client: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                Category
                              </label>
                              <input
                                type="text"
                                value={proj.category}
                                onChange={(e) => updateProject(proj.id, { category: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                Primary Media Type
                              </label>
                              <select
                                value={proj.primaryMediaType}
                                onChange={(e) =>
                                  updateProject(proj.id, {
                                    primaryMediaType: e.target.value as MediaType
                                  })
                                }
                                className="w-full px-3 py-1.5 rounded-lg bg-[#0e0e14] border border-white/15 text-white text-xs"
                              >
                                <option value="image">Image System</option>
                                <option value="video">Motion / Video (MP4/YouTube/Vimeo)</option>
                                <option value="pdf">PDF Dossier</option>
                                <option value="url">Interactive Web Link</option>
                              </select>
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                Cover Thumbnail URL
                              </label>
                              <input
                                type="text"
                                value={proj.coverImage}
                                onChange={(e) => updateProject(proj.id, { coverImage: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                Subtitle / Hook Summary
                              </label>
                              <textarea
                                rows={2}
                                value={proj.subtitle}
                                onChange={(e) => updateProject(proj.id, { subtitle: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs resize-none"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                Detailed Case Study Description
                              </label>
                              <textarea
                                rows={3}
                                value={proj.description}
                                onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                Live Website URL (Optional)
                              </label>
                              <input
                                type="text"
                                value={proj.liveUrl || ''}
                                onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })}
                                placeholder="https://example.com"
                                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                PDF Document URL (Optional)
                              </label>
                              <input
                                type="text"
                                value={proj.pdfUrl || ''}
                                onChange={(e) => updateProject(proj.id, { pdfUrl: e.target.value })}
                                placeholder="https://example.com/spec.pdf"
                                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-mono-tabular text-zinc-400 mb-1">
                                Video Stream URL (Optional)
                              </label>
                              <input
                                type="text"
                                value={proj.videoUrl || ''}
                                onChange={(e) => updateProject(proj.id, { videoUrl: e.target.value })}
                                placeholder="https://commondatastorage.googleapis.com/... or YouTube"
                                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs"
                              />
                            </div>

                            <div className="flex items-center gap-2 pt-6">
                              <input
                                type="checkbox"
                                id={`featured-${proj.id}`}
                                checked={proj.featured}
                                onChange={(e) => updateProject(proj.id, { featured: e.target.checked })}
                                className="rounded border-white/20 bg-black/40 cursor-pointer"
                              />
                              <label htmlFor={`featured-${proj.id}`} className="text-xs text-zinc-300 cursor-pointer">
                                Mark as Featured Commission
                              </label>
                            </div>
                          </div>

                          {/* Media Assets Manager inside Project */}
                          <div className="p-4 rounded-lg bg-black/30 border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-zinc-300 font-mono-tabular">
                                Media Artifacts Carousel ({proj.media.length})
                              </span>
                              <button
                                onClick={() => {
                                  const updatedMedia = [
                                    ...proj.media,
                                    {
                                      type: 'image' as MediaType,
                                      url: proj.coverImage,
                                      caption: 'Supplementary artifact'
                                    }
                                  ];
                                  updateProject(proj.id, { media: updatedMedia });
                                }}
                                className="text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10"
                              >
                                + Add Media Item
                              </button>
                            </div>

                            <div className="space-y-2">
                              {proj.media.map((med, mIdx) => (
                                <div key={mIdx} className="flex items-center gap-2 text-xs">
                                  <select
                                    value={med.type}
                                    onChange={(e) => {
                                      const next = [...proj.media];
                                      next[mIdx] = { ...next[mIdx], type: e.target.value as MediaType };
                                      updateProject(proj.id, { media: next });
                                    }}
                                    className="px-2 py-1 rounded bg-[#101016] border border-white/10 text-white text-[11px]"
                                  >
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                    <option value="pdf">PDF</option>
                                    <option value="url">URL</option>
                                  </select>
                                  <input
                                    type="text"
                                    value={med.url}
                                    onChange={(e) => {
                                      const next = [...proj.media];
                                      next[mIdx] = { ...next[mIdx], url: e.target.value };
                                      updateProject(proj.id, { media: next });
                                    }}
                                    placeholder="Resource URL..."
                                    className="flex-1 px-2 py-1 rounded bg-black/40 border border-white/10 text-white text-[11px]"
                                  />
                                  <button
                                    onClick={() => {
                                      const next = proj.media.filter((_, i) => i !== mIdx);
                                      updateProject(proj.id, { media: next });
                                    }}
                                    className="p-1 text-red-400 hover:text-red-300"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Services */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Services & Engagement Models</h3>
                  <p className="text-xs text-zinc-400">Configure offerings, timelines, and deliverables.</p>
                </div>
                <button
                  onClick={() => {
                    playSound('click', soundEnabled);
                    addService({
                      title: 'New Advisory Discipline',
                      subtitle: 'Bespoke strategic counsel and execution.',
                      description: 'Comprehensive transformation sprint tailored to executive leadership.',
                      deliverables: ['Custom Sprint Roadmap', 'Artifact Deliverables', 'Weekly Executive Reviews'],
                      timeline: '3 – 5 Weeks',
                      featured: false
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-black cursor-pointer shadow-md"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  <Plus size={14} />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="space-y-4">
                {services.map((serv) => (
                  <div key={serv.id} className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={serv.title}
                        onChange={(e) => updateService(serv.id, { title: e.target.value })}
                        className="text-sm font-bold text-white bg-transparent border-b border-white/10 focus:border-amber-400 px-1 py-0.5"
                      />
                      <button
                        onClick={() => deleteService(serv.id)}
                        className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={serv.subtitle}
                          onChange={(e) => updateService(serv.id, { subtitle: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Engagement Timeline</label>
                        <input
                          type="text"
                          value={serv.timeline}
                          onChange={(e) => updateService(serv.id, { timeline: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Narrative Description</label>
                      <textarea
                        rows={2}
                        value={serv.description}
                        onChange={(e) => updateService(serv.id, { description: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded bg-black/40 border border-white/10 text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Skills & Competencies */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Capabilities & Competency Levels</h3>
                <p className="text-xs text-zinc-400">Modify technical categories, proficiency scores, and experience.</p>
              </div>

              <div className="space-y-6">
                {skillCategories.map((cat, cIdx) => (
                  <div key={cat.id} className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => {
                          const next = [...skillCategories];
                          next[cIdx] = { ...next[cIdx], name: e.target.value };
                          updateSkillCategories(next);
                        }}
                        className="text-sm font-bold text-white bg-transparent border-b border-white/15 px-1"
                      />
                      <button
                        onClick={() => {
                          const next = [...skillCategories];
                          next[cIdx].skills.push({ name: 'New Competency', level: 90, experience: '4 yrs' });
                          updateSkillCategories(next);
                        }}
                        className="text-[11px] px-2 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
                      >
                        + Add Skill
                      </button>
                    </div>

                    <div className="space-y-3">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-3 text-xs">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const next = [...skillCategories];
                              next[cIdx].skills[sIdx].name = e.target.value;
                              updateSkillCategories(next);
                            }}
                            className="flex-1 px-2.5 py-1 rounded bg-black/40 border border-white/10 text-white"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => {
                              const next = [...skillCategories];
                              next[cIdx].skills[sIdx].level = Number(e.target.value);
                              updateSkillCategories(next);
                            }}
                            className="w-16 px-2 py-1 rounded bg-black/40 border border-white/10 text-white font-mono-tabular"
                          />
                          <input
                            type="text"
                            value={skill.experience}
                            onChange={(e) => {
                              const next = [...skillCategories];
                              next[cIdx].skills[sIdx].experience = e.target.value;
                              updateSkillCategories(next);
                            }}
                            className="w-20 px-2 py-1 rounded bg-black/40 border border-white/10 text-white font-mono-tabular"
                          />
                          <button
                            onClick={() => {
                              const next = [...skillCategories];
                              next[cIdx].skills = next[cIdx].skills.filter((_, i) => i !== sIdx);
                              updateSkillCategories(next);
                            }}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Trajectory Records</h3>
                  <p className="text-xs text-zinc-400">Chronological history of leadership positions and outcomes.</p>
                </div>
                <button
                  onClick={() => {
                    playSound('click', soundEnabled);
                    addExperience({
                      role: 'Executive Design Director',
                      company: 'Vanguard Systems',
                      location: 'London & Geneva',
                      period: '2024 — Present',
                      description: 'Directing strategic brand architecture and product design.',
                      highlights: ['Led core transformation', 'Scaled international team']
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-black cursor-pointer shadow-md"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  <Plus size={14} />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                          className="text-sm font-bold text-white bg-transparent border-b border-white/15 px-1"
                        />
                        <span className="text-zinc-500">at</span>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          className="text-sm text-zinc-300 bg-transparent border-b border-white/15 px-1"
                        />
                      </div>
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Period</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Role Description</label>
                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: Testimonials */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Client & Partner Endorsements</h3>
                  <p className="text-xs text-zinc-400">Manage executive testimonials, roles, and avatar URLs.</p>
                </div>
                <button
                  onClick={() => {
                    playSound('click', soundEnabled);
                    addTestimonial({
                      name: 'Lord Arthur Pendelton',
                      role: 'Chairman & Founder',
                      company: 'Pendelton Heritage Assets',
                      quote: 'Alexander brought unmatched poise, aesthetic intelligence, and technical clarity to our digital presence.',
                      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
                      rating: 5
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-black cursor-pointer shadow-md"
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  <Plus size={14} />
                  <span>Add Endorsement</span>
                </button>
              </div>

              <div className="space-y-4">
                {testimonials.map((test) => (
                  <div key={test.id} className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={test.name}
                        onChange={(e) => updateTestimonial(test.id, { name: e.target.value })}
                        className="text-sm font-bold text-white bg-transparent border-b border-white/15 px-1"
                      />
                      <button
                        onClick={() => deleteTestimonial(test.id)}
                        className="p-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Role</label>
                        <input
                          type="text"
                          value={test.role}
                          onChange={(e) => updateTestimonial(test.id, { role: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Company</label>
                        <input
                          type="text"
                          value={test.company}
                          onChange={(e) => updateTestimonial(test.id, { company: e.target.value })}
                          className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Avatar Image URL</label>
                      <input
                        type="text"
                        value={test.avatarUrl}
                        onChange={(e) => updateTestimonial(test.id, { avatarUrl: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Quote</label>
                      <textarea
                        rows={2}
                        value={test.quote}
                        onChange={(e) => updateTestimonial(test.id, { quote: e.target.value })}
                        className="w-full px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: Backup, Export & Reset */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-1">Data Portability & Factory Reset</h3>
                <p className="text-xs text-zinc-400">
                  Export complete portfolio configuration as JSON, import existing archives, or restore the curated defaults.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Export Card */}
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                      <Download size={15} style={{ color: 'var(--accent-color)' }} />
                      <span>Export JSON Archive</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Download a snapshot of your projects, bios, appearance tokens, and case study media.
                    </p>
                  </div>
                  <button
                    onClick={handleExport}
                    className="w-full py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    Download Configuration JSON
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                      <Upload size={15} style={{ color: 'var(--accent-color)' }} />
                      <span>Restore from JSON</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Upload a previously exported portfolio JSON file to instantly restore your layout.
                    </p>
                  </div>
                  <label className="w-full py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium text-center transition-colors cursor-pointer block">
                    <span>Select JSON File</span>
                    <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/[0.03] space-y-4">
                <div>
                  <div className="text-sm font-bold text-red-400 mb-1 flex items-center gap-2">
                    <RotateCcw size={15} />
                    <span>Reset to Curated Agency Defaults</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Clear local edits and restore the original Alexander Vance curated case studies, Swiss typography tokens, and media artifacts.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to revert all changes to the original default curated state?')) {
                      resetToDefaults();
                      showToast('Reverted to default portfolio data');
                    }
                  }}
                  className="py-2.5 px-5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors cursor-pointer"
                >
                  Confirm Reset to Defaults
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Footer */}
        <div className="px-6 py-4 bg-[#07070a] border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono-tabular shrink-0">
          <span>Modifications save in real time</span>
          <button
            onClick={() => {
              playSound('close', soundEnabled);
              setIsAdminOpen(false);
            }}
            className="px-4 py-1.5 rounded-lg text-black font-semibold cursor-pointer shadow-sm"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
};
