'use client';

import { useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { hex } from '@/content/colors';
import type { PostCategory } from '@/content/types';
import { cx } from '@/lib/utils';
import { postCategories } from './categories';

export type BlogItem = {
  slug: string;
  category: PostCategory;
  /** La carte normale et sa version mise en avant (premier post de la liste), rendues côté serveur. */
  card: ReactNode;
  featured: ReactNode;
};

/** Couleur de l'étiquette du curseur sur chaque filtre. */
const FILTER_CURSOR: Record<PostCategory | 'all', string> = {
  all: hex.soleil,
  projects: hex.citron,
  ai: hex.blanc,
  freelance: hex.citron,
  society: hex.soleil,
};

/**
 * Filtres par sujet et liste des posts. Le premier post visible passe en grand.
 * À chaque changement, les cartes réapparaissent en cascade.
 */
export function BlogExplorer({ items }: { items: BlogItem[] }) {
  const t = useTranslations('blog');
  const tCursor = useTranslations('cursor');
  const [filter, setFilter] = useState<PostCategory | 'all'>('all');
  const [round, setRound] = useState(0);

  const visible = filter === 'all' ? items : items.filter((item) => item.category === filter);
  const cascade = round % 2 ? 'animate-cascade-b' : 'animate-cascade-a';

  const pick = (next: PostCategory | 'all') => {
    if (next === filter) return;
    setFilter(next);
    setRound((r) => r + 1);
  };

  return (
    <div className="flex flex-col gap-3.5 md:gap-8">
      <div className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-2">
        <div
          role="group"
          aria-label={t('filterLabel')}
          className="snap-carousel -mx-4 flex gap-2 overflow-x-auto px-4 pt-1 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:p-0"
        >
          {(['all', ...postCategories] as const).map((id) => {
            const active = id === filter;
            return (
              <button
                key={id}
                type="button"
                onClick={() => pick(id)}
                aria-pressed={active}
                data-cursor={tCursor('filter')}
                data-cursor-color={FILTER_CURSOR[id]}
                className={cx(
                  'inline-flex min-h-11 shrink-0 items-center rounded-full border-2 px-4 font-mono text-sm font-semibold whitespace-nowrap transition-colors duration-200 md:px-4.5',
                  active ? 'bg-encre text-papier' : 'bg-blanc hover:animate-jig',
                )}
              >
                {id === 'all' ? t('all') : t(`categories.${id}`)}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="sr-only">
          {t('count', { count: visible.length })}
        </p>
      </div>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-5 pt-4 md:gap-7">
        {visible.map((item, index) => (
          <li
            key={`${item.slug}-${round}`}
            className={cx('flex', cascade, index === 0 && 'col-span-full')}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            {index === 0 ? item.featured : item.card}
          </li>
        ))}
      </ul>
    </div>
  );
}
