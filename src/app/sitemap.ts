import type { MetadataRoute } from 'next';
import { getPosts } from '@/content/posts';
import { getProjects } from '@/content/projects';
import { routing } from '@/i18n/routing';
import { absoluteUrl, SITE_URL } from '@/lib/seo';

type Entry = MetadataRoute.Sitemap[number];

/** Les pages fixes, avec les priorités de la v2. */
const staticPages: { path: string; priority: number; changeFrequency: Entry['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/experiences', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
];

/** Une entrée par langue, chacune avec les liens vers ses traductions (hreflang). */
function inEveryLocale(path: string, entry: Omit<Entry, 'url'>): Entry[] {
  const languages = Object.fromEntries(routing.locales.map((locale) => [locale, absoluteUrl(locale, path)]));
  return routing.locales.map((locale) => ({
    url: absoluteUrl(locale, path),
    alternates: { languages: { ...languages, 'x-default': absoluteUrl(routing.defaultLocale, path) } },
    ...entry,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticPages.flatMap(({ path, ...entry }) => inEveryLocale(path, { lastModified: now, ...entry })),
    ...getProjects().flatMap((project) =>
      inEveryLocale(`/projects/${project.slug}`, {
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        images: project.media.poster ? [`${SITE_URL}${project.media.poster}`] : undefined,
      }),
    ),
    ...getPosts().flatMap((post) =>
      inEveryLocale(`/blog/${post.slug}`, {
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    ),
  ];
}
