"use client"

import { useEffect, useRef, useState } from "react"

function hexToRgb(hex: string) {
  const h = hex.replace("#", "")
  const bigint = Number.parseInt(h, 16)
  if (h.length === 3) {
    const r = (bigint >> 8) & 0xf
    const g = (bigint >> 4) & 0xf
    const b = bigint & 0xf
    return { r: (r << 4) | r, g: (g << 4) | g, b: (b << 4) | b }
  }
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number }[]>([])
  const rafRef = useRef<number | null>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener?.("change", onChange)
    return () => mq.removeEventListener?.("change", onChange)
  }, [])

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.style.background = "transparent"

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const maxParticles = 140
    let width = 0
    let height = 0

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * DPR)
      canvas.height = Math.floor(height * DPR)
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    function addParticle(x: number, y: number) {
      if (particlesRef.current.length > maxParticles) particlesRef.current.shift()
      const angle = Math.random() * Math.PI * 2
      const speed = 0.5 + Math.random() * 0.8
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
      })
    }

    function onMove(e: MouseEvent) {
      addParticle(e.clientX, e.clientY)
      addParticle(e.clientX, e.clientY)
    }
    window.addEventListener("mousemove", onMove)

    ctx.globalCompositeOperation = "lighter"

    function isDarkMode() {
      return document.documentElement.classList.contains("dark")
    }

    function getTokens() {
      if (isDarkMode()) {
        // Bright stroke and fill in dark mode
        return {
          accentStroke: (a: number) => `rgba(34, 211, 238, ${a})`, // cyan-400
          fgFill: (a: number) => `rgba(255, 255, 255, ${a})`, // white
        }
      }
      const cs = getComputedStyle(document.documentElement)
      const accent = cs.getPropertyValue("--accent").trim() || "#6366f1"
      const fg = cs.getPropertyValue("--foreground").trim() || "#1f2937"
      const { r: ar, g: ag, b: ab } = hexToRgb(accent)
      const { r: fr, g: fgR, b: fb } = hexToRgb(fg)
      return {
        accentStroke: (a: number) => `rgba(${ar}, ${ag}, ${ab}, ${a})`,
        fgFill: (a: number) => `rgba(${fr}, ${fgR}, ${fb}, ${a})`,
      }
    }

    function getStyleMultipliers() {
      if (isDarkMode()) {
        return {
          rInner: 2.0,
          rOuter: 3.6,
          fillAlphaMul: 0.9,
          strokeAlphaMul: 0.5,
        }
      }
      return {
        rInner: 1.6,
        rOuter: 3.2,
        fillAlphaMul: 0.7,
        strokeAlphaMul: 0.35,
      }
    }

    function tick() {
      const { accentStroke, fgFill } = getTokens()
      const { rInner, rOuter, fillAlphaMul, strokeAlphaMul } = getStyleMultipliers()

      ctx.clearRect(0, 0, width, height)

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.015

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1)
          continue
        }

        const alpha = Math.max(0, p.life)
        ctx.beginPath()
        ctx.arc(p.x, p.y, rInner, 0, Math.PI * 2)
        ctx.fillStyle = fgFill(fillAlphaMul * alpha)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, rOuter, 0, Math.PI * 2)
        ctx.strokeStyle = accentStroke(strokeAlphaMul * alpha)
        ctx.lineWidth = 1
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 -z-50 ${reduced ? "hidden" : ""}`}
      aria-hidden="true"
    />
  )
}
