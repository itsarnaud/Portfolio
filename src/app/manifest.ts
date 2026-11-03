import type { MetadataRoute } from 'next';
import { hex } from '@/content/colors';

/** Pour l'ajout à l'écran d'accueil. Les couleurs sont celles de la D.A. (papier et violet). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arnaud Royer, développeur fullstack',
    short_name: 'Arnaud Royer',
    description: 'Sites, applis et outils. Développeur fullstack à Montpellier.',
    start_url: '/',
    display: 'standalone',
    background_color: hex.papier,
    theme_color: hex.papier,
    categories: ['portfolio', 'technology', 'development'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
