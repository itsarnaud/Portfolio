import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { bgClass, cursorColorOn, screenClass } from '@/content/colors';
import type { Project } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/utils';
import { BrowserFrame } from '@/components/ui/BrowserFrame';
import { Chip } from '@/components/ui/Chip';
import { ProjectCover } from './ProjectCover';

type ProjectStackCardProps = {
  project: Project;
  /** Légère inclinaison, différente pour chaque carte de la pile. */
  rotate: number;
};

/** Grande carte projet des « projets empilés » de l'accueil (desktop) : texte à gauche, capture à droite. */
export function ProjectStackCard({ project, rotate }: ProjectStackCardProps) {
  const locale = useLocale();
  const t = useTranslations('projects');
  const tCursor = useTranslations('cursor');

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor={tCursor('viewProject')}
      data-cursor-color={cursorColorOn(project.color)}
      data-transition-label={project.title}
      style={{ rotate: `${rotate}deg` }}
      className={cx(
        'group/card flex min-h-110 flex-wrap items-stretch gap-7 rounded-[30px] border-2 p-[clamp(22px,3vw,36px)] shadow-[8px_8px_0_var(--color-encre)]',
        'transition-[translate,box-shadow] duration-200 ease-out hover:-translate-1 hover:shadow-[12px_12px_0_var(--color-encre)]',
        bgClass[project.color],
      )}
    >
      <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-4">
        <div className="flex flex-wrap gap-2 font-mono text-[13px] font-semibold">
          <span className="rounded-full border-2 border-encre bg-papier px-2.75 py-1 text-encre">
            {t('number', { number: project.number })}
          </span>
          <span className="rounded-full border-2 border-current px-2.75 py-1">{t(`kinds.${project.kind}`)}</span>
          <span className="rounded-full border-2 border-current px-2.75 py-1">{project.year}</span>
        </div>
        <h3 className="text-[clamp(48px,6vw,84px)] leading-[0.92] tracking-[-0.045em]">{project.title}</h3>
        <p className="max-w-115 text-[19px] leading-normal">{project.description[locale]}</p>
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Chip size="sm">{tech}</Chip>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex min-h-12 items-center gap-2.5 self-start rounded-bouton border-2 border-encre bg-papier px-5 font-bold text-encre shadow-dure">
          {tCursor('viewProject')}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </div>

      <BrowserFrame
        className="min-h-70 min-w-0 flex-[1.2_1_380px] rounded-[18px] @container"
        screenClassName={screenClass(project.color)}
      >
        {project.media.desktop ? (
          <Image
            src={project.media.desktop}
            alt={t('screenshot', { title: project.title })}
            fill
            sizes="(min-width: 1200px) 600px, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <ProjectCover project={project} />
        )}
      </BrowserFrame>
    </Link>
  );
}
