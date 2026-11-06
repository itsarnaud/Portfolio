'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { EMAIL } from '@/components/layout/navLinks';
import { Marquee } from '@/components/motion/Marquee';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { TextPop } from '@/components/motion/TextPop';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Star } from '@/components/ui/Star';
import { hex } from '@/content/colors';
import { cx } from '@/lib/utils';
import { BrokenCard } from './BrokenCard';
import { BugGame } from './BugGame';

type ErrorViewProps = {
  code: string;
  onRetry: () => void;
};

export function ErrorView({ code, onRetry }: ErrorViewProps) {
  const t = useTranslations('error');
  const tCursor = useTranslations('cursor');
  const [retrying, setRetrying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const retry = () => {
    if (retrying) return;
    setRetrying(true);
    onRetry();
    timer.current = setTimeout(() => setRetrying(false), 1400);
  };

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(t('mailSubject'))}&body=${encodeURIComponent(t('mailBody', { code }))}`;
  const ticker = [t('ticker.one'), t('ticker.two'), t('ticker.three')];

  return (
    <div data-hide-footer-cta className="flex flex-col">
      <meta name="robots" content="noindex" />
      <section className="site-container flex flex-wrap items-center gap-12 pt-10 pb-12 md:pt-16">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-6">
          <TextPop
            text={t.raw('title')}
            className="text-[48px] leading-[0.95] tracking-display md:text-[clamp(52px,7vw,96px)]"
            renderers={{
              mark: (word) => <span className="inline-block animate-wobble rounded-[0.2em] border-2 bg-tomate px-[0.12em]">{word}</span>,
            }}
          />
          <p className="max-w-135 animate-rise leading-[1.55] text-encre-douce md:text-[19px]" style={{ animationDelay: '420ms' }}>
            {t('text')}
          </p>
          <div className="flex animate-rise flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center" style={{ animationDelay: '500ms' }}>
            <Button type="button" onClick={retry} disabled={retrying} cursor={tCursor('retry')} cursorColor={hex.citron}>
              <svg aria-hidden="true" viewBox="0 0 24 24" className={cx('size-4.5', retrying && 'animate-spin-star [animation-duration:0.8s]')} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" />
              </svg>
              {retrying ? t('retrying') : t('retry')}
            </Button>
            <Button href="/" variant="blanc" cursor={tCursor('home')} cursorColor={hex.soleil}>
              {t('home')}
            </Button>
          </div>
          <p className="flex animate-rise flex-wrap items-center gap-2.5 text-encre-douce" style={{ animationDelay: '580ms' }}>
            <a href={mailto} data-cursor={tCursor('write')} data-cursor-color={hex.rose} className="font-bold text-encre underline underline-offset-4 hover:text-violet">
              {t('report')}
            </a>
            <span>{t('withCode')}</span>
            <CopyButton value={code} copiedLabel={t('copied')} cursor={tCursor('copy')} cursorColor={hex.citron} className="min-h-9">
              {code}
            </CopyButton>
          </p>
        </div>

        <PauseOffscreen className="flex min-w-0 flex-[1_1_380px] justify-center">
          <BrokenCard />
        </PauseOffscreen>
      </section>

      <PauseOffscreen className="site-container pb-14">
        <BugGame />
      </PauseOffscreen>

      <PauseOffscreen className="py-4">
        <Marquee
          items={ticker}
          duration={26}
          repeat={4}
          reverse
          className="-mx-[2%] rotate-[1.5deg] border-y-2 bg-soleil py-2.5"
          trackClassName="gap-5.5 pr-5.5 font-display text-2xl font-extrabold tracking-titre-carte md:text-3xl"
          separator={() => <Star fill="fill-tomate" outlined className="size-6" />}
        />
      </PauseOffscreen>
    </div>
  );
}
