'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Vrai si la media query correspond. Toujours faux côté serveur,
 * puis mis à jour au chargement et à chaque changement (rotation, branchement d'une souris…).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Une vraie souris (ou un trackpad) : le curseur custom n'a de sens qu'avec ça. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
