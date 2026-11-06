import { useTranslations } from 'next-intl';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { Reveal } from '@/components/motion/Reveal';
import { Sticker } from '@/components/ui/Sticker';
import { toolGroups } from '@/content/skills';

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.8];

export function AboutToolbox() {
  const t = useTranslations('about.toolbox');

  return (
    <section aria-labelledby="about-toolbox-title" className="site-container flex flex-col gap-6 pt-14 md:gap-8 md:pt-24">
      <Reveal>
        <h2 id="about-toolbox-title" className="text-[34px] tracking-titre md:text-[clamp(40px,5vw,64px)]">
          {t('title')}
        </h2>
      </Reveal>
      <PauseOffscreen>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-7">
          {toolGroups.map((group, groupIndex) => (
            <Reveal key={group.id} className="flex flex-col gap-3.5">
              <h3 className="text-2xl">{t(`groups.${group.id}`)}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.tools.map((tool, index) => (
                  <li key={tool.name}>
                    <Sticker
                      color={tool.color}
                      size="sm"
                      flat
                      rotate={ROTATIONS[(index + groupIndex) % ROTATIONS.length]}
                      floatOffset={-(index + groupIndex) * 0.37}
                    >
                      {tool.name}
                    </Sticker>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </PauseOffscreen>
    </section>
  );
}
