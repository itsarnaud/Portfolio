import { Metadata } from 'next';

const siteUrl = 'https://arnaud-royer.xyz';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';
  const path = `/${locale}/contact`;

  return {
    title: 'Contact',
    description: 'Vous avez un projet en tête ? Contactez-moi pour discuter de votre projet web.',
    openGraph: {
      title: 'Contact | Arnaud Royer',
      description: 'Vous avez un projet en tête ? Contactez-moi pour discuter de votre projet web.',
      url: path,
      type: 'website',
      locale: ogLocale,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer - Contact' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact | Arnaud Royer',
      description: 'Vous avez un projet en tête ? Contactez-moi pour discuter de votre projet web.',
      images: ['/images/og-image.png'],
      creator: '@cestarnaud',
    },
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'fr': `${siteUrl}/fr/contact`,
        'en': `${siteUrl}/en/contact`,
        'x-default': `${siteUrl}/fr/contact`,
      },
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
