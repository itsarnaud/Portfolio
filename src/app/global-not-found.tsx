import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { fontVariables } from '@/styles/fonts';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Nav } from '@/components/layout/Nav';
import { Cursor } from '@/components/motion/Cursor';
import { NotFoundView } from '@/components/sections/errors/NotFoundView';
import '@/styles/globals.css';

/**
 * 404 des adresses qui ne correspondent à aucune page. Elle est construite côté serveur
 * (contrairement à un notFound() appelé depuis une page, que Next 16 laisse au navigateur).
 * La langue vient de l'adresse, lue par le proxy next-intl : /en/... donne la 404 en anglais.
 * Elle reprend la nav et le pied de page du site.
 *
 * C'est un global-not-found et pas un app/not-found : un app/not-found fait partie de l'arbre
 * de chaque page, et sa lecture de la langue (getLocale lit les en-têtes) rendait tout le site
 * dynamique. Next sert ce fichier à part, sans toucher au rendu statique des pages.
 */
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
