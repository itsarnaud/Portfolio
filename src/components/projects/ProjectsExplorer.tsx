'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { hex } from '@/content/colors';
import { cx } from '@/lib/utils';
import { projectFilters, type ProjectFilter } from './filters';

export type ExplorerItem = {
  slug: string;
  filter: ProjectFilter;
  /** Les trois façons d'afficher le projet, rendues côté serveur. */
  card: ReactNode;
  row: ReactNode;
  compact: ReactNode;
};

type View = 'grid' | 'list';

const chip =
  'inline-flex min-h-11 shrink-0 items-center rounded-full border-2 px-4 font-mono text-sm font-semibold whitespace-nowrap transition-colors duration-200 md:px-4.5';

/**
 * Filtres, compteur et choix de la vue de la page Projets.
 * À chaque changement, les cartes réapparaissent en cascade : on alterne entre deux
 * animations de même effet (cascade-a / cascade-b) pour que le navigateur les rejoue.
 * Desktop : vue « Cartes » ou « Liste ». Mobile : cartes compactes, filtres qui défilent.
 */
export function ProjectsExplorer({ items }: { items: ExplorerItem[] }) {
  const t = useTranslations('projects');
  const tCursor = useTranslations('cursor');
  const [filter, setFilter] = useState<ProjectFilter | 'all'>('all');
  const [view, setView] = useState<View>('grid');
  const [round, setRound] = useState(0);

  const visible = filter === 'all' ? items : items.filter((item) => item.filter === filter);
  const cascade = round % 2 ? 'animate-cascade-b' : 'animate-cascade-a';

  const pickFilter = (next: ProjectFilter | 'all') => {
    if (next === filter) return;
    setFilter(next);
    setRound((r) => r + 1);
  };

  const pickView = (next: View) => {
    if (next === view) return;
    setView(next);
    setRound((r) => r + 1);
  };

  const filters: { id: ProjectFilter | 'all'; label: string }[] = [
    { id: 'all', label: t('all') },
    ...projectFilters.map((id) => ({ id, label: t(`filters.${id}`) })),
  ];

  /** Cascade : 60 ms entre deux cartes, au chargement et après chaque choix. */
  const animated = (index: number) => ({ className: cascade, style: { animationDelay: `${index * 60}ms` } });

  return (
    <div className="flex flex-col gap-3.5 md:gap-8">
      <div className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-2">
        <div
          role="group"
          aria-label={t('filterLabel')}
          className="snap-carousel -mx-4 flex gap-2 overflow-x-auto px-4 pt-1 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:p-0"
        >
          {filters.map(({ id, label }) => {
            const active = id === filter;
            return (
              <button
                key={id}
                type="button"
                onClick={() => pickFilter(id)}
                aria-pressed={active}
                data-cursor={tCursor('filter')}
                data-cursor-color={hex.soleil}
                className={cx(chip, active ? 'bg-encre text-papier' : 'bg-blanc hover:animate-jig')}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="inline-flex items-center gap-2 font-mono text-[13px] text-encre-pale md:ml-2">
          <span aria-hidden="true" className="size-2 animate-pulse-ring rounded-full bg-violet" />
          {t('count', { count: visible.length })}
        </p>

        <div
          role="group"
          aria-label={t('viewLabel')}
          className="hidden overflow-hidden rounded-full border-2 bg-blanc shadow-dure md:ml-auto md:flex"
        >
          {(['grid', 'list'] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => pickView(id)}
              aria-pressed={view === id}
              data-cursor={t(`views.${id}`)}
              data-cursor-color={hex.blanc}
              className={cx(
                'min-h-11 px-5 font-mono text-sm font-semibold transition-colors duration-200',
                view === id ? 'bg-violet text-blanc' : 'bg-blanc hover:bg-papier',
              )}
            >
              {t(`views.${id}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop */}
      {view === 'grid' ? (
        <ul className="hidden grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-7 md:grid">
          {visible.map((item, index) => {
            const { className, style } = animated(index);
            return (
              <li key={`${item.slug}-${round}`} className={cx('flex flex-col [&>*]:grow', className)} style={style}>
                {item.card}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="hidden overflow-hidden rounded-carte border-2 bg-papier shadow-dure-md md:block [&>li:last-child>a]:border-b-0">
          {visible.map((item, index) => {
            const { className, style } = animated(index);
            return (
              <li key={`${item.slug}-${round}`} className={className} style={style}>
                {item.row}
              </li>
            );
          })}
        </ul>
      )}

      {/* Mobile */}
      <ul className="flex flex-col gap-3.5 md:hidden">
        {visible.map((item, index) => {
          const { className, style } = animated(index);
          return (
            <li key={`${item.slug}-${round}`} className={className} style={style}>
              {item.compact}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
