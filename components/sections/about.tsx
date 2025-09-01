"use client"

import Typewriter from "@/components/typewriter"

export default function About() {
  return (
    <div className="grid items-start gap-8 md:grid-cols-2">
      <div data-animate="up">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">About Me</h2>
        <p className="mt-4 text-pretty leading-relaxed text-slate-300">
          <Typewriter
            text={`I’m a Web Developer focused on immersive, high-performance interfaces. I work with React, MERN, GSAP, Three.js, and integrate AI (Gemini, APIs). I also bring a cybersecurity mindset to build robust, secure apps.`}
          />
        </p>
      </div>

      <div data-animate="left" className="rounded-xl border border-zinc-800/80 p-6">
        <ul className="space-y-3 text-sm text-slate-300">
          <li>
            <span className="text-lime-400">•</span> Cybersecurity-aware development
          </li>
          <li>
            <span className="text-lime-400">•</span> MERN Stack, Sequelize (MySQL)
          </li>
          <li>
            <span className="text-lime-400">•</span> React, Tailwind, GSAP, Three.js
          </li>
          <li>
            <span className="text-lime-400">•</span> Puppeteer automation
          </li>
          <li>
            <span className="text-lime-400">•</span> AI integrations (Gemini, APIs)
          </li>
        </ul>
      </div>
    </div>
  )
}
