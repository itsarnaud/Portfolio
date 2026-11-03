import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

type ChipProps = {
  /**
   * sm : stack des cartes (11px, bordure couleur du texte).
   * md : chip d'info (13px, fond blanc).
   */
  size?: 'sm' | 'md';
  className?: string;
  children: ReactNode;
};

/** Petite pill en police mono, pour les technos et les infos. Pas cliquable. */
export function Chip({ size = 'md', className, children }: ChipProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border-[1.5px] font-mono leading-tight whitespace-nowrap',
        size === 'sm' ? 'border-current px-2.25 py-1 text-[11px]' : 'bg-blanc px-3 py-1.75 text-[13px]',
        className,
      )}
    >
      {children}
    </span>
  );
}
