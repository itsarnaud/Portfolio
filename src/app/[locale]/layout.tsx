import type { Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getProjects } from '@/content/projects';
import { routing } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/locale';
import { fontVariables } from '@/styles/fonts';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Nav } from '@/components/layout/Nav';
import { PageTransition } from '@/components/layout/PageTransition';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Cursor } from '@/components/motion/Cursor';
import '@/styles/globals.css';

export const viewport: Viewport = {
  themeColor: '#f7f7f2',
  colorScheme: 'light',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Couleur de chaque projet, pour la barre de progression des pages détail. */
const projectColors = Object.fromEntries(getProjects().map(({ slug, color }) => [slug, color]));

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('nav');

  return (
    <html lang={locale} className={fontVariables}>
      <body>
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
          <PageTransition />
          <Cursor />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
