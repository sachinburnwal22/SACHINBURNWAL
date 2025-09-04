"use client";

import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Linkedin } from "lucide-react";

const WHATSAPP_NUMBER = "917679609047"; // without '+' for wa.me links
const DEFAULT_MESSAGE = encodeURIComponent(
  "Hi Sachin, I saw your portfolio and would like to connect."
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;
const EMAIL_HREF = `mailto:sachinburnwal22@gmail.com?subject=${encodeURIComponent(
  "Project inquiry"
)}&body=${DEFAULT_MESSAGE}`;
// NOTE: Update this to your exact LinkedIn URL if different.
const LINKEDIN_HREF = "https://www.linkedin.com/in/sachinburnwal-2004sb";

export default function ContactCTA() {
  return (
    <section aria-label="Contact Sachin" className="relative">
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="relative grid gap-6 p-4 sm:p-6 md:grid-cols-2 md:gap-8 lg:gap-10 lg:p-10">
          <div className="text-center md:text-left">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              Let's build something
            </p>
            <h3 className="mt-2 text-pretty text-xl sm:text-2xl font-semibold leading-tight lg:text-3xl">
              Contact — Quick & Direct
            </h3>
            <p className="mt-3 max-w-prose mx-auto md:mx-0 text-sm text-muted-foreground">
              Prefer WhatsApp for faster responses. Emails are welcome too. I'll
              get back to you shortly.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center md:justify-start gap-3">
              <Button
                asChild
                className="bg-green-500 text-black hover:bg-green-400 w-full sm:w-auto"
              >
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Message on WhatsApp"
                >
                  <MessageCircle className="mr-2 size-4" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
              >
                <a href={EMAIL_HREF} aria-label="Send email">
                  <Mail className="mr-2 size-4" />
                  Email
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <a
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open LinkedIn profile"
                >
                  <Linkedin className="mr-2 size-4" />
                  LinkedIn
                </a>
              </Button>
            </div>

            <div className="mt-4 text-xs text-muted-foreground text-center md:text-left">
              WhatsApp: +91 76796 09047 • Email: sachinburnwal22@gmail.com
            </div>
          </div>

          <div className="relative order-first md:order-last">
            <div className="relative overflow-hidden rounded-xl border bg-background p-3 sm:p-4">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(200px_200px_at_20%_20%,rgba(34,211,238,0.15),transparent_60%),radial-gradient(240px_240px_at_80%_80%,rgba(251,191,36,0.12),transparent_60%)]" />
              <div className="space-y-2 text-sm">
                <p className="font-mono text-muted-foreground text-xs sm:text-sm">
                  {">_"} sample message
                </p>
                <div className="rounded-md border bg-card p-2 sm:p-3 text-foreground text-xs sm:text-sm">
                  Hi Sachin! I came across your portfolio and would love to
                  discuss a project opportunity.
                </div>
                <p className="text-xs text-muted-foreground">
                  Click WhatsApp above to send a message instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
