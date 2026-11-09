import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { NextProject } from '@/components/sections/project/NextProject';
import { ProjectGallery } from '@/components/sections/project/ProjectGallery';
import { ProjectHero } from '@/components/sections/project/ProjectHero';
import { ProjectInfo } from '@/components/sections/project/ProjectInfo';
import { ProjectStory } from '@/components/sections/project/ProjectStory';
import { ProjectJsonLd } from '@/components/seo/JsonLd';
import { BackLink } from '@/components/ui/BackLink';
import { getNextProject, getProject, getProjects } from '@/content/projects';
import { metadataLocale, resolveLocale } from '@/i18n/locale';
import { routing } from '@/i18n/routing';
import { pageMetadata, SITE_NAME } from '@/lib/seo';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getProjects().map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/projects/[slug]'>): Promise<Metadata> {
  const locale = await metadataLocale(params);
  const project = getProject((await params).slug);
  if (!project) return {};
  const ogImage = `/images/og/${project.slug}.png`;
  return pageMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: project.title,
    description: project.description[locale],
    type: 'article',
    image: existsSync(join(process.cwd(), 'public', ogImage)) ? { url: ogImage, alt: project.title } : undefined,
    keywords: [project.title, ...project.technologies, SITE_NAME],
  });
}

export default async function ProjectPage({ params }: PageProps<'/[locale]/projects/[slug]'>) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations('project');
  const tNav = await getTranslations('nav');
  const gallery = project.media.gallery.map(({ src, alt, portrait }) => ({ src, alt: alt[locale], portrait }));

  return (
    <article>
      <ProjectJsonLd project={project} locale={locale} crumbs={{ home: tNav('home'), section: tNav('projects') }} />
      <BackLink href="/projects" label={t('back')} />

      <PauseOffscreen>
        <ProjectHero project={project} />
      </PauseOffscreen>
      <ProjectInfo project={project} />
      <ProjectStory project={project} />
      {gallery.length > 0 && <ProjectGallery images={gallery} />}
      <PauseOffscreen>
        <NextProject project={getNextProject(project.slug)} />
      </PauseOffscreen>
    </article>
  );
}
