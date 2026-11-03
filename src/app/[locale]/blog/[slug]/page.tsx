import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/content/posts';
import { routing } from '@/i18n/routing';
import { resolveLocale } from '@/i18n/locale';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getPosts().map(({ slug }) => ({ locale, slug })));
}

// Page provisoire : la vraie page d'article arrive à l'étape 8.
export default async function BlogPostPage({ params }: PageProps<'/[locale]/blog/[slug]'>) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main>
      <h1>{post.title[locale]}</h1>
      {post.content[locale].map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </main>
  );
}
