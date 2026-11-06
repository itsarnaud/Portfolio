import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useId } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { Chip } from '@/components/ui/Chip';
import { bgClass, cursorColorOn, screenClass } from '@/content/colors';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/utils';
import { ProjectCover } from './ProjectCover';

type ProjectCardProps = {
  project: Project;
  headingLevel?: 'h2' | 'h3';
  priority?: boolean;
  className?: string;
};

export function ProjectCard({ project, headingLevel = 'h2', priority = false, className }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const tCursor = useTranslations('cursor');

  const id = useId();
  const Heading = headingLevel;
  const badge = project.badge?.[locale] ?? t(`categories.${project.category}`);

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-labelledby={`${id}-title`}
      data-transition-label={project.title}
      aria-describedby={`${id}-desc`}
      data-cursor={tCursor('viewProject')}
      data-cursor-color={cursorColorOn(project.color)}
      className={cx(
        'group/card flex flex-col gap-3.5 rounded-carte border-2 p-4.5 shadow-dure-md',
        'transition-[translate,rotate,box-shadow] duration-200 ease-out',
        'hover:-translate-1.25 hover:-rotate-[0.8deg] hover:shadow-dure-lg',
        bgClass[project.color],
        className,
      )}
    >
      <div className="flex items-center justify-between font-mono text-xs font-semibold">
        <span>
          {t('number', { number: project.number })} · {t(`kinds.${project.kind}`)}
        </span>
        <span>{project.year}</span>
      </div>

      <BrowserFrame className="aspect-16/10 @container" screenClassName={screenClass(project.color)}>
        {project.media.poster ? (
          <Image
            src={project.media.poster}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1200px) 380px, (min-width: 768px) 45vw, 92vw"
            className="object-cover"
          />
        ) : (
          <ProjectCover project={project} />
        )}
      </BrowserFrame>

      <Heading id={`${id}-title`} className="text-3xl leading-[1.05] tracking-titre-carte">{project.title}</Heading>
      <p id={`${id}-desc`} className="leading-[1.45]">{project.description[locale]}</p>

      <ul className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Chip size="sm">{tech}</Chip>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-current pt-3">
        <span className="font-mono text-xs font-semibold">{badge}</span>
        <span
          aria-hidden="true"
          className={cx(
            'inline-flex size-8.5 items-center justify-center rounded-full border-2 border-encre bg-papier text-encre',
            'transition-[rotate,background-color] duration-300 ease-rebond',
            'group-hover/card:rotate-45 group-hover/card:bg-citron',
          )}
        >
          <Arrow direction="up-right" className="size-4" />
        </span>
      </div>
    </Link>
  );
}
