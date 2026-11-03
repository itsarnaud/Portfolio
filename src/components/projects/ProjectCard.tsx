import { useId } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { bgClass, hex } from '@/content/colors';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/utils';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { Chip } from '@/components/ui/Chip';
import { ProjectCover } from './ProjectCover';

/** Couleurs de carte foncées (ou blanche) : l'étiquette du curseur passe en citron pour ressortir. */
const CITRON_CURSOR = new Set(['violet', 'cobalt', 'blanc']);
const DARK_CARDS = new Set(['violet', 'cobalt']);

type ProjectCardProps = {
  project: Project;
  /** Niveau du titre selon la page (h2 dans une grille, h3 sous une section). */
  headingLevel?: 'h2' | 'h3';
  /** Charge la capture en priorité (cartes visibles dès l'arrivée sur la page). */
  priority?: boolean;
  className?: string;
};

/**
 * Carte à collectionner d'un projet : en-tête mono (N° · type · année), faux navigateur
 * avec la capture, titre, description, stack et badge.
 * Au survol : la carte monte, les points du navigateur se colorent et la flèche tourne.
 */
export function ProjectCard({ project, headingLevel = 'h2', priority = false, className }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const tCursor = useTranslations('cursor');

  const id = useId();
  const Heading = headingLevel;
  const badge = project.badge?.[locale] ?? t(`categories.${project.category}`);
  const screen = DARK_CARDS.has(project.color) ? 'bg-blanc/15' : 'bg-encre/7';

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
      data-cursor={tCursor('viewProject')}
      data-cursor-color={CITRON_CURSOR.has(project.color) ? hex.citron : hex.blanc}
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

      <BrowserFrame className="aspect-16/10 @container" screenClassName={screen}>
        {project.media.desktop ? (
          <Image
            src={project.media.desktop}
            alt={t('screenshot', { title: project.title })}
            fill
            priority={priority}
            sizes="(min-width: 1200px) 380px, (min-width: 768px) 45vw, 92vw"
            className="object-cover object-top"
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
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
