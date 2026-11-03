import { useTranslations } from 'next-intl';
import { homeTools, learning } from '@/content/skills';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { Reveal } from '@/components/motion/Reveal';
import { Sticker } from '@/components/ui/Sticker';

/** Inclinaison de chaque sticker, dans l'ordre. */
const ROTATIONS = [-3, 2, -1, 3, -2, 1, -2, 2, -1, 3, -2, 1];

/** « Ma boîte à outils » : les technos en stickers qui flottent, et ce que j'apprends en pointillés. */
export function HomeToolbox() {
  const t = useTranslations('home.toolbox');

  return (
    <section aria-labelledby="toolbox-title" className="site-container flex flex-col gap-6 pt-12 pb-2 md:gap-8 md:pt-16 md:pb-6">
      <Reveal>
        <h2 id="toolbox-title" className="text-[34px] tracking-titre md:text-[clamp(36px,4vw,52px)]">
          {t('title')}
        </h2>
      </Reveal>
      <Reveal>
        <PauseOffscreen>
          <ul className="flex flex-wrap items-center gap-3 md:gap-4">
            {homeTools.map((tool, index) => (
              <li key={tool.name}>
                <Sticker color={tool.color} rotate={ROTATIONS[index % ROTATIONS.length]} floatOffset={-index * 0.37} size="lg">
                  {tool.name}
                </Sticker>
              </li>
            ))}
            <li className="rounded-full border-2 border-dashed px-5 py-3 font-mono text-sm font-semibold">
              {t('learning', { list: learning.join(', ') })}
            </li>
          </ul>
        </PauseOffscreen>
      </Reveal>
    </section>
  );
}
