"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power3.out" })
    }
    function onEnter() {
      el.addEventListener("mousemove", onMove)
      gsap.to(el, { scale: 1.03, duration: 0.25, ease: "power2.out" })
    }
    function onLeave() {
      el.removeEventListener("mousemove", onMove)
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.4, ease: "power3.out" })
    }
    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)

    return () => {
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
      el.removeEventListener("mousemove", onMove)
    }
  }, [strength])

  return ref
}
