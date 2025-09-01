"use client"

import { useMagnetic } from "@/components/effects/use-magnetic"

const skills = [
  "React",
  "Next.js",
  "MERN",
  "Tailwind",
  "GSAP",
  "Three.js",
  "Framer Motion",
  "Sequelize (MySQL)",
  "Puppeteer",
  "AI (Gemini, APIs)",
  "TypeScript",
  "Security Best Practices",
]

function SkillCard({ label }: { label: string }) {
  const magneticRef = useMagnetic<HTMLDivElement>(0.15)
  return (
    <div
      ref={magneticRef}
      className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-4 text-sm text-slate-200 shadow-[0_0_20px_rgba(34,211,238,0.06)] transition-transform hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(34,211,238,0.18)]"
    >
      <span className="font-mono text-cyan-400">{">_"}</span> <span>{label}</span>
    </div>
  )
}

export default function SkillsGrid() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white md:text-3xl" data-animate="up">
        Skills
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" data-animate="up">
        {skills.map((s) => (
          <SkillCard key={s} label={s} />
        ))}
      </div>
    </div>
  )
}
