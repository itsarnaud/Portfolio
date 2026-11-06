import { Fragment, type ReactNode } from 'react';
import { cx } from '@/lib/utils';

type MarqueeProps = {
  items: string[];
  separator?: (index: number) => ReactNode;
  reverse?: boolean;
  duration?: number;
  repeat?: number;
  className?: string;
  trackClassName?: string;
};

// Contenu rendu deux fois et décalé d'une moitié, pour que la boucle ne se voie pas.
export function Marquee({
  items,
  separator,
  reverse = false,
  duration = 34,
  repeat = 2,
  className,
  trackClassName,
}: MarqueeProps) {
  const sequence = Array.from({ length: repeat }, () => items).flat();

  const half = (copy: number) => (
    <div className={cx('flex shrink-0 items-center', trackClassName)}>
      {sequence.map((item, index) => (
        <Fragment key={`${copy}-${index}`}>
          <span>{item}</span>
          {separator?.(index)}
        </Fragment>
      ))}
    </div>
  );

  return (
    <div aria-hidden="true" className={cx('overflow-hidden', className)}>
      <div
        className="flex w-max animate-marquee group-hover/tape:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {half(0)}
        {half(1)}
      </div>
    </div>
  );
}
