'use client';

import { useParams, notFound }   from 'next/navigation';
import { projects }              from '../../../lib/data';
import { useRef, useEffect }     from 'react';
import { ScrollTrigger }         from "gsap/ScrollTrigger"
import { MagneticButton }        from '@/src/components/ui/MagneticButton';
import { ProjectJsonLd, BreadcrumbJsonLd } from '@/src/components/seo/JsonLd';
import gsap   from 'gsap';
import Link   from 'next/link';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const Project = () => {
  const params  = useParams();
  const project = projects.find(p => p.slug === params.slug); 

  const headerRef   = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-in") ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.8 },
      )

      gsap.fromTo(
        contentRef.current?.querySelectorAll(".content-block") ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [project])

  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex((p) => p.slug === params.slug)
  const nextProject  = projects[(currentIndex + 1) % projects.length]

  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Projets', url: '/projects' },
    { name: project.title, url: `/projects/${project.slug}` },
  ];

  return (
    <>
      <ProjectJsonLd project={project} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="min-h-screen pt-32 pb-24">
        <header ref={headerRef} className="px-6 md:px-12 lg:px-24 mb-16">
          <Link
            href="/projects"
            className="animate-in inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M3 8L8 3M3 8L8 13"
                stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Retour aux projets
        </Link>

        <div className="animate-in flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono mb-4">
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>{project.year}</span>
        </div>

        <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-6">{project.title}</h1>

        <p className="animate-in text-xl text-muted-foreground max-w-3xl leading-relaxed">{project.description}</p>
      </header>

      <div className="px-6 md:px-12 lg:px-24 mb-24">
        <div className="aspect-video bg-muted overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */ }
          <img
            src={project.image[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div ref={contentRef} className="px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="content-block grid sm:grid-cols-3 gap-8 mb-16 pb-16 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-2 font-mono">ANNÉE</p>
              <p className="font-medium">{project.year}</p>
            </div>
          </div>

          <div className="content-block mb-16">
            <h2 className="text-2xl font-display mb-6">À propos du projet</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.longDescription}</p>
          </div>

          <div className="content-block mb-16">
            <h2 className="text-2xl font-display mb-6">Le défi</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">{project.challenge}</p>
          </div>

          <div className="content-block mb-16">
            <h2 className="text-2xl font-display mb-6">Technologies utilisées</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-4 py-2 border border-border text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.link && (
            <div className="content-block">
              <MagneticButton>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  Voir le projet
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 12L12 4M12 4H5M12 4V11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          )}
        </div>
      </div>

      <section className="mt-32 px-6 md:px-12 lg:px-24">
        <div className="border-t border-border pt-16">
          <p className="text-sm tracking-widest text-muted-foreground mb-4 font-mono">PROJET SUIVANT</p>
          <Link href={`/projects/${nextProject.slug}`} className="group block">
            <h2 className="text-4xl md:text-5xl font-display group-hover:opacity-70 transition-opacity">
              {nextProject.title}
            </h2>
          </Link>
        </div>
      </section>
      </div>
    </>
  )
};

export default Project;