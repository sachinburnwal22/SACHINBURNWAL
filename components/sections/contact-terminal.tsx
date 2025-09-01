"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"

export default function ContactTerminal() {
  const boxRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!boxRef.current) return
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 20, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
    )
  }, [])

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    await new Promise((r) => setTimeout(r, 900))
    setStatus("sent")
  }

  return (
    <div ref={boxRef} className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40">
      <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950 px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" aria-hidden="true" />
        <span className="ml-3 text-xs text-slate-400">terminal://contact</span>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
        <label className="text-sm text-slate-300">
          Name
          <input
            required
            type="text"
            className="mt-1 w-full rounded-md border border-zinc-800/80 bg-zinc-950 px-3 py-2 text-sm text-slate-200 outline-none ring-0 focus:border-cyan-500 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.2)]"
            placeholder="Your name"
          />
        </label>

        <label className="text-sm text-slate-300">
          Email
          <input
            required
            type="email"
            className="mt-1 w-full rounded-md border border-zinc-800/80 bg-zinc-950 px-3 py-2 text-sm text-slate-200 outline-none ring-0 focus:border-cyan-500 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.2)]"
            placeholder="you@example.com"
          />
        </label>

        <label className="text-sm text-slate-300">
          Message
          <textarea
            required
            rows={5}
            className="mt-1 w-full rounded-md border border-zinc-800/80 bg-zinc-950 px-3 py-2 text-sm text-slate-200 outline-none ring-0 focus:border-cyan-500 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.2)]"
            placeholder="Say hello or describe your project…"
          />
        </label>

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">Tip: Press Enter to send. Data isn’t really sent in this demo.</p>
          <Button
            type="submit"
            disabled={status !== "idle"}
            className="bg-cyan-500 text-black hover:bg-cyan-400 disabled:opacity-60"
          >
            {status === "idle" ? "Send" : status === "sending" ? "Sending…" : "Sent!"}
          </Button>
        </div>
      </form>
    </div>
  )
}
