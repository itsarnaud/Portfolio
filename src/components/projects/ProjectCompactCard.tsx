import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { bgClass, screenClass } from '@/content/colors';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/utils';

type ProjectCompactCardProps = {
  project: Project;
};

export function ProjectCompactCard({ project }: ProjectCompactCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-transition-label={project.title}
      className="flex items-stretch gap-3.5 rounded-[20px] border-2 bg-blanc p-3 shadow-dure transition-[translate,box-shadow] duration-150 ease-out active:translate-0.75 active:shadow-none"
    >
      <span
        aria-hidden="true"
        className={cx(
          'flex h-25 w-23 shrink-0 flex-col justify-between rounded-[14px] border-2 border-encre p-2',
          bgClass[project.color],
        )}
      >
        <span className="font-mono text-[11px] font-semibold">{t('number', { number: project.number })}</span>
        <span className={cx('relative h-8.5 overflow-hidden rounded-[7px] border-[1.5px] border-encre', screenClass(project.color))}>
          {project.media.poster && (
            <Image src={project.media.poster} alt="" fill sizes="76px" className="object-cover" />
          )}
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1.25">
        <span className="font-display text-[22px] leading-[1.05] font-extrabold tracking-titre-carte">{project.title}</span>
        <span className="text-sm leading-[1.4] text-encre-douce">{project.description[locale]}</span>
        <span className="mt-auto font-mono text-[11px] font-semibold text-encre-pale">
          {t(`kinds.${project.kind}`)} · {project.year}
        </span>
      </span>
    </Link>
  );
}
