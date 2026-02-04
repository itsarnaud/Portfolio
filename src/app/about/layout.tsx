import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez mon parcours en tant que développeur Fullstack. Passionné par la création d\'applications web modernes, je combine expertise technique et attention aux détails.',
  keywords: [
    'Développeur Fullstack',
    'À propos',
    'Parcours',
    'Compétences',
    'React',
    'Next.js',
    'Svelte',
    'Node.js',
    'TypeScript',
    'Arnaud Royer',
  ],
  openGraph: {
    title: 'À propos | Arnaud Royer',
    description: 'Découvrez mon parcours en tant que développeur Fullstack. Passionné par la création d\'applications web modernes.',
    url: '/about',
    type: 'profile',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arnaud Royer - À propos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos | Arnaud Royer',
    description: 'Découvrez mon parcours en tant que développeur Fullstack.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
