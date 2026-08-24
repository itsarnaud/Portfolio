'use client';

import gsap        from 'gsap';
import { useRef }  from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger }  from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { usePrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP)
ScrollTrigger.config({ ignoreMobileResize: true })


export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const main     = useRef(null);
  const smoother = useRef<ScrollSmoother | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      smoother.current = ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });

      return () => {
        smoother.current?.kill();
        smoother.current = null;
      };
    });
  }, { scope: main, dependencies: [prefersReducedMotion] })


  return (
    <div
      id="smooth-wrapper"
      ref={main}
      className={prefersReducedMotion ? '' : 'lg:fixed lg:inset-0 lg:overflow-hidden lg:z-1'}
    >
      <div id="smooth-content" className={prefersReducedMotion ? '' : 'lg:w-full lg:will-change-transform'}>
        {children}
      </div>
    </div>
  )
};
