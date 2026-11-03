import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n/locale';

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  await resolveLocale(params);
  const t = await getTranslations('meta.about');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
