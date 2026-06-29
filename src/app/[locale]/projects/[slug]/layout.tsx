import { Metadata } from 'next';
import { getProjects } from '../../../../lib/data';

const siteUrl = 'https://arnaud-royer.xyz';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const projects = getProjects(locale);
  const project  = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Projet non trouvé', description: "Ce projet n'existe pas." };
  }

  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';
  const path = `/${locale}/projects/${slug}`;

  return {
    title: project.title,
    description: project.description,
    keywords: [project.title, project.category, ...project.technologies, 'Développeur Fullstack', 'Arnaud Royer'],
    openGraph: {
      title: `${project.title} | Arnaud Royer`,
      description: project.description,
      url: path,
      type: 'article',
      publishedTime: `${project.year}-01-01`,
      authors: ['Arnaud Royer'],
      locale: ogLocale,
      images: [{ url: project.image[0] || '/images/og-image.png', width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Arnaud Royer`,
      description: project.description,
      images: [project.image[0] || '/images/og-image.png'],
      creator: '@cestarnaud',
    },
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'fr': `${siteUrl}/fr/projects/${slug}`,
        'en': `${siteUrl}/en/projects/${slug}`,
        'x-default': `${siteUrl}/fr/projects/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const locales = ['fr', 'en'] as const;
  return locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({ locale, slug: project.slug }))
  );
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
