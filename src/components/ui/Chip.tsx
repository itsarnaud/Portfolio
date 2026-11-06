import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

type ChipProps = {
  size?: 'sm' | 'md';
  className?: string;
  children: ReactNode;
};

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
