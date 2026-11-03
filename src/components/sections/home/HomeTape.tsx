import { useLocale } from 'next-intl';
import { marquee } from '@/content/home';
import { Marquee } from '@/components/motion/Marquee';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { Star } from '@/components/ui/Star';

const STAR_COLORS = ['fill-citron', 'fill-tomate', 'fill-soleil', 'fill-rose', 'fill-cobalt'];

/**
 * Le double bandeau croisé : les technos sur fond encre, les offres sur fond citron
 * dans l'autre sens. S'arrête au survol, et quand il sort de l'écran.
 */
export function HomeTape() {
  const locale = useLocale();

  return (
    <PauseOffscreen className="group/tape relative -mx-7.5 mt-2 h-37.5 md:-mx-10 md:mt-0 md:h-52.5">
      <Marquee
        items={marquee.tech}
        className="absolute inset-x-0 top-8.5 z-2 -rotate-4 border-y-2 bg-encre py-3 text-papier md:top-12.5 md:-rotate-3 md:py-4"
        trackClassName="gap-5 pr-5 font-display text-2xl font-bold md:gap-7 md:pr-7 md:text-3xl"
        separator={(index) => (
          <Star fill={STAR_COLORS[index % STAR_COLORS.length]} className="size-5 md:size-6" />
        )}
      />
      <Marquee
        items={marquee.offer[locale]}
        reverse
        duration={40}
        repeat={3}
        className="absolute inset-x-0 top-14 z-1 rotate-3 border-y-2 bg-citron py-2.5 md:top-17.5 md:rotate-[2.5deg] md:py-3.5"
        trackClassName="gap-4.5 pr-4.5 font-mono text-[15px] font-semibold md:gap-6 md:pr-6 md:text-lg"
        separator={() => <span>✦</span>}
      />
    </PauseOffscreen>
  );
}
