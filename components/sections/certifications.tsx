"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const certifications = [
  {
    title: "Oracle Certified Professional",
    issuer: "Oracle",
    date: "2025",
    description:
      "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional.",
    image: "https://i.postimg.cc/DZxRYSKz/Oracle-Cert.png",
    link: "https://drive.google.com/file/d/1-tRC3xgrFFX4c-bgDQTSTC4gOQJmiA8l/view?usp=sharing",
  },
  {
    title: "Advanced Data Structure",
    issuer: "Center of Professional Enhancement",
    date: "2025",
    description:
      "Gained expertise in implementing and optimizing complex data structures to enhance problem-solving and algorithm efficiency.",
    image: "https://i.postimg.cc/k4tq8NSm/LpuAdv.png",
    link: "https://drive.google.com/file/d/11pjADugCwiDM55RS9SxaKP3H0GVOLJOA/view?usp=sharing",
  },
  {
    title: "CEH(V12) Certified Ethical Hacker",
    issuer: "Warlock Security",
    date: "2024",
    description:
      "Acquired skills in penetration testing, vulnerability assessment, and ethical hacking techniques to identify and secure system vulnerabilities.",
    image: "https://i.postimg.cc/BQf2V4JT/Cyber-Security.jpg",
    link: "https://drive.google.com/file/d/1-8TMrGKwLZsiS7dFmmrbqH4gqAXlgEfV/view?usp=sharing",
  },
  {
    title: "Artificial Intelligence",
    issuer: "Infosys Springboard",
    date: "2025",
    description:
      "Completed hands-on projects in machine learning, deep learning, and AI applications, demonstrating practical problem-solving with real-world datasets.",
    image: "https://i.postimg.cc/CM7mkRGZ/AI.png",
    link: "https://drive.google.com/file/d/1F6cjPlisq3obXl2YYA7BxyK_7qWPNvwv/view?usp=sharing",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CertificationsSection() {
  const PAGE_SIZE = 3;
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(certifications.length / PAGE_SIZE));
  const atStart = page === 0;
  const atEnd = page >= totalPages - 1;

  const goPrev = () => setPage((p) => (p > 0 ? p - 1 : p));
  const goNext = () => setPage((p) => (p < totalPages - 1 ? p + 1 : p));

  const start = page * PAGE_SIZE;
  const visible = certifications.slice(start, start + PAGE_SIZE);

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
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              Certifications
            </p>
            <h2 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
              Professional Certifications
            </h2>
            <p className="text-pretty text-muted-foreground max-w-2xl mx-auto">
              Continuous learning through industry-recognized certifications to
              stay current with evolving technologies.
            </p>
          </motion.div>

          <motion.div variants={container} className="relative">
            <button
              type="button"
              aria-label="Previous certifications"
              onClick={goPrev}
              disabled={atStart}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-background/80 backdrop-blur-md shadow-md flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next certifications"
              onClick={goNext}
              disabled={atEnd}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border bg-background/80 backdrop-blur-md shadow-md flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              role="region"
              aria-label="Certifications viewer"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") goNext();
                if (e.key === "ArrowLeft") goPrev();
              }}
              className="px-8 md:px-14"
            >
              <motion.div
                key={page}
                variants={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {visible.map((cert) => (
                  <Card
                    key={cert.title}
                    className="group h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg">
                            {cert.title}
                          </CardTitle>
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
                      <p className="text-sm text-muted-foreground mb-4">
                        {cert.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                        {cert.image && (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                            <img
                              src={cert.image || "/placeholder.svg"}
                              alt={`${cert.issuer} logo`}
                              className="h-8 w-8 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>
                  Page {page + 1} of {totalPages}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="text-center pt-8">
            <p className="text-sm text-muted-foreground">
              More certifications and ongoing learning projects.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
