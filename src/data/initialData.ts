import { PortfolioSettings } from '../types/portfolio';

export const INITIAL_PORTFOLIO_DATA: PortfolioSettings = {
  profile: {
    name: 'Alexander Vance',
    role: 'Executive Creative Director & Design Technologist',
    tagline: 'Sculpting high-calibre digital flagships, spatial interfaces, and avant-garde motion systems for global icons.',
    bioParagraphs: [
      'Over the past decade, I have directed creative engineering and spatial systems at the intersection of aesthetic restraint and high-throughput software architecture.',
      'From pioneering generative design tools at Horizon Labs to architecting flagship platforms for tier-one luxury houses and venture-backed AI labs, my focus remains constant: crafting digital artifacts of unmistakable weight and timeless elegance.',
      'Rooted in the rigorous disciplines of Swiss typography, architectural acoustics, and reactive computing, every commission is treated as a bespoke cultural artifact.'
    ],
    manifesto: 'We reject ephemeral trends in favor of structural clarity, cinematic gravitas, and engineering that commands deep attention.',
    email: 'alexander@vance.studio',
    phone: '+1 (415) 890-4420',
    location: 'San Francisco & Zurich',
    availability: 'Accepting select commissions for Q3/Q4 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    logoText: 'VANCE',
    signatureText: 'Alexander Vance',
    resumePdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    timezone: 'America/Los_Angeles'
  },
  appearance: {
    accentColor: '#d4af37', // Refined Champagne Gold
    accentName: 'gold',
    fontPairing: 'syne-jakarta',
    soundEffectsEnabled: true,
    ambientGlowEnabled: true
  },
  metrics: [
    { label: 'Client Valuation Added', value: '$240M+', detail: 'Across 14 venture rounds & IPOs' },
    { label: 'Shipped Flagships', value: '38', detail: 'Spatial, mobile & enterprise web' },
    { label: 'Industry Honors', value: '19', detail: 'Awwwards, Cannes Lions & Red Dot' },
    { label: 'Years of Practice', value: '11', detail: 'Directing design & engineering' }
  ],
  socials: [
    { platform: 'GitHub', url: 'https://github.com', icon: 'Github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
    { platform: 'X / Twitter', url: 'https://x.com', icon: 'Twitter' },
    { platform: 'ReadCV', url: 'https://read.cv', icon: 'FileText' }
  ],
  projects: [
    {
      id: 'proj-01',
      title: 'Aethelgard Spatial UI',
      slug: 'aethelgard-spatial-ui',
      subtitle: 'Mixed-reality interface architecture for neural telemetry and spatial computing headsets.',
      category: 'Spatial & 3D',
      client: 'Aethelgard Labs (Zurich)',
      year: '2026',
      featured: true,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      primaryMediaType: 'video',
      media: [
        {
          type: 'video',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          caption: 'Spatial optics interaction breakdown and eye-tracking gesture engine.',
          embedType: 'direct'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
          caption: 'Volumetric glass refraction shaders running at 120 FPS.'
        },
        {
          type: 'pdf',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          caption: 'Technical Whitepaper: Zero-Latency Volumetric Layouts (PDF)'
        }
      ],
      tags: ['Spatial Computing', 'WebGPU', 'Shader Art', 'Interaction Design'],
      description: 'Engineered a next-generation operating system layer for spatial computing. We eliminated micro-latency in high-frequency neural gesture decoding while introducing a proprietary chromatic diffraction shader library.',
      challenge: 'Existing spatial interfaces caused cognitive fatigue due to excessive synthetic glow and rigid 2D bounding cards projected in 3D space.',
      solution: 'Developed an organic ambient depth model using dynamic depth-of-field shaders, sub-millisecond raymarched volumetric widgets, and tactile acoustic feedback.',
      impactMetrics: [
        { label: 'Frame Pacing', value: '120 FPS stable' },
        { label: 'Latency Reduction', value: '-42% response' },
        { label: 'Recognition', value: 'Red Dot Best of Best 2026' }
      ],
      liveUrl: 'https://example.com/aethelgard',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      order: 1
    },
    {
      id: 'proj-02',
      title: 'Kronos Haute Horlogerie',
      slug: 'kronos-horlogerie',
      subtitle: 'Digital flagship experience and interactive 3D mechanical calibre configurator.',
      category: 'Digital Experience',
      client: 'Kronos Genève',
      year: '2025',
      featured: true,
      coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      primaryMediaType: 'image',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
          caption: 'Rose gold tourbillon cage rendering with sub-micron surface precision.'
        },
        {
          type: 'video',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          thumbnailUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
          caption: 'Interactive escapement mechanism disassembly sequence.',
          embedType: 'direct'
        },
        {
          type: 'url',
          url: 'https://example.com/kronos-virtual-vault',
          caption: 'Explore Kronos Virtual Horology Salon (Live Mirror)'
        }
      ],
      tags: ['Luxury E-Commerce', 'Three.js', 'Procedural Lighting', 'Editorial Typography'],
      description: 'A bespoke commerce flagship for Geneva watchmaker Kronos. Built with physical-based metallic micro-facet shaders, allowing collectors to examine hand-finished chamfering and hear real acoustic escapement recordings.',
      challenge: 'Preserving the reverence and exclusivity of high horology on mobile and web viewports without feeling commercialized.',
      solution: 'Created an unhurried, museum-grade visual narrative accompanied by custom binaural audio recordings of the actual balance springs.',
      impactMetrics: [
        { label: 'Avg Session Time', value: '6m 42s' },
        { label: 'Private Inquiries', value: '+180% year-on-year' },
        { label: 'Site of the Year', value: 'Awwwards Annual Nominee' }
      ],
      liveUrl: 'https://example.com/kronos',
      order: 2
    },
    {
      id: 'proj-03',
      title: 'Hyperion Autonomous Cockpit',
      slug: 'hyperion-cockpit',
      subtitle: 'Automotive telemetry design system and real-time lidar visualization for electric hypercars.',
      category: 'Creative Engineering',
      client: 'Hyperion Mobility',
      year: '2025',
      featured: true,
      coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      primaryMediaType: 'video',
      media: [
        {
          type: 'video',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          thumbnailUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
          caption: 'High-speed regenerative braking HUD overlay and night driving simulation.',
          embedType: 'direct'
        },
        {
          type: 'pdf',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          caption: 'Automotive Safety & Human Factors Specification Dossier (PDF)'
        }
      ],
      tags: ['Automotive HMI', 'Real-time Telemetry', 'WebGL', 'Embedded Systems'],
      description: 'Engineered the 8K curved instrument cluster and central command console for Hyperion’s track-focused electric hypercar. Complies with ISO 26262 automotive safety standards while delivering an ultra-fluid aesthetic.',
      impactMetrics: [
        { label: 'Rendering Latency', value: '< 8ms end-to-end' },
        { label: 'Driver Reaction Time', value: '18% faster glance' }
      ],
      liveUrl: 'https://example.com/hyperion',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      order: 3
    },
    {
      id: 'proj-04',
      title: 'Monolith Architectural Monograph',
      slug: 'monolith-monograph',
      subtitle: 'Editorial publication platform and generative portfolio for Scandinavian architecture firm.',
      category: 'Brand Identity',
      client: 'Atelier Monolith (Oslo)',
      year: '2024',
      featured: false,
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      primaryMediaType: 'pdf',
      media: [
        {
          type: 'pdf',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          caption: 'Architectural Monograph & Blueprint Compendium Vol. IV (PDF)'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          caption: 'Rammed earth and cast concrete residential sanctuary in Telemark.'
        }
      ],
      tags: ['Brutalist Grid', 'Typography', 'Editorial', 'Archive Architecture'],
      description: 'Conceived an austere, brutalist digital archive documenting 40 years of brutalist concrete and timber structures across Scandinavia. Featuring an infinite typographic canvas and custom archival search.',
      impactMetrics: [
        { label: 'Archival Retention', value: '14,000+ monographs downloaded' }
      ],
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      order: 4
    },
    {
      id: 'proj-05',
      title: 'Synapse Neural Studio',
      slug: 'synapse-neural-studio',
      subtitle: 'Generative AI interface enabling directors to orchestrate multimodal models with node graphs.',
      category: 'Creative Engineering',
      client: 'Synapse AI',
      year: '2026',
      featured: true,
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      primaryMediaType: 'url',
      media: [
        {
          type: 'url',
          url: 'https://example.com/synapse-app',
          caption: 'Interactive Cloud Canvas Sandbox'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
          caption: 'Node composition graph processing 4K diffusion frames in real time.'
        }
      ],
      tags: ['Canvas Engine', 'React', 'TypeScript', 'Node Graph'],
      description: 'Designed and constructed the visual canvas engine powering Synapse. Allows film colorists and art directors to link diffusion weights, audio stems, and camera vectors on an infinite GPU-accelerated workspace.',
      impactMetrics: [
        { label: 'Workflow Acceleration', value: '3.4x faster turnarounds' },
        { label: 'Active Creators', value: '85,000+ monthly' }
      ],
      liveUrl: 'https://example.com/synapse-app',
      order: 5
    }
  ],
  services: [
    {
      id: 'serv-01',
      title: 'Brand & Digital Flagships',
      subtitle: 'Bespoke web architecture for luxury, technology & cultural institutions.',
      description: 'From typography-led art direction to frictionless e-commerce and interactive storytelling. Every detail is calibrated to evoke prestige, clarity, and enduring authority.',
      deliverables: [
        'Creative Direction & Visual Identity',
        'Headless Next.js / Vite Architecture',
        'Fluid Micro-Interactions & Audio Design',
        'Conversion & Prestige Calibration'
      ],
      timeline: '4 – 8 Weeks',
      featured: true
    },
    {
      id: 'serv-02',
      title: 'Spatial & 3D Interactive Systems',
      subtitle: 'Next-generation WebGL, WebGPU, and Apple Vision Pro spatial environments.',
      description: 'Bridging physical architectural reality with digital space. Custom procedural shaders, real-time lighting pipelines, and sensory audio for products that defy static flat screens.',
      deliverables: [
        'WebGPU & Three.js Custom Shaders',
        'Spatial Computing Prototyping',
        'Bespoke 3D Product Configurator',
        'High-Performance Framerate Tuning'
      ],
      timeline: '6 – 10 Weeks',
      featured: true
    },
    {
      id: 'serv-03',
      title: 'Design Systems & High-Velocity Code',
      subtitle: 'Enterprise-grade component architectures built for zero friction.',
      description: 'Uncompromising design tokenization, strict accessibility compliance, and developer documentation that scales engineering teams from 10 to 1,000 without visual drift.',
      deliverables: [
        'Design Token Engineering & Tokens Studio',
        'Accessible WCAG AAA UI Foundations',
        'Figma to Code Automated Pipelines',
        'Motion & Kinetic Physics Rules'
      ],
      timeline: '4 – 6 Weeks'
    },
    {
      id: 'serv-04',
      title: 'Executive Advisory & Creative Audit',
      subtitle: 'High-leverage critique and strategic recalibration for founders.',
      description: 'Deep-dive analysis of your digital presence, narrative coherence, and technological bottlenecks. Includes executive roadmap and actionable aesthetic transformation sprint.',
      deliverables: [
        'Comprehensive UI/UX & Code Audit',
        'Brand Narrative Calibration',
        'Technical Architecture Review',
        '2-Week High-Impact Redesign Sprint'
      ],
      timeline: '2 – 3 Weeks'
    }
  ],
  skillCategories: [
    {
      id: 'cat-design',
      name: 'Art Direction & Design',
      skills: [
        { name: 'Creative Direction & Typography', level: 98, experience: '11 yrs' },
        { name: 'Spatial UI & VisionOS Architecture', level: 92, experience: '3 yrs' },
        { name: 'Design Systems & Tokenization', level: 96, experience: '8 yrs' },
        { name: 'Editorial Layout & Information Math', level: 95, experience: '10 yrs' }
      ]
    },
    {
      id: 'cat-engineering',
      name: 'Creative Engineering',
      skills: [
        { name: 'TypeScript & Modern React / Next', level: 97, experience: '9 yrs' },
        { name: 'Three.js / WebGPU / GLSL Shaders', level: 90, experience: '6 yrs' },
        { name: 'Motion Physics & Kinetic Animation', level: 96, experience: '8 yrs' },
        { name: 'Node.js, Express & High-Throughput APIs', level: 91, experience: '7 yrs' }
      ]
    },
    {
      id: 'cat-craft',
      name: 'Media & Multi-Modal Craft',
      skills: [
        { name: 'Cinematic Sound Synthesis & Web Audio', level: 88, experience: '5 yrs' },
        { name: 'Video Editing, Color Grading & VFX', level: 89, experience: '7 yrs' },
        { name: 'Document Dossiers & PDF Archival Layout', level: 94, experience: '8 yrs' },
        { name: 'Generative AI Pipelines & Node Systems', level: 93, experience: '4 yrs' }
      ]
    }
  ],
  experience: [
    {
      id: 'exp-01',
      role: 'Principal Creative Technologist',
      company: 'Vance & Partners Studio',
      location: 'San Francisco & Zurich',
      period: '2023 — Present',
      description: 'Leading an elite advisory and creative engineering practice. Advising venture-backed frontier tech labs and luxury conglomerates on digital flagships, spatial operating models, and generative tooling.',
      highlights: [
        'Spearheaded $240M+ in aggregate valuation uplift across portfolio clients',
        'Awarded 6 Awwwards Site of the Month & 2 Red Dot Best of the Best prizes',
        'Authored open-source procedural shader utilities adopted by 40,000+ developers'
      ]
    },
    {
      id: 'exp-02',
      role: 'Head of Design Engineering',
      company: 'Horizon Labs',
      location: 'Zurich, Switzerland',
      period: '2020 — 2023',
      description: 'Directing the cross-functional design engineering and systems department across Switzerland and the UK. Scaled the core design system to 28 product surfaces.',
      highlights: [
        'Built Horizon Design Core powering over 2.4 million daily active enterprise users',
        'Reduced interactive rendering latency by 65% across WebGL 3D views',
        'Managed a team of 14 senior designers, motion artists, and UI engineers'
      ]
    },
    {
      id: 'exp-03',
      role: 'Senior Interactive Director',
      company: 'Stark & Co. Editorial',
      location: 'London & New York',
      period: '2017 — 2020',
      description: 'Conceived experimental digital issues, film festival interactive identities, and immersive brand experiences for premier international cultural institutions.',
      highlights: [
        'Delivered award-winning interactive publications for MoMA and Serpentine Galleries',
        'Co-developed physical-digital museum installations using multi-touch sensing'
      ]
    },
    {
      id: 'exp-04',
      role: 'Interface Architect & Motion Specialist',
      company: 'Vector Interactive',
      location: 'Berlin, Germany',
      period: '2015 — 2017',
      description: 'Pioneered early WebGL micro-sites, interactive audio experiments, and responsive brand platforms for European automotive and lifestyle brands.',
      highlights: [
        'Created custom SVG animation engines prior to modern browser standards',
        'Finalist for Young Gun Designer of the Year Europe'
      ]
    }
  ],
  testimonials: [
    {
      id: 'test-01',
      name: 'Dr. Helena von Berg',
      role: 'Chief Technology Officer',
      company: 'Aethelgard Spatial Labs',
      quote: 'Alexander possesses a rare duality: the discerning eye of an architectural purist combined with the mathematical rigor of an elite graphics engineer. He did not merely design our interface; he redefined our technical trajectory.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      rating: 5
    },
    {
      id: 'test-02',
      name: 'Matteo Bellini',
      role: 'Managing Director & Heir',
      company: 'Kronos Haute Horlogerie Genève',
      quote: 'Our collectors demand uncompromising perfection down to the micron. Alexander translated 180 years of Genevan watchmaking heritage into a digital flagship that feels as heavy and reverent as our gold calibres.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      rating: 5
    },
    {
      id: 'test-03',
      name: 'Claire Dupont',
      role: 'General Partner',
      company: 'Valence Frontier Capital',
      quote: 'Whenever our portfolio companies need to establish category dominance before a Series B, Vance is our singular call. His work communicates authority, restraint, and an undeniable aura of quality.',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      rating: 5
    }
  ]
};
