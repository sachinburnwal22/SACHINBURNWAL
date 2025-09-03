"use client";

import { useMemo, useState, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
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
    title: "Stealthwing Technologies Pvt Ltd.",
    desc: "Developed an innovative drone startup project showcasing immersive 3D landing page, and scroll-based animations with React, Three.js, and GSAP.",
    image: "https://i.postimg.cc/VNWqjhxq/Screenshot-2025-09-04-010359.png",
    stack: ["Next.js", "Module Federation", "Stripe"],
    github: "https://github.com/sachinburnwal22/StealthWingTechnologies",
    live: "https://stealthwingtechnologies.in/",
  },
  {
    title: "SpiderWeb (Under Development)",
    desc: "A cybersecurity-inspired web platform featuring modules like username scanning, IP threat intelligence, and dark web monitoring and much more, built with React, Node.js.",
    image: "https://i.postimg.cc/Hn63QkN1/Screenshot-2025-09-04-011738.png",
    stack: ["Three.js", "GSAP", "React"],
    github: "https://github.com/sachinburnwal22/SpiderWeb",
    live: "#",
  },
  {
    title: "N-Queen Visualizer",
    desc: "Built an interactive visualization tool to demonstrate backtracking algorithms for solving the N-Queen problem, using JavaScript and React for clear step-by-step representation.",
    image: "https://i.postimg.cc/LshqX6tZ/Screenshot-2025-08-28-232001.png",
    stack: ["CPP", "HTML", "CSS", "Javascript"],
    github: "https://github.com/sachinburnwal22/NQueen-Visulaizer",
    live: "https://sachinburnwal22.github.io/NQueen-Visulaizer/",
  },
];

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
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 0.4,
          }}
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

function MarqueeTrack({
  items,
  duration = 30,
  reverse = false,
  paused,
}: {
  items: Project[];
  duration?: number;
  reverse?: boolean;
  paused: boolean;
}) {
  const looped = useMemo(() => [...items, ...items], [items]);
  const animId = useId();
  return (
    <>
      <style>{`
        @keyframes marquee-${animId} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rev-${animId} {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div
        className={cn("flex min-w-[200%] gap-4 sm:gap-6 will-change-transform")}
        style={{
          animation: `${
            reverse ? `marquee-rev-${animId}` : `marquee-${animId}`
          } ${duration}s linear infinite`,
          animationPlayState: paused
            ? ("paused" as const)
            : ("running" as const),
        }}
      >
        {looped.map((p, idx) => (
          <ProjectCard key={`${p.title}-${idx}`} project={p} />
        ))}
      </div>
    </>
  );
}

export default function ProjectsMarquee() {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  const paused = reduced || hover;

  const singleRow = PROJECTS;

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
          <p className="text-sm text-muted-foreground">
            Hover to pause. Click GitHub or Live to explore.
          </p>
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
  );
}
