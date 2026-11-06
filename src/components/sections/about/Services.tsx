import { useLocale, useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { Arrow } from '@/components/ui/Arrow';
import { getProject } from '@/content/projects';
import { services } from '@/content/services';
import { ServiceCard } from './ServiceCard';

export function Services() {
  const locale = useLocale();
  const t = useTranslations('about.services');

  return (
    <section aria-labelledby="services-title" className="site-container flex flex-col gap-6 pt-12 md:gap-8 md:pt-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="services-title" className="text-[34px] tracking-titre md:text-[clamp(40px,5vw,64px)]">
          {t('title')}
        </h2>
        <p className="inline-flex items-center gap-2 text-encre-douce">
          <span className="pointer-coarse:hidden">{t('hint')}</span>
          <span className="hidden pointer-coarse:inline">{t('hintTouch')}</span>
          <Arrow className="size-4" />
        </p>
      </Reveal>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5.5">
        {services.map((service, index) => (
          <li key={service.id}>
            <Reveal>
              <ServiceCard
                number={String(index + 1).padStart(2, '0')}
                title={service.title[locale]}
                description={service.description[locale]}
                color={service.color}
                examples={service.examples.flatMap((slug) => {
                  const project = getProject(slug);
                  return project ? [{ slug, title: project.title }] : [];
                })}
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
