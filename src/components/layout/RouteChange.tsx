'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { scrollToTop } from '@/lib/utils';

// La restauration native du défilement n'est pas fiable avec Next : la position est retenue ici, page par page.
export function RouteChange() {
  const pathname = usePathname();
  const currentPath = useRef(pathname);
  const fromHistory = useRef(false);
  const positions = useRef(new Map<string, number>());
  // Figé pendant la navigation : l'ajustement du navigateur à la nouvelle hauteur ne doit pas écraser la position retenue.
  const frozen = useRef(false);

  useEffect(() => {
    let unfreeze: ReturnType<typeof setTimeout>;
    const freeze = () => {
      frozen.current = true;
      clearTimeout(unfreeze);
      unfreeze = setTimeout(() => (frozen.current = false), 6000); // sécurité
    };

    const onScroll = () => {
      if (!frozen.current) positions.current.set(currentPath.current, window.scrollY);
    };
    const onPopState = () => {
      fromHistory.current = true;
      freeze();
    };
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      positions.current.set(currentPath.current, window.scrollY);
      freeze();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('popstate', onPopState);
    window.addEventListener('click', onClick, { capture: true });

    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('click', onClick, { capture: true });
      observer.disconnect();
      clearTimeout(timer);
      clearTimeout(unfreeze);
    };
  }, []);

  useEffect(() => {
    if (currentPath.current === pathname) return; // premier affichage
    currentPath.current = pathname;

    const restore = fromHistory.current ? (positions.current.get(pathname) ?? 0) : 0;
    fromHistory.current = false;

    if (!restore) {
      scrollToTop();
      // Une seconde fois : sur iPhone, un défilement par inertie encore en cours peut annuler la première.
      const frame = requestAnimationFrame(() => {
        scrollToTop();
        ScrollTrigger.refresh();
        frozen.current = false;
      });
      return () => cancelAnimationFrame(frame);
    }

    // Attend que la page ait retrouvé sa hauteur, sinon le navigateur borne la position à l'ancienne page.
    let frame = 0;
    const started = performance.now();
    const tryRestore = () => {
      const tallEnough = document.documentElement.scrollHeight - window.innerHeight >= restore;
      if (tallEnough || performance.now() - started > 1000) {
        window.scrollTo(0, restore);
        ScrollTrigger.refresh();
        frozen.current = false;
        return;
      }
      frame = requestAnimationFrame(tryRestore);
    };
    tryRestore();
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
