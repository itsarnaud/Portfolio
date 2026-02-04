import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expériences',
  description: 'Plus de 2 ans d\'expérience en développement web. Découvrez mon parcours professionnel chez Kollirama, Igocreate et mes différentes missions.',
  keywords: [
    'Expériences',
    'Parcours professionnel',
    'Développeur Fullstack',
    'Kollirama',
    'Igocreate',
    'Alternance',
    'Arnaud Royer',
  ],
  openGraph: {
    title: 'Expériences | Arnaud Royer',
    description: 'Plus de 2 ans d\'expérience en développement web. Découvrez mon parcours professionnel.',
    url: '/experiences',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arnaud Royer - Expériences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expériences | Arnaud Royer',
    description: 'Plus de 2 ans d\'expérience en développement web.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/experiences',
  },
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
