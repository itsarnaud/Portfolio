import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

type BrowserFrameProps = {
  screenClassName?: string;
  className?: string;
  children: ReactNode;
};

export function BrowserFrame({ screenClassName, className, children }: BrowserFrameProps) {
  const dot = 'size-2.25 rounded-full border-[1.5px] border-encre transition-colors duration-200';

  return (
    <div className={cx('flex flex-col overflow-hidden rounded-ecran border-2', className)}>
      <div aria-hidden="true" className="flex shrink-0 gap-1.5 border-b-2 px-2.5 py-2">
        <span className={cx(dot, 'group-hover/card:bg-tomate')} />
        <span className={cx(dot, 'group-hover/card:bg-soleil')} />
        <span className={cx(dot, 'group-hover/card:bg-citron')} />
      </div>
      <div className={cx('relative grow overflow-hidden', screenClassName)}>{children}</div>
    </div>
  );
}
