import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TextPop } from '@/components/motion/TextPop';
import { filterOfKind } from '@/components/projects/filters';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCompactCard } from '@/components/projects/ProjectCompactCard';
import { ProjectRow } from '@/components/projects/ProjectRow';
import { ProjectsExplorer, type ExplorerItem } from '@/components/projects/ProjectsExplorer';
import { getProjects } from '@/content/projects';
import { resolveLocale } from '@/i18n/locale';
import { staticPageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: PageProps<'/[locale]/projects'>): Promise<Metadata> {
  return staticPageMetadata(params, 'projects');
}

export default async function ProjectsPage({ params }: PageProps<'/[locale]/projects'>) {
  await resolveLocale(params);
  const t = await getTranslations('projects');

  // Rendu côté serveur sous les trois formes : le composant client ne fait que choisir laquelle afficher.
  const items: ExplorerItem[] = getProjects().map((project, index) => ({
    slug: project.slug,
    filter: filterOfKind[project.kind],
    card: <ProjectCard project={project} priority={index < 3} />,
    row: <ProjectRow project={project} />,
    compact: <ProjectCompactCard project={project} />,
  }));

  return (
    <div className="site-container pt-10 md:pt-20">
      <header className="mb-5 flex max-w-190 flex-col gap-4 md:mb-10 md:gap-5">
        <TextPop
          text={t.raw('title')}
          className="text-[54px] leading-[0.95] tracking-display md:text-[clamp(52px,7vw,104px)]"
          renderers={{
            mark: (word) => (
              <span className="inline-block animate-wobble rounded-[0.2em] border-2 bg-rose px-[0.12em]">{word}</span>
            ),
          }}
        />
        <p className="animate-rise leading-[1.55] text-encre-douce md:text-[19px]" style={{ animationDelay: '450ms' }}>
          <span className="pointer-coarse:hidden">{t('intro')}</span>
          <span className="hidden pointer-coarse:inline">{t('introTouch')}</span>
        </p>
      </header>

      <div className="animate-rise pb-10" style={{ animationDelay: '550ms' }}>
        <ProjectsExplorer items={items} />
      </div>
    </div>
  );
}
