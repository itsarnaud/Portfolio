import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n/locale';

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  await resolveLocale(params);
  const t = await getTranslations('meta.contact');

  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}
