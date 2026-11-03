import { hex } from '@/content/colors';
import type { ColorName } from '@/content/types';
import { cx } from '@/lib/utils';
import { Star } from './Star';

/** Rayon du cercle sur lequel le texte est posé (dans un viewBox de 200). */
const TEXT_RADIUS = 74;

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
 *
 * Chaque lettre est placée à la main, à intervalle égal sur le cercle : le texte fait
 * exactement le tour, dans tous les navigateurs. (textLength sur un textPath, prévu pour ça,
 * n'est pas appliqué partout et laissait un trou.) La police est à chasse fixe, donc
 * l'espacement reste régulier. Décoratif : le texte est déjà dit ailleurs sur la page.
 */
export function Stamp({ text, color = 'soleil', starFill = 'fill-tomate', star = true, className }: StampProps) {
  const letters = [...text];
  const step = 360 / letters.length;
  // Moins il y a de lettres, plus elles peuvent être grandes.
  const fontSize = letters.length > 34 ? 16 : 18;

  return (
    <div aria-hidden="true" className={cx('relative aspect-square', className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow">
        <circle cx="100" cy="100" r="97" fill={hex[color]} stroke={hex.encre} strokeWidth="3" />
        <g className="font-mono font-semibold" fill={hex.encre} fontSize={fontSize}>
          {letters.map((letter, index) => (
            <text
              key={index}
              x="100"
              y={100 - TEXT_RADIUS}
              textAnchor="middle"
              transform={`rotate(${(index * step).toFixed(2)} 100 100)`}
            >
              {letter}
            </text>
          ))}
        </g>
      </svg>
      {star && (
        <Star outlined spin fill={starFill} className="absolute top-1/2 left-1/2 size-[31%] -translate-1/2" />
      )}
    </div>
  );
}
