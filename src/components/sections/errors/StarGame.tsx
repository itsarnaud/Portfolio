'use client';

import { useState, type MouseEvent, type PointerEvent } from 'react';
import { useTranslations } from 'next-intl';
import { hex } from '@/content/colors';
import { cx } from '@/lib/utils';
import { Confetti } from '@/components/motion/Confetti';
import { Star } from '@/components/ui/Star';

/** À la souris, l'étoile fuit 6 fois avant de se laisser attraper. */
const MOUSE_DODGES = 6;
/** Au toucher, elle saute 3 fois. */
const TOUCH_DODGES = 3;

type Position = { x: number; y: number; r: number };

/** Nouvelle place, assez loin de la précédente pour que ça se voie. */
function nextPosition(current: Position): Position {
  let x: number;
  let y: number;
  do {
    x = 10 + Math.round(Math.random() * 80);
    y = 16 + Math.round(Math.random() * 68);
  } while (Math.abs(x - current.x) < 25 && Math.abs(y - current.y) < 25);
  return { x, y, r: Math.round(Math.random() * 90 - 45) };
}

/**
 * Mini-jeu de la 404, « Attrape l'étoile ». L'étoile fuit le curseur 6 fois puis se laisse
 * attraper ; au toucher elle saute 3 fois. Au clavier, elle s'attrape tout de suite (pas de
 * piège pour l'accessibilité). Confettis à la fin.
 */
export function StarGame() {
  const t = useTranslations('notFound.game');
  const tCursor = useTranslations('cursor');
  const [position, setPosition] = useState<Position>({ x: 50, y: 50, r: 0 });
  const [tries, setTries] = useState(0);
  const [caught, setCaught] = useState(false);
  const [pointerType, setPointerType] = useState('mouse');

  const dodge = () => {
    setPosition((current) => nextPosition(current));
    setTries((value) => value + 1);
  };

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && !caught && tries < MOUSE_DODGES) dodge();
  };

  const onClick = (event: MouseEvent) => {
    if (caught) return;
    const keyboard = event.detail === 0;
    if (!keyboard && pointerType === 'touch' && tries < TOUCH_DODGES) {
      dodge();
      return;
    }
    setCaught(true);
  };

  const replay = () => {
    setCaught(false);
    setTries(0);
    setPosition({ x: 50, y: 50, r: 0 });
  };

  const tired = tries >= (pointerType === 'touch' ? TOUCH_DODGES : MOUSE_DODGES);
  const status = caught
    ? t('caught', { tries: tries + 1 })
    : tired
      ? t('tired')
      : tries === 0
        ? t('start')
        : tries < 3
          ? t('missed')
          : t('almost');

  return (
    <div className="flex min-w-0 flex-[1_1_380px] animate-rise flex-col gap-3.5 rounded-[26px] border-2 bg-blanc p-5 shadow-dure-md md:p-6" style={{ animationDelay: '650ms' }}>
      <div className="flex flex-col gap-1">
        <span className="text-[15px] text-encre-pale">{t('meanwhile')}</span>
        <h2 className="text-[28px] tracking-titre-carte md:text-[32px]">{t('title')}</h2>
      </div>

      <div className="relative h-65 overflow-hidden rounded-[18px] border-2 border-dashed bg-papier">
        <button
          type="button"
          onPointerDown={(event) => setPointerType(event.pointerType)}
          onPointerEnter={onPointerEnter}
          onClick={onClick}
          aria-label={caught ? t('starCaught') : t('star')}
          data-cursor={caught ? tCursor('bravo') : tired ? tCursor('now') : tCursor('catchIt')}
          data-cursor-color={hex.soleil}
          style={{ left: `${position.x}%`, top: `${position.y}%`, rotate: `${position.r}deg` }}
          className="absolute -mt-8 -ml-8 size-16 transition-[left,top,rotate] duration-350 ease-rebond"
        >
          {caught && <Confetti count={10} distance={70} />}
          <Star outlined fill="fill-soleil" className={cx('size-full', caught && 'animate-caught')} />
        </button>
      </div>

      <div className="flex min-h-11 items-center justify-between gap-3">
        <p aria-live="polite" className="font-bold">
          {status}
        </p>
        {caught && (
          <button
            type="button"
            onClick={replay}
            className="min-h-11 shrink-0 rounded-xl border-2 bg-citron px-4 text-[15px] font-bold shadow-dure transition-[translate,box-shadow] duration-150 hover:-translate-0.5 hover:shadow-dure-md active:translate-0.5 active:shadow-none"
          >
            {t('replay')}
          </button>
        )}
      </div>
    </div>
  );
}
