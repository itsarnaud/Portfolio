import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n/locale';

// generateStaticParams et le vrai contenu arrivent avec le contenu typé (étape 3).
export default async function BlogPostPage({ params }: PageProps<'/[locale]/blog/[slug]'>) {
  await resolveLocale(params);
  const { slug } = await params;
  const t = await getTranslations('meta.blogPost');

  return (
    <main>
      <h1>
        {t('title')} : {slug}
      </h1>
    </main>
  );
}
