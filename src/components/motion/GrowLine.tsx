'use client';

import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { gsap, useGSAP } from '@/lib/gsap';
import { cx } from '@/lib/utils';

type GrowLineProps = {
  axis?: 'x' | 'y';
  trigger?: string;
  start?: string;
  end?: string;
  className?: string;
};

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
