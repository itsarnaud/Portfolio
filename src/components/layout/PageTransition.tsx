'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { routing } from '@/i18n/routing';
import { navLinks } from './navLinks';

const BANDS = ['bg-violet', 'bg-citron', 'bg-tomate', 'bg-soleil'];
/** Si la page met trop de temps à arriver, on découvre quand même l'écran. */
const SAFETY_MS = 5000;

type Phase = 'idle' | 'covering' | 'covered' | 'revealing';

/** Le chemin sans la langue : /fr/projects/quested devient /projects/quested. */
function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  return (routing.locales as readonly string[]).includes(first) ? `/${rest.join('/')}` : pathname;
}

/**
 * Transition entre pages : quatre bandes de couleur montent en cascade avec le nom
 * de la page d'arrivée, la page change dessous, puis les bandes repartent vers le haut.
 *
 * Le clic sur un lien interne est intercepté (avant le <Link> de Next) pour couvrir
 * l'écran d'abord, puis naviguer. Les clics avec Cmd/Ctrl, les liens externes,
 * les téléchargements et les ancres de la même page passent normalement.
 * Le nom affiché vient de data-transition-label sur le lien, sinon de la section.
 * Coupé en mode « animations réduites ».
 */
export function PageTransition() {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const phase = useRef<Phase>('idle');
  /** La page est arrivée pendant que les bandes montaient encore. */
  const arrived = useRef(false);
  const safety = useRef<ReturnType<typeof setTimeout>>(undefined);

  const bands = () => overlayRef.current?.querySelectorAll<HTMLElement>('[data-band]') ?? [];

  const reveal = () => {
    const overlay = overlayRef.current;
    if (!overlay || phase.current !== 'covered') return;
    clearTimeout(safety.current);
    phase.current = 'revealing';
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(bands(), { yPercent: 100 });
          overlay.style.visibility = 'hidden';
          phase.current = 'idle';
        },
      })
      .to(labelRef.current, { opacity: 0, duration: 0.2 })
      .to(bands(), { yPercent: -100, duration: 0.5, ease: 'power3.inOut', stagger: 0.05 }, 0.05);
  };

  const cover = (href: string, label: string) => {
    const overlay = overlayRef.current;
    const text = labelRef.current;
    if (!overlay || !text) return;
    phase.current = 'covering';
    arrived.current = false;
    text.textContent = label;
    overlay.style.visibility = 'visible';
    gsap
      .timeline({
        onComplete: () => {
          phase.current = 'covered';
          safety.current = setTimeout(reveal, SAFETY_MS);
          router.push(href);
          if (arrived.current) reveal();
        },
      })
      .fromTo(bands(), { yPercent: 100, y: 0 }, { yPercent: 0, duration: 0.5, ease: 'power3.inOut', stagger: 0.05 })
      .fromTo(text, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }, 0.3);
  };

  // Interception des clics sur les liens internes.
  useEffect(() => {
    if (reduced) return;

    const sectionLabel = (path: string) => {
      const first = `/${stripLocale(path).split('/')[1] ?? ''}`;
      const link = navLinks.find(({ href }) => href === first);
      return link ? t(link.key) : '';
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a') : null;
      if (!anchor || anchor.hasAttribute('download')) return;
      if (anchor.target && anchor.target !== '_self') return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // même page ou simple ancre
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // un fichier (PDF…)

      event.preventDefault();
      if (phase.current !== 'idle') return;
      const label = anchor.dataset.transitionLabel ?? sectionLabel(url.pathname);
      cover(url.pathname + url.search + url.hash, label);
    };

    // Phase de capture sur window : on passe avant le onClick du <Link> de Next.
    window.addEventListener('click', onClick, { capture: true });
    return () => window.removeEventListener('click', onClick, { capture: true });
    // cover ne dépend que de refs et du router, stable entre les rendus.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, t]);

  // La nouvelle page est là : on découvre l'écran.
  useEffect(() => {
    if (phase.current === 'covered') {
      // On laisse une image au navigateur pour peindre la nouvelle page sous les bandes.
      requestAnimationFrame(() => requestAnimationFrame(reveal));
    } else if (phase.current === 'covering') {
      arrived.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Position de départ des bandes (sous l'écran), posée par GSAP pour qu'il la connaisse.
  useEffect(() => {
    gsap.set(bands(), { yPercent: 100, y: 0 });
    return () => clearTimeout(safety.current);
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="invisible fixed inset-0 z-90 flex overflow-hidden"
    >
      {BANDS.map((band) => (
        <span key={band} data-band className={`h-full flex-1 border-r-2 last:border-r-0 ${band}`} />
      ))}
      <span
        ref={labelRef}
        className="absolute inset-0 flex items-center justify-center px-4 text-center font-display text-[clamp(44px,8vw,96px)] font-extrabold tracking-display text-encre opacity-0"
      />
    </div>
  );
}
