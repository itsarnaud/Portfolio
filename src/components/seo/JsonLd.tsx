import { toolGroups } from '@/content/skills';
import type { Post, Project } from '@/content/types';
import type { Locale } from '@/i18n/routing';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/components/layout/navLinks';
import { absoluteUrl, inLanguage, SITE_NAME, SITE_URL } from '@/lib/seo';

/**
 * Données structurées (schema.org) lues par Google et les IA.
 * « < » est échappé pour qu'aucun texte ne puisse fermer la balise <script>.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c') }}
    />
  );
}

const person = { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME, url: SITE_URL };

/** Les outils des groupes « front » et « back » de la boîte à outils, un par entrée. */
const knowsAbout = toolGroups
  .filter(({ id }) => id === 'front' || id === 'back')
  .flatMap(({ tools }) => tools.flatMap(({ name }) => name.split(' / ')));

const personText: Record<Locale, { jobTitle: string; description: string }> = {
  fr: {
    jobTitle: 'Développeur fullstack',
    description:
      'Développeur fullstack à Montpellier. Sites, applis web, back-offices et applis mobiles, en alternance chez Kollirama et en freelance.',
  },
  en: {
    jobTitle: 'Fullstack developer',
    description:
      'Fullstack developer in Montpellier. Websites, web apps, back-offices and mobile apps, work-study at Kollirama and freelancing.',
  },
};

/** Qui est derrière le site, et le site lui-même. Dans le layout, sur toutes les pages. */
export function SiteJsonLd({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        '@graph': [
          {
            ...person,
            image: `${SITE_URL}/images/photo.webp`,
            email: `mailto:${EMAIL}`,
            ...personText[locale],
            address: { '@type': 'PostalAddress', addressLocality: 'Montpellier', addressCountry: 'FR' },
            sameAs: [GITHUB_URL, LINKEDIN_URL],
            knowsAbout,
            alumniOf: [
              { '@type': 'EducationalOrganization', name: 'EPSI Montpellier' },
              { '@type': 'EducationalOrganization', name: 'IUT de Meaux, Université Gustave Eiffel' },
            ],
            worksFor: { '@type': 'Organization', name: 'Kollirama', url: 'https://kollirama.fr' },
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: SITE_NAME,
            url: absoluteUrl(locale),
            inLanguage: inLanguage(locale),
            author: { '@id': person['@id'] },
          },
        ],
      }}
    />
  );
}

/** Fil d'Ariane : Accueil > section > page. */
function breadcrumb(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, url }, index) => ({ '@type': 'ListItem', position: index + 1, name, item: url })),
  };
}

type Crumbs = { home: string; section: string };

export function ProjectJsonLd({ project, locale, crumbs }: { project: Project; locale: Locale; crumbs: Crumbs }) {
  const url = absoluteUrl(locale, `/projects/${project.slug}`);
  return (
    <JsonLd
      data={{
        '@graph': [
          {
            '@type': 'CreativeWork',
            name: project.title,
            headline: project.tagline[locale],
            description: project.description[locale],
            abstract: project.about[locale].join(' '),
            url,
            dateCreated: String(project.year),
            creator: person,
            keywords: project.technologies.join(', '),
            inLanguage: inLanguage(locale),
            ...(project.media.poster && { image: `${SITE_URL}${project.media.poster}` }),
            sameAs: project.url,
          },
          breadcrumb([
            { name: crumbs.home, url: absoluteUrl(locale) },
            { name: crumbs.section, url: absoluteUrl(locale, '/projects') },
            { name: project.title, url },
          ]),
        ],
      }}
    />
  );
}

export function BlogPostingJsonLd({ post, locale, crumbs }: { post: Post; locale: Locale; crumbs: Crumbs }) {
  const url = absoluteUrl(locale, `/blog/${post.slug}`);
  return (
    <JsonLd
      data={{
        '@graph': [
          {
            '@type': 'BlogPosting',
            headline: post.title[locale],
            description: post.excerpt[locale],
            articleBody: post.content[locale].join('\n\n'),
            datePublished: post.date,
            url,
            mainEntityOfPage: url,
            author: person,
            keywords: post.tags.join(', '),
            inLanguage: inLanguage(locale),
            sameAs: post.linkedinUrl,
          },
          breadcrumb([
            { name: crumbs.home, url: absoluteUrl(locale) },
            { name: crumbs.section, url: absoluteUrl(locale, '/blog') },
            { name: post.title[locale], url },
          ]),
        ],
      }}
    />
  );
}
