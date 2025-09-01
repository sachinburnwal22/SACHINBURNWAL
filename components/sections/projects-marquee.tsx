"use client"

import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCard } from "@/components/ui/tilt-card"
import { cn } from "@/lib/utils"

type Project = {
  title: string
  desc: string
  image?: string
  stack: string[]
  github?: string
  live?: string
}

const PROJECTS: Project[] = [
  {
    title: "Realtime Dashboard",
    desc: "Streaming metrics with websockets and charts.",
    image: "/project-preview.png",
    stack: ["Next.js", "WebSockets", "Recharts"],
    github: "#",
    live: "#",
  },
  {
    title: "AI Doc Summarizer",
    desc: "Summarize and search documents with embeddings.",
    image: "/project-preview.png",
    stack: ["AI", "Vector Search", "RAG"],
    github: "#",
    live: "#",
  },
  {
    title: "E-commerce Microfrontends",
    desc: "Modular storefront powered by Next.js.",
    image: "/project-preview.png",
    stack: ["Next.js", "Module Federation", "Stripe"],
    github: "#",
    live: "#",
  },
  {
    title: "SpiderWeb Visualizer",
    desc: "Interactive 3D spider web reacting to the cursor.",
    image: "/project-preview.png",
    stack: ["Three.js", "GSAP", "React"],
    github: "#",
    live: "#",
  },
  {
    title: "Secure MERN Dashboard",
    desc: "Role-based dashboard with JWT auth and audit logs.",
    image: "/project-preview.png",
    stack: ["MongoDB", "Express", "React", "Node"],
    github: "#",
    live: "#",
  },
  {
    title: "Puppeteer Automations",
    desc: "Headless workflows for scraping and QA testing.",
    image: "/project-preview.png",
    stack: ["Node.js", "Puppeteer"],
    github: "#",
    live: "#",
  },
]

// keep the exact visual structure from the existing ProjectCard
function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="group relative h-full w-[20rem] shrink-0 overflow-hidden bg-card p-0 sm:w-[24rem]">
      <div className="relative aspect-video w-full overflow-hidden">
        <motion.img
          src={project.image || "/project-preview.png"}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover"
          initial={false}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.4 }}
        />
        <div className="pointer-events-none absolute right-2 top-2 z-10 flex flex-wrap justify-end gap-1">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-border/70 bg-background/70 px-2 py-0.5 text-xs text-foreground/90 backdrop-blur"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h4 className="text-base font-semibold">{project.title}</h4>
        <p className="text-sm text-muted-foreground">{project.desc}</p>
        <div className="mt-3 flex items-center gap-2">
          {project.live && (
            <Button asChild size="sm">
              <a href={project.live} aria-label={`${project.title} live demo`} target="_blank" rel="noreferrer">
                <ExternalLink className="size-4" />
                Live
              </a>
            </Button>
          )}
          {project.github && (
            <Button asChild variant="outline" size="sm">
              <a href={project.github} aria-label={`${project.title} GitHub repo`} target="_blank" rel="noreferrer">
                <Github className="size-4" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </TiltCard>
  )
}

function MarqueeTrack({
  items,
  duration = 30,
  reverse = false,
  paused,
}: {
  items: Project[]
  duration?: number
  reverse?: boolean
  paused: boolean
}) {
  const looped = useMemo(() => [...items, ...items], [items])
  return (
    <div
      className={cn("marquee-track flex gap-4 sm:gap-6", reverse && "marquee-track--alt")}
      style={{
        animationDuration: `${duration}s`,
        animationPlayState: paused ? ("paused" as const) : ("running" as const),
      }}
    >
      {looped.map((p, idx) => (
        <ProjectCard key={`${p.title}-${idx}`} project={p} />
      ))}
    </div>
  )
}

export default function ProjectsMarquee() {
  const reduced = useReducedMotion()
  const [hover, setHover] = useState(false)
  const paused = reduced || hover

  const singleRow = PROJECTS

  return (
    <section
      id="projects"
      className="relative z-10 mx-auto w-full max-w-6xl"
      aria-label="Projects marquee"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <header className="mb-6 flex items-end justify-between px-4">
        <div>
          <h3 className="text-xl font-semibold">Projects</h3>
          <p className="text-sm text-muted-foreground">Hover to pause. Click GitHub or Live to explore.</p>
        </div>
      </header>

      <div className="relative overflow-hidden rounded-2xl border bg-background/40 px-4 py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />

        <div className="flex flex-col gap-6">
          <MarqueeTrack items={singleRow} duration={30} paused={paused} />
        </div>
      </div>
    </section>
  )
}
