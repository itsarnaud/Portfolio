import type { Locale } from '@/i18n/routing';

export type Localized<T = string> = Record<Locale, T>;

export type ColorName = 'violet' | 'cobalt' | 'citron' | 'tomate' | 'soleil' | 'rose' | 'blanc';

export type ProjectKind = 'mobile' | 'fullstack' | 'frontend' | 'backend' | 'bot' | 'open-source';

type ProjectCategory =
  | 'personal'
  | 'school'
  | 'work-study'
  | 'client'
  | 'open-source'
  | 'internship';

type ProjectImage = {
  src: string;
  alt: Localized;
  // Capture verticale : affichée en entier, sans être recadrée.
  portrait?: boolean;
};

export type Project = {
  number: number;
  slug: string;
  title: string;
  year: number;
  kind: ProjectKind;
  category: ProjectCategory;
  color: ColorName;
  // Remplace le badge de catégorie sur les cartes.
  badge?: Localized;
  // Absent pour un projet privé, sans site ni code public.
  url?: string;

  description: Localized;

  // Phrase courte du paquet de cartes de l'accueil, sinon la description.

  pitch?: Localized;
  tagline: Localized;
  format: Localized;
  team: Localized;
  about: Localized<string[]>;
  challenge: Localized<string[]>;
  highlights: Localized<string[]>;

  // Sur les cartes : 4 maximum.
  stack: string[];
  technologies: string[];

  // Sans `poster`, une couverture est générée (ProjectCover).
  media: {
    poster?: string;
    phone?: string;
    gallery: ProjectImage[];
  };
};

export type PostCategory = 'projects' | 'ai' | 'freelance' | 'society';

export type Post = {
  slug: string;
  // Format AAAA-MM-JJ.
  date: string;
  category: PostCategory;
  title: Localized;
  excerpt: Localized;
  content: Localized<string[]>;
  linkedinUrl: string;
  tags: string[];
};

export type Experience = {
  id: string;
  current: boolean;
  period: Localized;
  place: string;
  role: Localized;
  company: string;
  companyUrl?: string;
  color: ColorName;
  description: Localized;
  points: Localized<string[]>;
  stack: string[];
};

export type Education = {
  period: string;
  title: Localized;
  school: Localized;
  color: ColorName;
};

export type Tool = {
  name: string;
  color: ColorName;
};

export type ToolGroup = {
  id: 'front' | 'back' | 'tools' | 'learning';
  tools: Tool[];
};

export type Service = {
  id: 'website' | 'web-app' | 'back-office' | 'mobile-app';
  color: ColorName;
  title: Localized;
  description: Localized;
  examples: string[];
};

export type ProcessStep = {
  color: ColorName;
  title: Localized;
  description: Localized;
};
