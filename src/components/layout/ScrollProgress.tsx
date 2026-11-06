'use client';

import { useEffect, useRef } from 'react';
import type { ColorName } from '@/content/types';
import { usePathname } from '@/i18n/navigation';
import { cx } from '@/lib/utils';

const SECTION_COLORS: Record<string, string> = {
  '': 'bg-violet',
  projects: 'bg-rose',
  blog: 'bg-citron',
  about: 'bg-soleil',
  experiences: 'bg-cobalt',
  contact: 'bg-tomate',
};

// Classes écrites en entier pour que Tailwind les détecte.
const PROJECT_COLORS: Record<ColorName, string> = {
  violet: 'bg-violet',
  cobalt: 'bg-cobalt',
  citron: 'bg-citron',
  tomate: 'bg-tomate',
  soleil: 'bg-soleil',
  rose: 'bg-rose',
  blanc: 'bg-blanc',
};

type ScrollProgressProps = {
  projectColors: Record<string, ColorName>;
};

// Mise à jour directe du style au scroll, sans re-render React.
export function ScrollProgress({ projectColors }: ScrollProgressProps) {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  const [, section = '', slug] = pathname.split('/');
  const projectColor = section === 'projects' && slug ? projectColors[slug] : undefined;
  const color = projectColor ? PROJECT_COLORS[projectColor] : (SECTION_COLORS[section] ?? 'bg-violet');

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{ transform: 'scaleX(0)' }}
      className={cx('fixed inset-x-0 top-0 z-60 h-1.25 origin-left border-b border-encre', color)}
    />
  );
}
