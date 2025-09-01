"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import CursorTrail from "@/components/effects/cursor-trail"
import Reveal from "@/components/effects/reveal"
import dynamic from "next/dynamic"
const EarthSkillsSection = dynamic(() => import("@/components/sections/earth-skills"), { ssr: false })
import Marquee from "@/components/effects/marquee"
import Ripple from "@/components/effects/ripple"
import AboutMe from "@/components/sections/about-me"
import ProjectsMarquee from "@/components/sections/projects-marquee"
import CertificationsSection from "@/components/sections/certifications"
import ContactCTA from "@/components/sections/contact-cta"
import Typewriter from "@/components/typewriter"
import { useState, useEffect } from "react"

const projects = [
  { title: "Realtime Dashboard", desc: "Streaming metrics with websockets and charts.", href: "#" },
  { title: "AI Doc Summarizer", desc: "Summarize and search documents with embeddings.", href: "#" },
  { title: "E-commerce Microfrontends", desc: "Modular storefront powered by Next.js.", href: "#" },
]

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState("")

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground">
      <CursorTrail />

      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-foreground font-serif text-lg font-bold tracking-tight">Sachin Burnwal</span>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="#about"
              className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              About
            </a>
            <a
              href="#certifications"
              className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Certifications
            </a>
            <a
              href="#orbit"
              className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              3D
            </a>
            <a
              href="#projects"
              className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Contact
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal>
          {/* Removed: <p className="text-sm font-mono text-accent">Hello, I’m</p> */}
          <h2 className="mt-2 text-balance font-serif text-4xl font-bold leading-tight md:text-6xl">
            <Typewriter
              sequence={["Hello viewers,", "I'm Sachin Burnwal", "Web Developer", "Tech Enthusiast", "A Dreamer"]}
              speed={50}
              deleteSpeed={35}
              pauseMs={900}
              className="text-foreground"
            />
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            I build fast, accessible, and modern web apps with React and JavaScript. Beautifully engineered interfaces,
            robust architecture, and delightful interactions.
          </p>
          <div className="mt-8 flex gap-3">
            <Ripple>
              <a
                href="#projects"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                View Projects
              </a>
            </Ripple>
            <Ripple>
              <a
                href="#contact"
                className="rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Get in Touch
              </a>
            </Ripple>
          </div>
        </Reveal>
      </section>

      <section aria-label="Highlights" className="relative mx-auto max-w-6xl border-t border-border px-4 py-8">
        <Marquee
          items={[
            "Clean Architecture",
            "Performance-focused",
            "Accessible UI",
            "React • Next.js • TypeScript",
            "Animations with GSAP & R3F",
            "Security-minded",
          ]}
          speed={28}
        />
      </section>

      <section id="about" className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24">
        <Reveal delayMs={80}>
          <AboutMe />
        </Reveal>
      </section>

      <section id="orbit" className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24">
        <Reveal delayMs={140}>
          <EarthSkillsSection />
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24">
        <Reveal delayMs={150}>
          <CertificationsSection />
        </Reveal>
      </section>

      <section id="projects" className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24">
        <Reveal delayMs={160}>
          <h3 className="text-xl font-semibold">Projects</h3>
          <div className="mt-6">
            <ProjectsMarquee />
          </div>
        </Reveal>
      </section>

      <section id="contact" className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24">
        <Reveal delayMs={120}>
          <ContactCTA />
        </Reveal>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-muted-foreground">
          <p className="text-pretty">© {currentYear} Sachin Burnwal — Web Developer</p>
          <div className="flex items-center gap-4">
            <a href="#projects" className="transition-colors hover:text-accent">
              Projects
            </a>
            <a href="#contact" className="transition-colors hover:text-accent">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
