import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { Hero } from '@/components/sections/home/Hero';
import { HomeTape } from '@/components/sections/home/HomeTape';
import { HomeToolbox } from '@/components/sections/home/HomeToolbox';
import { LatestProjects } from '@/components/sections/home/LatestProjects';
import { WhoAndNow } from '@/components/sections/home/WhoAndNow';
import { metadataLocale, resolveLocale } from '@/i18n/locale';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = await metadataLocale(params);
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return pageMetadata({ locale, path: '', title: t('title'), description: t('description'), absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  await resolveLocale(params);

  return (
    <>
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
