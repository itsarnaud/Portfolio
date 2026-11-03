import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

type PhoneFrameProps = {
  className?: string;
  children: ReactNode;
};

/** Faux téléphone : coque encre arrondie, écran papier. Le contenu remplit l'écran (image en fill). */
export function PhoneFrame({ className, children }: PhoneFrameProps) {
  return (
    <div className={cx('aspect-9/18 rounded-[30px] border-3 border-encre bg-encre p-2 shadow-dure-md', className)}>
      <div className="relative size-full overflow-hidden rounded-[22px] bg-papier">{children}</div>
    </div>
  );
}
