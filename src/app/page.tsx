'use client'

import { MagneticButton }    from '../components/ui/MagneticButton';
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
      <header ref={heroRef} className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
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
      </header>
    </>
  );
}

export default Home;