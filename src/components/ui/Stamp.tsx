import { useId } from 'react';
import { hex } from '@/content/colors';
import type { ColorName } from '@/content/types';
import { cx } from '@/lib/utils';
import { Star } from './Star';

/** Rayon du cercle sur lequel le texte est posé (dans un viewBox de 200). */
const TEXT_RADIUS = 74;
/** Le texte fait exactement le tour : le périmètre, moins 10 pour ne pas toucher le début. */
const TEXT_LENGTH = Math.round(2 * Math.PI * TEXT_RADIUS - 10);

type StampProps = {
  /** Texte qui fait le tour, terminé par un séparateur (« DÉVELOPPEUR FULLSTACK · MONTPELLIER · »). */
  text: string;
  color?: ColorName;
  /** Classe de remplissage de l'étoile du centre. */
  starFill?: string;
  /** Étoile au centre (le tampon « Dernier post » du blog n'en a pas). */
  star?: boolean;
  className?: string;
};

/**
 * Tampon rond qui tourne lentement, avec une étoile au centre qui tourne plus vite.
 * Le texte est espacé par lengthAdjust="spacing" pour remplir le cercle sans se chevaucher.
 * Décoratif : le texte est déjà dit ailleurs sur la page.
 */
export function Stamp({ text, color = 'soleil', starFill = 'fill-tomate', star = true, className }: StampProps) {
  const pathId = `stamp-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;

  return (
    <div aria-hidden="true" className={cx('relative aspect-square', className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path
            id={pathId}
            d={`M100,100 m-${TEXT_RADIUS},0 a${TEXT_RADIUS},${TEXT_RADIUS} 0 1,1 ${TEXT_RADIUS * 2},0 a${TEXT_RADIUS},${TEXT_RADIUS} 0 1,1 -${TEXT_RADIUS * 2},0`}
          />
        </defs>
        <circle cx="100" cy="100" r="97" fill={hex[color]} stroke={hex.encre} strokeWidth="3" />
        <text className="font-mono text-[16px] font-semibold" fill={hex.encre}>
          <textPath href={`#${pathId}`} textLength={TEXT_LENGTH} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      {star && (
        <Star outlined spin fill={starFill} className="absolute top-1/2 left-1/2 size-[31%] -translate-1/2" />
      )}
    </div>
  );
}
