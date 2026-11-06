import { useLocale, useTranslations } from 'next-intl';
import { Arrow } from '@/components/ui/Arrow';
import { Stamp } from '@/components/ui/Stamp';
import { bgClass, hex } from '@/content/colors';
import type { Post } from '@/content/types';
import { Link } from '@/i18n/navigation';
import { cx, formatDate } from '@/lib/utils';
import { categoryColor } from './categories';

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: PostCardProps) {
  const locale = useLocale();
  const t = useTranslations('blog');
  const tCursor = useTranslations('cursor');
  const color = categoryColor[post.category];

  return (
    <article
      className={cx(
        'group/post relative flex flex-1 flex-col gap-3 rounded-3xl border-2 p-5 shadow-dure md:gap-4 md:p-6 md:shadow-dure-md',
        'transition-[translate,rotate,box-shadow] duration-200 ease-out hover:-translate-1.25 hover:-rotate-[0.6deg] hover:shadow-[11px_11px_0_var(--color-encre)]',
        featured ? cx(bgClass[color], 'md:p-[clamp(24px,4vw,44px)]') : 'bg-blanc',
      )}
    >
      {featured && (
        <div className="absolute -top-7.5 right-3.5 size-21 md:-top-8.5 md:right-7 md:size-26">
          <Stamp text={t('latestStamp')} color="blanc" star={false} />
        </div>
      )}

      <p className="flex flex-wrap items-center gap-2.5 font-mono text-xs font-semibold md:text-[13px]">
        <time dateTime={post.date}>{formatDate(locale, post.date)}</time>
        <span className="inline-block rounded-full border-[1.5px] border-current px-2.5 py-0.5 hover:animate-jig">
          {t(`categories.${post.category}`)}
        </span>
      </p>

      <h2
        className={cx(
          'max-w-205 leading-[1.1] tracking-titre-carte',
          featured ? 'pr-16 text-[26px] md:pr-28 md:text-[clamp(32px,4vw,52px)]' : 'text-[22px] md:text-[26px]',
        )}
      >
        <Link
          href={`/blog/${post.slug}`}
          data-cursor={tCursor('read')}
          data-cursor-color={featured ? hex.blanc : hex[color]}
          data-transition-label={post.title[locale]}
          className="after:absolute after:inset-0 after:rounded-3xl"
        >
          {post.title[locale]}
        </Link>
      </h2>
      <p className="max-w-190 text-[15px] leading-normal md:text-[17px] md:leading-[1.55]">{post.excerpt[locale]}</p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-current pt-3 font-bold">
        <span aria-hidden="true" className="inline-flex items-center gap-2">
          {t('read')}
          <Arrow className="size-4 transition-[translate] duration-250 ease-rebond group-hover/post:translate-x-1.25" />
        </span>
        <a
          href={post.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor={tCursor('linkedin')}
          data-cursor-color={hex.blanc}
          className="relative z-1 inline-flex min-h-11 items-center gap-1.5 text-sm underline underline-offset-4 hover:no-underline"
        >
          {t('readOnLinkedin')}
          <Arrow direction="up-right" className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
