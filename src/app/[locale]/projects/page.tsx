'use client';

import { useRef, useEffect }           from 'react';
import { useTranslations, useLocale }  from 'next-intl';
import { getProjects }                 from '../../../lib/data';
import { ScrollTrigger }               from "gsap/ScrollTrigger";
import { MagneticButton }              from '@/src/components/ui/MagneticButton';
import AnimatedText                    from '@/src/components/gsap/AnimatedText';
import { Link }                        from '@/src/i18n/navigation';
import Image                           from 'next/image';
import gsap from 'gsap';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const t        = useTranslations('projects');
  const locale   = useLocale();
  const projects = getProjects(locale);

  const headerRef       = useRef<HTMLDivElement>(null);
  const projectsRef     = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<HTMLElement[]>([]);

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
    projectCardsRef.current.forEach((card) => {
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
        <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-6 max-w-4xl text-balance">
          {t('title')}
        </h1>
        <p className="animate-in text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {t('subtitle')}
        </p>
      </header>

      <div ref={projectsRef} className="px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => { if (el) projectCardsRef.current[index] = el; }}
              className="group"
            >
              <Link href={`/projects/${project.slug}`} className="block transition-transform active:scale-[0.98]">
                <div className="aspect-16/10 bg-muted mb-6 overflow-hidden relative">
                  <Image
                    src={project.image[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                </div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-2xl font-medium group-hover:opacity-70 transition-opacity">{project.title}</h2>
                  <div className="flex items-center gap-3 text-xs tracking-widest text-muted-foreground shrink-0">
                    <span>{project.year}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs bg-secondary text-secondary-foreground">{tech}</span>
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
              <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background text-lg tracking-wide hover:opacity-90 transition-opacity">
                {t('ctaButton')}
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
