'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Star } from '@/components/ui/Star';
import { hex } from '@/content/colors';

const LANES = [
  { top: 14, reverse: false, duration: 7, delay: -1, start: 8, color: hex.tomate },
  { top: 56, reverse: true, duration: 9, delay: -4, start: 62, color: hex.violet },
  { top: 100, reverse: false, duration: 5.5, delay: -2.5, start: 34, color: hex.rose },
  { top: 142, reverse: true, duration: 8, delay: -6, start: 80, color: hex.cobalt },
  { top: 176, reverse: false, duration: 6.5, delay: -3.2, start: 48, color: hex.tomate },
];

const RESPAWN_MS = 1300;

function Bug({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 52 52" className="size-full overflow-visible">
      <g className="origin-center animate-wiggle" stroke={hex.encre} strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 18l-7-6M18 26H8M18 34l-7 6M34 18l7-6M34 26h10M34 34l7 6" />
      </g>
      <ellipse cx="26" cy="27" rx="12" ry="14" fill={color} stroke={hex.encre} strokeWidth="2.5" transform="rotate(90 26 27)" />
      <circle cx="40" cy="27" r="6" fill={hex.encre} />
      <path d="M14 27h22" stroke={hex.encre} strokeWidth="2" />
      <circle cx="21" cy="21" r="2.4" fill={hex.encre} />
      <circle cx="29" cy="33" r="2.4" fill={hex.encre} />
      <circle cx="42" cy="25" r="1.6" fill={hex.blanc} />
    </svg>
  );
}

export function BugGame() {
  const t = useTranslations('error.game');
  const tCursor = useTranslations('cursor');
  const [count, setCount] = useState(0);
  const [dead, setDead] = useState<boolean[]>(() => LANES.map(() => false));
  // Change à la réapparition pour relancer la traversée.
  const [generation, setGeneration] = useState<number[]>(() => LANES.map(() => 0));
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const squash = (index: number) => {
    if (dead[index]) return;
    setDead((list) => list.map((value, i) => (i === index ? true : value)));
    setCount((value) => value + 1);
    timers.current.push(
      setTimeout(() => {
        setDead((list) => list.map((value, i) => (i === index ? false : value)));
        setGeneration((list) => list.map((value, i) => (i === index ? value + 1 : value)));
      }, RESPAWN_MS),
    );
  };

  const status = count === 0 ? t('start') : count < 5 ? t('few', { count }) : count < 10 ? t('many') : t('lots');

  return (
    <div className="flex animate-rise flex-col gap-3.5 rounded-[26px] border-2 bg-blanc p-5 shadow-dure-md md:p-6" style={{ animationDelay: '650ms' }}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[15px] text-encre-pale">{t('meanwhile')}</span>
          <h2 className="text-[28px] tracking-titre-carte md:text-[32px]">{t('title')}</h2>
        </div>
        <p aria-live="polite" className="inline-flex items-center gap-2.5 font-bold">
          {count > 0 && (
            <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl border-2 bg-citron px-2.5 font-display text-xl font-extrabold">
              {count}
            </span>
          )}
          {status}
        </p>
      </div>

      <div className="relative h-57.5 overflow-hidden rounded-[18px] border-2 border-dashed bg-papier @container">
        {LANES.map((lane, index) => {
          const isDead = dead[index];
          const style = {
            top: lane.top,
            // Position de départ (visible aussi en mode « animations réduites »).
            translate: `${lane.start}cqw 0`,
            '--crawl-duration': `${lane.duration}s`,
            animationDelay: `${lane.delay}s`,
            animationDirection: lane.reverse ? 'reverse' : 'normal',
            animationPlayState: isDead ? 'paused' : 'running',
          } as CSSProperties;
          return (
            <div key={`${index}-${generation[index]}`} style={style} className="absolute left-0 animate-crawl">
              <button
                type="button"
                onClick={() => squash(index)}
                aria-label={t('squash')}
                data-cursor={tCursor('squash')}
                data-cursor-color={hex.tomate}
                style={{ scale: lane.reverse ? '-1 1' : '1 1' }}
                className="relative block size-13"
              >
                {isDead ? (
                  <>
                    <Star outlined fill="fill-soleil" className="size-full animate-splat" />
                    <span
                      aria-hidden="true"
                      style={{ scale: lane.reverse ? '-1 1' : '1 1' }}
                      className="absolute -top-1.5 left-1/2 -ml-4 w-8 animate-plus-one text-center font-display text-xl font-extrabold"
                    >
                      +1
                    </span>
                  </>
                ) : (
                  <Bug color={lane.color} />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
