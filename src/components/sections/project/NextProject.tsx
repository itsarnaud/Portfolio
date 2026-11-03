import { useLocale, useTranslations } from 'next-intl';
import { bgClass, hex } from '@/content/colors';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';

/** Grande carte vers le projet suivant, dans sa couleur, avec une flèche dans un rond. */
export function NextProject({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations('project');
  const tCursor = useTranslations('cursor');

  return (
    <Reveal className="site-container pt-10 md:pt-24">
      <Link
        href={`/projects/${project.slug}`}
        data-cursor={tCursor('nextProject')}
        data-cursor-color={hex.blanc}
        data-transition-label={project.title}
        className={cx(
          'group/next flex flex-wrap items-center justify-between gap-6 rounded-[28px] border-2 p-[clamp(22px,4vw,44px)] shadow-dure-md',
          'transition-[translate,rotate,box-shadow] duration-200 ease-out hover:-translate-1.25 hover:-rotate-[0.6deg] hover:shadow-[11px_11px_0_var(--color-encre)]',
          'active:translate-0.75 active:shadow-none',
          bgClass[project.color],
        )}
      >
        <span className="flex flex-col gap-2">
          <span className="font-bold md:text-lg">{t('next')}</span>
          <span className="font-display text-[44px] leading-[0.95] font-extrabold tracking-display md:text-[clamp(44px,6vw,80px)]">
            {project.title}
          </span>
          <span className="md:text-lg">{project.tagline[locale]}</span>
        </span>
        <span
          aria-hidden="true"
          className="inline-flex size-16 items-center justify-center rounded-full border-2 border-encre bg-encre text-citron transition-colors duration-200 group-hover/next:bg-citron group-hover/next:text-encre md:size-20"
        >
          <svg viewBox="0 0 24 24" className="size-7 md:size-8" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}
