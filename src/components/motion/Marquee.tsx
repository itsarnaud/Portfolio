import { Fragment, type ReactNode } from 'react';
import { cx } from '@/lib/utils';

type MarqueeProps = {
  items: string[];
  /** Ce qui sépare deux éléments (une étoile, un ✦). Reçoit l'index de l'élément. */
  separator?: (index: number) => ReactNode;
  /** Défile vers la droite au lieu de la gauche. */
  reverse?: boolean;
  /** Durée d'un tour complet, en secondes. Plus c'est long, plus c'est lent. */
  duration?: number;
  /** Nombre de répétitions de la liste dans chaque moitié, pour remplir les grands écrans. */
  repeat?: number;
  className?: string;
  trackClassName?: string;
};

/**
 * Bandeau qui défile en boucle, en CSS uniquement.
 * Le contenu est rendu deux fois et décalé d'une moitié, pour que la boucle ne se voie pas.
 * S'arrête au survol de son parent .group/tape. Décoratif : caché aux lecteurs d'écran.
 */
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
