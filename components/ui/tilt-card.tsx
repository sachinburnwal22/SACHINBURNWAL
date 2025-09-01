"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Props = React.ComponentProps<"div"> & {
  intensity?: number
}

export const TiltCard = React.forwardRef<HTMLDivElement, Props>(function TiltCard(
  { className, intensity = 10, children, ...props },
  ref,
) {
  const localRef = React.useRef<HTMLDivElement | null>(null)
  React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = localRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * intensity
    const ry = (px - 0.5) * -intensity
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
  }

  const reset = () => {
    const el = localRef.current
    if (el) el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)"
  }

  return (
    <div
      ref={localRef}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "transition-transform duration-150 will-change-transform rounded-lg border border-border bg-card shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
