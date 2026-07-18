import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const siteUrl = 'https://arnaudroyer.fr';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';
  const path = `/${locale}/about`;
  const t = await getTranslations({ locale, namespace: 'meta.about' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: `${t('title')} | Arnaud Royer`,
      description: t('description'),
      url: path,
      type: 'profile',
      locale: ogLocale,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | Arnaud Royer`,
      description: t('description'),
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
