import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n/locale';

export default async function ProjectsPage({ params }: PageProps<'/[locale]/projects'>) {
  await resolveLocale(params);
  const t = await getTranslations('meta.projects');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
