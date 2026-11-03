'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { hex } from '@/content/colors';
import { useFinePointer } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/** Part du chemin parcourue à chaque image : plus c'est petit, plus le point traîne. */
const FOLLOW = 0.22;

/**
 * Curseur custom : un point qui suit la souris avec un léger retard, puis devient
 * une étiquette (« Voir le projet », « Écris-moi »…) sur les éléments qui ont data-cursor.
 * La couleur de l'étiquette vient de data-cursor-color.
 *
 * Monté une seule fois dans le layout : il survit aux navigations sans doubler ses écouteurs.
 * La boucle d'animation s'arrête quand le point a rejoint la souris.
 * Désactivé sur tactile et en mode « animations réduites ».
 */
export function Cursor() {
  const finePointer = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  /** L'élément data-cursor survolé, partagé avec l'effet de navigation. */
  const targetRef = useRef<Element | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!enabled || !dot || !label) return;

    const root = document.documentElement;
    root.dataset.customCursor = 'on';

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let visible = false;
    let frame = 0;

    const tick = () => {
      x += (targetX - x) * FOLLOW;
      y += (targetY - y) * FOLLOW;
      dot.style.translate = `${x}px ${y}px`;
      const moving = Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const setTarget = (element: Element | null) => {
      if (element === targetRef.current) return;
      targetRef.current = element;
      if (element) {
        label.textContent = element.getAttribute('data-cursor');
        dot.dataset.on = 'true';
        dot.style.backgroundColor = element.getAttribute('data-cursor-color') ?? hex.citron;
      } else {
        dot.dataset.on = 'false';
        dot.style.backgroundColor = '';
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        // Première apparition : le point arrive directement sous la souris, sans traverser l'écran.
        x = targetX;
        y = targetY;
        visible = true;
        dot.style.opacity = '1';
      }
      const element = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      setTarget(element);
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      delete root.dataset.customCursor;
    };
  }, [enabled]);

  // Après une navigation, l'élément sous la souris a changé : on repart du point simple.
  useEffect(() => {
    const dot = dotRef.current;
    targetRef.current = null;
    if (!dot) return;
    dot.dataset.on = 'false';
    dot.style.backgroundColor = '';
  }, [pathname]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      data-on="false"
      className={[
        'pointer-events-none fixed top-0 left-0 z-100 flex items-center justify-center opacity-0',
        'rounded-full border-2 bg-encre',
        'h-4 w-4 -mt-2 -ml-2',
        'data-[on=true]:mt-[-21px] data-[on=true]:ml-3.5 data-[on=true]:h-10.5 data-[on=true]:w-auto data-[on=true]:px-4 data-[on=true]:shadow-dure-sm',
        'transition-[opacity,height,margin] duration-250 ease-rebond',
        'group',
      ].join(' ')}
    >
      <span
        ref={labelRef}
        className="hidden font-mono text-[13px] font-semibold whitespace-nowrap text-encre group-data-[on=true]:block"
      />
    </div>
  );
}
