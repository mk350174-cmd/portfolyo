"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/content/site";
import { EvidenceControl } from "@/components/evidence/EvidenceControl";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on Escape and restore focus to its trigger.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex shrink-0 items-baseline gap-2.5"
            aria-label={`${SITE.name} — home`}
          >
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--text-strong)]">
              Mehmet Koyuncu
            </span>
            <span
              aria-hidden
              className="hidden h-[3px] w-6 shrink-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-9 sm:block"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13.5px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden xl:block">
              <EvidenceControl variant="compact" />
            </div>
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-9 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-strong)] lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* The evidence control stays reachable on tablet widths where it
            does not fit beside the navigation. */}
        <div className="hidden border-t border-[var(--line)] py-2 lg:block xl:hidden">
          <EvidenceControl variant="compact" />
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-[var(--line)] bg-[var(--bg)] lg:hidden"
        >
          <div className="container-page py-5">
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[var(--line)] py-3.5 text-[15px] text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-5">
              <p className="t-eyebrow mb-2.5">Evidence filter</p>
              <EvidenceControl />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
