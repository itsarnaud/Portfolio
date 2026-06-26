import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Vous avez un projet en tête ? Contactez-moi pour discuter de votre projet web.',
  openGraph: {
    title: 'Contact | Arnaud Royer',
    description: 'Vous avez un projet en tête ? Contactez-moi pour discuter de votre projet web.',
    url: '/contact',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer - Contact' }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
