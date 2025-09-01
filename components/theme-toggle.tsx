"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const active = (resolvedTheme || theme) as "light" | "dark"

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => (toggleTheme ? toggleTheme() : setTheme(active === "dark" ? "light" : "dark"))}
      className="inline-flex items-center rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="font-medium">{active === "dark" ? "Dark" : "Light"}</span>
    </button>
  )
}
