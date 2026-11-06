import { useTranslations } from 'next-intl';
import { hex } from '@/content/colors';
import { featuredProjects } from '@/content/home';
import { getProject, getProjects } from '@/content/projects';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { DrawUnderline } from '@/components/motion/DrawUnderline';
import { Reveal } from '@/components/motion/Reveal';
import { Carousel } from '@/components/projects/Carousel';
import { ProjectSlide } from '@/components/projects/ProjectSlide';
import { ProjectStackCard } from '@/components/projects/ProjectStackCard';

/** Inclinaison de chaque carte de la pile. */
const ROTATIONS = [-1.2, 1, -0.6, 1.4, -1];
/** Hauteur où la première carte se fige, puis décalage pour chaque carte suivante. */
const STICKY_TOP = 120;
const STICKY_STEP = 26;

/**
 * « Mes derniers projets ». Desktop : les cartes s'empilent au scroll (position: sticky,
 * chaque carte se fige 26px plus bas que la précédente). Mobile : carrousel horizontal avec des points.
 */
export function LatestProjects() {
  const t = useTranslations('home.latest');
  const tCursor = useTranslations('cursor');
  const projects = featuredProjects.map(getProject).filter((project): project is Project => Boolean(project));
  const total = getProjects().length;

  return (
    <section aria-labelledby="latest-title" className="pt-12 pb-2 md:pt-24 md:pb-10">
      <Reveal className="site-container mb-5 flex flex-wrap items-end justify-between gap-5 md:mb-12">
        <h2 id="latest-title" className="text-4xl tracking-titre md:text-[clamp(40px,5.4vw,72px)]">
          {t.rich('title', { mark: (word) => <DrawUnderline>{word}</DrawUnderline> })}
        </h2>
        <Link
          href="/projects"
          data-cursor={tCursor('seeAll')}
          data-cursor-color={hex.rose}
          className="hidden min-h-11 items-center text-[17px] font-bold underline underline-offset-4 hover:text-violet md:inline-flex"
        >
          {t('seeAll', { count: total })}
        </Link>
      </Reveal>

      {/* Desktop : la pile */}
      <ul className="site-container hidden flex-col gap-12 md:flex">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="sticky"
            style={{ top: STICKY_TOP + index * STICKY_STEP, zIndex: index + 1 }}
          >
            <ProjectStackCard project={project} rotate={ROTATIONS[index % ROTATIONS.length]} />
          </li>
        ))}
      </ul>

      {/* Mobile : le carrousel */}
      <div className="md:hidden">
        <Carousel label={(t.raw('title') as string).replace(/<\/?mark>/g, '')}>
          {projects.map((project) => (
            <ProjectSlide key={project.slug} project={project} />
          ))}
        </Carousel>
        <div className="px-4 pt-4">
          <Link
            href="/projects"
            className="flex min-h-13 items-center justify-center rounded-bouton border-2 border-dashed font-bold transition-colors active:bg-blanc"
          >
            {t('seeAll', { count: total })}
          </Link>
        </div>
      </div>
    </section>
  );
}
