import type { MetadataRoute } from 'next';
import { hex } from '@/content/colors';
import { SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arnaud Royer, développeur fullstack',
    short_name: SITE_NAME,
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
