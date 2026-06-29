import { Metadata } from 'next';

const siteUrl = 'https://arnaud-royer.xyz';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';
  const path = `/${locale}/about`;

  return {
    title: 'À propos',
    description: "Découvrez mon parcours en tant que développeur Fullstack. Passionné par la création d'applications web modernes, je combine expertise technique et attention aux détails.",
    openGraph: {
      title: 'À propos | Arnaud Royer',
      description: "Découvrez mon parcours en tant que développeur Fullstack.",
      url: path,
      type: 'profile',
      locale: ogLocale,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer - À propos' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'À propos | Arnaud Royer',
      description: "Découvrez mon parcours en tant que développeur Fullstack.",
      images: ['/images/og-image.png'],
      creator: '@cestarnaud',
    },
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'fr': `${siteUrl}/fr/about`,
        'en': `${siteUrl}/en/about`,
        'x-default': `${siteUrl}/fr/about`,
      },
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
