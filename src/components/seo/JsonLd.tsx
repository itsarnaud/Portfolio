type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arnaud Royer',
    jobTitle: 'Développeur Fullstack',
    description: 'Développeur Fullstack passionné, je crée des expériences web modernes et performantes.',
    url: 'https://arnaud-royer.xyz',
    sameAs: [
      'https://github.com/itsarnaud',
      'https://linkedin.com/in/royer-arnaud',
    ],
    knowsAbout: [
      'React', 'Next.js', 'Svelte', 'SvelteKit', 'Node.js', 'TypeScript', 
      'JavaScript', 'Tailwind CSS', 'PostgreSQL', 'MySQL', 'Prisma'
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'EPSI Montpellier',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Université Gustave Eiffel - IUT Meaux',
      }
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Kollirama',
      url: 'https://kollirama.fr',
    }
  };

  return <JsonLd data={data} />;
}

export function WebsiteJsonLd() {
  const siteUrl = 'https://arnaud-royer.xyz';
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arnaud Royer - Portfolio',
    description: 'Portfolio de Arnaud Royer, Développeur Fullstack',
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Arnaud Royer',
    },
    inLanguage: 'fr-FR',
  };

  return <JsonLd data={data} />;
}

type ProjectJsonLdProps = {
  project: {
    title: string;
    description: string;
    longDescription?: string;
    image: string[];
    technologies: string[];
    year: string;
    slug: string;
    link?: string;
  };
};

export function ProjectJsonLd({ project }: ProjectJsonLdProps) {
  const siteUrl = 'https://arnaud-royer.xyz';
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.longDescription || project.description,
    image: project.image[0],
    url: `${siteUrl}/projects/${project.slug}`,
    dateCreated: `${project.year}-01-01`,
    creator: {
      '@type': 'Person',
      name: 'Arnaud Royer',
      url: siteUrl,
    },
    keywords: project.technologies.join(', '),
    ...(project.link && { mainEntityOfPage: project.link }),
  };

  return <JsonLd data={data} />;
}

type BreadcrumbJsonLdProps = {
  items: Array<{
    name: string;
    url: string;
  }>;
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const siteUrl = 'https://arnaud-royer.xyz';
  
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };

  return <JsonLd data={data} />;
}
