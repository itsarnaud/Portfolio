import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projets',
  description: 'Découvrez une sélection de mes travaux récents : applications web, sites vitrines, outils open-source. Chaque projet est une opportunité d\'apprendre et de créer.',
  keywords: [
    'Projets',
    'Portfolio',
    'Réalisations',
    'Applications web',
    'Développeur Fullstack',
    'Open source',
    'Arnaud Royer',
  ],
  openGraph: {
    title: 'Projets | Arnaud Royer',
    description: 'Découvrez une sélection de mes travaux récents : applications web, sites vitrines, outils open-source.',
    url: '/projects',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arnaud Royer - Projets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projets | Arnaud Royer',
    description: 'Découvrez une sélection de mes travaux récents.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
