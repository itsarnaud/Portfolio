import type { CSSProperties } from 'react';

const COLORS = ['bg-tomate', 'bg-violet', 'bg-citron', 'bg-cobalt', 'bg-rose', 'bg-blanc', 'bg-soleil'];

type ConfettiProps = {
  count?: number;
  distance?: number;
};

export function Confetti({ count = 16, distance = 90 }: ConfettiProps) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible motion-reduce:hidden">
      {Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const reach = distance + (index % 3) * 30;
        const size = 10 + (index % 3) * 4;
        const style = {
          width: size,
          height: size,
          marginTop: -size / 2,
          marginLeft: -size / 2,
          '--tx': `${Math.round(Math.cos(angle) * reach)}px`,
          '--ty': `${Math.round(Math.sin(angle) * reach)}px`,
          '--r': `${index * 53}deg`,
        } as CSSProperties;
        return (
          <span
            key={index}
            style={style}
            className={`absolute top-1/2 left-1/2 animate-burst border-2 border-encre ${index % 2 ? 'rounded-full' : 'rounded-[3px]'} ${COLORS[index % COLORS.length]}`}
          />
        );
      })}
    </span>
  );
}
