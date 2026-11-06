'use client';

import { useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { bgClass, hex } from '@/content/colors';
import type { ColorName } from '@/content/types';
import { cx } from '@/lib/utils';

type JobCardProps = {
  role: string;
  company: string;
  description: string;
  stack: string[];
  points: string[];
  color: ColorName;
  /** Ouvert au chargement (la première expérience). */
  defaultOpen?: boolean;
};

/** Carte d'une expérience, avec « Ce que j'y ai fait » qui se déplie. */
export function JobCard({ role, company, description, stack, points, color, defaultOpen = false }: JobCardProps) {
  const t = useTranslations('experiences');
  const tCursor = useTranslations('cursor');
  const [open, setOpen] = useState(defaultOpen);
  const listId = useId();

  return (
    <div className="flex flex-col gap-3.5 rounded-carte border-2 bg-blanc p-5 shadow-dure-md transition-[translate,rotate,box-shadow] duration-200 ease-out hover:-translate-1.25 hover:-rotate-[0.6deg] hover:shadow-[11px_11px_0_var(--color-encre)] md:px-6.5 md:py-6">
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
        <h3 className="text-2xl tracking-titre-carte md:text-[28px]">{role}</h3>
        <span className={cx('inline-block rounded-full border-2 border-encre px-3 py-1 font-bold hover:animate-jig', bgClass[color])}>
          {company}
        </span>
      </div>
      <p className="leading-[1.55] text-encre-douce md:text-[17px]">{description}</p>
      <ul className="flex flex-wrap gap-1.5 font-mono text-xs">
        {stack.map((tech) => (
          <li key={tech} className="rounded-full border-[1.5px] border-encre px-2.5 py-1 hover:animate-jig">
            {tech}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={listId}
        data-cursor={open ? tCursor('close') : tCursor('open')}
        data-cursor-color={hex[color]}
        className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border-2 bg-blanc px-3.5 text-[15px] font-bold transition-colors duration-200 hover:bg-papier"
      >
        {t('whatIDid')}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={cx('size-4 transition-[rotate] duration-300 ease-rebond', open && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <ul id={listId} hidden={!open} className="animate-unfold list-disc pl-5 leading-[1.6]">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
