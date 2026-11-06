import { cx } from '@/lib/utils';

const COLORS = ['bg-tomate', 'bg-citron', 'bg-soleil'];

type TickerProps = {
  // Exactement 3 mots : l'animation CSS (tick) est réglée pour 3 positions plus un retour.
  words: string[];
};

export function Ticker({ words }: TickerProps) {
  const loop = [...words, words[0]];

  return (
    <>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true" className="inline-block h-[1.3em] overflow-hidden align-bottom">
        <span className="flex animate-tick flex-col leading-[1.3em] font-bold text-encre">
          {loop.map((word, index) => (
            <span key={index}>
              <span className={cx('rounded-md px-1.5', COLORS[index % COLORS.length])}>{word}</span>
            </span>
          ))}
        </span>
      </span>
    </>
  );
}
