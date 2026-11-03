import type { ReactNode } from 'react';

/** Tracé en zig-zag : 16 vagues sur 160 unités, deux fois la largeur du mot pour défiler en boucle. */
const WAVE_PATH = `M0 5 Q5 0 10 5 ${Array.from({ length: 15 }, (_, i) => `T${(i + 2) * 10} 5`).join(' ')}`;

type WaveWordProps = {
  /** Classe de couleur du trait. */
  stroke?: string;
  children: ReactNode;
};

/** Mot souligné d'une vague qui défile en boucle (« outils » dans le hero). */
export function WaveWord({ stroke = 'stroke-tomate', children }: WaveWordProps) {
  return (
    <span className="relative inline-block">
      {children}
      <span aria-hidden="true" className="absolute inset-x-0 -bottom-[0.12em] h-[0.2em] overflow-hidden">
        <svg viewBox="0 0 160 10" preserveAspectRatio="none" className="block h-full w-[200%] animate-wave">
          <path d={WAVE_PATH} fill="none" className={stroke} strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
      </span>
    </span>
  );
}
