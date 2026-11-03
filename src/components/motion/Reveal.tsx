'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const FROM = {
  up: { y: 70, scale: 0.94 },
  left: { x: -80, rotate: -2 },
  right: { x: 80, rotate: 2 },
} as const;

type RevealProps = {
  /** D'où arrive le bloc : du bas (avec un léger zoom), de la gauche ou de la droite. */
  from?: keyof typeof FROM;
  className?: string;
  children: ReactNode;
};

/**
 * Apparition au scroll, liée à la position (le bloc se dévoile au fil du défilement,
 * et repart si on remonte). GSAP ScrollTrigger plutôt que animation-timeline: view(),
 * que Firefox ne gère pas. Rien en mode « animations réduites ».
 */
export function Reveal({ from = 'up', className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, ...FROM[from] },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          ease: 'none',
          // clamp() : sur une page courte, le bloc finit quand même entièrement visible.
          scrollTrigger: { trigger: ref.current, start: 'clamp(top 95%)', end: 'clamp(top 70%)', scrub: 0.4 },
        },
      );
    },
    { dependencies: [reduced, from], scope: ref, revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
