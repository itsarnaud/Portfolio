'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { hex } from '@/content/colors';
import { cx } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';
import { Carousel } from '@/components/projects/Carousel';

export type GalleryImage = {
  src: string;
  alt: string;
  portrait?: boolean;
};

/** Fond derrière chaque image (visible autour des captures verticales). */
const TILE_COLORS = ['bg-soleil', 'bg-citron', 'bg-rose'];

const arrow = (direction: 'left' | 'right') => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d={direction === 'left' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
);

/**
 * « En images ». Desktop : une grille de vignettes qui s'agrandissent dans une visionneuse
 * (<dialog> : Échap ferme, les flèches du clavier changent d'image). Mobile : un carrousel.
 */
export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const t = useTranslations('project');
  const tCursor = useTranslations('cursor');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(0);

  const show = (index: number) => {
    setOpen(index);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setOpen((current) => (current + delta + images.length) % images.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };
    const onBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener('keydown', onKey);
    dialog.addEventListener('click', onBackdrop);
    return () => {
      dialog.removeEventListener('keydown', onKey);
      dialog.removeEventListener('click', onBackdrop);
    };
    // step ne dépend que de la longueur de la liste, qui ne change pas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = images[open];

  return (
    <section aria-labelledby="gallery-title" className="pt-11 md:pt-24">
      <Reveal className="site-container">
        <h2 id="gallery-title" className="mb-3.5 text-[34px] tracking-titre md:mb-6 md:text-[44px]">
          {t('gallery')}
        </h2>
      </Reveal>

      {/* Desktop */}
      <ul className="site-container hidden grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6 md:grid">
        {images.map((image, index) => (
          <li key={image.src}>
            <Reveal>
              <figure className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => show(index)}
                  aria-label={t('zoom', { caption: image.alt })}
                  data-cursor={tCursor('zoom')}
                  data-cursor-color={hex.blanc}
                  className={cx(
                    'relative block aspect-4/3 overflow-hidden rounded-[18px] border-2 shadow-dure-md',
                    'transition-[translate,rotate,box-shadow] duration-250 ease-out hover:-translate-1 hover:-rotate-2 hover:shadow-dure-lg',
                    'focus-visible:outline-offset-6',
                    TILE_COLORS[index % TILE_COLORS.length],
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1200px) 370px, 45vw"
                    className={image.portrait ? 'object-contain p-3' : 'object-cover object-top'}
                  />
                </button>
                <figcaption className="text-[15px] text-encre-douce">{image.alt}</figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <Carousel label={t('gallery')} className="md:hidden">
        {images.map((image, index) => (
          <figure key={image.src} className="flex w-75 flex-col gap-2">
            <div className={cx('relative aspect-4/3 overflow-hidden rounded-[18px] border-2 shadow-dure', TILE_COLORS[index % TILE_COLORS.length])}>
              <Image src={image.src} alt="" fill sizes="300px" className={image.portrait ? 'object-contain p-2' : 'object-cover object-top'} />
            </div>
            <figcaption className="text-sm text-encre-douce">{image.alt}</figcaption>
          </figure>
        ))}
      </Carousel>

      {/* Visionneuse */}
      <dialog
        ref={dialogRef}
        aria-label={current.alt}
        className="lightbox m-auto w-[min(960px,calc(100%-48px))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-encre/72"
      >
        <div className="flex animate-zoom-in flex-col gap-3.5">
          <div
            className={cx(
              'relative max-h-[75vh] overflow-hidden rounded-[22px] border-2 shadow-[8px_8px_0_var(--color-encre)]',
              current.portrait ? 'aspect-4/3' : 'aspect-16/10',
              TILE_COLORS[open % TILE_COLORS.length],
            )}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="960px"
              className={current.portrait ? 'object-contain p-4' : 'object-cover object-top'}
            />
          </div>
          <div className="flex items-center justify-between gap-3 text-papier">
            <span className="text-[17px]">{current.alt}</span>
            {images.length > 1 && (
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label={t('previousImage')} className="inline-flex size-12 items-center justify-center rounded-full border-2 bg-blanc text-encre">
                  {arrow('left')}
                </button>
                <button type="button" onClick={() => step(1)} aria-label={t('nextImage')} className="inline-flex size-12 items-center justify-center rounded-full border-2 bg-blanc text-encre">
                  {arrow('right')}
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={t('close')}
            className="absolute -top-3.5 -right-3.5 inline-flex size-12 items-center justify-center rounded-full border-2 bg-tomate text-encre"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </section>
  );
}
