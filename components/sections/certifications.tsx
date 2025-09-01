"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TiltCard } from "@/components/ui/tilt-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Cert = {
  title: string
  issuer: string
  date?: string
  image: string
  summary: string
  learnings: string[]
}

const CERTS: Cert[] = [
  {
    title: "Google Cybersecurity Certificate",
    issuer: "Google",
    date: "2024",
    image: "/google-cybersecurity-certificate.png",
    summary: "Security foundations focused on securing systems and analyzing threats.",
    learnings: ["Network security", "Threat modeling", "Logging & monitoring", "Incident response", "Risk assessment"],
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta",
    date: "2023",
    image: "/meta-front-end-developer.png",
    summary: "Modern front-end skills for building responsive, accessible UIs.",
    learnings: ["React patterns", "Accessibility (a11y)", "State management", "Performance optimization", "Testing"],
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2023",
    image: "/aws-cloud-practitioner.png",
    summary: "Core cloud concepts for scalable, secure architectures.",
    learnings: ["Cloud fundamentals", "Security & IAM", "Costs & billing", "High availability", "Best practices"],
  },
]

export default function CertificationsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="certifications"
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl border bg-card p-4 md:p-6"
      aria-label="Certifications & Certificates"
    >
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-pretty text-2xl font-semibold leading-tight md:text-3xl">
            Certifications — Verified Skills
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore the certifications I've earned. Click a card to see what I learned.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {CERTS.map((c, idx) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <TiltCard className="group relative h-full overflow-hidden bg-card p-0">
              <div
                onClick={() => setOpenIndex(idx)}
                className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                aria-label={`Open details for ${c.title}`}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <motion.img
                    src={c.image}
                    alt={`${c.title} certificate preview`}
                    className="h-full w-full object-cover"
                    initial={false}
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h3 className="text-base font-semibold">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {c.issuer} {c.date ? `• ${c.date}` : ""}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.learnings.slice(0, 3).map((l) => (
                      <span
                        key={l}
                        className={cn(
                          "rounded-md border border-border/70 bg-background/70 px-2 py-0.5 text-xs text-foreground/90",
                        )}
                      >
                        {l}
                      </span>
                    ))}
                    {c.learnings.length > 3 && (
                      <span className="rounded-md border border-border/70 bg-background/70 px-2 py-0.5 text-xs text-foreground/90">
                        +{c.learnings.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <Button size="sm" className="transition-colors" onClick={() => setOpenIndex(idx)}>
                      View details
                    </Button>
                  </div>
                </div>
              </div>
            </TiltCard>

            <Dialog open={openIndex === idx} onOpenChange={(o) => !o && setOpenIndex(null)}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{c.title}</DialogTitle>
                  <DialogDescription>
                    Issued by {c.issuer}
                    {c.date ? ` • ${c.date}` : ""}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <img
                    src={c.image || "/placeholder.svg"}
                    alt={`${c.title} certificate enlarged`}
                    className="w-full rounded-md border"
                  />
                  <p className="text-sm text-muted-foreground">{c.summary}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {c.learnings.map((l) => (
                      <li
                        key={l}
                        className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
