'use client';

import { useRef, useEffect }           from 'react';
import { useTranslations, useLocale }  from 'next-intl';
import { getBlogPosts }                from '../../../lib/data';
import { ScrollTrigger }               from "gsap/ScrollTrigger";
import { MagneticButton }              from '@/src/components/ui/MagneticButton';
import AnimatedText                    from '@/src/components/gsap/AnimatedText';
import { Link }                        from '@/src/i18n/navigation';
import gsap from 'gsap';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

const Blog = () => {
  const t     = useTranslations('blog');
  const locale = useLocale();
  const posts  = getBlogPosts(locale);

  const headerRef    = useRef<HTMLDivElement>(null);
  const postsRef      = useRef<HTMLDivElement>(null);
  const postCardsRef  = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-in") ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.8 },
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    postCardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(card, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
      });
    });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <header ref={headerRef} className="px-6 md:px-12 lg:px-24 mb-16">
        <p className="animate-in text-sm tracking-widest text-muted-foreground mb-4 font-mono">{t('label')}</p>
        <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-6 max-w-4xl text-balance">
          {t('title')}
        </h1>
        <p className="animate-in text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {t('subtitle')}
        </p>
      </header>

      <div ref={postsRef} className="px-6 md:px-12 lg:px-24">
        <div className="grid gap-y-16 max-w-3xl">
          {posts.map((post, index) => (
            <article
              key={post.id}
              ref={(el) => { if (el) postCardsRef.current[index] = el; }}
              className="group border-t border-border pt-10 first:border-t-0 first:pt-0"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <p className="text-xs tracking-widest text-muted-foreground font-mono mb-3">
                  {formatDate(post.date, locale)}
                </p>
                <h2 className="text-2xl md:text-3xl font-medium group-hover:opacity-70 transition-opacity mb-3">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs bg-secondary text-secondary-foreground">{tag}</span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <section className="mt-32 px-6 md:px-12 lg:px-24">
        <div className="border-t border-border pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText trigger className="text-4xl md:text-5xl lg:text-6xl font-display mb-8">
              {t('ctaTitle')}
            </AnimatedText>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">{t('ctaSubtitle')}</p>
            <MagneticButton>
              <a href="https://www.linkedin.com/in/royer-arnaud/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background text-lg tracking-wide hover:opacity-90 transition-opacity">
                {t('ctaButton')}
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
