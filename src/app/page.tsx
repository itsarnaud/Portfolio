'use client'

import { MagneticButton }    from '../components/ui/MagneticButton';
import AnimatedText          from '../components/gsap/AnimatedText';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

const Home = () => {
  const heroRef     = useRef<HTMLDivElement>(null);
  const jobRef      = useRef<HTMLParagraphElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        jobRef.current,
        { y: 130, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.7 }
      );

      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.3 }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [])

  return (
    <>
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <p ref={jobRef} className="uppercase text-sm tracking-widest mb-4 text-mono text-muted-foreground">Développeur Fullstack</p>

        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] mb-8 text-balance">
          Je créer des expériences web <span className="italic">modernes</span> et performantes.
        </h1>

        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12">
          Passionné par le développement d&apos;application web, je transforme vos idées en produits digitaux de qualité.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-6">
          <MagneticButton>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Voir mes projets
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
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

          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-foreground text-sm tracking-wide hover:bg-foreground hover:text-background transition-colors"
            >
              Me contacter
            </Link>
          </MagneticButton>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-32 border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <AnimatedText trigger className="text-3xl md:text-4xl font-display leading-snug">
              Un développeur passionné par la tech et l&apos;attention aux détails.
            </AnimatedText>
          </div>

          <div className="space-y-6 text-muted-foreground">
            <p className="leading-relaxed">
              Depuis un peu plus de 2 ans, je conçois et développe des applications web complètes, du design système au
              déploiement en production.
            </p>
            <p className="leading-relaxed">
              Ma stack principale inclut React, Next.js, Node.js, Svelte, JavaScript, et TypeScript, mais je reste curieux et j&apos;explore
              constamment de nouvelles technologies.
            </p>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2 text-foreground hover:gap-4 transition-all"
            >
              En savoir plus
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L8 3M13 8L8 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;