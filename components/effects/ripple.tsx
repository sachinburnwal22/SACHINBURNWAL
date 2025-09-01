"use client"

import type React from "react"

import { useRef } from "react"
import { cn } from "@/lib/utils"

export default function Ripple({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ripple = document.createElement("span")
    const size = Math.max(rect.width, rect.height)
    ripple.style.position = "absolute"
    ripple.style.inset = `${e.clientY - rect.top - size / 2}px auto auto ${e.clientX - rect.left - size / 2}px`
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.borderRadius = "9999px"
    ripple.style.background = "rgba(37,99,235,0.25)" // blue with alpha
    ripple.style.pointerEvents = "none"
    ripple.style.transform = "scale(0)"
    ripple.style.transition = "transform 500ms ease, opacity 600ms ease"
    el.appendChild(ripple)
    requestAnimationFrame(() => {
      ripple.style.transform = "scale(1)"
      ripple.style.opacity = "0"
    })
    setTimeout(() => ripple.remove(), 700)
  }
  return (
    <div ref={ref} onClick={onClick} className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  )
}
