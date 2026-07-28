"use client";

import { useParams, notFound }         from "next/navigation";
import { useTranslations, useLocale }  from "next-intl";
import { getBlogPosts }                from "../../../../lib/data";
import { useRef, useEffect }           from "react";
import { ScrollTrigger }               from "gsap/ScrollTrigger";
import { MagneticButton }              from "@/src/components/ui/MagneticButton";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/src/components/seo/JsonLd";
import { Link }                        from "@/src/i18n/navigation";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

const BlogPost = () => {
  const t      = useTranslations("blogPost");
  const locale = useLocale();
  const params = useParams();
  const posts  = getBlogPosts(locale);
  const post   = posts.find((p) => p.slug === params.slug);

  const headerRef  = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-in") ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.8 },
      );
      gsap.fromTo(
        contentRef.current?.querySelectorAll(".content-block") ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: contentRef.current, start: "top 80%" } },
      );
    });
    return () => ctx.revert();
  }, [post]);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { name: t("breadcrumbHome"), url: "/" },
    { name: t("breadcrumbBlog"), url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <>
      <BlogPostingJsonLd post={post} locale={locale} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="min-h-screen pt-32 pb-24">
        <header ref={headerRef} className="px-6 md:px-12 lg:px-24 mb-16">
          <Link href="/blog" className="animate-in inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L8 3M3 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t("back")}
          </Link>

          <div className="animate-in flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono mb-4">
            <span>{formatDate(post.date, locale)}</span>
          </div>

          <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-display leading-tight max-w-4xl">
            {post.title}
          </h1>
        </header>

        <div ref={contentRef} className="px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <div className="content-block mb-16">
              <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">{post.content}</p>
            </div>

            {post.tags.length > 0 && (
              <div className="content-block mb-16">
                <h2 className="text-2xl font-display mb-6">{t("tags")}</h2>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-4 py-2 border border-border text-sm">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="content-block">
              <MagneticButton>
                <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity">
                  {t("viewOnLinkedin")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
