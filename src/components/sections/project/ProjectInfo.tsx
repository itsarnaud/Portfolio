import { useLocale, useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { bgClass } from '@/content/colors';
import type { Project } from '@/content/types';
import { cx } from '@/lib/utils';

const box = 'flex h-full flex-col gap-1 rounded-2xl border-2 bg-blanc p-3.5 md:gap-1.5 md:rounded-[18px] md:px-5 md:py-4.5';
const label = 'text-[13px] font-bold text-encre-pale md:text-sm';
const value = 'font-display text-[19px] leading-[1.1] font-extrabold md:text-2xl';

export function ProjectInfo({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations('project');
  const highlight = project.color === 'blanc' ? bgClass.citron : bgClass[project.color];

  return (
    <section className="site-container grid grid-cols-2 gap-3 pt-6 md:grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] md:gap-4 md:pt-10">
      <Reveal>
        <div className={box}>
          <span className={label}>{t('type')}</span>
          <span className={value}>{project.format[locale]}</span>
        </div>
      </Reveal>
      <Reveal>
        <div className={box}>
          <span className={label}>{t('team')}</span>
          <span className={value}>{project.team[locale]}</span>
        </div>
      </Reveal>
      <Reveal className="col-span-2 min-w-0 md:col-span-1">
        <div className={cx(box, 'gap-2.5 md:gap-2.5')}>
          <span className={label}>{t('stack')}</span>
          <ul className="flex flex-wrap gap-1.5 font-mono text-xs md:text-[13px]">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className={cx(
                  'rounded-full border-[1.5px] border-encre px-2.5 py-1 md:hover:animate-jig',
                  project.stack.includes(tech) && highlight,
                )}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
