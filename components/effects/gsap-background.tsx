"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function GsapBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion || !rootRef.current) return

    const ctx = gsap.context(() => {
      const blobs = gsap.utils.toArray<HTMLElement>(".gb-blob")
      const particles = gsap.utils.toArray<HTMLElement>(".gb-particle")

      // Animate blobs with slow drift + gentle scale
      blobs.forEach((el, i) => {
        const duration = gsap.utils.random(12, 20)
        const xRange = gsap.utils.random(40, 80)
        const yRange = gsap.utils.random(40, 80)
        const scaleTo = gsap.utils.random(0.9, 1.15)

        gsap.to(el, {
          xPercent: i % 2 === 0 ? xRange : -xRange,
          yPercent: i % 2 === 0 ? -yRange : yRange,
          scale: scaleTo,
          duration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      })

      // Animate particles with subtle wandering + shimmer
      particles.forEach((el) => {
        const d = gsap.utils.random(8, 14)
        gsap.to(el, {
          x: `random(-80, 80)`,
          y: `random(-80, 80)`,
          duration: d,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.05, from: "random" },
        })
        gsap.to(el, {
          opacity: () => gsap.utils.random(0.15, 0.35),
          duration: gsap.utils.random(2, 4),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Blurred color blobs (stay within 5-color palette) */}
      <div
        className="gb-blob absolute -left-24 top-10 h-56 w-56 rounded-full opacity-35 blur-3xl"
        style={{ background: "#2563eb" }} // primary blue
      />
      <div
        className="gb-blob absolute right-0 top-1/3 h-72 w-72 -translate-x-1/3 rounded-full opacity-30 blur-3xl"
        style={{ background: "#f59e0b" }} // orange accent
      />
      <div
        className="gb-blob absolute bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-22 blur-3xl"
        style={{ background: "#94a3b8" }} // gray neutral
      />

      {/* Soft particles layer */}
      <div className="absolute inset-0">
        {Array.from({ length: 90 }).map((_, i) => (
          <span
            key={i}
            className="gb-particle absolute block h-1 w-1 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: "rgba(255,255,255,0.25)", // white neutral
              boxShadow: "0 0 8px rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      {/* Subtle vignette; keep transparent so it never hides content */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 70%, rgba(0,0,0,0.08) 100%)",
        }}
      />
    </div>
  )
}
