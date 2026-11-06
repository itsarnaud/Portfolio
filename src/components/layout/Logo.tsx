import { Star } from '@/components/ui/Star';
import { cx } from '@/lib/utils';

type LogoProps = {
  withName?: boolean;
  className?: string;
};

export function Logo({ withName = true, className }: LogoProps) {
  return (
    <span className={cx('flex items-center gap-3', className)}>
      <span aria-hidden="true" className="relative h-9.25 w-7.5 shrink-0">
        <span
          className={cx(
            'absolute inset-0 flex items-center justify-center rounded-lg border-2 bg-violet shadow-[2px_2px_0_var(--color-encre)]',
            'font-display text-[17px] font-extrabold tracking-[-0.07em] text-blanc',
            '[transform:rotate(-6deg)] transition-[rotate] duration-350 ease-rebond group-hover/logo:rotate-10',
          )}
        >
          ar
        </span>
        <Star outlined spin fill="fill-citron" className="absolute -top-1.75 -right-1.75 size-3.75" />
      </span>
      {withName && (
        <span className="font-display text-[21px] font-extrabold tracking-titre max-lg:text-[19px]">
          arnaud royer
        </span>
      )}
    </span>
  );
}
