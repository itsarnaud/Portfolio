import type { Locale } from '@/i18n/routing';

/** Un texte dans les deux langues du site. */
export type Localized<T = string> = Record<Locale, T>;

/** Couleurs de la D.A. utilisables comme fond (voir src/styles/globals.css). */
export type ColorName = 'violet' | 'cobalt' | 'citron' | 'tomate' | 'soleil' | 'rose' | 'blanc';

/* ------------------------------------------------------------------ */
/* Projets                                                             */
/* ------------------------------------------------------------------ */

/** Ce qu'est le projet techniquement. Affiché dans l'en-tête des cartes (N°11 · Fullstack · 2026). */
export type ProjectKind = 'mobile' | 'fullstack' | 'frontend' | 'backend' | 'bot' | 'open-source';

/** Le cadre du projet. Sert de badge sur les cartes. */
export type ProjectCategory =
  | 'personal'
  | 'school'
  | 'work-study'
  | 'client'
  | 'open-source'
  | 'internship';

export type ProjectImage = {
  src: string;
  alt: Localized;
};

export type Project = {
  /** Numéro de la carte : N°1 (le plus ancien) à N°12. */
  number: number;
  slug: string;
  title: string;
  year: number;
  kind: ProjectKind;
  category: ProjectCategory;
  /** Couleur de la carte, de la page détail et de l'image de partage. */
  color: ColorName;
  /** Remplace le badge de catégorie sur les cartes (« En bêta », « 6 étoiles sur GitHub »). */
  badge?: Localized;
  url: string;

  /** Une phrase, sur les cartes et la liste. */
  description: Localized;
  /** Sous-titre du hero de la page détail. */
  tagline: Localized;
  /** Bloc « Type » de la page détail. */
  format: Localized;
  /** Bloc « Équipe » de la page détail. */
  team: Localized;
  /** « Le projet » : un paragraphe par entrée. */
  about: Localized<string[]>;
  /** « Le plus dur » : un paragraphe par entrée. */
  challenge: Localized<string[]>;
  /** Les stickers à côté de « Le plus dur ». */
  highlights: Localized<string[]>;

  /** Stack courte, sur les cartes (4 maximum). */
  stack: string[];
  /** Stack complète, sur la page détail. */
  technologies: string[];

  /**
   * Captures. Sans `desktop` ni `mobile`, la carte affiche une couverture générée
   * dans la couleur du projet (composant ProjectCover).
   */
  media: {
    desktop?: string;
    mobile?: string;
    gallery: ProjectImage[];
  };
};

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export type PostCategory = 'projects' | 'ai' | 'freelance' | 'society';

export type Post = {
  slug: string;
  /** Date de publication sur LinkedIn (AAAA-MM-JJ). */
  date: string;
  category: PostCategory;
  title: Localized;
  excerpt: Localized;
  /** Le post complet : un paragraphe par entrée. */
  content: Localized<string[]>;
  linkedinUrl: string;
  tags: string[];
};

/* ------------------------------------------------------------------ */
/* Parcours                                                            */
/* ------------------------------------------------------------------ */

export type Experience = {
  id: string;
  /** Affiche le badge « En cours ». */
  current: boolean;
  period: Localized;
  place: string;
  role: Localized;
  company: string;
  companyUrl?: string;
  color: ColorName;
  description: Localized;
  /** « Ce que j'y ai fait ». */
  points: Localized<string[]>;
  stack: string[];
};

export type Education = {
  period: string;
  title: Localized;
  school: Localized;
  color: ColorName;
};

/* ------------------------------------------------------------------ */
/* Boîte à outils, services, méthode                                   */
/* ------------------------------------------------------------------ */

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
  /** Slugs des projets donnés en exemple. */
  examples: string[];
};

export type ProcessStep = {
  color: ColorName;
  title: Localized;
  description: Localized;
};
