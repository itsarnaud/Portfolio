'use client'

import { useEffect, useRef, type ReactNode, useCallback } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  trigger?: boolean
}

const AnimatedText = ({ children, className = "", delay = 0, trigger = false }: AnimatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null)
  const originalText = useRef<string>("")
  const hasAnimated = useRef(false)

  const setupAnimation = useCallback(() => {
    const element = textRef.current
    if (!element || !originalText.current) return

    // Reset element
    element.innerHTML = ""

    const words = originalText.current.split(" ")
    words.forEach((word, i) => {
      const wordSpan = document.createElement("span")
      wordSpan.className = "inline-block"
      wordSpan.style.whiteSpace = "nowrap"

      const innerSpan = document.createElement("span")
      innerSpan.className = "inline-block"
      innerSpan.textContent = word
      
      wordSpan.appendChild(innerSpan)
      element.appendChild(wordSpan)
      
      if (i < words.length - 1) {
        element.appendChild(document.createTextNode(" "))
      }
    })

    const innerSpans = element.querySelectorAll("span > span")

    // Only animate on first setup
    if (!hasAnimated.current) {
      hasAnimated.current = true
      
      if (trigger) {
        gsap.fromTo(
          innerSpans,
          { y: "100%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
            },
          },
        )
      } else {
        gsap.fromTo(
          innerSpans,
          { y: "100%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            delay,
          },
        )
      }
    } else {
      gsap.set(innerSpans, { y: 0, opacity: 1 })
    }
  }, [delay, trigger])

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    if (!originalText.current) {
      originalText.current = element.innerText
    }

    setupAnimation()

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setupAnimation])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

export default AnimatedText;