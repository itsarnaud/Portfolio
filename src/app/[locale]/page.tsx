"use client";

import { MagneticButton } from "../../components/ui/MagneticButton";
import AnimatedText from "../../components/gsap/AnimatedText";
import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { getProjects } from "../../lib/data";
import { Link } from "../../i18n/navigation";
import Image from "next/image";
import gsap from "gsap";

const Home = () => {
  const t = useTranslations("home");
  const locale = useLocale();
  const allProjects = getProjects(locale);
  const featuredProjects = allProjects.slice(0, 2);

  const heroRef    = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 });
      gsap.fromTo(subtitleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.4 });
      gsap.fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.5 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] mb-8 text-balance">
          {locale === "fr" ? (
            <>Je crée des expériences web modernes et performantes.</>
          ) : (
            <>I craft modern and high-performance web experiences.</>
          )}
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12">
          {t("subtitle")}
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-6">
          <MagneticButton>
            <Link href="/projects" className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity">
              {t("viewProjects")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 border border-foreground text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors">
              {t("contact")}
            </Link>
          </MagneticButton>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-32 border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <AnimatedText trigger as="h2" className="text-3xl md:text-4xl font-display leading-snug">
              {t("aboutTitle")}
            </AnimatedText>
          </div>
          <div className="space-y-6 text-muted-foreground">
            <p className="leading-relaxed">{t("aboutP1")}</p>
            <p className="leading-relaxed">{t("aboutP2")}</p>
            <Link href="/about" className="inline-flex items-center gap-2 text-foreground hover:text-brand transition-colors group">
              {t("learnMore")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-all group-hover:translate-x-2">
                <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <AnimatedText trigger as="h2" className="text-3xl md:text-4xl font-display">
              {t("recentWork")}
            </AnimatedText>
            <Link href="/projects" className="inline-flex items-center gap-2 text-foreground hover:text-brand transition-colors group">
              {t("allProjects")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-all group-hover:translate-x-2">
                <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, i) => (
              <Link key={i} href={`/projects/${project.slug}`} className="group block">
                <div className="aspect-4/3 bg-muted mb-6 overflow-hidden relative">
                  <Image
                    src={project.image[0]}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-medium mb-1">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <span className="text-xs tracking-widest text-muted-foreground">{project.type}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText trigger className="text-4xl md:text-5xl lg:text-6xl font-display mb-8">
            {t("ctaTitle")}
          </AnimatedText>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">{t("ctaSubtitle")}</p>
          <MagneticButton>
            <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background text-lg tracking-wide hover:opacity-90 transition-opacity">
              {t("ctaButton")}
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </MagneticButton>
        </div>
      </section>
    </>
  );
};

export default Home;
