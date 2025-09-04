"use client";

import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Scheme = "dark";
type Theme = Scheme | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Scheme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemScheme(): Scheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "dark";
}

function applyHtmlClass(resolved: Scheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = true,
}: {
  children: React.ReactNode;
  attribute?: "class"; // kept for API compatibility
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = window.localStorage.getItem("theme") as Theme | null;
    return stored ?? defaultTheme;
  });

  const resolvedTheme: Scheme = useMemo(() => {
    if (theme === "system" && enableSystem) return getSystemScheme();
    return theme === "dark" ? "dark" : "dark";
  }, [theme, enableSystem]);

  useEffect(() => {
    // prevent transition flashes when toggling
    const disable = () => {
      if (!disableTransitionOnChange) return () => {};
      const css = document.createElement("style");
      css.appendChild(
        document.createTextNode(
          "*{transition: none !important} body{transition: none !important} .no-transition{transition:none !important}"
        )
      );
      document.head.appendChild(css);
      return () => {
        document.head.removeChild(css);
      };
    };
    const restore = disable();
    applyHtmlClass(resolvedTheme);
    // persist explicit choice (system also persisted)
    try {
      window.localStorage.setItem("theme", theme);
    } catch {}
    // listen to system changes if using system
    let mql: MediaQueryList | undefined;
    const onChange = () => {
      if (theme === "system" && enableSystem) {
        applyHtmlClass(getSystemScheme());
      }
    };
    if (enableSystem && typeof window !== "undefined") {
      mql = window.matchMedia("(prefers-color-scheme: dark)");
      mql.addEventListener?.("change", onChange);
    }
    return () => {
      restore?.();
      mql?.removeEventListener?.("change", onChange);
    };
  }, [resolvedTheme, theme, enableSystem, disableTransitionOnChange]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () =>
    setThemeState((prev) => {
      const next =
        prev === "dark" || (prev === "system" && getSystemScheme() === "dark")
          ? "dark"
          : "dark";
      return next;
    });

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
