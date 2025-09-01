"use client"

import { useId } from "react"

export default function Marquee({
  items,
  speed = 30,
}: {
  items: string[]
  speed?: number // lower is slower
}) {
  const id = useId()
  const duration = Math.max(10, Math.min(60, speed))
  return (
    <div className="relative overflow-hidden">
      <style>{`
        @keyframes marquee-${id} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex min-w-[200%] gap-8 py-2 text-sm text-muted-foreground"
        style={{ animation: `marquee-${id} ${duration}s linear infinite` }}
        aria-hidden="true"
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="whitespace-nowrap">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
