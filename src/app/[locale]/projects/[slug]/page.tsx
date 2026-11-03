import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { hex } from '@/content/colors';
import { getNextProject, getProject, getProjects } from '@/content/projects';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/locale';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { NextProject } from '@/components/sections/project/NextProject';
import { ProjectGallery } from '@/components/sections/project/ProjectGallery';
import { ProjectHero } from '@/components/sections/project/ProjectHero';
import { ProjectInfo } from '@/components/sections/project/ProjectInfo';
import { ProjectStory } from '@/components/sections/project/ProjectStory';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getProjects().map(({ slug }) => ({ locale, slug })));
}

export default async function ProjectPage({ params }: PageProps<'/[locale]/projects/[slug]'>) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations('project');
  const tCursor = await getTranslations('cursor');
  const gallery = project.media.gallery.map(({ src, alt, portrait }) => ({ src, alt: alt[locale], portrait }));

  return (
    <article>
      <div className="site-container pt-5 md:pt-10">
        <Link
          href="/projects"
          data-cursor={tCursor('back')}
          data-cursor-color={hex.blanc}
          className="inline-flex min-h-11 animate-rise items-center gap-2 font-mono text-sm font-semibold hover:text-violet"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          {t('back')}
        </Link>
      </div>

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
