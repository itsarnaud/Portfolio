import { useLocale, useTranslations } from 'next-intl';
import { GrowLine } from '@/components/motion/GrowLine';
import { Reveal } from '@/components/motion/Reveal';
import { bgClass } from '@/content/colors';
import { processSteps } from '@/content/services';
import { cx } from '@/lib/utils';

export function Process() {
  const locale = useLocale();
  const t = useTranslations('about.process');

  return (
    <section aria-labelledby="process-title" className="site-container flex flex-col gap-6 pt-14 md:gap-8 md:pt-24">
      <Reveal>
        <h2 id="process-title" className="text-[34px] tracking-titre md:text-[clamp(40px,5vw,64px)]">
          {t('title')}
        </h2>
      </Reveal>

      <Reveal>
        <div className="process relative overflow-hidden rounded-carte border-2 bg-blanc shadow-dure-md">
          <GrowLine
            trigger=".process"
            start="top 75%"
            end="top 40%"
            className="absolute top-11.75 right-12 left-12 z-0 hidden h-0.75 min-[66rem]:block"
          />
          <ol className="relative grid md:grid-cols-2 min-[66rem]:grid-cols-4">
            {processSteps.map((step, index) => (
              <li
                key={step.title.fr}
                className="group/step relative flex flex-col gap-2.5 p-5.5 transition-colors duration-200 hover:bg-papier md:p-6.5"
              >
                <span
                  className={cx(
                    'relative z-1 inline-flex size-11 items-center justify-center rounded-full border-2 border-encre font-display text-xl font-extrabold',
                    'transition-[rotate,scale] duration-350 ease-rebond group-hover/step:-rotate-14 group-hover/step:scale-115',
                    bgClass[step.color],
                  )}
                >
                  {index + 1}
                </span>
                <h3 className="text-2xl">{step.title[locale]}</h3>
                <p className="leading-normal">{step.description[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
