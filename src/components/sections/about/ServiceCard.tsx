'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { bgClass, hex } from '@/content/colors';
import type { ColorName } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cx } from '@/lib/utils';

/** Couleur des détails au dos (sur fond encre) : celle de la carte, citron pour le violet. */
const ACCENT: Partial<Record<ColorName, { text: string; border: string; hex: string }>> = {
  soleil: { text: 'text-soleil', border: 'border-soleil', hex: hex.soleil },
  citron: { text: 'text-citron', border: 'border-citron', hex: hex.citron },
  tomate: { text: 'text-tomate', border: 'border-tomate', hex: hex.tomate },
};

type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
  color: ColorName;
  examples: { slug: string; title: string }[];
};

const face =
  'absolute inset-0 flex flex-col gap-3.5 rounded-carte border-2 border-encre p-5.5 shadow-dure-md backface-hidden md:p-6';

/**
 * Carte de service qui se retourne en 3D pour montrer des projets en exemple.
 * Desktop : au survol (et au focus clavier). Mobile : au toucher, avec un bouton pour revenir.
 */
export function ServiceCard({ number, title, description, color, examples }: ServiceCardProps) {
  const t = useTranslations('about.services');
  const tCursor = useTranslations('cursor');
  const [flipped, setFlipped] = useState(false);
  const accent = ACCENT[color] ?? ACCENT.citron!;
  const exampleLabel = t('examplesLabel', { service: title });

  return (
    <div className="group/flip h-65 perspective-[1100px] md:h-75">
      <div
        className={cx(
          'relative size-full transition-transform duration-700 ease-[cubic-bezier(0.3,1.3,0.4,1)] transform-3d',
          'group-focus-within/flip:rotate-y-180 [@media(hover:hover)]:group-hover/flip:rotate-y-180',
          flipped && 'rotate-y-180',
        )}
      >
        {/* Recto */}
        <div className={cx(face, bgClass[color])}>
          <span className="font-mono text-[13px] font-semibold">{number}</span>
          <h3 className="text-[28px] leading-[1.05] tracking-titre-carte md:text-3xl">{title}</h3>
          <p className="leading-normal">{description}</p>
          <button
            type="button"
            onClick={() => setFlipped(true)}
            aria-label={exampleLabel}
            data-cursor={tCursor('flip')}
            data-cursor-color={hex.blanc}
            className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-full border-2 border-current px-3.5 text-[15px] font-bold"
          >
            {t('examples')}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Verso */}
        <div className={cx(face, 'rotate-y-180 bg-encre text-papier')}>
          <span className={cx('font-mono text-[13px] font-semibold', accent.text)}>
            {t('examplesTitle', { number })}
          </span>
          <ul className="flex flex-col gap-2.5">
            {examples.map((example) => (
              <li key={example.slug}>
                <Link
                  href={`/projects/${example.slug}`}
                  data-cursor={tCursor('view')}
                  data-cursor-color={accent.hex}
                  data-transition-label={example.title}
                  className={cx(
                    'flex items-center justify-between rounded-[14px] border-2 px-3.5 py-3 font-display text-xl font-extrabold transition-colors duration-200 hover:bg-papier hover:text-encre',
                    accent.border,
                  )}
                >
                  {example.title}
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setFlipped(false)}
            className="mt-auto inline-flex min-h-11 items-center self-start rounded-full border-2 border-papier px-3.5 text-sm font-bold [@media(hover:hover)]:hidden"
          >
            {t('flipBack')}
          </button>
        </div>
      </div>
    </div>
  );
}
