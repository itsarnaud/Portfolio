import { useLocale, useTranslations } from 'next-intl';
import { TextPop } from '@/components/motion/TextPop';
import { Ticker } from '@/components/motion/Ticker';
import { WaveWord } from '@/components/motion/WaveWord';
import { ProjectDeck, type DeckCard } from '@/components/projects/ProjectDeck';
import { Button } from '@/components/ui/Button';
import { Stamp } from '@/components/ui/Stamp';
import { hex } from '@/content/colors';
import { workingOn } from '@/content/home';
import { getProjects } from '@/content/projects';

// Le CSS du paquet (.deck-card) prévoit exactement 4 rangs.
const DECK_SIZE = 4;

export function Hero() {
  const locale = useLocale();
  const t = useTranslations('home.hero');
  const tProjects = useTranslations('projects');
  const tCursor = useTranslations('cursor');

  const cards: DeckCard[] = getProjects()
    .slice(0, DECK_SIZE)
    .map((project) => ({
      slug: project.slug,
      number: project.number,
      numberLabel: tProjects('number', { number: project.number }),
      year: project.year,
      title: project.title,
      pitch: (project.pitch ?? project.description)[locale],
      badge: project.badge?.[locale] ?? tProjects(`categories.${project.category}`),
      color: project.color,
      stack: project.stack,
      image: project.media.poster,
    }));

  return (
    <section className="site-container grid items-center gap-14 pt-10 pb-6 md:pt-16 md:pb-18 lg:grid-cols-2">
      <div className="flex flex-col gap-5.5 md:gap-7">
        <TextPop
          text={t.raw('title')}
          className="font-etroite text-[46px] leading-[1.06] tracking-[-0.035em] md:text-[clamp(46px,6.4vw,92px)] md:leading-[1.04]"
          renderers={{
            swing: (word) => (
              <span className="inline-block animate-wobble rounded-[0.2em] border-2 bg-citron px-[0.14em]">{word}</span>
            ),
            float: (word) => (
              <span className="inline-block animate-bob rounded-full border-2 bg-cobalt px-[0.28em] text-blanc">{word}</span>
            ),
            wave: (word) => <WaveWord>{word}</WaveWord>,
          }}
        />

        <p
          className="max-w-135 animate-rise text-[17px] leading-[1.55] text-encre-douce md:text-[19px] md:leading-[1.6]"
          style={{ animationDelay: '900ms' }}
        >
          {t('intro')} <Ticker words={workingOn[locale]} />
        </p>

        <div
          className="flex animate-rise flex-col gap-3 sm:flex-row sm:flex-wrap md:gap-3.5"
          style={{ animationDelay: '1000ms' }}
        >
          <Button href="/projects" arrow cursor={tCursor('letsGo')} cursorColor={hex.citron}>
            {t('ctaProjects')}
          </Button>
          <Button href="/contact" variant="blanc" cursor={tCursor('writeMe')} cursorColor={hex.soleil}>
            {t('ctaContact')}
          </Button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-125 animate-rise pt-9 md:pt-10" style={{ animationDelay: '500ms' }}>
        <ProjectDeck
          cards={cards}
          label={t('deckLabel')}
          cursor={tCursor('shuffle')}
          hint={t('deckHint')}
          hintTouch={t('deckHintTouch')}
        />
        <div className="pointer-events-none absolute top-2 right-2 z-30 w-24 md:top-0 md:-right-1.5 md:w-32">
          <Stamp text={t('stamp')} />
        </div>
      </div>
    </section>
  );
}
