import { useTranslations } from 'next-intl';
import { SITE_NAME } from '@/lib/seo';
import { DocumentTitle } from '@/components/seo/DocumentTitle';
import { NotFoundView } from '@/components/sections/errors/NotFoundView';

/**
 * 404 traduite, dans le layout du site (nav et pied de page), pour un projet ou un article inconnu.
 * Pas de generateMetadata ici : Next 16 n'afficherait plus rien. Le titre passe par DocumentTitle.
 */
export default function NotFound() {
  const t = useTranslations('meta.notFound');
  return (
    <>
      <DocumentTitle title={`${t('title')} | ${SITE_NAME}`} />
      <NotFoundView />
    </>
  );
}
