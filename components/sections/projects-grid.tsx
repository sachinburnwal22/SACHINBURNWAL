"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMagnetic } from "@/components/effects/use-magnetic"
import gsap from "gsap"
import { useEffect, useRef } from "react"

type Project = {
  title: string
  description: string
  stack: string[]
}

const projects: Project[] = [
  {
    title: "SpiderWeb Visualizer",
    description: "Interactive 3D spider web reacting to the cursor using Three.js and GSAP.",
    stack: ["Three.js", "GSAP", "React"],
  },
  {
    title: "Secure MERN Dashboard",
    description: "Role-based dashboard with JWT auth, rate limits, and audit logs.",
    stack: ["MERN", "Security"],
  },
  {
    title: "AI Email Assistant",
    description: "Compose smarter emails with Gemini + custom prompt tooling.",
    stack: ["Gemini", "React"],
  },
  {
    title: "Puppeteer Automations",
    description: "Headless workflows for scraping, testing, and monitoring.",
    stack: ["Puppeteer", "Node.js"],
  },
]

function ProjectCard({ p }: { p: Project }) {
  const magneticRef = useMagnetic<HTMLDivElement>(0.2)
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 24, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
    )
  }, [])

  const setRefs = (n: HTMLDivElement | null) => {
    magneticRef.current = n
    cardRef.current = n
  }

  return (
    <Card
      ref={setRefs}
      className="border-zinc-800/80 bg-zinc-900/40 text-slate-200 shadow-[0_0_20px_rgba(34,211,238,0.06)] transition-transform hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(34,211,238,0.18)]"
    >
      <CardHeader>
        <CardTitle className="text-white">{p.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-300">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-zinc-800/70 bg-zinc-900/60 px-2 py-1 text-xs text-cyan-400"
            >
              {s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProjectsGrid() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white md:text-3xl" data-animate="up">
        Projects
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2" data-animate="up">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </div>
  )
}
