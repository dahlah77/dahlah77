import { IconType } from 'react-icons';

export type NavLink = {
  id: string;
  label: string;
};

export type ProfileData = {
  fullName: string;
  username: string;
  tagline: string;
  intro: string;
  location: string;
  availability: string;
  cvUrl: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type SocialLink = {
  platform: string;
  handle: string;
  url: string;
  icon: IconType;
};

export type SkillItem = {
  category: string;
  items: string[];
};

export type ProjectItem = {
  title: string;
  slug: string;
  coverImage: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  status: 'Live' | 'In Progress' | 'Concept';
  demoUrl: string;
  repositoryUrl: string;
  screenshots: string[];
  featureHighlights: string[];
};

export type GalleryItem = {
  id: string;
  image: string;
  title: string;
  caption: string;
};

export type TimelineItem = {
  period: string;
  role: string;
  organization: string;
  description: string;
};

export type CertificateItem = {
  title: string;
  issuer: string;
  year: string;
};
