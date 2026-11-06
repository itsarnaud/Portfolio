import type { Localized } from './types';

export const deck: { slug: string; pitch: Localized; badge?: Localized }[] = [
  {
    slug: 'tengo',
    pitch: { fr: "L'appli qui joue le maître du jeu au Killer.", en: 'The app that plays game master at Killer.' },
  },
  {
    slug: 'quested',
    pitch: { fr: 'Le Letterboxd des jeux vidéo.', en: 'Letterboxd for video games.' },
  },
  {
    slug: 'futurekawa',
    pitch: { fr: 'Une API pour suivre des stocks de café.', en: 'An API to track coffee stocks.' },
    badge: { fr: 'API et IoT', en: 'API and IoT' },
  },
  {
    slug: 'kollirama',
    pitch: { fr: 'Site vitrine et back-office, en solo.', en: 'Showcase site and back-office, solo.' },
  },
];

export const featuredProjects = ['tengo', 'quested', 'kollirama', 'futurekawa', 'atelier-maha'];

export const workingOn: Localized<string[]> = {
  fr: ['Tengo!', 'Quested', 'mon portfolio'],
  en: ['Tengo!', 'Quested', 'my portfolio'],
};

export const marquee: { tech: string[]; offer: Localized<string[]> } = {
  tech: [
    'React',
    'Next.js',
    'SvelteKit',
    'TypeScript',
    'React Native',
    'Node.js',
    'Python',
    'PostgreSQL',
    'Prisma',
    'Supabase',
    'Tailwind',
    'Docker',
  ],
  offer: {
    fr: ['Sites vitrines', 'Applis web', 'Applis mobiles', 'Back-offices', 'Montpellier'],
    en: ['Showcase sites', 'Web apps', 'Mobile apps', 'Back-offices', 'Montpellier'],
  },
};

// `playing` vide masque la ligne « Je joue à ».
export const now: {
  updatedAt: string;
  building: Localized;
  learning: Localized;
  playing?: string;
} = {
  updatedAt: '2026-11',
  building: {
    fr: 'Tengo!, une appli pour jouer au Killer entre potes',
    en: 'Tengo!, an app to play Killer with friends',
  },
  learning: {
    fr: 'Java, Spring et Payload (le CMS)',
    en: 'Java, Spring and Payload (the CMS)',
  },
  playing: 'Valorant',
};
