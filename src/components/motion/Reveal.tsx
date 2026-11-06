'use client';

import { useRef, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { gsap, useGSAP } from '@/lib/gsap';

const FROM = {
  up: { y: 70, scale: 0.94 },
  left: { x: -80, rotate: -2 },
  right: { x: 80, rotate: 2 },
  parallax: { y: 120, rotate: 3, scale: 0.92 },
  pop: { scale: 0 },
} as const;

const RANGE: Record<keyof typeof FROM, [string, string]> = {
  up: ['top 95%', 'top 70%'],
  left: ['top 95%', 'top 70%'],
  right: ['top 95%', 'top 70%'],
  parallax: ['top bottom', 'top 45%'],
  pop: ['top 90%', 'top 70%'],
};

type RevealProps = {
  from?: keyof typeof FROM;
  className?: string;
  children: ReactNode;
};

// ScrollTrigger plutôt que animation-timeline: view(), que Firefox ne gère pas.
export function Reveal({ from = 'up', className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.fromTo(
        ref.current,
        // La parallaxe ne joue que sur le mouvement : la capture reste visible dès le départ.
        { opacity: from === 'parallax' || from === 'pop' ? 1 : 0, ...FROM[from] },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          ease: 'none',
          // clamp sur la fin seulement : sur le début, il masquerait les blocs déjà à l'écran au chargement.
          scrollTrigger: {
            trigger: ref.current,
            start: RANGE[from][0],
            end: `clamp(${RANGE[from][1]})`,
            scrub: 0.4,
          },
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
