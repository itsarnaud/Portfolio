import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GrowLine } from '@/components/motion/GrowLine';
import { Reveal } from '@/components/motion/Reveal';
import { TextPop } from '@/components/motion/TextPop';
import { JobCard } from '@/components/sections/experiences/JobCard';
import { Button } from '@/components/ui/Button';
import { bgClass, hex } from '@/content/colors';
import { education, experiences } from '@/content/experiences';
import { resolveLocale } from '@/i18n/locale';
import { staticPageMetadata } from '@/lib/seo';
import { cx } from '@/lib/utils';

const sectionTitle = 'self-start rounded-full border-2 px-4.5 py-1.5 font-display text-2xl font-extrabold shadow-dure md:text-[28px]';

export function generateMetadata({ params }: PageProps<'/[locale]/experiences'>): Promise<Metadata> {
  return staticPageMetadata(params, 'experiences', 'profile');
}

export default async function ExperiencesPage({ params }: PageProps<'/[locale]/experiences'>) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('experiences');
  const tCursor = await getTranslations('cursor');

  return (
    <div className="site-container pt-10 md:pt-20">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-7 md:mb-12">
        <div className="flex max-w-180 flex-col gap-4 md:gap-5">
          <TextPop
            text={t.raw('title')}
            className="text-[54px] leading-[0.95] tracking-display md:text-[clamp(52px,7vw,104px)]"
            renderers={{
              mark: (word) => (
                <span className="inline-block animate-bob rounded-full border-2 bg-cobalt px-[0.22em] text-blanc">{word}</span>
              ),
            }}
          />
          <p className="animate-rise leading-[1.55] text-encre-douce md:text-[19px]" style={{ animationDelay: '400ms' }}>
            {t('intro')}
          </p>
        </div>
        <div className="animate-rise" style={{ animationDelay: '500ms' }}>
          <Button href="/files/cv.pdf" download variant="soleil" arrow cursor={tCursor('pdf')} cursorColor={hex.blanc}>
            {t('cv')}
          </Button>
        </div>
      </header>

      <section aria-labelledby="jobs-title" className="flex flex-col gap-7">
        <h2 id="jobs-title" className={cx(sectionTitle, '-rotate-2 animate-rise bg-violet text-blanc')}>
          {t('jobs')}
        </h2>
        <div className="timeline relative ml-2.5">
          <GrowLine
            axis="y"
            trigger=".timeline"
            start="top 75%"
            end="bottom 60%"
            className="absolute top-0 bottom-0 left-0 w-0.75"
          />
          <ol>
            {experiences.map((job, index) => (
              <li key={job.id} className="relative pb-9 pl-7 md:pl-9.5">
                <Reveal from="pop" className="absolute top-1.5 -left-2.5">
                  <span aria-hidden="true" className={cx('block size-5 rounded-full border-2 border-encre', bgClass[job.color])} />
                </Reveal>
                <Reveal from="right">
                  <p className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm font-semibold">
                    <span>{job.period[locale]}</span>
                    <span className="font-normal text-encre-pale">{job.place}</span>
                    {job.current && (
                      <span className="rounded-full border-[1.5px] bg-citron px-2.5 py-0.75 text-xs">
                          {t('current')}
                      </span>
                    )}
                  </p>
                  <JobCard
                    role={job.role[locale]}
                    company={job.company}
                    description={job.description[locale]}
                    stack={job.stack}
                    points={job.points[locale]}
                    color={job.color}
                    defaultOpen={index === 0}
                  />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="education-title" className="flex flex-col gap-7 pt-10 md:pt-14">
        <Reveal className="self-start">
          <h2 id="education-title" className={cx(sectionTitle, 'rotate-2 bg-citron')}>
            {t('education')}
          </h2>
        </Reveal>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5.5 pb-4">
          {education.map((school) => (
            <li key={school.period} className="flex">
              <Reveal className="flex flex-1">
                <div
                  className={cx(
                    'flex flex-1 flex-col gap-2.5 rounded-carte border-2 p-6 shadow-dure-md',
                    'transition-[translate,rotate,box-shadow] duration-200 ease-out hover:-translate-1.25 hover:-rotate-[0.6deg] hover:shadow-[11px_11px_0_var(--color-encre)]',
                    bgClass[school.color],
                  )}
                >
                  <span className="font-mono text-sm font-semibold">{school.period}</span>
                  <h3 className="text-2xl leading-[1.15] tracking-titre-carte">{school.title[locale]}</h3>
                  <p className="leading-normal">{school.school[locale]}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
