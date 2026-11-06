import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Nav } from '@/components/layout/Nav';
import { Cursor } from '@/components/motion/Cursor';
import { NotFoundView } from '@/components/sections/errors/NotFoundView';
import { fontVariables } from '@/styles/fonts';
import '@/styles/globals.css';

// global-not-found plutôt que app/not-found : getLocale lit les en-têtes et rendrait tout le site dynamique.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.notFound');
  return { title: `${t('title')} | Arnaud Royer`, robots: { index: false } };
}

export default async function GlobalNotFound() {
  const locale = await getLocale();
  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <NextIntlClientProvider>
          <Nav />
          <MobileNav />
          <main id="contenu">
            <NotFoundView />
          </main>
          <Footer />
          <Cursor />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
