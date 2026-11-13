import { getLocale, getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';
import { GITHUB_URL } from '@/components/layout/navLinks';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { hex } from '@/content/colors';
import { getContributions } from '@/lib/github';
import { cx } from '@/lib/utils';

const LEVELS = ['bg-encre/8', 'bg-violet/30', 'bg-violet/55', 'bg-violet/80', 'bg-violet'];
// Sur mobile, seulement les dernières semaines : sinon les cases seraient minuscules.
const MOBILE_WEEKS = 26;

export async function GitHubActivity({ titleClassName }: { titleClassName: string }) {
  const calendar = await getContributions();
  if (!calendar) return null;

  const locale = await getLocale();
  const t = await getTranslations('experiences.github');
  const tCursor = await getTranslations('cursor');
  const offset = calendar.weeks - MOBILE_WEEKS;
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });

  // Un repère au début de chaque mois, sans deux repères trop proches.
  const months: { week: number; label: string }[] = [];
  let lastMonth = -1;
  for (const day of calendar.days) {
    if (day.weekday !== 0) continue;
    const date = new Date(`${day.date}T00:00:00Z`);
    if (date.getUTCMonth() === lastMonth) continue;
    lastMonth = date.getUTCMonth();
    if (day.week - (months.at(-1)?.week ?? -3) < 3) continue;
    months.push({ week: day.week, label: monthFormat.format(date).replace('.', '') });
  }

  const place = (week: number): CSSProperties =>
    ({ '--c': week + 1, '--cm': week - offset + 1 }) as CSSProperties;
  const grid =
    'grid grid-cols-[repeat(var(--cols-m),minmax(0,1fr))] gap-[3px] md:grid-cols-[repeat(var(--cols),minmax(0,1fr))] md:gap-1';
  const cell = (week: number) => cx('[grid-column:var(--cm)] md:[grid-column:var(--c)]', week < offset && 'max-md:hidden');
  const columns = { '--cols': calendar.weeks, '--cols-m': MOBILE_WEEKS } as CSSProperties;

  return (
    <section aria-labelledby="github-title" className="flex flex-col gap-7 pt-10 md:pt-14">
      <Reveal className="self-start">
        <h2 id="github-title" className={cx(titleClassName, '-rotate-1 bg-rose')}>
          {t('title')}
        </h2>
      </Reveal>
      <Reveal>
        <div className="flex flex-col gap-5 rounded-carte border-2 bg-blanc p-5 shadow-dure-md md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="flex flex-col gap-1">
              <span className="font-display text-4xl font-extrabold tracking-titre md:text-5xl">
                {t('count', { count: calendar.total })}
              </span>
              <span className="text-encre-douce md:text-lg">{t('period')}</span>
            </p>
            <Button href={GITHUB_URL} variant="blanc" arrow cursor={tCursor('github')} cursorColor={hex.citron}>
              {t('link')}
            </Button>
          </div>

          <div aria-hidden="true" className="flex flex-col gap-1.5">
            <div className={cx(grid, 'font-mono text-[11px] text-encre-pale')} style={columns}>
              {months.map(({ week, label }) => (
                <span key={week} style={place(week)} className={cx(cell(week), 'col-span-3 whitespace-nowrap')}>
                  {label}
                </span>
              ))}
            </div>
            <div className={cx(grid, '[grid-auto-flow:column] grid-rows-7')} style={columns}>
              {calendar.days.map((day) => (
                <span
                  key={day.date}
                  style={{ ...place(day.week), gridRow: day.weekday + 1 }}
                  className={cx(cell(day.week), 'aspect-square rounded-[3px]', LEVELS[day.level])}
                />
              ))}
            </div>
            <div className="mt-1 flex items-center justify-end gap-1.5 font-mono text-[11px] text-encre-pale">
              {t('less')}
              {LEVELS.map((level) => (
                <span key={level} className={cx('size-3 rounded-[3px]', level)} />
              ))}
              {t('more')}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
