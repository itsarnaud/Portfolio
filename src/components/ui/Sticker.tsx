import type { CSSProperties, ReactNode } from 'react';
import { bgClass } from '@/content/colors';
import type { ColorName } from '@/content/types';
import { cx } from '@/lib/utils';

type StickerProps = {
  color: ColorName;
  rotate?: number;
  float?: boolean;
  floatOffset?: number;
  size?: 'sm' | 'md' | 'lg';
  flat?: boolean;
  className?: string;
  children: ReactNode;
};

export function Sticker({
  color,
  rotate = -2,
  float = true,
  floatOffset = 0,
  size = 'md',
  flat = false,
  className,
  children,
}: StickerProps) {
  return (
    <span
      className={cx('inline-block', float && 'animate-float')}
      style={float ? { animationDelay: `${floatOffset}s` } : undefined}
    >
      <span
        style={{ '--rot': `${rotate}deg`, rotate: `${rotate}deg` } as CSSProperties}
        className={cx(
          'inline-block rounded-full border-2 font-bold whitespace-nowrap',
          'hover:animate-jig',
          !flat && 'shadow-dure',
          { sm: 'px-3.5 py-2 text-[15px]', md: 'px-4.5 py-2.5 text-base', lg: 'px-5 py-3 text-lg' }[size],
          bgClass[color],
          className,
        )}
      >
        {children}
      </span>
    </span>
  );
}
