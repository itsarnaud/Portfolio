'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cx } from '@/lib/utils';

type CopyButtonProps = {
  /** Le texte copié dans le presse-papiers. */
  value: string;
  /** Ce qui est affiché après la copie (« Copié ! »). */
  copiedLabel: string;
  cursor?: string;
  cursorColor?: string;
  className?: string;
  children: ReactNode;
};

/** Bouton qui copie un texte, puis affiche « Copié ! » pendant 1,6 s (annoncé aux lecteurs d'écran). */
export function CopyButton({ value, copiedLabel, cursor, cursorColor, className, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return; // presse-papiers refusé (navigateur ancien, page non sécurisée) : on ne change rien
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor={cursor}
      data-cursor-color={cursorColor}
      className={cx(
        'inline-flex min-h-10 items-center gap-2 rounded-full border-2 px-3.5 font-mono text-sm font-semibold transition-colors duration-200',
        copied ? 'bg-citron' : 'bg-blanc hover:bg-papier',
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        {copied ? <path d="M5 12l5 5L20 7" /> : <path d="M9 9h10v10H9zM5 15V5h10" />}
      </svg>
      <span aria-live="polite">{copied ? copiedLabel : children}</span>
    </button>
  );
}
