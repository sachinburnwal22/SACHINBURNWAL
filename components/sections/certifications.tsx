"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

const certifications = [
  {
    title: "Meta Front-End Developer",
    issuer: "Meta",
    date: "2024",
    description: "Comprehensive front-end development certification covering React, JavaScript, and modern web technologies.",
    image: "/meta-front-end-developer.png",
    link: "#",
  },
  {
    title: "Google Cybersecurity Certificate",
    issuer: "Google",
    date: "2024",
    description: "Cybersecurity fundamentals, network security, and threat detection methodologies.",
    image: "/google-cybersecurity-certificate.png",
    link: "#",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    description: "Cloud computing fundamentals and AWS services for scalable applications.",
    image: "/aws-cloud-practitioner.png",
    link: "#",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative z-10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="space-y-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={item} className="text-center space-y-4">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Certifications</p>
            <h2 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
              Professional Certifications
            </h2>
            <p className="text-pretty text-muted-foreground max-w-2xl mx-auto">
              Continuous learning through industry-recognized certifications to stay current with evolving technologies.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {certifications.map((cert, index) => (
              <motion.div key={cert.title} variants={item}>
                <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{cert.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {cert.issuer} • {cert.date}
                        </CardDescription>
                      </div>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </a>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                      {cert.image && (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <img
                            src={cert.image}
                            alt={`${cert.issuer} logo`}
                            className="h-5 w-5 object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="text-center pt-8">
            <p className="text-sm text-muted-foreground">
              More certifications and ongoing learning projects available upon request.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
