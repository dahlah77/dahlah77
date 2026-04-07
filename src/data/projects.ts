import { ProjectItem } from '../types/content';

export const projects: ProjectItem[] = [
  {
    title: 'Neuro Commerce Dashboard',
    slug: 'neuro-commerce-dashboard',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
    category: 'Product Design + Front-End',
    shortDescription: 'AI-focused analytics dashboard with adaptive data storytelling.',
    longDescription:
      'A premium control center for high-growth e-commerce teams, featuring role-based views, intelligent KPI narratives, and fluid transition states for decision confidence.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Chart.js'],
    status: 'Live',
    demoUrl: 'YOUR_DEMO_URL_HERE',
    repositoryUrl: 'YOUR_REPOSITORY_URL_HERE',
    screenshots: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80'
    ],
    featureHighlights: ['Predictive KPI cards', 'Smooth drill-down transitions', 'Accessible dark theme']
  },
  {
    title: 'Astra Creative Profile',
    slug: 'astra-creative-profile',
    coverImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=80',
    category: 'Interactive Portfolio',
    shortDescription: 'Narrative portfolio experience with dynamic galleries and storytelling.',
    longDescription:
      'An immersive personal brand site with cinematic transitions, modular content architecture, and custom interaction systems designed for creators.',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    status: 'Live',
    demoUrl: 'YOUR_DEMO_URL_HERE',
    repositoryUrl: 'YOUR_REPOSITORY_URL_HERE',
    screenshots: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
    ],
    featureHighlights: ['3-layer parallax hero', 'Data-driven content modules', 'Lightweight motion loading']
  }
];
