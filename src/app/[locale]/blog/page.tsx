import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BlogExplorer, type BlogItem } from '@/components/blog/BlogExplorer';
import { PostCard } from '@/components/blog/PostCard';
import { TextPop } from '@/components/motion/TextPop';
import { getPosts } from '@/content/posts';
import { resolveLocale } from '@/i18n/locale';
import { staticPageMetadata } from '@/lib/seo';

export function generateMetadata({ params }: PageProps<'/[locale]/blog'>): Promise<Metadata> {
  return staticPageMetadata(params, 'blog');
}

export default async function BlogPage({ params }: PageProps<'/[locale]/blog'>) {
  await resolveLocale(params);
  const t = await getTranslations('blog');

  const items: BlogItem[] = getPosts().map((post) => ({
    slug: post.slug,
    category: post.category,
    card: <PostCard post={post} />,
    featured: <PostCard post={post} featured />,
  }));

  return (
    <div className="site-container pt-10 md:pt-20">
      <header className="mb-5 flex flex-col gap-4 md:mb-10 md:gap-5">
        <TextPop
          text={t.raw('title')}
          className="text-[54px] leading-[0.95] tracking-display md:text-[clamp(52px,7vw,104px)]"
          renderers={{
            mark: (word) => (
              <span className="inline-block animate-wobble rounded-[0.2em] border-2 bg-citron px-[0.12em]">{word}</span>
            ),
          }}
        />
        <p className="max-w-160 animate-rise leading-[1.55] text-encre-douce md:text-[19px]" style={{ animationDelay: '400ms' }}>
          {t('intro')}
        </p>
      </header>

      <div className="animate-rise pb-6" style={{ animationDelay: '500ms' }}>
        <BlogExplorer items={items} />
      </div>
    </div>
  );
}
