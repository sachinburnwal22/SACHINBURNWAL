"use client";

import { cn } from "@/lib/utils";

export default function HeroCodeCard({ className }: { className?: string }) {
  // Simple, performant "code window" card inspired by the reference.
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-900/30 shadow-xl",
        "backdrop-blur-md overflow-hidden max-w-md w-full", // Added max-width and full width for mobile
        className
      )}
      aria-label="Code preview"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10">
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500/80" />
        <div className="ml-auto h-1 w-12 sm:w-16 rounded-full bg-white/10" />
      </div>

      {/* content */}
      <div className="relative p-3 sm:p-5 md:p-6 lg:p-8 text-xs sm:text-sm leading-relaxed font-mono text-slate-200">
        {/* subtle cyan glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_300px_at_80%_0%,rgba(56,189,248,0.15),transparent)]" />
        <pre className="relative overflow-x-auto">
          {`const coder = {
  name: 'Sachin Burnwal',
  skills: ['Next.js', 'React', 
    'TypeScript', 'Node.js', 
    'Docker'],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable() {
    return this.hardWorker && 
      this.problemSolver && 
      this.skills.length >= 5
  },
};`}
        </pre>
      </div>
    </div>
  );
}
