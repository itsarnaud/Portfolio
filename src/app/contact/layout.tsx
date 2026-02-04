import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Vous avez un projet en tête ? Contactez-moi pour discuter de votre projet web.',
  keywords: [
    'Contact',
    'Développeur Fullstack',
    'Freelance',
    'Mission',
    'Projet web',
    'Collaboration',
    'Arnaud Royer',
  ],
  openGraph: {
    title: 'Contact | Arnaud Royer',
    description: 'Vous avez un projet en tête ? Contactez-moi pour discuter de votre projet web.',
    url: '/contact',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arnaud Royer - Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Arnaud Royer',
    description: 'Vous avez un projet en tête ? Contactez-moi pour discuter de votre projet web.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
