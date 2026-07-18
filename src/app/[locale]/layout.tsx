import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Inter, Instrument_Serif } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';
import { SmoothScroll }   from '../../components/gsap/SmoothScroll';
import { CustomCursor }   from '../../components/gsap/CustomCursor';
import { PageTransition } from '../../components/gsap/PageTransition';
import { Analytics }      from "@vercel/analytics/next";
import Navbar from '../../components/global/Navbar';
import Footer from '../../components/global/Footer';
import { PersonJsonLd, WebsiteJsonLd } from '../../components/seo/JsonLd';
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const siteUrl = 'https://arnaudroyer.fr';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t('title'), template: '%s | Arnaud Royer' },
    description: t('description'),
    keywords: ['Développeur Fullstack', 'Fullstack Developer', 'React', 'Next.js', 'Svelte', 'Node.js', 'TypeScript', 'Portfolio', 'Arnaud Royer'],
    authors: [{ name: 'Arnaud Royer' }],
    openGraph: {
      type: 'website',
      url: `${siteUrl}/${locale}`,
      siteName: 'Arnaud Royer - Portfolio',
      title: t('title'),
      description: t('description'),
      locale: ogLocale,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og-image.png'],
      creator: '@cestarnaud',
    },
    robots: { index: true, follow: true },
    verification: {
      google: 'LwvwuxH4t00ZYrf3QLNcFgRRC8AhZhLpJNk2QZfTrFQ',
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'fr': `${siteUrl}/fr`,
        'en': `${siteUrl}/en`,
        'x-default': `${siteUrl}/fr`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <PersonJsonLd locale={locale} />
        <WebsiteJsonLd locale={locale} />
        <Analytics />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <Navbar />
          <PageTransition />
          <SmoothScroll>
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
