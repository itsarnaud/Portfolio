import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { categoryColor } from '@/components/blog/categories';
import { PauseOffscreen } from '@/components/motion/PauseOffscreen';
import { Reveal } from '@/components/motion/Reveal';
import { TextPop } from '@/components/motion/TextPop';
import { BlogPostingJsonLd } from '@/components/seo/JsonLd';
import { BackLink } from '@/components/ui/BackLink';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Star } from '@/components/ui/Star';
import { bgClass, hex } from '@/content/colors';
import { getAdjacentPosts, getPost, getPosts } from '@/content/posts';
import type { Post } from '@/content/types';
import { metadataLocale, resolveLocale } from '@/i18n/locale';
import { Link } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import { pageMetadata, SITE_NAME } from '@/lib/seo';
import { cx, formatDate, stripMarks } from '@/lib/utils';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getPosts().map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/blog/[slug]'>): Promise<Metadata> {
  const locale = await metadataLocale(params);
  const post = getPost((await params).slug);
  if (!post) return {};
  const title = post.title[locale];
  return pageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title,
    description: post.excerpt[locale],
    type: 'article',
    // Les titres de post sont longs : on ne leur ajoute « | Arnaud Royer » que s'il reste de la place.
    absoluteTitle: `${title} | ${SITE_NAME}`.length > 60,
    publishedTime: post.date,
    keywords: [...post.tags, SITE_NAME],
  });
}

function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s)]+)/g).map((part, index) =>
    /^https?:\/\//.test(part) ? (
      <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4 hover:text-violet">
        {part.replace(/^https?:\/\//, '')}
      </a>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

function AdjacentPost({ post, label, locale, align }: { post: Post; label: string; locale: Locale; align: 'start' | 'end' }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-transition-label={post.title[locale]}
      className={cx(
        'flex flex-1 flex-col gap-2 rounded-carte border-2 bg-blanc p-5 shadow-dure-md md:p-6',
        'transition-[translate,box-shadow] duration-200 ease-out hover:-translate-1 hover:shadow-dure-lg',
        align === 'end' && 'md:text-right',
      )}
    >
      <span className="font-mono text-xs font-semibold text-encre-pale">{label}</span>
      <span className="font-display text-xl leading-[1.15] font-extrabold tracking-titre-carte md:text-2xl">{post.title[locale]}</span>
    </Link>
  );
}

export default async function BlogPostPage({ params }: PageProps<'/[locale]/blog/[slug]'>) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations('blogPost');
  const tBlog = await getTranslations('blog');
  const tCursor = await getTranslations('cursor');
  const tNav = await getTranslations('nav');
  const color = categoryColor[post.category];
  const { newer, older } = getAdjacentPosts(post.slug);

  return (
    <article>
      <BlogPostingJsonLd post={post} locale={locale} crumbs={{ home: tNav('home'), section: tNav('blog') }} />
      <BackLink href="/blog" label={t('back')} />

      <PauseOffscreen className="site-container pt-2 md:pt-4">
        <header
          className={cx(
            'relative flex flex-col gap-4 overflow-hidden rounded-[28px] border-2 px-5 py-7 shadow-[5px_5px_0_var(--color-encre)] md:gap-6 md:rounded-[32px] md:p-[clamp(28px,5vw,64px)] md:shadow-dure-md',
            bgClass[color],
          )}
        >
          <div aria-hidden="true" className={cx('absolute -top-12 -right-12 size-36 animate-float rounded-full border-2 md:size-52', color === 'citron' ? 'bg-soleil' : 'bg-citron')} />
          <Star outlined spin fill="fill-rose" className="absolute right-8 bottom-8 hidden size-10 md:block" />

          <p className="relative flex animate-rise flex-wrap gap-2 font-mono text-xs font-semibold md:text-[13px]" style={{ animationDelay: '100ms' }}>
            <span className="rounded-full border-2 border-encre bg-blanc px-3 py-1.5 text-encre">
              <time dateTime={post.date}>{formatDate(locale, post.date)}</time>
            </span>
            <span className="rounded-full border-2 border-current px-3 py-1.5">{tBlog(`categories.${post.category}`)}</span>
          </p>
          <TextPop
            text={post.title[locale]}
            className="relative max-w-225 text-[34px] leading-[1.05] tracking-titre md:text-[clamp(36px,5vw,68px)]"
          />
          <p className="relative max-w-170 animate-rise text-lg leading-[1.5] md:text-xl" style={{ animationDelay: '600ms' }}>
            {post.excerpt[locale]}
          </p>
        </header>
      </PauseOffscreen>

      <Reveal className="site-container">
        <div className="mx-auto flex max-w-lecture flex-col gap-5 pt-10 text-[17px] leading-[1.7] md:pt-16 md:text-lg">
          {post.content[locale].map((paragraph) => (
            <p key={paragraph}>{linkify(paragraph)}</p>
          ))}

          <div className="mt-4 flex flex-col gap-5 border-t-2 border-dashed pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-bold">{t('tags')}</span>
              {post.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
            <div>
              <Button href={post.linkedinUrl} variant="blanc" arrow cursor={tCursor('linkedin')} cursorColor={hex.citron}>
                {t('readOnLinkedin')}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>

      {(newer || older) && (
        <Reveal className="site-container">
          <nav aria-label={stripMarks(tBlog.raw('title'))} className="mx-auto flex max-w-225 flex-col gap-4 pt-12 md:flex-row md:gap-6 md:pt-20">
            {older && <AdjacentPost post={older} label={t('older')} locale={locale} align="start" />}
            {newer && <AdjacentPost post={newer} label={t('newer')} locale={locale} align="end" />}
          </nav>
        </Reveal>
      )}
    </article>
  );
}
