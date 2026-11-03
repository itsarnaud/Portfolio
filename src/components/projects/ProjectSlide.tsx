import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { bgClass, screenClass } from '@/content/colors';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/utils';
import { ProjectCover } from './ProjectCover';

type ProjectSlideProps = {
  project: Project;
};

/** Carte projet du carrousel mobile de l'accueil : 300px de large, une à la fois. */
export function ProjectSlide({ project }: ProjectSlideProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const tCursor = useTranslations('cursor');

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-transition-label={project.title}
      className={cx(
        'flex w-75 shrink-0 flex-col gap-3 rounded-carte border-2 p-4.5 shadow-[5px_5px_0_var(--color-encre)]',
        'transition-[translate,box-shadow] duration-150 ease-out active:translate-0.75 active:shadow-none',
        bgClass[project.color],
      )}
    >
      <div className="flex flex-wrap gap-1.5 font-mono text-[11px] font-semibold">
        <span className="rounded-full border-2 border-encre bg-papier px-2.25 py-0.75 text-encre">
          {t('number', { number: project.number })}
        </span>
        <span className="rounded-full border-2 border-current px-2.25 py-0.75">{t(`kinds.${project.kind}`)}</span>
      </div>
      <div className={cx('relative aspect-16/10 overflow-hidden rounded-ecran border-2 border-encre @container', screenClass(project.color))}>
        {project.media.poster ? (
          <Image
            src={project.media.poster}
            alt=""
            fill
            sizes="300px"
            className="object-cover"
          />
        ) : (
          <ProjectCover project={project} />
        )}
      </div>
      <h3 className="text-[34px] leading-[0.95] tracking-[-0.035em]">{project.title}</h3>
      <p className="text-[15px] leading-[1.45]">{project.description[locale]}</p>
      <span className="mt-auto inline-flex min-h-10.5 items-center gap-2 self-start rounded-bouton border-2 border-encre bg-papier px-3.5 text-[15px] font-bold text-encre">
        {tCursor('viewProject')}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </span>
    </Link>
  );
}
