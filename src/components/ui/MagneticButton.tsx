'use client'

import type React from "react"

import { useRef, type ReactNode } from "react"
import gsap from "gsap"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export const MagneticButton = ({ children, className = "", strength = 0.3 }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const textRef   = useRef<HTMLSpanElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    })

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: x * strength * 0.5,
        y: y * strength * 0.5,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    })

    if (textRef.current) {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }
  }

  return (
    <div
      ref={buttonRef}
      className={`magnetic-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span ref={textRef} className="inline-block">
        {children}
      </span>
    </div>
  )
}
