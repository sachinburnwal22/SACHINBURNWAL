"use client"

import { useEffect, useMemo, useState } from "react"

export default function Typewriter({
  text,
  sequence,
  speed = 18,
  deleteSpeed = 24,
  pauseMs = 900,
  loop = true,
  className,
}: {
  text?: string
  sequence?: string[]
  speed?: number
  deleteSpeed?: number
  pauseMs?: number
  loop?: boolean
  className?: string
}) {
  const [idx, setIdx] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const phrases = useMemo(() => {
    if (sequence && sequence.length > 0) return sequence
    return text ? [text] : []
  }, [sequence, text])

  const current = phrases[phraseIndex] ?? ""
  const out = current.slice(0, idx)

  useEffect(() => {
    if (!phrases.length) return

    let t: number | undefined

    if (!deleting) {
      if (idx < current.length) {
        t = window.setTimeout(() => setIdx((v) => v + 1), speed)
      } else {
        const shouldDelete = loop || phraseIndex < phrases.length - 1
        t = window.setTimeout(() => setDeleting(shouldDelete), pauseMs)
      }
    } else {
      if (idx > 0) {
        t = window.setTimeout(() => setIdx((v) => v - 1), deleteSpeed)
      } else {
        setDeleting(false)
        const next = phraseIndex + 1
        if (next >= phrases.length) {
          if (loop) setPhraseIndex(0)
        } else {
          setPhraseIndex(next)
        }
      }
    }

    return () => {
      if (t) window.clearTimeout(t)
    }
  }, [idx, deleting, phraseIndex, phrases, current.length, speed, deleteSpeed, pauseMs, loop])

  useEffect(() => {
    if (sequence && sequence.length) return
    if (!text) return
    setIdx(0)
    setDeleting(false)
    setPhraseIndex(0)
  }, [text, sequence])

  return (
    <span className={className}>
      {out}
      <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-lime-400/80 align-[-2px]" aria-hidden="true" />
    </span>
  )
}
