import { resolveLocale } from '@/i18n/locale';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutToolbox } from '@/components/sections/about/AboutToolbox';
import { Process } from '@/components/sections/about/Process';
import { Services } from '@/components/sections/about/Services';

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  await resolveLocale(params);

  return (
    <>
      <PauseOffscreen>
        <AboutHero />
      </PauseOffscreen>
      <Services />
      <Process />
      <AboutToolbox />
    </>
  );
}
