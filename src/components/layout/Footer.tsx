import { useTranslations } from 'next-intl';
import { hex } from '@/content/colors';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Star } from '@/components/ui/Star';
import { HideOnPaths } from './HideOnPaths';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from './navLinks';

/**
 * Pied de page : le bloc violet « On en parle ? » (le point d'interrogation se balance),
 * l'email en grand et les boutons, puis la ligne © et le lien vers le code.
 * Le bloc violet est masqué sur la page Contact, qui fait déjà ce travail.
 */
export function Footer() {
  const t = useTranslations('footer');
  const tCursor = useTranslations('cursor');

  return (
    <footer className="site-container">
      <HideOnPaths paths={['/contact']}>
        <PauseOffscreen>
          <Reveal className="pt-12 md:pt-18">
            <div className="relative flex flex-col gap-4.5 overflow-hidden rounded-[28px] border-2 bg-violet px-5.5 py-8 text-blanc shadow-[5px_5px_0_var(--color-encre)] md:gap-6 md:rounded-[32px] md:p-[clamp(32px,6vw,72px)] md:shadow-dure-md">
              <div aria-hidden="true" className="absolute -top-10 -right-10 size-32.5 animate-float rounded-full border-2 bg-soleil md:size-50" />
              <div aria-hidden="true" className="absolute right-7.5 -bottom-6.5 size-17.5 animate-spin-slow rounded-2xl border-2 bg-tomate md:right-37.5 md:-bottom-7.5 md:size-27.5 md:rounded-[22px]" />
              <Star outlined spin fill="fill-citron" className="absolute top-47.5 right-15 hidden size-12 md:block" />

              <h2 className="relative text-[56px] leading-[0.95] tracking-display md:text-[clamp(52px,8vw,120px)]">
                {t.rich('title', {
                  swing: (chunk) => <span className="inline-block animate-wobble text-citron">{chunk}</span>,
                })}
              </h2>

              <a
                href={`mailto:${EMAIL}`}
                data-cursor={tCursor('writeMe')}
                data-cursor-color={hex.citron}
                className="relative self-start font-display text-[23px] font-bold tracking-titre-carte break-all text-citron underline decoration-2 underline-offset-6 md:text-[clamp(24px,3.4vw,44px)] md:decoration-3 md:underline-offset-8"
              >
                {t('email')}
              </a>

              <div className="relative mb-5 flex flex-col gap-2.5 md:mt-2 md:mb-0 md:flex-row md:flex-wrap md:gap-3">
                <Button href="/contact" variant="citron" arrow cursor={tCursor('go')} cursorColor={hex.citron}>
                  {t('form')}
                </Button>
                <div className="flex gap-2.5 md:contents">
                  <Button href={LINKEDIN_URL} variant="blanc" cursor={tCursor('linkedin')} cursorColor={hex.blanc} className="flex-1 md:flex-none">
                    {t('linkedin')}
                  </Button>
                  <Button href={GITHUB_URL} variant="blanc" cursor={tCursor('github')} cursorColor={hex.blanc} className="flex-1 md:flex-none">
                    {t('github')}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </PauseOffscreen>
      </HideOnPaths>

      <div className="flex flex-wrap justify-between gap-3 pt-6 pb-8 font-mono text-xs text-encre-pale md:pt-7 md:pb-10 md:text-[13px]">
        <span className="inline-flex items-center gap-2">
          {t('rights', { year: new Date().getFullYear() })}
          <Star spin fill="fill-violet" className="hidden size-3.5 md:block" />
        </span>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-violet">
          <span className="md:hidden">{t('sourceShort')}</span>
          <span className="hidden md:inline">{t('source')}</span>
        </a>
      </div>
    </footer>
  );
}
