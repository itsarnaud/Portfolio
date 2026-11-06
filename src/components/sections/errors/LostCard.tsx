'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Star } from '@/components/ui/Star';
import { hex } from '@/content/colors';
import { cx } from '@/lib/utils';

// Le grand « 404 » transmet son interlettrage en valeur fixe : chaque texte de la carte remet le sien.
const face =
  'absolute inset-0 flex flex-col items-center justify-center rounded-[0.09em] border-[3px] border-encre shadow-dure-md backface-hidden';

export function LostCard() {
  const t = useTranslations('notFound.card');
  const tCursor = useTranslations('cursor');
  const [flipped, setFlipped] = useState(false);

  return (
    <span className="inline-block animate-drop" style={{ animationDelay: '300ms' }}>
      <span className="inline-block animate-float">
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          aria-pressed={flipped}
          aria-label={`${t('title')}. ${t('text')}`}
          data-cursor={tCursor('flip')}
          data-cursor-color={hex.citron}
          className="group/lost block h-[0.9em] w-[0.7em] perspective-[1200px] focus-visible:outline-offset-8"
        >
          <span
            className={cx(
              'relative block size-full transition-transform duration-700 ease-[cubic-bezier(0.3,1.4,0.5,1)] transform-3d',
              '[@media(hover:hover)]:group-hover/lost:rotate-y-180',
              flipped && 'rotate-y-180',
            )}
          >
            <span className={cx(face, 'bg-violet text-blanc')}>
              <Star fill="fill-citron" outlined spin className="absolute top-[0.06em] right-[0.06em] size-[0.12em]" />
              <span className="text-[0.57em] leading-none tracking-normal">?</span>
              <span className="absolute bottom-[6%] left-[9%] font-mono text-[0.047em] font-semibold tracking-normal">
                {t('number')}
              </span>
            </span>
            <span className={cx(face, 'rotate-y-180 gap-[0.035em] bg-citron p-[0.07em] text-center text-encre')}>
              <span className="text-[0.13em] leading-none tracking-titre">{t('title')}</span>
              <span className="font-sans text-[0.057em] leading-[1.35] font-bold tracking-normal">
                <span className="max-md:hidden">{t('text')}</span>
                <span className="md:hidden">{t('textShort')}</span>
              </span>
            </span>
          </span>
        </button>
      </span>
    </span>
  );
}
