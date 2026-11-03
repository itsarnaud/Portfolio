import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from './routing';

/**
 * À appeler en haut de chaque page et layout sous [locale].
 * Vérifie la langue de l'URL (404 sinon) et l'active pour le rendu statique.
 */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}

/**
 * La langue de l'URL pour generateMetadata, sans déclencher de 404 :
 * c'est la page qui s'en charge. Langue inconnue = français.
 */
export async function metadataLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}
