import { useTranslations } from 'next-intl';
import { NotFoundView } from '@/components/sections/errors/NotFoundView';
import { DocumentTitle } from '@/components/seo/DocumentTitle';
import { SITE_NAME } from '@/lib/seo';

// Pas de generateMetadata ici : Next 16 n'afficherait plus rien, d'où DocumentTitle.
export default function NotFound() {
  const t = useTranslations('meta.notFound');
  return (
    <>
      <DocumentTitle title={`${t('title')} | ${SITE_NAME}`} />
      <NotFoundView />
    </>
  );
}
