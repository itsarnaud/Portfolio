import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * Tout est ouvert sauf l'API. Contrairement à la v2, /_next/ n'est plus bloqué :
 * Google a besoin des fichiers JS et CSS pour voir les pages comme un visiteur.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
