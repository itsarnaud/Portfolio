'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Star } from '@/components/ui/Star';
import { hex } from '@/content/colors';
import { cx } from '@/lib/utils';

const LEFT = 'polygon(0 0,54% 0,47% 22%,56% 41%,44% 63%,52% 80%,46% 100%,0 100%)';
const RIGHT = 'polygon(54% 0,100% 0,100% 100%,46% 100%,52% 80%,44% 63%,56% 41%,47% 22%)';

const half =
  'absolute inset-0 flex items-center justify-center rounded-[26px] border-[3px] border-encre bg-cobalt font-display text-[110px] leading-none font-extrabold tracking-[-0.05em] text-blanc shadow-dure-md transition-[translate,rotate] duration-450 ease-rebond md:text-[150px]';

export function BrokenCard() {
  const t = useTranslations('error');
  const tCursor = useTranslations('cursor');
  const [fixed, setFixed] = useState(false);

  return (
    <div className="flex min-w-0 flex-[1_1_380px] animate-rise justify-center pb-16" style={{ animationDelay: '300ms' }}>
      <button
        type="button"
        onClick={() => setFixed((value) => !value)}
        aria-pressed={fixed}
        aria-label={t('card.fixed')}
        data-cursor={tCursor('fix')}
        data-cursor-color={hex.citron}
        className="group/broken relative h-55 w-75 md:h-75 md:w-100"
      >
        {(['left', 'right'] as const).map((side) => (
          <span
            key={side}
            aria-hidden="true"
            style={{ clipPath: side === 'left' ? LEFT : RIGHT }}
            className={cx(
              half,
              // Inclinaison de base (visible si les animations sont réduites), le tremblement par-dessus.
              side === 'left' ? '-rotate-5 animate-shake-l' : 'rotate-4 animate-shake-r',
              '[@media(hover:hover)]:group-hover/broken:animate-none [@media(hover:hover)]:group-hover/broken:rotate-0',
              fixed && 'animate-none rotate-0',
            )}
          >
            500
          </span>
        ))}
        <Star outlined spin fill="fill-soleil" className="absolute -top-6.5 left-[47%] size-8.5" />
        <Star outlined spin fill="fill-tomate" className="absolute -bottom-5.5 left-[41%] size-6.5" />
        <span
          aria-hidden="true"
          className={cx(
            'absolute -bottom-14 left-1/2 w-38 -translate-x-1/2 rounded-full border-2 bg-citron py-1.5 text-center text-[15px] font-bold transition-[opacity,translate] duration-250',
            '[@media(hover:hover)]:group-hover/broken:translate-y-0 [@media(hover:hover)]:group-hover/broken:opacity-100',
            fixed ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0',
          )}
        >
          {t('card.fixed')}
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-6 -right-6 inline-flex size-17.5 animate-spin-slow items-center justify-center rounded-full border-2 bg-rose text-center text-sm leading-[1.1] font-bold"
        >
          {t('badge')}
        </span>
      </button>
    </div>
  );
}
