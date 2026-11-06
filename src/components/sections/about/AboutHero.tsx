import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { TextPop } from '@/components/motion/TextPop';
import { Button } from '@/components/ui/Button';
import { Star } from '@/components/ui/Star';
import { Sticker } from '@/components/ui/Sticker';
import { hex } from '@/content/colors';

export function AboutHero() {
  const t = useTranslations('about');
  const tCursor = useTranslations('cursor');

  return (
    <section className="site-container grid items-center gap-12 pt-10 pb-6 md:gap-14 md:pt-20 md:pb-10 lg:grid-cols-2">
      <div className="flex flex-col gap-4.5 md:gap-5.5">
        <TextPop
          text={t.raw('title')}
          className="text-[54px] leading-[0.95] tracking-display md:text-[clamp(52px,7vw,100px)]"
          renderers={{
            mark: (word) => <span className="inline-block animate-wobble rounded-[0.2em] border-2 bg-soleil px-[0.12em]">{word}</span>,
          }}
        />
        {(['p1', 'p2', 'p3'] as const).map((key, index) => (
          <p key={key} className="animate-rise leading-[1.6] md:text-[19px]" style={{ animationDelay: `${450 + index * 100}ms` }}>
            {t(key)}
          </p>
        ))}
        <div className="mt-1.5 flex animate-rise flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ animationDelay: '750ms' }}>
          <Button href="/files/cv.pdf" download arrow cursor={tCursor('pdf')} cursorColor={hex.citron}>
            {t('cv')}
          </Button>
          <Button href="/contact" variant="blanc" cursor={tCursor('writeMe')} cursorColor={hex.soleil}>
            {t('contact')}
          </Button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-90 animate-rise pt-10 pb-6 md:max-w-110" style={{ animationDelay: '300ms' }}>
        <figure
          data-cursor={tCursor('hello')}
          data-cursor-color={hex.soleil}
          className="relative flex origin-top animate-swing flex-col gap-3.5 rounded-carte border-2 bg-blanc px-4 pt-4 pb-5 shadow-[8px_8px_0_var(--color-encre)] transition-[scale] duration-300 ease-rebond hover:scale-104 hover:[animation-play-state:paused]"
        >
          <span aria-hidden="true" className="absolute -top-4.5 left-1/2 h-8 w-27.5 -translate-x-1/2 -rotate-4 border-2 bg-citron opacity-92" />
          <Image
            src="/images/photo.webp"
            alt={t('photoAlt')}
            width={448}
            height={448}
            priority
            className="aspect-square w-full rounded-[14px] border-2 object-cover"
          />
          <figcaption className="text-center font-mono text-sm font-semibold">{t('photoCaption')}</figcaption>
        </figure>

        <span className="absolute top-17.5 -left-4 md:-left-5.5">
          <Sticker color="citron" rotate={-8}>
            {t('stickers.job')}
          </Sticker>
        </span>
        <span className="absolute -right-3 bottom-22.5 md:-right-4">
          <Sticker color="rose" rotate={6} floatOffset={-1.5}>
            {t('stickers.gamer')}
          </Sticker>
        </span>
        <Star outlined spin fill="fill-tomate" className="absolute top-2 right-6 size-10" />
      </div>
    </section>
  );
}
