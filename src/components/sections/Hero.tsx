import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";

/**
 * The hero.
 *
 * The unusual combination — history and AI systems — is the strongest thing
 * about Mehmet, so it is set as a deliberate juxtaposition rather than a
 * subtitle, and the positioning line resolves the tension immediately.
 * No decoration: the CV earns its authority through whitespace and
 * hierarchy, and so does this.
 *
 * This is a server component with CSS-only entrance animation. The
 * scroll-reveal used further down the page holds elements at opacity 0 until
 * React hydrates, which is fine below the fold and ruinous above it — it
 * would make the headline the Largest Contentful Paint element and then make
 * it wait for the JavaScript bundle. The `<h1>` therefore does not animate.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 lg:pt-20">
      <div className="container-page relative">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="min-w-0">
            <p className="t-eyebrow rise mb-6">{SITE.location}</p>

            {/* No animation: this is the LCP element. */}
            <h1 className="t-display">
              Mehmet
              <br />
              Koyuncu
            </h1>

            {/* The juxtaposition, made structural rather than decorative. */}
            <div className="rise rise-1 mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-[15px] font-semibold tracking-[-0.005em] text-[var(--text-strong)] sm:text-base">
                AI Systems Builder
              </span>
              <span aria-hidden className="hidden h-px w-8 bg-[var(--accent)] sm:inline-block" />
              <span className="text-[15px] font-semibold tracking-[-0.005em] text-[var(--text-strong)] sm:text-base">
                History Undergraduate
              </span>
            </div>

            <div className="rise rise-2">
              <p className="t-serif mt-8 max-w-[36ch] text-[1.375rem] leading-[1.42] text-[var(--text-strong)] sm:text-[1.625rem] lg:max-w-[24ch]">
                Source criticism is a method for deciding what a document
                actually proves.
              </p>
              <p className="t-body mt-5 max-w-[54ch] text-[var(--text-muted)]">
                I apply it to software. I build systems that keep apart the
                things usually blurred — identity from task, retrieval from
                verification, style from strength — and that label what is
                actually known. That is the thread running through a persona
                library, a chess engine, and a control plane.
              </p>
            </div>

            <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--text-strong)] px-5 py-3 text-[14px] font-medium text-[var(--bg)] transition-opacity hover:opacity-88"
              >
                See the work
                <span aria-hidden>↓</span>
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-[var(--line-strong)] px-5 py-3 text-[14px] font-medium text-[var(--text-strong)] transition-colors hover:bg-[var(--surface)]"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Mehmet's real photograph, from the supplied launch pack. It is the
              canonical portrait — the AI-assisted cover derived from it is used
              for Open Graph only and never appears in the UI.

              It deliberately does not come first on small screens: the name
              has to lead, and a portrait above it pushes the headline off the
              first screen entirely. On mobile it sits beside the study details
              instead of above them. */}
          <div className="rise rise-1">
            <div className="flex items-start gap-5 lg:block lg:w-[210px]">
              <div className="relative w-[108px] shrink-0 overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--surface)] sm:w-[132px] lg:w-full">
                <Image
                  src="/media/mehmet-koyuncu-portrait.webp"
                  alt="Mehmet Koyuncu"
                  width={640}
                  height={800}
                  priority
                  sizes="(max-width: 640px) 108px, (max-width: 1024px) 132px, 210px"
                  className="h-auto w-full"
                />
              </div>
              <dl className="space-y-2.5 font-mono text-[11px] leading-[1.5] lg:mt-5">
                <div>
                  <dt className="text-[var(--text-faint)]">University</dt>
                  <dd className="text-[var(--text)]">{SITE.university}</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-faint)]">Reading</dt>
                  <dd className="text-[var(--text)]">
                    {SITE.degree} · {SITE.graduation}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Four things a visitor can check in ten seconds. Every figure was
            counted from the source archives or read off the live product. */}
        <dl className="rise rise-4 mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-[var(--line)] pt-7 sm:grid-cols-4 lg:mt-14">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="tabular block text-[26px] font-semibold leading-none tracking-[-0.025em] text-[var(--text-strong)] sm:text-[30px]">
                  {f.value}
                </span>
                <span className="mt-2 block text-[13px] leading-[1.4] text-[var(--text)]">
                  {f.label}
                </span>
                <span className="mt-1 block font-mono text-[10px] leading-[1.4] text-[var(--text-faint)]">
                  {f.source}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const FACTS = [
  {
    value: "495",
    label: "persona profiles",
    source: "counted from the source",
  },
  {
    value: "18",
    label: "chess personas with real search parameters",
    source: "src/persona.cpp",
  },
  {
    value: "~12.3k",
    label: "lines of C++20 engine",
    source: "src/ and include/",
  },
  {
    value: "1",
    label: "platform you can open right now",
    source: "GemVault Pro, live",
  },
];
