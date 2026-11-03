import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';
import { hex } from '@/content/colors';
import { Link } from '@/i18n/navigation';
import { navLinks } from '@/components/layout/navLinks';
import { Marquee } from '@/components/motion/Marquee';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { TextPop } from '@/components/motion/TextPop';
import { Button } from '@/components/ui/Button';
import { Star } from '@/components/ui/Star';
import { LostCard } from './LostCard';
import { StarGame } from './StarGame';

/** Couleur de chaque lien « Tu cherchais peut-être », au survol. */
const LINK_COLORS: Record<string, [string, string]> = {
  projects: [hex.violet, hex.blanc],
  blog: [hex.citron, hex.encre],
  about: [hex.soleil, hex.encre],
  experiences: [hex.cobalt, hex.blanc],
  contact: [hex.rose, hex.encre],
};

/**
 * Page 404 (maquette Erreur404) : « 4 [carte] 4 », le texte, les boutons, les liens vers
 * les autres pages et le mini-jeu « Attrape l'étoile », puis un bandeau qui défile.
 * Le bloc « On en parle ? » du pied de page est masqué (data-hide-footer-cta).
 */
export function NotFoundView() {
  const t = useTranslations('notFound');
  const tNav = useTranslations('nav');
  const tCursor = useTranslations('cursor');
  const ticker = [t('ticker.one'), t('ticker.two'), t('ticker.three')];

  return (
    <div data-hide-footer-cta className="flex flex-col">
      <meta name="robots" content="noindex" />
      <PauseOffscreen className="site-container flex justify-center pt-11 md:pt-10">
        {/* Le décor est caché aux lecteurs d'écran, pas la carte : elle est cliquable. */}
        <div className="relative flex items-center gap-2.5 font-display text-[150px] leading-[0.85] font-extrabold tracking-[-0.05em] md:gap-4.5 md:text-[300px]">
          <span aria-hidden="true" className="inline-block animate-pop" style={{ animationDelay: '100ms' }}>
            4
          </span>
          <LostCard />
          <span aria-hidden="true" className="inline-block animate-pop" style={{ animationDelay: '200ms' }}>
            4
          </span>
          <span aria-hidden="true" className="absolute top-2 -left-12 inline-flex rotate-6 animate-bob rounded-full border-2 bg-rose px-3 py-1.5 font-mono text-xs font-semibold tracking-normal shadow-dure-sm md:top-7.5 md:-left-27.5 md:px-4 md:py-2 md:text-sm">
            {t('badge')}
          </span>
          <Star outlined spin fill="fill-soleil" className="absolute -right-6 bottom-6 size-8 md:-right-12 md:bottom-10 md:size-12" />
          <Star outlined spin fill="fill-tomate" className="absolute -top-3 -right-3 size-5 md:-top-4 md:-right-8 md:size-7" />
        </div>
      </PauseOffscreen>

      <p className="mt-3 text-center text-sm text-encre-pale md:hidden">{t('card.hintTouch')}</p>

      <section className="site-container flex flex-wrap items-start gap-10 pt-10 pb-14 md:pt-12">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-6">
          <TextPop
            text={t.raw('title')}
            delay={450}
            className="text-[46px] leading-[0.95] tracking-display md:text-[clamp(48px,6vw,80px)]"
            renderers={{
              mark: (word) => <span className="inline-block animate-wobble rounded-[0.2em] border-2 bg-soleil px-[0.12em]">{word}</span>,
            }}
          />
          <p className="max-w-135 animate-rise leading-[1.55] text-encre-douce md:text-[19px]" style={{ animationDelay: '700ms' }}>
            {t('text')}
          </p>
          <div className="flex animate-rise flex-col gap-3.5 sm:flex-row sm:flex-wrap" style={{ animationDelay: '780ms' }}>
            <Button href="/" arrow cursor={tCursor('home')} cursorColor={hex.citron}>
              {t('home')}
            </Button>
            <Button href="/projects" variant="blanc" cursor={tCursor('projects')} cursorColor={hex.soleil}>
              {t('projects')}
            </Button>
          </div>
          <div className="flex animate-rise flex-col gap-3 pt-2" style={{ animationDelay: '860ms' }}>
            <h2 className="font-sans text-[17px] font-bold tracking-normal">{t('maybe')}</h2>
            <nav aria-label={tNav('pagesLabel')} className="flex flex-wrap gap-2">
              {navLinks
                .filter(({ key }) => key !== 'home')
                .map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    data-cursor={tCursor('goThere')}
                    data-cursor-color={LINK_COLORS[key][0]}
                    style={{ '--c': LINK_COLORS[key][0], '--f': LINK_COLORS[key][1] } as CSSProperties}
                    className="inline-flex min-h-11 items-center rounded-full border-2 bg-blanc px-4 font-bold transition-[background-color,color,translate,box-shadow] duration-200 hover:-translate-0.5 hover:bg-(--c) hover:text-(--f) hover:shadow-dure-sm"
                  >
                    {tNav(key)}
                  </Link>
                ))}
            </nav>
          </div>
        </div>

        <StarGame />
      </section>

      <PauseOffscreen className="py-4">
        <Marquee
          items={ticker}
          duration={26}
          repeat={4}
          className="-mx-[2%] -rotate-[1.5deg] border-y-2 bg-tomate py-2.5"
          trackClassName="gap-5.5 pr-5.5 font-display text-2xl font-extrabold tracking-titre-carte md:text-3xl"
          separator={() => <Star fill="fill-papier" outlined className="size-6" />}
        />
      </PauseOffscreen>
    </div>
  );
}
