'use client';

import { useRef, useEffect } from 'react';
import { projects }          from '../../lib/data';
import { ScrollTrigger }     from "gsap/ScrollTrigger"
import gsap   from 'gsap';
import Link   from 'next/link';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const Projects = () => {
  const headerRef       = useRef<HTMLDivElement>(null);
  const projectsRef     = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-in") ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.8 },
      )
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    projectCardsRef.current.forEach((card) => {
      if (!card) return

      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-24">
      <header ref={headerRef} className="px-6 md:px-12 lg:px-24 mb-16">
        <p className="animate-in text-sm tracking-widest text-muted-foreground mb-4 font-mono">PROJETS</p>
        <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-6 max-w-4xl text-balance">
          Une sélection de mes travaux récents
        </h1>
        <p className="animate-in text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Chaque projet est une opportunité d&apos;apprendre et de repousser les limites. Voici quelques réalisations
          dont je suis particulièrement fier.
        </p>
      </header>

      <div ref={projectsRef} className="px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => {
                if (el) projectCardsRef.current[index] = el
              }}
              className="group"
            >
              <Link href={`/projets/${project.slug}`} className="block">
                <div className="aspect-16/10 bg-muted mb-6 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */ }
                  <img
                    src={project.image[0] || undefined}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
                </div>

                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-2xl font-medium group-hover:opacity-70 transition-opacity">{project.title}</h2>
                  <div className="flex items-center gap-3 text-xs tracking-widest text-muted-foreground font-mono shrink-0">
                    <span>{project.year}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs bg-secondary text-secondary-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Projects;
