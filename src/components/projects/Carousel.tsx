'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '@/lib/utils';

type CarouselProps = {
  /** Nom du carrousel pour les lecteurs d'écran (« Mes derniers projets »). */
  label: string;
  className?: string;
  children: ReactNode;
};

/**
 * Carrousel horizontal en CSS (scroll-snap), une carte à la fois, avec des points
 * qui montrent la carte visible. Le JavaScript ne sert qu'à mettre à jour les points.
 */
export function Carousel({ label, className, children }: CarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const first = list.firstElementChild as HTMLElement | null;
        if (!first) return;
        const step = first.offsetWidth + parseFloat(getComputedStyle(list).columnGap || '0');
        setActive(Math.min(items.length - 1, Math.max(0, Math.round(list.scrollLeft / step))));
      });
    };

    list.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener('scroll', onScroll);
    };
  }, [items.length]);

  return (
    <div className={className}>
      {/* tabIndex : le carrousel doit pouvoir défiler au clavier, même sans lien à l'intérieur. */}
      <ul ref={listRef} aria-label={label} tabIndex={0} className="snap-carousel flex gap-3.5 overflow-x-auto scroll-px-4 px-4 pt-1 pb-4">
        {items.map((item, index) => (
          <li key={index} className="flex">
            {item}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex justify-center gap-1.5">
        {items.map((_, index) => (
          <span
            key={index}
            className={cx(
              'h-2 rounded-full border-[1.5px] transition-[width,background-color] duration-200',
              index === active ? 'w-6.5 bg-encre' : 'w-2 bg-blanc',
            )}
          />
        ))}
      </div>
    </div>
  );
}
