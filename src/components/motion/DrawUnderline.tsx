'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/lib/utils';

type DrawUnderlineProps = {
  /** Classe de couleur du trait (stroke-violet…). */
  stroke?: string;
  className?: string;
  children: ReactNode;
};

/** Le mot souligné d'un trait à main levée, qui se dessine quand le titre arrive à l'écran. */
export function DrawUnderline({ stroke = 'stroke-violet', className, children }: DrawUnderlineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const path = ref.current?.querySelector('path');
      if (reduced || !path) return;
      const length = path.getTotalLength();
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'clamp(top 60%)', scrub: 0.4 },
        },
      );
    },
    { dependencies: [reduced], scope: ref, revertOnUpdate: true },
  );

  return (
    <span ref={ref} className={cx('relative inline-block', className)}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.22em] -left-[2%] h-[0.32em] w-[104%] overflow-visible"
      >
        <path
          d="M4 16 C 60 4, 120 22, 180 10 S 270 8, 296 14"
          fill="none"
          className={stroke}
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
