import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { hex } from '@/content/colors';
import { resolveLocale } from '@/i18n/locale';
import { staticPageMetadata } from '@/lib/seo';
import { cx } from '@/lib/utils';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/components/layout/navLinks';
import { TextPop } from '@/components/motion/TextPop';
import { ContactForm } from '@/components/sections/contact/ContactForm';
import { ParisClock } from '@/components/sections/contact/ParisClock';
import { CopyButton } from '@/components/ui/CopyButton';

const card =
  'flex flex-col gap-1.5 rounded-[20px] border-2 p-5 shadow-dure transition-[translate,rotate,box-shadow] duration-200 ease-out hover:-translate-1 hover:-rotate-[0.6deg] hover:shadow-dure-lg';

export function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  return staticPageMetadata(params, 'contact');
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  await resolveLocale(params);
  const t = await getTranslations('contact');
  const tCursor = await getTranslations('cursor');

  return (
    <div className="site-container flex flex-wrap items-start gap-10 pt-10 pb-6 md:pt-18">
      <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
        <header className="flex flex-col gap-4">
          <TextPop
            text={t.raw('title')}
            className="text-[54px] leading-[0.95] tracking-display md:text-[clamp(52px,7vw,104px)]"
            renderers={{
              mark: (word) => (
                <span className="inline-block animate-wobble rounded-[0.2em] border-2 bg-tomate px-[0.12em]">{word}</span>
              ),
            }}
          />
          <p className="max-w-140 animate-rise leading-[1.55] text-encre-douce md:text-[19px]" style={{ animationDelay: '400ms' }}>
            {t('intro')}
          </p>
        </header>
        <div className="animate-rise" style={{ animationDelay: '500ms' }}>
          <ContactForm />
        </div>
      </div>

      <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-4.5 pt-2">
        <h2 className="animate-rise text-[28px] tracking-titre-carte" style={{ animationDelay: '550ms' }}>
          {t('direct')}
        </h2>

        <div className={cx(card, 'animate-rise gap-2.5 bg-soleil')} style={{ animationDelay: '620ms' }}>
          <span className="text-sm font-bold">{t('emailLabel')}</span>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor={tCursor('open')}
            data-cursor-color={hex.blanc}
            className="font-display text-xl font-extrabold [overflow-wrap:anywhere] hover:underline xl:text-[22px]"
          >
            {EMAIL}
          </a>
          <CopyButton value={EMAIL} copiedLabel={t('copied')} cursor={tCursor('copy')} cursorColor={hex.blanc} className="self-start">
            {t('copy')}
          </CopyButton>
        </div>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor={tCursor('linkedin')}
          data-cursor-color={hex.citron}
          className={cx(card, 'animate-rise bg-cobalt text-blanc')}
          style={{ animationDelay: '690ms' }}
        >
          <span className="text-sm font-bold">{t('linkedin')}</span>
          <span className="font-display text-[22px] font-extrabold">royer-arnaud</span>
        </a>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor={tCursor('github')}
          data-cursor-color={hex.citron}
          className={cx(card, 'animate-rise bg-blanc')}
          style={{ animationDelay: '760ms' }}
        >
          <span className="text-sm font-bold">{t('github')}</span>
          <span className="font-display text-[22px] font-extrabold">itsarnaud</span>
        </a>

        <p
          className="flex animate-rise items-center gap-3 rounded-[20px] border-2 border-dashed px-4.5 py-3.5"
          style={{ animationDelay: '830ms' }}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          <span>{t.rich('clock', { time: () => <ParisClock /> })}</span>
        </p>
      </aside>
    </div>
  );
}
