'use client'

import gsap from 'gsap'
import { useEffect, useRef } from "react"

export const CustomCursor = () => {
  const dotRef     = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanUpListeners = () => {}

    const ctx = gsap.context(() => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches
      const dot = dotRef.current
      const outline = outlineRef.current

      if (!dot || !outline) return

      if (!isFinePointer) {
        gsap.set([dot, outline], { display: 'none' })
        return
      }

      const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" })
      const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" })
      const xToOutline = gsap.quickTo(outline, "x", { duration: 0.3, ease: "power2.out" })
      const yToOutline = gsap.quickTo(outline, "y", { duration: 0.3, ease: "power2.out" })

      const moveCursor = (e: MouseEvent) => {
        xToDot(e.clientX - 4)
        yToDot(e.clientY - 4)
        xToOutline(e.clientX - 20)
        yToOutline(e.clientY - 20)
      }

      const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.closest("a, button, [role='button'], input, textarea, select, .cursor-hover")) {
          gsap.to(outline, { scale: 1.5, opacity: 0.3, duration: 0.3, overwrite: 'auto' })
        }
      }

      const onMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const interactive = target.closest("a, button, [role='button'], input, textarea, select, .cursor-hover")
        
        if (interactive) {
          const related = e.relatedTarget as HTMLElement
          if (related && related.closest && related.closest("a, button, [role='button'], .cursor-hover") === interactive) {
            return
          }
          gsap.to(outline, { scale: 1, opacity: 0.5, duration: 0.3, overwrite: 'auto' })
        }
      }

      window.addEventListener('mousemove', moveCursor)
      window.addEventListener('mouseover', onMouseOver)
      window.addEventListener('mouseout', onMouseOut)

      cleanUpListeners = () => {
        window.removeEventListener('mousemove', moveCursor)
        window.removeEventListener('mouseover', onMouseOver)
        window.removeEventListener('mouseout', onMouseOut)
      }
    })

    return () => {
      cleanUpListeners()
      ctx.revert()
    }
  }, [])

  return (
    <>
      <div 
        ref={dotRef} 
        className="cursor-dot hidden md:block" 
        style={{ pointerEvents: 'none' }} 
      />
      <div 
        ref={outlineRef} 
        className="cursor-outline hidden md:block" 
        style={{ pointerEvents: 'none' }} 
      />
    </>
  )
}
