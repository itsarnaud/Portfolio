'use client'

import { useEffect, useRef, type ReactNode } from 'react'
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

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const text = element.innerText
    element.innerHTML = ""

    const words = text.split(" ")
    words.forEach((word, i) => {
      const wordSpan = document.createElement("span")
      wordSpan.className = "inline-block overflow-hidden"

      const innerSpan = document.createElement("span")
      innerSpan.className = "inline-block"
      innerSpan.textContent = word + (i < words.length - 1 ? "\u00A0" : "")

      wordSpan.appendChild(innerSpan)
      element.appendChild(wordSpan)
    })

    const innerSpans = element.querySelectorAll("span > span")

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
  }, [delay, trigger])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

export default AnimatedText;