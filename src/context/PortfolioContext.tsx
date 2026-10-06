import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioSettings, Project, Service, SkillCategory, ExperienceItem, Testimonial } from '../types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';
import { playSound } from '../utils/sound';

const STORAGE_KEY = 'vance_portfolio_config_v2';

interface PortfolioContextType {
  data: PortfolioSettings;
  updateProfile: (profile: Partial<PortfolioSettings['profile']>) => void;
  updateAppearance: (appearance: Partial<PortfolioSettings['appearance']>) => void;
  updateMetrics: (metrics: PortfolioSettings['metrics']) => void;
  updateSocials: (socials: PortfolioSettings['socials']) => void;
  
  // Projects CRUD
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'order'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (orderedIds: string[]) => void;

  // Services CRUD
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Skills CRUD
  skillCategories: SkillCategory[];
  updateSkillCategories: (categories: SkillCategory[]) => void;

  // Experience CRUD
  experience: ExperienceItem[];
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, updates: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;

  // Testimonials CRUD
  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // System & Management
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (json: string) => { success: boolean; error?: string };

  // Modals & Panels
  activeProjectModal: Project | null;
  openProjectModal: (project: Project) => void;
  closeProjectModal: () => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  toggleAdmin: () => void;

  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  soundEnabled: boolean;
  toggleSound: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...INITIAL_PORTFOLIO_DATA,
          ...parsed,
          profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
          appearance: { ...INITIAL_PORTFOLIO_DATA.appearance, ...(parsed.appearance || {}) }
        };
      }
    } catch {
      // Fallback
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage error
    }
  }, [data]);

  // Sync custom accent color to CSS variable
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-color', data.appearance.accentColor);
    
    // Also derive glow color rgba
    const hex = data.appearance.accentColor.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      root.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.22)`);
      root.style.setProperty('--accent-subtle', `rgba(${r}, ${g}, ${b}, 0.08)`);
    }
  }, [data.appearance.accentColor]);

  const soundEnabled = data.appearance.soundEffectsEnabled;

  const toggleSound = () => {
    const next = !soundEnabled;
    setData(prev => ({
      ...prev,
      appearance: { ...prev.appearance, soundEffectsEnabled: next }
    }));
    playSound('switch', true);
  };

  const updateProfile = (profile: Partial<PortfolioSettings['profile']>) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profile }
    }));
  };

  const updateAppearance = (appearance: Partial<PortfolioSettings['appearance']>) => {
    setData(prev => ({
      ...prev,
      appearance: { ...prev.appearance, ...appearance }
    }));
  };

  const updateMetrics = (metrics: PortfolioSettings['metrics']) => {
    setData(prev => ({ ...prev, metrics }));
  };

  const updateSocials = (socials: PortfolioSettings['socials']) => {
    setData(prev => ({ ...prev, socials }));
  };

  // Projects CRUD
  const addProject = (projectData: Omit<Project, 'id' | 'order'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      order: data.projects.length + 1
    };
    setData(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
    playSound('success', soundEnabled);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...updates } : p))
    }));
    // Also update modal if currently viewing this project
    if (activeProjectModal && activeProjectModal.id === id) {
      setActiveProjectModal(prev => (prev ? { ...prev, ...updates } : null));
    }
    playSound('click', soundEnabled);
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
    if (activeProjectModal?.id === id) {
      setActiveProjectModal(null);
    }
    playSound('close', soundEnabled);
  };

  const reorderProjects = (orderedIds: string[]) => {
    const map = new Map(data.projects.map(p => [p.id, p]));
    const nextList: Project[] = [];
    orderedIds.forEach((id, idx) => {
      const item = map.get(id);
      if (item) {
        nextList.push({ ...item, order: idx + 1 });
      }
    });
    setData(prev => ({ ...prev, projects: nextList }));
  };

  // Services CRUD
  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: `serv-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
    playSound('success', soundEnabled);
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => (s.id === id ? { ...s, ...updates } : s))
    }));
    playSound('click', soundEnabled);
  };

  const deleteService = (id: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
    playSound('close', soundEnabled);
  };

  // Skills
  const updateSkillCategories = (skillCategories: SkillCategory[]) => {
    setData(prev => ({ ...prev, skillCategories }));
    playSound('click', soundEnabled);
  };

  // Experience CRUD
  const addExperience = (expData: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...expData,
      id: `exp-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience]
    }));
    playSound('success', soundEnabled);
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(e => (e.id === id ? { ...e, ...updates } : e))
    }));
    playSound('click', soundEnabled);
  };

  const deleteExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
    playSound('close', soundEnabled);
  };

  // Testimonials CRUD
  const addTestimonial = (testData: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...testData,
      id: `test-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, newTest]
    }));
    playSound('success', soundEnabled);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => (t.id === id ? { ...t, ...updates } : t))
    }));
    playSound('click', soundEnabled);
  };

  const deleteTestimonial = (id: string) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
    playSound('close', soundEnabled);
  };

  const resetToDefaults = () => {
    setData(INITIAL_PORTFOLIO_DATA);
    localStorage.removeItem(STORAGE_KEY);
    playSound('switch', soundEnabled);
  };

  const exportConfigJson = () => {
    return JSON.stringify(data, null, 2);
  };

  const importConfigJson = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (!parsed.profile || !parsed.projects) {
        return { success: false, error: 'Invalid configuration format: missing profile or projects.' };
      }
      setData({
        ...INITIAL_PORTFOLIO_DATA,
        ...parsed
      });
      playSound('success', soundEnabled);
      return { success: true };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  };

  const openProjectModal = (project: Project) => {
    setActiveProjectModal(project);
    playSound('open', soundEnabled);
  };

  const closeProjectModal = () => {
    setActiveProjectModal(null);
    playSound('close', soundEnabled);
  };

  const toggleAdmin = () => {
    setIsAdminOpen(prev => {
      playSound(prev ? 'close' : 'open', soundEnabled);
      return !prev;
    });
  };

  // Keyboard shortcut for Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
        playSound('switch', soundEnabled);
      }
      if (e.key === 'Escape') {
        if (activeProjectModal) setActiveProjectModal(null);
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProjectModal, isCommandPaletteOpen, soundEnabled]);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateProfile,
        updateAppearance,
        updateMetrics,
        updateSocials,
        projects: data.projects,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        services: data.services,
        addService,
        updateService,
        deleteService,
        skillCategories: data.skillCategories,
        updateSkillCategories,
        experience: data.experience,
        addExperience,
        updateExperience,
        deleteExperience,
        testimonials: data.testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
        activeProjectModal,
        openProjectModal,
        closeProjectModal,
        isAdminOpen,
        setIsAdminOpen,
        toggleAdmin,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        soundEnabled,
        toggleSound
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
};
