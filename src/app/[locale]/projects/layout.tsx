import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projets',
  description: "Découvrez une sélection de mes travaux récents : applications web, sites vitrines, outils open-source.",
  openGraph: {
    title: 'Projets | Arnaud Royer',
    description: "Découvrez une sélection de mes travaux récents.",
    url: '/projects',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer - Projets' }],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
