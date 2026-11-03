import { cx } from '@/lib/utils';

type StarProps = {
  /** Couleur de remplissage (classe Tailwind fill-*). */
  fill?: string;
  /** Contour encre, comme sur les tampons. */
  outlined?: boolean;
  spin?: boolean;
  className?: string;
};

/** L'étoile à 4 branches, motif récurrent de la D.A. Toujours décorative. */
export function Star({ fill = 'fill-current', outlined = false, spin = false, className }: StarProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cx(fill, spin && 'animate-spin-star', className)}
    >
      <path
        d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"
        stroke={outlined ? '#121212' : undefined}
        strokeWidth={outlined ? 1.3 : undefined}
        strokeLinejoin="round"
      />
    </svg>
  );
}
