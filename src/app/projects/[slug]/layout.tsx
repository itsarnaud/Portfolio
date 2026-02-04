import { Metadata } from 'next';
import { projects } from '../../../lib/data';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Projet non trouvé',
      description: 'Ce projet n\'existe pas.',
    };
  }

  const siteUrl = 'https://arnaud-royer.xyz';

  return {
    title: project.title,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      ...project.technologies,
      'Développeur Fullstack',
      'Arnaud Royer',
    ],
    openGraph: {
      title: `${project.title} | Arnaud Royer`,
      description: project.description,
      url: `/projects/${project.slug}`,
      type: 'article',
      publishedTime: `${project.year}-01-01`,
      authors: ['Arnaud Royer'],
      images: [
        {
          url: project.image[0] || '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Arnaud Royer`,
      description: project.description,
      images: [project.image[0] || '/images/og-image.png'],
    },
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
