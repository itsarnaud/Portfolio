import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Nav } from '@/components/layout/Nav';
import { PageTransition } from '@/components/layout/PageTransition';
import { RouteChange } from '@/components/layout/RouteChange';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Cursor } from '@/components/motion/Cursor';
import { SiteJsonLd } from '@/components/seo/JsonLd';
import { hex } from '@/content/colors';
import { getProjects } from '@/content/projects';
import { metadataLocale, resolveLocale } from '@/i18n/locale';
import { routing } from '@/i18n/routing';
import { SITE_NAME, SITE_URL } from '@/lib/seo';
import { fontVariables } from '@/styles/fonts';
import '@/styles/globals.css';

export const viewport: Viewport = {
  themeColor: hex.papier,
  colorScheme: 'light',
};

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const locale = await metadataLocale(params);
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('title'), template: `%s | ${SITE_NAME}` },
    description: t('description'),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    keywords: [
      SITE_NAME,
      locale === 'en' ? 'Fullstack developer' : 'Développeur fullstack',
      'Montpellier',
      'Freelance',
      'Next.js',
      'React',
      'SvelteKit',
      'React Native',
      'Node.js',
      'TypeScript',
    ],
    verification: { google: 'LwvwuxH4t00ZYrf3QLNcFgRRC8AhZhLpJNk2QZfTrFQ' },
    formatDetection: { telephone: false },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const projectColors = Object.fromEntries(getProjects().map(({ slug, color }) => [slug, color]));

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('nav');

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <SiteJsonLd locale={locale} />
        <NextIntlClientProvider>
          <a
            href="#contenu"
            className="sr-only z-100 rounded-bouton border-2 bg-citron px-4 py-3 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {t('skip')}
          </a>
          <ScrollProgress projectColors={projectColors} />
          <Nav />
          <MobileNav />
          <main id="contenu" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          {/* RouteChange avant PageTransition : son écouteur de clic doit passer en premier. */}
          <RouteChange />
          <PageTransition />
          <Cursor />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
