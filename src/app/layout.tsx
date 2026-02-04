import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Inter, Instrument_Serif } from 'next/font/google';
import { SmoothScroll }   from '../components/gsap/SmoothScroll';
import { CustomCursor }   from '../components/gsap/CustomCursor';
import { PageTransition } from '../components/gsap/PageTransition';
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

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
  title: {
    default: 'Arnaud Royer | Développeur Fullstack',
    template: '%s | Arnaud Royer',
  },
  description: 'Développeur Fullstack passionné, je crée des expériences web modernes et performantes. Spécialisé en React, Next.js, Svelte, Node.js et TypeScript.',
  keywords: [
    'Développeur Fullstack',
    'Développeur Web',
    'React',
    'Next.js',
    'Svelte',
    'SvelteKit',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Frontend',
    'Backend',
    'Portfolio',
    'Arnaud Royer',
    'Développeur France',
    'Freelance',
  ],
  authors: [{ name: 'Arnaud Royer', url: siteUrl }],
  creator: 'Arnaud Royer',
  publisher: 'Arnaud Royer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Arnaud Royer - Portfolio',
    title: 'Arnaud Royer | Développeur Fullstack',
    description: 'Développeur Fullstack passionné, je crée des expériences web modernes et performantes. Spécialisé en React, Next.js, Svelte, Node.js et TypeScript.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Arnaud Royer - Développeur Fullstack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arnaud Royer | Développeur Fullstack',
    description: 'Développeur Fullstack passionné, je crée des expériences web modernes et performantes.',
    images: ['/images/og-image.png'],
    creator: '@cestarnaud',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
};

import { PersonJsonLd, WebsiteJsonLd } from '../components/seo/JsonLd';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <PersonJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} font-sans antialiased`}>
        <CustomCursor />
        <Navbar />
        <PageTransition />
        <SmoothScroll>
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
