import { resolveLocale } from '@/i18n/locale';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { Hero } from '@/components/sections/home/Hero';
import { HomeTape } from '@/components/sections/home/HomeTape';
import { HomeToolbox } from '@/components/sections/home/HomeToolbox';
import { LatestProjects } from '@/components/sections/home/LatestProjects';
import { WhoAndNow } from '@/components/sections/home/WhoAndNow';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  await resolveLocale(params);

  return (
    <>
      {/* Les boucles CSS de ces zones se mettent en pause quand elles sortent de l'écran. */}
      <PauseOffscreen>
        <Hero />
      </PauseOffscreen>
      <HomeTape />
      <LatestProjects />
      <PauseOffscreen>
        <WhoAndNow />
      </PauseOffscreen>
      <HomeToolbox />
    </>
  );
}
