import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { hex } from '@/content/colors';
import { now } from '@/content/home';
import { getPosts } from '@/content/posts';
import { Link } from '@/i18n/navigation';
import { SITE_NAME } from '@/lib/seo';
import { cx } from '@/lib/utils';

function NowRow({ label, labelClass, last, children }: { label: string; labelClass: string; last?: boolean; children: ReactNode }) {
  return (
    <div
      className={cx(
        'flex flex-col gap-1 border-t-2 py-3 md:flex-row md:flex-wrap md:items-baseline md:gap-4 md:py-3.5',
        'transition-[padding,background-color] duration-200 ease-out md:hover:bg-papier md:hover:pl-3.5',
        last && 'md:border-b-2',
      )}
    >
      <span className={cx('font-mono text-xs font-semibold uppercase md:w-30 md:text-[13px]', labelClass)}>{label}</span>
      <span className="text-base font-medium md:flex-[1_1_200px] md:text-lg">{children}</span>
    </div>
  );
}

export function WhoAndNow() {
  const locale = useLocale();
  const t = useTranslations('home');
  const tCursor = useTranslations('cursor');
  const lastPost = getPosts()[0];

  return (
    <section className="site-container grid gap-4.5 pt-12 pb-2 md:grid-cols-2 md:gap-7 md:pt-20 md:pb-10">
      <Reveal>
        <article className="flex h-full flex-col gap-4 rounded-3xl border-2 bg-soleil p-5.5 shadow-[5px_5px_0_var(--color-encre)] md:gap-5 md:rounded-[26px] md:p-8 md:shadow-dure-md">
          <div className="flex flex-wrap items-center gap-3.5 md:gap-4.5">
            <Image
              src="/images/photo.webp"
              alt={SITE_NAME}
              width={112}
              height={112}
              data-cursor={tCursor('hello')}
              data-cursor-color={hex.blanc}
              className="size-21 rotate-[-4deg] rounded-full border-2 object-cover transition-[rotate] duration-400 ease-rebond hover:rotate-8 md:size-28"
            />
            <h2 className="text-[34px] tracking-titre md:text-[44px]">{t('who.title')}</h2>
          </div>
          <p className="leading-[1.55] md:text-lg">{t('who.p1')}</p>
          <p className="leading-[1.55] md:text-lg">{t('who.p2')}</p>
          <div className="mt-1 flex gap-2.5 md:flex-wrap md:gap-3">
            <Button href="/about" variant="encre" cursor={tCursor('learnMore')} cursorColor={hex.citron} className="flex-1 md:flex-none">
              {t('who.more')}
            </Button>
            <Button href="/files/cv.pdf" download variant="blanc" cursor={tCursor('pdf')} cursorColor={hex.blanc} className="flex-1 md:flex-none">
              <span className="md:hidden">{t('who.cvShort')}</span>
              <span className="hidden md:inline">{t('who.cv')}</span>
            </Button>
          </div>
        </article>
      </Reveal>

      <Reveal>
        <article className="flex h-full flex-col rounded-3xl border-2 bg-blanc p-5.5 shadow-[5px_5px_0_var(--color-encre)] md:rounded-[26px] md:p-8 md:shadow-dure-md">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 md:mb-3.5">
            <h2 className="text-3xl tracking-titre md:text-[44px]">{t('now.title')}</h2>
          </div>
          <NowRow label={t('now.building')} labelClass="text-violet">
            {now.building[locale]}
            <span aria-hidden="true" className="ml-1 inline-block h-[1.1em] w-0.5 animate-blink bg-encre align-[-0.15em]" />
          </NowRow>
          <NowRow label={t('now.learning')} labelClass="text-cobalt-fonce">
            {now.learning[locale]}
          </NowRow>
          {now.playing && (
            <NowRow label={t('now.playing')} labelClass="text-tomate-fonce">
              {now.playing}
            </NowRow>
          )}
          {lastPost && (
            <NowRow label={t('now.lastPost')} labelClass="text-encre" last>
              <Link
                href={`/blog/${lastPost.slug}`}
                data-cursor={tCursor('read')}
                data-cursor-color={hex.citron}
                className="underline underline-offset-4 hover:text-violet"
              >
                {lastPost.title[locale]}
              </Link>
            </NowRow>
          )}
        </article>
      </Reveal>
    </section>
  );
}
