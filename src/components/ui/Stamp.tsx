import { hex } from '@/content/colors';
import type { ColorName } from '@/content/types';
import { cx } from '@/lib/utils';
import { Star } from './Star';

const TEXT_RADIUS = 74;

type StampProps = {
  text: string;
  color?: ColorName;
  starFill?: string;
  star?: boolean;
  className?: string;
};

// Lettres placées à la main : textLength sur un textPath n'est pas appliqué partout et laissait un trou.
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
