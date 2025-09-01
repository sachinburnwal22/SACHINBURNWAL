"use client"

import { useEffect, useRef, useState } from "react"

const CHARS = "!<>-_\\/[]{}—=+*^?#________"

export default function GlitchText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState("")
  const frame = useRef<number | null>(null)

  useEffect(() => {
    let frameCount = 0
    const to = text
    const length = to.length
    const maxFrames = Math.max(24, 8 + length * 2)

    function tick() {
      frameCount++
      let out = ""
      for (let i = 0; i < length; i++) {
        if (frameCount < maxFrames && Math.random() < 0.15) {
          out += CHARS[Math.floor(Math.random() * CHARS.length)]
        } else {
          out += to[i]
        }
      }
      setDisplay(out)
      if (frameCount < maxFrames) {
        frame.current = requestAnimationFrame(tick)
      }
    }

    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [text])

  return <span className={className}>{display}</span>
}
