import { Metadata } from 'next';
import { getBlogPosts } from '../../../../lib/data';

const siteUrl = 'https://arnaudroyer.fr';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const posts = getBlogPosts(locale);
  const post  = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Article non trouvé', description: "Cet article n'existe pas." };
  }

  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';
  const path = `/${locale}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.title, ...post.tags, 'Développeur Fullstack', 'Arnaud Royer'],
    openGraph: {
      title: `${post.title} | Arnaud Royer`,
      description: post.excerpt,
      url: path,
      type: 'article',
      publishedTime: post.date,
      authors: ['Arnaud Royer'],
      locale: ogLocale,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Arnaud Royer`,
      description: post.excerpt,
      images: ['/images/og-image.png'],
      creator: '@cestarnaud',
    },
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        'fr': `${siteUrl}/fr/blog/${slug}`,
        'en': `${siteUrl}/en/blog/${slug}`,
        'x-default': `${siteUrl}/fr/blog/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const locales = ['fr', 'en'] as const;
  return locales.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
