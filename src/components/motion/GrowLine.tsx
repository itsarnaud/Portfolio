'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/lib/utils';

type GrowLineProps = {
  /** Horizontale (étapes de la page À propos) ou verticale (frise du parcours). */
  axis?: 'x' | 'y';
  /** Élément dont le défilement fait avancer la ligne (par défaut, la ligne elle-même). */
  trigger?: string;
  start?: string;
  end?: string;
  className?: string;
};

/** Ligne qui se dessine au fil du défilement. Décorative. */
export function GrowLine({ axis = 'x', trigger, start = 'top 80%', end = 'top 50%', className }: GrowLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const scale = axis === 'x' ? 'scaleX' : 'scaleY';
      gsap.fromTo(
        ref.current,
        { [scale]: 0 },
        {
          [scale]: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger ? ref.current.closest(trigger) : ref.current,
            start,
            end: `clamp(${end})`,
            scrub: 0.4,
          },
        },
      );
    },
    { dependencies: [reduced, axis, trigger, start, end], revertOnUpdate: true },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cx('bg-encre', axis === 'x' ? 'origin-left' : 'origin-top', className)}
    />
  );
}
