import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description: "Découvrez mon parcours en tant que développeur Fullstack. Passionné par la création d'applications web modernes, je combine expertise technique et attention aux détails.",
  openGraph: {
    title: 'À propos | Arnaud Royer',
    description: "Découvrez mon parcours en tant que développeur Fullstack.",
    url: '/about',
    type: 'profile',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer - À propos' }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
