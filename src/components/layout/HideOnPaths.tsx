'use client';

import type { ReactNode } from 'react';
import { usePathname } from '@/i18n/navigation';

type HideOnPathsProps = {
  /** Chemins sans la langue (/contact). */
  paths: string[];
  children: ReactNode;
};

/** N'affiche pas son contenu sur certaines pages (le bloc « On en parle ? » sur la page Contact). */
export function HideOnPaths({ paths, children }: HideOnPathsProps) {
  const pathname = usePathname();
  return paths.includes(pathname) ? null : children;
}
