'use client'

import { useEffect, useRef }      from 'react'
import { ScrollTrigger }          from 'gsap/ScrollTrigger'
import { experiences, education } from '@/src/lib/data'
import { MagneticButton }         from '@/src/components/ui/MagneticButton'
import AnimatedText from '@/src/components/gsap/AnimatedText'
import Link         from 'next/link'
import gsap         from 'gsap'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ExperiencePage = () => {
  const headerRef          = useRef<HTMLDivElement>(null)
  const timelineRef        = useRef<HTMLDivElement>(null)
  const experienceCardsRef = useRef<HTMLDivElement[]>([])
  const timelineLineRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-in") || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.8 },
      )

      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        },
      )

      experienceCardsRef.current.forEach((card, i) => {
        if (!card) return

        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        )

        const dot = card.querySelector(".timeline-dot")
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-24">
      <header ref={headerRef} className="px-6 md:px-12 lg:px-24 mb-24">
        <p className="animate-in text-sm tracking-widest text-muted-foreground mb-4 font-mono">EXPÉRIENCE</p>
        <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-8 max-w-4xl text-balance">
          Mon parcours professionnel
        </h1>
        <p className="animate-in text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Plus de 2 ans d&apos;expérience en développement web.
        </p>
      </header>

      <section ref={timelineRef} className="px-6 md:px-12 lg:px-24 mb-32 relative">
        <div
          ref={timelineLineRef}
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"
          style={{ transform: "translateX(-50%) scaleY(0)" }}
        />

        <div className="max-w-6xl mx-auto space-y-16 lg:space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              ref={(el) => {
                if (el) experienceCardsRef.current[i] = el
              }}
              className={`lg:grid lg:grid-cols-2 lg:gap-16 relative ${i % 2 === 0 ? "" : "lg:direction-rtl"}`}
            >
              <div className="timeline-dot hidden lg:block absolute left-1/2 top-8 w-4 h-4 bg-foreground rounded-full -translate-x-1/2 z-10" />

              <div
                className={`${i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"} ${i % 2 === 1 ? "lg:direction-ltr" : ""}`}
              >
                <div className="p-8 border border-border hover:border-foreground transition-colors bg-background">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-mono mb-4">
                    <span>{exp.period}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{exp.location}</span>
                  </div>

                  <h2 className="text-2xl font-display mb-2">{exp.role}</h2>
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                      {exp.company}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M4 12L12 4M12 4H5M12 4V11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  ) : (
                    <p className="text-muted-foreground mb-4">{exp.company}</p>
                  )}

                  <p className="text-muted-foreground leading-relaxed mb-6">{exp.description}</p>

                  <ul className={`space-y-2 mb-6 ${i % 2 === 0 ? "lg:text-left" : ""}`}>
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? "lg:justify-end" : ""}`}>
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs bg-secondary text-secondary-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {i % 2 === 0 && <div className="hidden lg:block" />}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 mb-32 py-24 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-widest text-muted-foreground mb-4 font-mono">FORMATION</p>
          <AnimatedText trigger className="text-3xl md:text-4xl font-display mb-16">
            Parcours académique
          </AnimatedText>

          <div className="space-y-8">
            {education.map((edu, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pb-8 border-b border-border last:border-0"
              >
                <span className="text-sm text-muted-foreground font-mono shrink-0 md:w-32">{edu.period}</span>
                <div>
                  <h3 className="text-xl font-medium mb-1">{edu.degree}</h3>
                  <p className="text-muted-foreground mb-2">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText trigger className="text-4xl md:text-5xl lg:text-6xl font-display mb-8">
            Un projet en tête ?
          </AnimatedText>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Je suis toujours ouvert à discuter de nouveaux projets :)
          </p>
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background text-lg tracking-wide hover:opacity-90 transition-opacity"
            >
              Discutons ensemble !
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}

export default ExperiencePage;
