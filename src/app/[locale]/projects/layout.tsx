import { Metadata } from 'next';

const siteUrl = 'https://arnaud-royer.xyz';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';
  const path = `/${locale}/projects`;

  return {
    title: 'Projets',
    description: "Découvrez une sélection de mes travaux récents : applications web, sites vitrines, outils open-source.",
    openGraph: {
      title: 'Projets | Arnaud Royer',
      description: "Découvrez une sélection de mes travaux récents.",
      url: path,
      type: 'website',
      locale: ogLocale,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer - Projets' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Projets | Arnaud Royer',
      description: "Découvrez une sélection de mes travaux récents.",
      images: ['/images/og-image.png'],
      creator: '@cestarnaud',
    },
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'fr': `${siteUrl}/fr/projects`,
        'en': `${siteUrl}/en/projects`,
        'x-default': `${siteUrl}/fr/projects`,
      },
    },
  };
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
