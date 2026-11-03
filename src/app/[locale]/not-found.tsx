import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

// Version provisoire. La vraie 404 (maquette Erreur404) arrive à l'étape 8.
export default async function NotFound() {
  const t = await getTranslations();

  return (
    <main>
      <h1>{t('meta.notFound.title')}</h1>
      <Link href="/">{t('notFound.home')}</Link>
    </main>
  );
}
