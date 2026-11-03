import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n/locale';

export default async function BlogPage({ params }: PageProps<'/[locale]/blog'>) {
  await resolveLocale(params);
  const t = await getTranslations('meta.blog');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
