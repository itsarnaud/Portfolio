import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Inter, Instrument_Serif } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
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

const siteUrl = 'https://arnaud-royer.xyz';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Arnaud Royer | Développeur Fullstack', template: '%s | Arnaud Royer' },
  description: 'Développeur Fullstack passionné, je crée des expériences web modernes et performantes.',
  keywords: ['Développeur Fullstack', 'Fullstack Developer', 'React', 'Next.js', 'Svelte', 'Node.js', 'TypeScript', 'Portfolio', 'Arnaud Royer'],
  authors: [{ name: 'Arnaud Royer', url: siteUrl }],
  openGraph: {
    type: 'website', url: siteUrl, siteName: 'Arnaud Royer - Portfolio',
    title: 'Arnaud Royer | Développeur Fullstack',
    description: 'Développeur Fullstack passionné, je crée des expériences web modernes et performantes.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Arnaud Royer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arnaud Royer | Développeur Fullstack',
    description: 'Développeur Fullstack passionné.',
    images: ['/images/og-image.png'],
    creator: '@cestarnaud',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound();
  }

  // Makes locale available to all server components in this subtree
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <PersonJsonLd />
        <WebsiteJsonLd />
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
