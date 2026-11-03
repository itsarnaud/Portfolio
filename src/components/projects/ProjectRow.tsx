import { useLocale, useTranslations } from 'next-intl';
import { bgClass, cursorColorOn } from '@/content/colors';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/utils';

type ProjectRowProps = {
  project: Project;
};

/** Ligne de la vue « Liste » (page Projets, desktop). Au survol, la ligne s'éclaire et le N° penche. */
export function ProjectRow({ project }: ProjectRowProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const tCursor = useTranslations('cursor');

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor={tCursor('viewProject')}
      data-cursor-color={cursorColorOn(project.color)}
      data-transition-label={project.title}
      className="group/row flex flex-wrap items-center gap-x-6 gap-y-4 border-b-2 px-5.5 py-4.5 transition-[background-color,padding] duration-250 ease-out hover:bg-blanc hover:pl-8.5"
    >
      <span
        className={cx(
          'w-14.5 shrink-0 rounded-[10px] border-2 border-encre py-1.5 text-center font-mono text-xs font-semibold',
          'transition-[rotate] duration-300 ease-rebond group-hover/row:-rotate-10',
          bgClass[project.color],
        )}
      >
        {t('number', { number: project.number })}
      </span>
      <span className="flex-[1_1_220px] font-display text-[26px] font-extrabold tracking-titre-carte">{project.title}</span>
      <span className="flex-[2_1_280px] text-encre-douce">{project.description[locale]}</span>
      <span className="w-30 shrink-0 font-mono text-[13px]">{t(`kinds.${project.kind}`)}</span>
      <span className="w-12 shrink-0 font-mono text-[13px]">{project.year}</span>
    </Link>
  );
}
