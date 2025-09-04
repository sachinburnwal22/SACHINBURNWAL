"use client";
// import { ThemeToggle } from "@/components/theme-toggle";
import CursorTrail from "@/components/effects/cursor-trail";
import Reveal from "@/components/effects/reveal";
import dynamic from "next/dynamic";
const EarthSkillsSection = dynamic(
  () => import("@/components/sections/earth-skills"),
  { ssr: false }
);
import Marquee from "@/components/effects/marquee";
import Ripple from "@/components/effects/ripple";
import AboutMe from "@/components/sections/about-me";
import ProjectsMarquee from "@/components/sections/projects-marquee";
import CertificationsSection from "@/components/sections/certifications";
import ContactCTA from "@/components/sections/contact-cta";
import Typewriter from "@/components/typewriter";
import HeroCodeCard from "@/components/hero-code-card";
import { Github, Linkedin } from "lucide-react";
import LeetCode from "@/components/icons/leetcode";
const projects = [
  {
    title: "Realtime Dashboard",
    desc: "Streaming metrics with websockets and charts.",
    href: "#",
  },
  {
    title: "AI Doc Summarizer",
    desc: "Summarize and search documents with embeddings.",
    href: "#",
  },
  {
    title: "E-commerce Microfrontends",
    desc: "Modular storefront powered by Next.js.",
    href: "#",
  },
];

export default function HomePage() {
  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground">
      <CursorTrail />

      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="text-foreground font-serif text-lg font-bold tracking-tight">
            Sachin Burnwal
          </span>
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
              Skills
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
          </nav>
        </div>
      </header>

      {/* Updated Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 top-0 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <Reveal>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mt-2 text-balance font-serif text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                <Typewriter
                  sequence={[
                    "Hey Learners,",
                    "I'm Sachin",
                    "Web Developer",
                    "Tech Explorer",
                    "Creative Thinker",
                    "Dream Chaser",
                    "Problem Solver",
                    "Lifelong Learner",
                  ]}
                  speed={50}
                  deleteSpeed={35}
                  pauseMs={900}
                  className="text-white"
                />
              </h2>
              <p className="mt-3 text-pretty text-2xl md:text-3xl font-semibold">
                I&apos;m a{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
                  Software Developer
                </span>{" "}
                Aspirant.
              </p>
              <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
                I build fast, accessible, and modern web apps with React and
                JavaScript. Beautifully engineered interfaces, robust
                architecture, and delightful interactions.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a
                  href="https://github.com/sachinburnwal22"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/40 ring-1 ring-cyan-400/20 backdrop-blur hover:border-cyan-300/50 hover:ring-cyan-300/40 transition"
                >
                  <Github className="h-5 w-5 text-cyan-300 group-hover:text-cyan-200 transition" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sachin-burnwal-2004sb"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/40 ring-1 ring-cyan-400/20 backdrop-blur hover:border-cyan-300/50 hover:ring-cyan-300/40 transition"
                >
                  <Linkedin className="h-5 w-5 text-cyan-300 group-hover:text-cyan-200 transition" />
                </a>
                <a
                  href="https://leetcode.com/burnwal_sachin2004"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LeetCode"
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/40 ring-1 ring-cyan-400/20 backdrop-blur hover:border-cyan-300/50 hover:ring-cyan-300/40 transition"
                >
                  <LeetCode className="h-5 w-5 text-cyan-300 group-hover:text-cyan-200 transition" />
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Ripple>
                  <a
                    href="#projects"
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    View Projects
                  </a>
                </Ripple>
                <Ripple>
                  <a
                    href="#contact"
                    className="rounded-full border border-cyan-400/40 bg-black/20 px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-cyan-400/20 transition-colors hover:border-cyan-300/60 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Get in Touch
                  </a>
                </Ripple>
              </div>
            </div>
            <div className="relative">
              <HeroCodeCard className="md:ml-auto" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-6 -bottom-6 h-24 rounded-full bg-cyan-500/20 blur-2xl"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section
        aria-label="Highlights"
        className="relative mx-auto max-w-6xl border-t border-border px-4 py-8"
      >
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

      <section
        id="about"
        className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24"
      >
        <Reveal delayMs={80}>
          <AboutMe />
        </Reveal>
      </section>

      <section
        id="orbit"
        className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24"
      >
        <Reveal delayMs={140}>
          <EarthSkillsSection />
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24">
        <Reveal delayMs={150}>
          <CertificationsSection />
        </Reveal>
      </section>

      <section
        id="projects"
        className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24"
      >
        <Reveal delayMs={160}>
          <h3 className="text-xl font-semibold">Projects</h3>
          <div className="mt-6">
            <ProjectsMarquee />
          </div>
        </Reveal>
      </section>

      <section
        id="contact"
        className="relative mx-auto max-w-6xl border-t border-border px-4 py-16 md:py-24"
      >
        <Reveal delayMs={120}>
          <ContactCTA />
        </Reveal>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-muted-foreground">
          <p className="text-pretty">
            © {new Date().getFullYear()} Sachin Burnwal — Web Developer
          </p>
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
  );
}
