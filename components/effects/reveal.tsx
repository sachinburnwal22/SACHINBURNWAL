"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

type RevealProps = {
  children: React.ReactNode
  delayMs?: number
  className?: string
}

export default function Reveal({ children, delayMs = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (delayMs > 0) {
              const t = setTimeout(() => setVisible(true), delayMs)
              return () => clearTimeout(t)
            }
            setVisible(true)
          }
        })
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delayMs])

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "reveal-show" : "reveal-init"}`}
      style={{ transitionDelay: `${visible ? delayMs : 0}ms` }}
    >
      {children}
    </div>
  )
}
