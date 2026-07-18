import { MetadataRoute } from 'next';
import { getProjects } from '../lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://arnaudroyer.fr';
  const locales = ['fr', 'en'] as const;

  const staticRoutes = ['about', 'projects', 'experiences', 'contact'];
  const priorities: Record<string, number> = {
    '': 1,
    'about': 0.8,
    'projects': 0.9,
    'experiences': 0.7,
    'contact': 0.6,
  };
  const frequencies: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
    '': 'monthly',
    'about': 'monthly',
    'projects': 'weekly',
    'experiences': 'monthly',
    'contact': 'yearly',
  };

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: frequencies[''],
      priority: priorities[''],
    },
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}/${route}`,
      lastModified: new Date(),
      changeFrequency: frequencies[route],
      priority: priorities[route],
    })),
  ]);

  const projectPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...projectPages];
}
