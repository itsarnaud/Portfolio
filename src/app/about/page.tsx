'use client';

import { ScrollTrigger }     from 'gsap/ScrollTrigger';
import { useRef, useEffect } from 'react';
import { MagneticButton }    from '@/src/components/ui/MagneticButton';
import { skills, values }    from '@/src/lib/data';
import AnimatedText          from '@/src/components/gsap/AnimatedText';
import gsap   from 'gsap';
import Link   from 'next/link';
import Image  from 'next/image';

import ProfilePicture from '@/public/images/pfp.png';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const About = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const skillBarsRef = useRef<HTMLDivElement[]>([])
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.querySelectorAll(".animate-in") ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.8 },
      )

      skillBarsRef.current.forEach((bar) => {
        if (!bar) return
        const fill = bar.querySelector(".skill-fill")
        const targetWidth = bar.dataset.level || "0"

        gsap.fromTo(
          fill,
          { width: "0%" },
          {
            width: `${targetWidth}%`,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
            },
          },
        )
      })

      gsap.fromTo(
        valuesRef.current?.querySelectorAll(".value-card") ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-24">
      <header ref={headerRef} className="px-6 md:px-12 lg:px-24 mb-24">
        <p className="animate-in text-sm tracking-widest text-muted-foreground mb-4 font-mono">À PROPOS</p>
        <h1 className="animate-in text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-8 max-w-4xl text-balance">
          Développeur passionné, créateur d&apos;expériences digitales
        </h1>
      </header>

      <section className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="aspect-square bg-white overflow-hidden flex items-center justify-center">
            <Image
              src={ProfilePicture}
              alt="Portrait développeur"
              className="w-1/2 h-1/2 object-cover"
            />
          </div>

          <div className="lg:pt-12">
            <AnimatedText trigger className="text-2xl md:text-3xl font-display leading-snug mb-8">
              Je suis un développeur fullstack en alternance, passionné par la création d&apos;applications web modernes.
            </AnimatedText>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Depuis mes débuts en 2022, je conçois et développe des solutions web complètes, alliant performance 
                technique et expérience utilisateur fluide. Actuellement Développeur Fullstack chez Kollirama, 
                je combine mon expertise de l&apos;écosystème JavaScript avec ma formation de Mastère à l&apos;EPSI 
                pour transformer des besoins complexes en interfaces intuitives et robustes.
              </p>
              <p>
                J&apos;ai eu l&apos;opportunité d&apos;intervenir sur des projets d&apos;envergure : du développement 
                d&apos;outils internes de tracking et de gestion (Igowall, Igotrack) à la conception d&apos;une 
                application de gestion de file d&apos;attente pour la maison Hermès. Spécialisé en SvelteKit et Node.js, 
                je m&apos;attache autant à l&apos;optimisation du code qu&apos;à la rédaction de documentations techniques 
                précises pour assurer la pérennité des projets.
              </p>
              <p>
                En dehors de mon activité professionnelle, je consacre mon temps à développer divers projets personnels. 
                Ces initiatives sont mon laboratoire quotidien pour expérimenter de nouvelles architectures, affiner ma 
                vision produit et continuer d&apos;apprendre en permanence.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mt-12">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  Me contacter
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="/files/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-foreground text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors"
                >
                  Télécharger CV
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
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 mb-32 py-24 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm tracking-widest text-muted-foreground mb-4 font-mono">COMPÉTENCES</p>
          <AnimatedText trigger className="text-3xl md:text-4xl font-display mb-16">
            Technologies et outils
          </AnimatedText>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-lg font-medium mb-8">Frontend</h3>
              <div className="space-y-6">
                {skills.frontend.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div
                      ref={(el) => {
                        if (el) skillBarsRef.current[i] = el
                      }}
                      data-level={skill.level}
                      className="h-1 bg-border overflow-hidden"
                    >
                      <div className="skill-fill h-full bg-foreground" style={{ width: "0%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-8">Backend</h3>
              <div className="space-y-6">
                {skills.backend.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div
                      ref={(el) => {
                        if (el) skillBarsRef.current[i + skills.frontend.length] = el
                      }}
                      data-level={skill.level}
                      className="h-1 bg-border overflow-hidden"
                    >
                      <div className="skill-fill h-full bg-foreground" style={{ width: "0%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-lg font-medium mb-8">Outils et services</h3>
            <div className="flex flex-wrap gap-3">
              {skills.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 border border-border text-sm hover:border-foreground transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-lg font-medium mb-8">En apprentissage</h3>
            <div className="flex flex-wrap gap-3">
              {skills.learning.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 border border-dashed border-border text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="px-6 md:px-12 lg:px-24 mb-32">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm tracking-widest text-muted-foreground mb-4 font-mono">APPROCHE</p>
          <AnimatedText trigger className="text-3xl md:text-4xl font-display mb-16">
            Ce qui guide mon travail
          </AnimatedText>

          <div className="grid sm:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={i} className="value-card p-8 border border-border hover:border-foreground transition-colors">
                <span className="text-sm text-muted-foreground font-mono mb-4 block">0{i + 1}</span>
                <h3 className="text-xl font-medium mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-32 px-6 md:px-12 lg:px-24">
        <div className="border-t border-border pt-16">
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
        </div>
      </section>
    </div>
  )
};

export default About;