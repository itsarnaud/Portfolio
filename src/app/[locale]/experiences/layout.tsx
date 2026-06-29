import { Metadata } from 'next';

const siteUrl = 'https://arnaud-royer.xyz';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';
  const path = `/${locale}/experiences`;

  return {
    title: 'Expériences',
    description: "Plus de 2 ans d'expérience en développement web. Découvrez mon parcours professionnel.",
    openGraph: {
      title: 'Expériences | Arnaud Royer',
      description: "Plus de 2 ans d'expérience en développement web.",
      url: path,
      type: 'website',
      locale: ogLocale,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer - Expériences' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Expériences | Arnaud Royer',
      description: "Plus de 2 ans d'expérience en développement web.",
      images: ['/images/og-image.png'],
      creator: '@cestarnaud',
    },
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'fr': `${siteUrl}/fr/experiences`,
        'en': `${siteUrl}/en/experiences`,
        'x-default': `${siteUrl}/fr/experiences`,
      },
    },
  };
}

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
