'use client';

import gsap        from 'gsap';
import { useRef, useEffect }  from 'react';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger }  from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP)


export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const main     = useRef(null);
  const smoother = useRef<ScrollSmoother | null>(null);
  const pathname = usePathname();

  useGSAP(() => {
    smoother.current = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });
  }, { scope: main })

  useEffect(() => {
    if (smoother.current) {
      smoother.current.scrollTo(0, false);
    } else {
      window.scrollTo(0, 0);
    }
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={main}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
};
