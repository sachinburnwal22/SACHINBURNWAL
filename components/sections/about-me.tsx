"use client"

import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, when: "beforeChildren" },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutMe() {
  return (
    <section id="about" className="relative z-10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid gap-10 md:grid-cols-2 md:gap-12 items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Text column */}
          <motion.div variants={item} className="space-y-5">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">About Me</p>
            <h2 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">SACHIN BURNWAL</h2>
            <motion.p variants={item} className="text-pretty leading-relaxed text-foreground/90">
              I’m Sachin Burnwal, a passionate Web Developer with a hacker’s curiosity and a creator’s mindset. My
              journey blends full-stack development with cybersecurity insights, giving me a unique edge in building
              applications that are not only dynamic and visually immersive but also robust and secure.
            </motion.p>
            <motion.p variants={item} className="text-pretty leading-relaxed text-foreground/90">
              I specialize in crafting modern, animated, and interactive web experiences using React, Three.js, GSAP,
              Tailwind, and Framer Motion. On the backend, I work with Node.js, Express, Sequelize (MySQL), MongoDB, and
              Puppeteer automation, delivering seamless integrations and high-performance systems.
            </motion.p>
            <motion.p variants={item} className="text-pretty leading-relaxed text-foreground/90">
              I love pushing boundaries — whether it’s building cyber-themed projects like SpiderWeb, experimenting with
              3D interactive UI, or automating complex tasks with AI APIs and Puppeteer. For me, development isn’t just
              about code; it’s about designing experiences that leave people saying “Whoa, that’s different!”
            </motion.p>
            <motion.p variants={item} className="text-pretty leading-relaxed text-foreground/90">
              When I’m not coding, you’ll probably find me exploring new cybersecurity techniques, AI tools, or breaking
              down complex problems into elegant solutions.
            </motion.p>
            <motion.blockquote variants={item} className="border-l-2 border-primary pl-4 text-foreground/90">
              ✨ My motto: “Create, break, learn, and build again — stronger, faster, smarter.”
            </motion.blockquote>

            {/* Quick highlights */}
            <motion.ul variants={item} className="mt-4 flex flex-wrap gap-2" aria-label="Key skills">
              {[
                "React",
                "Next.js",
                "Three.js",
                "GSAP",
                "Framer Motion",
                "Tailwind",
                "Node.js",
                "Express",
                "Sequelize",
                "MongoDB",
                "Puppeteer",
              ].map((skill) => (
                <motion.li
                  key={skill}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  viewport={{ once: true }}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground/90"
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Image column */}
          <motion.div
            variants={item}
            className="relative"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            {/* Replace the src below with your real photo path (e.g., /images/sachin.jpg) */}
            <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-xl">
              <img
                src="/portrait-photo-of-sachin-burnwal.png"
                alt="Portrait of Sachin Burnwal"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Decorative accent ring */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl opacity-50 blur-2xl"
              style={{
                background:
                  "radial-gradient(120px 120px at 20% 20%, hsl(var(--primary)/0.25), transparent 60%), radial-gradient(160px 160px at 80% 80%, hsl(var(--accent)/0.25), transparent 60%)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
