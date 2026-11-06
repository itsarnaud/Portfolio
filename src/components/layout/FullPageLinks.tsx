'use client';

import { useEffect } from 'react';

// Le routeur de Next ne sait pas quitter global-not-found : l'adresse change, mais pas la page.
export function FullPageLinks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest('a');
      if (!link || link.target === '_blank' || link.hasAttribute('download') || link.origin !== window.location.origin) return;
      event.preventDefault();
      window.location.assign(link.href);
    };

    window.addEventListener('click', onClick, { capture: true });
    return () => window.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
