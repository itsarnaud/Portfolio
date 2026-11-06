'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { bgClass, hex, screenClass } from '@/content/colors';
import type { ColorName } from '@/content/types';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cx } from '@/lib/utils';
import { ProjectCover } from './ProjectCover';

/** Mélange automatique toutes les 3,8 s. */
const SHUFFLE_MS = 3800;
/** Durée de l'envol de la carte du dessus avant qu'elle repasse sous le paquet. */
const FLY_MS = 340;

export type DeckCard = {
  slug: string;
  number: number;
  /** Le numéro déjà formaté (« N°12 »). */
  numberLabel: string;
  year: number;
  title: string;
  pitch: string;
  badge: string;
  color: ColorName;
  stack: string[];
  image?: string;
};

type ProjectDeckProps = {
  cards: DeckCard[];
  label: string;
  cursor: string;
  hint: string;
  hintTouch: string;
};

/**
 * Le paquet de cartes du hero. Au clic (ou au toucher), la carte du dessus s'envole et
 * repasse sous le paquet. Il se mélange aussi tout seul, sauf au survol, hors écran,
 * onglet caché ou en mode « animations réduites ». Au survol, les cartes s'étalent en éventail.
 *
 * Aucun re-render React pendant le mélange : seuls les attributs data-rank changent,
 * les positions et les transitions sont en CSS (.deck-card dans globals.css).
 */
export function ProjectDeck({ cards, label, cursor, hint, hintTouch }: ProjectDeckProps) {
  const deckRef = useRef<HTMLButtonElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const order = useRef(cards.map((_, index) => index));
  const flying = useRef(false);
  const flyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduced = usePrefersReducedMotion();

  const next = () => {
    const deck = deckRef.current;
    if (!deck || flying.current) return;
    const elements = deck.querySelectorAll<HTMLElement>('[data-card]');
    const top = order.current[0];
    flying.current = true;
    elements[top].dataset.flying = '';

    flyTimer.current = setTimeout(
      () => {
        order.current = [...order.current.slice(1), top];
        delete elements[top].dataset.flying;
        order.current.forEach((cardIndex, rank) => {
          elements[cardIndex].dataset.rank = String(rank);
        });
        if (countRef.current) countRef.current.textContent = `${order.current[0] + 1} / ${cards.length}`;
        flying.current = false;
      },
      reduced ? 0 : FLY_MS,
    );
  };

  // Mélange automatique, en pause au survol, hors écran et onglet caché.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || reduced) return;

    let hovered = false;
    let visible = true;
    const onEnter = () => (hovered = true);
    const onLeave = () => (hovered = false);
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));

    deck.addEventListener('pointerenter', onEnter);
    deck.addEventListener('pointerleave', onLeave);
    observer.observe(deck);
    const interval = setInterval(() => {
      if (!hovered && visible && !document.hidden) next();
    }, SHUFFLE_MS);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      deck.removeEventListener('pointerenter', onEnter);
      deck.removeEventListener('pointerleave', onLeave);
    };
    // next ne lit que des refs : inutile de relancer l'effet quand il change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => () => clearTimeout(flyTimer.current), []);

  return (
    <>
      <button
        ref={deckRef}
        type="button"
        onClick={next}
        aria-label={label}
        data-cursor={cursor}
        data-cursor-color={hex.citron}
        className="deck relative block h-95 w-full rounded-3xl focus-visible:outline-offset-10 md:h-117.5"
      >
        {cards.map((card, index) => (
          <div
            key={card.slug}
            data-card
            data-rank={index}
            className="deck-card absolute inset-x-0 top-0 mx-auto w-57.5 md:w-[64%] md:min-w-57.5 md:max-w-80"
          >
            <div className="animate-float" style={{ animationDelay: `${-index * 0.8}s` }}>
              <div
                className={cx(
                  'flex flex-col gap-2.5 rounded-[20px] border-2 p-3.5 text-left shadow-[5px_5px_0_var(--color-encre)] md:gap-3 md:rounded-carte md:p-4.5 md:shadow-dure-md',
                  bgClass[card.color],
                )}
              >
                <div className="flex justify-between font-mono text-[11px] font-semibold md:text-xs">
                  <span>{card.numberLabel}</span>
                  <span>{card.year}</span>
                </div>
                <div
                  className={cx(
                    'relative aspect-16/11 overflow-hidden rounded-[10px] border-2 md:rounded-ecran @container',
                    screenClass(card.color),
                  )}
                >
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      priority
                      sizes="(min-width: 768px) 290px, 230px"
                      className="object-cover"
                    />
                  ) : (
                    <ProjectCover project={card} />
                  )}
                </div>
                <span className="font-display text-[28px] leading-none font-extrabold tracking-titre-carte md:text-[34px]">
                  {card.title}
                </span>
                <span className="text-sm leading-[1.35] md:text-[15px] md:leading-[1.4]">{card.pitch}</span>
                <span className="hidden self-start rounded-full border-[1.5px] border-current px-2.5 py-1 font-mono text-[11px] md:inline-block">
                  {card.badge}
                </span>
              </div>
            </div>
          </div>
        ))}
      </button>

      <p className="mt-1.5 flex items-center justify-center gap-2.5 text-[15px] text-encre-douce md:mt-4.5">
        <span
          ref={countRef}
          className="rounded-full border-[1.5px] bg-blanc px-2.5 py-0.75 font-bold text-encre"
        >
          1 / {cards.length}
        </span>
        <span className="pointer-coarse:hidden">{hint}</span>
        <span className="hidden pointer-coarse:inline">{hintTouch}</span>
      </p>
    </>
  );
}
