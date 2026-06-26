import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expériences',
  description: "Plus de 2 ans d'expérience en développement web. Découvrez mon parcours professionnel.",
  openGraph: {
    title: 'Expériences | Arnaud Royer',
    description: "Plus de 2 ans d'expérience en développement web.",
    url: '/experiences',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer - Expériences' }],
  },
};

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
