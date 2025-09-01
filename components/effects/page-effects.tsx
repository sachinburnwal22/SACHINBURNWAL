"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function PageEffects() {
  useEffect(() => {
    if (!gsap.core.globals()["ScrollTrigger"]) {
      gsap.registerPlugin(ScrollTrigger)
    }

    const els = document.querySelectorAll<HTMLElement>("[data-animate]")
    els.forEach((el) => {
      const dir = el.dataset.animate || "up"
      const y = dir === "up" ? 20 : dir === "down" ? -20 : 0
      const x = dir === "left" ? 20 : dir === "right" ? -20 : 0
      gsap.fromTo(
        el,
        { opacity: 0, y, x, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })
  }, [])

  return null
}
