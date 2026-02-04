'use client';

import gsap        from 'gsap';
import { useRef }  from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger }  from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP)


export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const main     = useRef(null);
  const smoother = useRef<ScrollSmoother | null>(null);

  useGSAP(() => {
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
  }, { scope: main })


  return (
    <div id="smooth-wrapper" ref={main}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
};
