import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n/locale';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  await resolveLocale(params);
  const t = await getTranslations('meta.home');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
