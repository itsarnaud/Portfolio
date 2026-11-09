import { useTranslations } from 'next-intl';
import { DrawUnderline } from '@/components/motion/DrawUnderline';
import { Reveal } from '@/components/motion/Reveal';
import { Carousel } from '@/components/projects/Carousel';
import { ProjectSlide } from '@/components/projects/ProjectSlide';
import { ProjectStackCard } from '@/components/projects/ProjectStackCard';
import { hex } from '@/content/colors';
import { getProjects } from '@/content/projects';
import { stripMarks } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

const ROTATIONS = [-1.2, 1, -0.6, 1.4, -1];
const STICKY_TOP = 120;
const STICKY_STEP = 26;

export function LatestProjects() {
  const t = useTranslations('home.latest');
  const tCursor = useTranslations('cursor');
  const all = getProjects();
  // Les plus récents, autant que d'inclinaisons prévues.
  const projects = all.slice(0, ROTATIONS.length);
  const total = all.length;

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

      <div className="md:hidden">
        <Carousel label={stripMarks(t.raw('title'))}>
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
