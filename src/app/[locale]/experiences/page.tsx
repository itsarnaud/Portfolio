import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n/locale';

export default async function ExperiencesPage({ params }: PageProps<'/[locale]/experiences'>) {
  await resolveLocale(params);
  const t = await getTranslations('meta.experiences');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
