'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export const PageTransition = () => {
  const overlayRef   = useRef<HTMLDivElement>(null)
  const pathname     = usePathname()
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      gsap.fromTo(
        overlayRef.current,
        { scaleY: 1, transformOrigin: "top" },
        { scaleY: 0, duration: 0.8, ease: "power4.inOut", delay: 0.2 },
      )
      return
    }
  }, [])

  useEffect(() => {
    if (isFirstMount.current) return

    const tl = gsap.timeline()
    tl.fromTo(
      overlayRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.5, ease: "power4.inOut" },
    ).fromTo(
      overlayRef.current,
      { scaleY: 1, transformOrigin: "top" },
      { scaleY: 0, duration: 0.5, ease: "power4.inOut" },
      "+=0.1",
    )
  }, [pathname])

  return <div ref={overlayRef} className="page-transition bg-foreground" style={{ transform: "scaleY(1)" }} />
}
