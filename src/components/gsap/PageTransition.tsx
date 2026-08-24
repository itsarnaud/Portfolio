'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { getPrefersReducedMotion } from '@/src/hooks/usePrefersReducedMotion'

export const PageTransition = () => {
  const overlayRef   = useRef<HTMLDivElement>(null)
  const pathname     = usePathname()
  const isFirstMount = useRef(true)

  useEffect(() => {
    const reducedMotion = getPrefersReducedMotion()

    if (isFirstMount.current) {
      isFirstMount.current = false

      if (reducedMotion) {
        gsap.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0, duration: 0.2, ease: "power1.out" })
        return
      }

      gsap.fromTo(
        overlayRef.current,
        { scaleY: 1, transformOrigin: "top" },
        { scaleY: 0, duration: 0.35, ease: "power3.out", delay: 0 },
      )
      return
    }

    if (reducedMotion) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "power1.out", yoyo: true, repeat: 1 })
      return
    }

    const tl = gsap.timeline()
    tl.fromTo(
      overlayRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.3, ease: "power3.out" },
    ).fromTo(
      overlayRef.current,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 0.3, ease: "power3.out" },
      "+=0.05",
    )
  }, [pathname])

  return <div ref={overlayRef} className="page-transition bg-foreground" style={{ transform: "scaleY(1)" }} />
}
