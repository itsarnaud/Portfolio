import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { ProjectCover } from '@/components/projects/ProjectCover';
import { Button } from '@/components/ui/Button';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { Star } from '@/components/ui/Star';
import { bgClass, hex } from '@/content/colors';
import type { ColorName, Project } from '@/content/types';
import { cx } from '@/lib/utils';

function decorColors(color: ColorName): [string, string] {
  return [color === 'citron' ? 'bg-soleil' : 'bg-citron', color === 'rose' ? 'bg-tomate' : 'bg-rose'];
}

// Taille selon le mot le plus long, pour que le titre tienne sur la largeur.
function titleSize(title: string): CSSProperties {
  const longest = Math.max(...title.split(' ').map((word) => word.length));
  return { fontSize: `clamp(40px, calc((min(100vw, 1200px) - 100px) / ${(longest * 0.55).toFixed(2)}), 168px)` };
}

function titleLetters(title: string) {
  const words = title.split(' ');
  const offsets = words.map((_, index) => words.slice(0, index).join('').length);
  return words.map((word, wordIndex) =>
    [...word].map((letter, index) => ({ letter, delay: 150 + (offsets[wordIndex] + index) * 60 })),
  );
}

export function ProjectHero({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations('project');
  const tProjects = useTranslations('projects');
  const [decorA, decorB] = decorColors(project.color);
  const host = new URL(project.url).host.replace(/^www\./, '');
  const isCode = host === 'github.com';
  const badge = project.badge?.[locale] ?? tProjects(`categories.${project.category}`);
  const light = project.color === 'violet' || project.color === 'cobalt';

  // L'affiche est le logo du projet : décorative, le titre est juste au-dessus.
  const poster = (sizes: string) =>
    project.media.poster ? (
      <Image src={project.media.poster} alt="" fill priority sizes={sizes} className="object-cover" />
    ) : (
      <ProjectCover project={project} />
    );

  return (
    <section className="site-container pt-2 md:pt-4">
      <div
        className={cx(
          'relative flex flex-col gap-4 overflow-hidden rounded-[28px] border-2 px-5 py-6 shadow-[5px_5px_0_var(--color-encre)] md:gap-6 md:rounded-[32px] md:p-[clamp(28px,5vw,64px)] md:shadow-dure-md',
          bgClass[project.color],
        )}
      >
        <div aria-hidden="true" className={cx('absolute -top-12.5 -right-12.5 size-37.5 animate-float rounded-full border-2 md:-top-15 md:-right-15 md:size-60', decorA)} />
        <Star outlined spin fill="fill-soleil" className="absolute top-8 right-64 hidden size-12 md:block" />
        <div aria-hidden="true" className={cx('absolute top-57.5 right-17.5 hidden size-17.5 rotate-14 animate-bob rounded-2xl border-2 md:block', decorB)} />

        <div className="relative flex animate-rise flex-wrap gap-1.5 font-mono text-xs font-semibold md:gap-2 md:text-[13px]" style={{ animationDelay: '100ms' }}>
          <span className="rounded-full border-2 border-encre bg-blanc px-2.5 py-1.25 text-encre md:px-3 md:py-1.5">
            {tProjects('number', { number: project.number })}
          </span>
          <span className={cx('rounded-full border-2 px-2.5 py-1.25 md:px-3 md:py-1.5', light ? 'border-blanc' : 'border-encre')}>{badge}</span>
          <span className={cx('rounded-full border-2 px-2.5 py-1.25 md:px-3 md:py-1.5', light ? 'border-blanc' : 'border-encre')}>{project.year}</span>
        </div>

        <h1 aria-label={project.title} className="relative leading-[0.88] tracking-[-0.05em]" style={titleSize(project.title)}>
          <span aria-hidden="true">
            {titleLetters(project.title).map((letters, wordIndex) => (
              <span key={wordIndex}>
                {wordIndex > 0 && ' '}
                <span className="inline-block whitespace-nowrap">
                  {letters.map(({ letter, delay }) => (
                    <span key={delay} className="inline-block animate-pop" style={{ animationDelay: `${delay}ms` }}>
                      {letter}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p className="relative max-w-155 animate-rise text-lg leading-[1.45] md:text-[22px]" style={{ animationDelay: '600ms' }}>
          {project.tagline[locale]}
        </p>

        <div className="relative animate-rise" style={{ animationDelay: '700ms' }}>
          <Button href={project.url} variant="citron" arrow cursor={host} cursorColor={hex.citron} className="w-full md:w-auto">
            {isCode ? t('visitCode') : t('visit')}
          </Button>
        </div>

        <Reveal from="parallax" className="relative mt-4 hidden md:block">
          <div className="overflow-hidden rounded-[18px] border-2 border-encre bg-papier text-encre shadow-dure-md">
            <div className="flex items-center gap-2 border-b-2 border-encre bg-blanc px-3.5 py-2.5">
              <span aria-hidden="true" className="size-2.75 rounded-full border-[1.5px] border-encre bg-tomate" />
              <span aria-hidden="true" className="size-2.75 rounded-full border-[1.5px] border-encre bg-soleil" />
              <span aria-hidden="true" className="size-2.75 rounded-full border-[1.5px] border-encre bg-citron" />
              <span className="ml-3 rounded-full border-[1.5px] border-encre px-3.5 py-1 font-mono text-xs">{host}</span>
            </div>
            <div className={cx('relative aspect-16/8 @container', !project.media.poster && bgClass[project.color])}>
              {poster('(min-width: 1200px) 1070px, 90vw')}
            </div>
          </div>
        </Reveal>

        {project.media.phone ? (
          <PhoneFrame className="relative mt-2 w-52.5 animate-bob self-center md:hidden">
            <Image
              src={project.media.phone}
              alt={tProjects('screenshot', { title: project.title })}
              fill
              priority
              sizes="200px"
              className="object-cover object-top"
            />
          </PhoneFrame>
        ) : (
          <div
            className={cx(
              'relative mt-2 aspect-16/9 animate-bob overflow-hidden rounded-[18px] border-2 border-encre shadow-dure md:hidden @container',
              !project.media.poster && bgClass[project.color],
            )}
          >
            {poster('90vw')}
          </div>
        )}
      </div>
    </section>
  );
}
