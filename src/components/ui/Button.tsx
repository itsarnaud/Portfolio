import type { ReactNode } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { Link } from '@/i18n/navigation';
import { cx, isExternal } from '@/lib/utils';

const variants = {
  violet: 'bg-violet text-blanc',
  blanc: 'bg-blanc text-encre',
  citron: 'bg-citron text-encre',
  soleil: 'bg-soleil text-encre',
  encre: 'bg-encre text-papier',
} as const;

type CommonProps = {
  variant?: keyof typeof variants;
  arrow?: boolean;
  cursor?: string;
  cursorColor?: string;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
  download?: boolean;
};

type ActionProps = CommonProps & {
  href?: undefined;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
};

export type ButtonProps = LinkProps | ActionProps;

export function Button(props: ButtonProps) {
  const { variant = 'violet', arrow = false, cursor, cursorColor, className, children } = props;

  const classes = cx(
    'group/btn inline-flex min-h-13 items-center justify-center gap-2.5 rounded-bouton border-2 px-4 sm:px-6',
    'font-bold text-base leading-none whitespace-nowrap shadow-dure select-none',
    'transition-[translate,box-shadow] duration-150 ease-out',
    'hover:-translate-0.5 hover:shadow-dure-md',
    'active:translate-0.5 active:shadow-none active:duration-75',
    'disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    className,
  );

  const content = (
    <>
      {children}
      {arrow && (
        <Arrow className="size-4.5 shrink-0 transition-[translate] duration-250 ease-rebond group-hover/btn:translate-x-1.25" />
      )}
    </>
  );

  const data = { 'data-cursor': cursor, 'data-cursor-color': cursorColor };

  if (props.href === undefined) {
    return (
      <button
        type={props.type ?? 'button'}
        onClick={props.onClick}
        disabled={props.disabled}
        className={classes}
        {...data}
      >
        {content}
      </button>
    );
  }

  const { href, download } = props;

  if (download || isExternal(href)) {
    const newTab = href.startsWith('http');
    return (
      <a
        href={href}
        download={download || undefined}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        className={classes}
        {...data}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...data}>
      {content}
    </Link>
  );
}
