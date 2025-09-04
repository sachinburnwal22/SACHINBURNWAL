"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-border bg-background/80 backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={handleLinkClick}
        />
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[280px] border-l border-border bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="font-serif text-lg font-bold tracking-tight">
            Menu
          </span>
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          <a
            href="#about"
            onClick={handleLinkClick}
            className="block py-2 text-lg font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2"
          >
            About
          </a>
          <a
            href="#certifications"
            onClick={handleLinkClick}
            className="block py-2 text-lg font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2"
          >
            Certifications
          </a>
          <a
            href="#orbit"
            onClick={handleLinkClick}
            className="block py-2 text-lg font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={handleLinkClick}
            className="block py-2 text-lg font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="block py-2 text-lg font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2"
          >
            Contact
          </a>
          <div className="pt-4 border-t border-border">
            {/* <ThemeToggle /> */}
          </div>
        </nav>
      </div>
    </>
  );
}
