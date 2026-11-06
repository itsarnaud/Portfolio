'use client';

import type { ReactNode } from 'react';
import { usePathname } from '@/i18n/navigation';

type HideOnPathsProps = {
  paths: string[];
  children: ReactNode;
};

export function HideOnPaths({ paths, children }: HideOnPathsProps) {
  const pathname = usePathname();
  return paths.includes(pathname) ? null : children;
}
