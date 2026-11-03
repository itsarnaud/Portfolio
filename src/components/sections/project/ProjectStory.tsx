import { useLocale, useTranslations } from 'next-intl';
import type { ColorName, Project } from '@/content/types';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { Reveal } from '@/components/motion/Reveal';
import { Sticker } from '@/components/ui/Sticker';

const STICKERS: { color: ColorName; rotate: number }[] = [
  { color: 'soleil', rotate: -2 },
  { color: 'citron', rotate: 2 },
  { color: 'rose', rotate: -1 },
];

/** « Le projet » (qui arrive de la gauche) et « Le plus dur » (de la droite), avec ses stickers. */
export function ProjectStory({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations('project');

  return (
    <section className="site-container grid gap-10 pt-11 md:grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] md:gap-12 md:pt-24">
      <Reveal from="left" className="flex flex-col gap-3.5 md:gap-4.5">
        <h2 className="text-[34px] tracking-titre md:text-[44px]">{t('about')}</h2>
        {project.about[locale].map((paragraph) => (
          <p key={paragraph} className="leading-[1.6] md:text-lg md:leading-[1.65]">
            {paragraph}
          </p>
        ))}
      </Reveal>

      <Reveal from="right" className="flex flex-col gap-3.5 md:gap-4.5">
        <h2 className="text-[34px] tracking-titre md:text-[44px]">{t('challenge')}</h2>
        {project.challenge[locale].map((paragraph) => (
          <p key={paragraph} className="leading-[1.6] md:text-lg md:leading-[1.65]">
            {paragraph}
          </p>
        ))}
        <PauseOffscreen>
          <ul className="mt-1 flex flex-wrap gap-2.5 md:mt-1.5 md:gap-3">
            {project.highlights[locale].map((highlight, index) => (
              <li key={highlight}>
                <Sticker
                  color={STICKERS[index % STICKERS.length].color}
                  rotate={STICKERS[index % STICKERS.length].rotate}
                  floatOffset={-index * 1.1}
                >
                  {highlight}
                </Sticker>
              </li>
            ))}
          </ul>
        </PauseOffscreen>
      </Reveal>
    </section>
  );
}
