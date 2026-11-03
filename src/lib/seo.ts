import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { metadataLocale } from '@/i18n/locale';
import { routing, type Locale } from '@/i18n/routing';

/** L'adresse du site en production : base des URLs canoniques, du sitemap et du JSON-LD. */
export const SITE_URL = 'https://arnaudroyer.fr';
export const SITE_NAME = 'Arnaud Royer';
export const TWITTER_HANDLE = '@cestarnaud';

/** L'image de partage par défaut (1200×630). */
export const DEFAULT_OG_IMAGE = '/images/og-image.png';

const ogLocales: Record<Locale, string> = { fr: 'fr_FR', en: 'en_US' };
const htmlLangs: Record<Locale, string> = { fr: 'fr-FR', en: 'en-US' };

/** Langue au format BCP 47 (`fr-FR`), pour le JSON-LD. */
export const inLanguage = (locale: Locale) => htmlLangs[locale];

/** URL absolue d'une page dans une langue. `path` commence par « / », ou vaut '' pour l'accueil. */
export function absoluteUrl(locale: Locale, path = ''): string {
  return `${SITE_URL}/${locale}${path}`;
}

/** Canonique, puis la même page dans chaque langue, et x-default vers le français. */
export function languageAlternates(locale: Locale, path = ''): NonNullable<Metadata['alternates']> {
  return {
    canonical: absoluteUrl(locale, path),
    languages: {
      ...Object.fromEntries(routing.locales.map((other) => [other, absoluteUrl(other, path)])),
      'x-default': absoluteUrl(routing.defaultLocale, path),
    },
  };
}

/** Coupe un texte à `max` caractères sur une fin de mot, avec « … ». Les moteurs coupent vers 155. */
export function clip(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : cut.length).replace(/[\s,.;:!?]+$/, '')}…`;
}

type PageMetadataInput = {
  locale: Locale;
  /** Chemin sans la langue : '' pour l'accueil, '/projects', '/blog/mon-article'… */
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'profile' | 'article';
  /** Titre complet, sans le modèle « %s | Arnaud Royer » (accueil, titres déjà longs). */
  absoluteTitle?: boolean;
  image?: { url: string; alt: string };
  publishedTime?: string;
  keywords?: string[];
};

/**
 * Les métadonnées d'une page : titre, description, canonique, hreflang, Open Graph et Twitter.
 * Open Graph et Twitter sont remplacés en entier par chaque page (Next ne les fusionne pas),
 * d'où cette fonction commune.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = 'website',
  absoluteTitle = false,
  image,
  publishedTime,
  keywords,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const shareImage = image ?? { url: DEFAULT_OG_IMAGE, alt: SITE_NAME };
  const desc = clip(description);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    keywords,
    alternates: languageAlternates(locale, path),
    openGraph: {
      type,
      url: absoluteUrl(locale, path),
      siteName: SITE_NAME,
      title: fullTitle,
      description: desc,
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((other) => other !== locale).map((other) => ogLocales[other]),
      images: [{ ...shareImage, width: 1200, height: 630 }],
      ...(type === 'article' && publishedTime ? { publishedTime, authors: [SITE_NAME] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [shareImage.url],
      creator: TWITTER_HANDLE,
    },
  };
}

/** Les pages simples, dont le titre et la description sont dans messages (meta.<page>). */
type StaticPage = 'projects' | 'blog' | 'about' | 'experiences' | 'contact';

export async function staticPageMetadata(
  params: Promise<{ locale: string }>,
  page: StaticPage,
  type: PageMetadataInput['type'] = 'website',
): Promise<Metadata> {
  const locale = await metadataLocale(params);
  const t = await getTranslations({ locale, namespace: `meta.${page}` });
  return pageMetadata({ locale, path: `/${page}`, title: t('title'), description: t('description'), type });
}
