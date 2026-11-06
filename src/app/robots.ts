import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// /_next/ reste ouvert : Google a besoin du JS et du CSS pour voir les pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
