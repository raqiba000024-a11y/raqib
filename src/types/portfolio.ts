export type MediaType = 'image' | 'video' | 'pdf' | 'url';

export interface ProjectMedia {
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  embedType?: 'direct' | 'youtube' | 'vimeo' | 'iframe';
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  client: string;
  year: string;
  featured: boolean;
  coverImage: string;
  primaryMediaType: MediaType;
  media: ProjectMedia[];
  tags: string[];
  description: string;
  challenge?: string;
  solution?: string;
  impactMetrics?: { label: string; value: string }[];
  liveUrl?: string;
  pdfUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string;
  rating?: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioSettings {
  profile: {
    name: string;
    role: string;
    tagline: string;
    bioParagraphs: string[];
    manifesto: string;
    email: string;
    phone: string;
    location: string;
    availability: string;
    avatarUrl: string;
    logoText: string;
    signatureText: string;
    resumePdfUrl: string;
    timezone: string;
  };
  appearance: {
    accentColor: string; // hex
    accentName: 'gold' | 'emerald' | 'cobalt' | 'amber' | 'violet' | 'crimson' | 'custom';
    fontPairing: 'syne-jakarta' | 'cinzel-jakarta' | 'sans-editorial';
    soundEffectsEnabled: boolean;
    ambientGlowEnabled: boolean;
  };
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  socials: SocialLink[];
  projects: Project[];
  services: Service[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  testimonials: Testimonial[];
}
