import type { Metadata } from 'next';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { AboutToolbox } from '@/components/sections/about/AboutToolbox';
import { Process } from '@/components/sections/about/Process';
import { Services } from '@/components/sections/about/Services';
import { resolveLocale } from '@/i18n/locale';
import { staticPageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  return staticPageMetadata(params, 'about', 'profile');
}

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
