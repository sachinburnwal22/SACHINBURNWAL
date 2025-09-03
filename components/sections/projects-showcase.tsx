"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  desc: string;
  image?: string;
  stack: string[];
  github?: string;
  live?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Virasa",
    desc: "Discover the legacy of master craftspeople and bring their timeless creations into your world",
    image: "https://i.postimg.cc/qqBfh0CT/Screenshot-2025-09-03-011225.png",
    stack: ["Next.js", "WebSockets", "Recharts"],
    github: "https://github.com/sachinburnwal22/Virasa3",
    live: "https://virasa3.vercel.app/",
  },
  {
    title: "AI Resume Builder",
    desc: "AI powered resume builder that creates professional resumes instantly with smart formatting, optimization.",
    image: "https://i.postimg.cc/mkxr9PyH/image.png",
    stack: ["AI", "Vector Search", "RAG"],
    github: "https://github.com/sachinburnwal22/ResumeBuilder",
    live: "https://airesumebuilder-9kvc.vercel.app/",
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
];

export default function ProjectsShowcase() {
  const reduced = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const cardVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
        y: reduced ? 0 : 16,
        filter: reduced ? "none" : "blur(2px)",
      },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      transition: { duration: 0.5, ease: "easeOut" as const },
    }),
    [reduced]
  );

  return (
    <div className="relative">
      {/* Edge gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />

      {/* Scroll progress bar */}
      <div className="mb-3 h-1 w-full overflow-hidden rounded bg-border">
        <div
          className="h-full origin-left bg-accent transition-[transform]"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
      </div>

      {/* Horizontal scroller */}
      <div
        ref={scrollerRef}
        className={cn(
          "no-scrollbar relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-1",
          "scroll-pt-4"
        )}
        aria-label="Projects list"
      >
        {PROJECTS.map((p, idx) => (
          <motion.div
            key={p.title}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            transition={{ ...cardVariants.transition, delay: 0.05 * idx }}
            className="snap-start"
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="group relative h-full w-[20rem] shrink-0 overflow-hidden bg-card p-0 sm:w-[24rem]">
      {/* Image with subtle parallax/zoom on hover */}
      <div className="relative aspect-video w-full overflow-hidden">
        <motion.img
          src={project.image || "/project-preview.png"}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover"
          initial={false}
          whileHover={{ scale: 1.05 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 0.4,
          }}
        />
        {/* Top-right stack chips */}
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
        {/* Gradient overlay on hover for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        <h4 className="text-base font-semibold">{project.title}</h4>
        <p className="text-sm text-muted-foreground">{project.desc}</p>
        <div className="mt-3 flex items-center gap-2">
          {project.live && (
            <Button asChild size="sm">
              <a
                href={project.live}
                aria-label={`${project.title} live demo`}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="size-4" />
                Live
              </a>
            </Button>
          )}
          {project.github && (
            <Button asChild variant="outline" size="sm">
              <a
                href={project.github}
                aria-label={`${project.title} GitHub repo`}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="size-4" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
