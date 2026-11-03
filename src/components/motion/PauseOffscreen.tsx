'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type PauseOffscreenProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Met en pause les animations CSS de son contenu quand il sort de l'écran
 * (attribut data-offscreen, voir globals.css). Aucun re-render React : on touche
 * seulement l'attribut du DOM.
 */
export function PauseOffscreen({ className, children }: PauseOffscreenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => element.toggleAttribute('data-offscreen', !entry.isIntersecting),
      { rootMargin: '100px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
