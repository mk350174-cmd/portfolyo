"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionHeader, PullQuote } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface Separation {
  id: string;
  slug: string;
  project: string;
  /** The things that get collapsed into each other when nobody is careful. */
  parts: string[];
  detail: string;
}

/**
 * The six separations.
 *
 * This is the site's argument: the projects are not six interests, they are
 * one discipline applied six times. Each row names what the project refuses
 * to collapse.
 */
const SEPARATIONS: Separation[] = [
  {
    id: "persona",
    slug: "persona-engineering",
    project: "Persona Engineering",
    parts: ["Identity", "Task", "Output"],
    detail:
      "Define who is working before defining what the work is. The persona is versioned and reused; the task and the deliverable change beneath it. When a result is poor, the structure tells you which layer to blame.",
  },
  {
    id: "chess",
    slug: "tamerlane-chess",
    project: "Tamerlane Chess",
    parts: ["Correctness", "Style", "Strength"],
    detail:
      "An engine can be legal and dull, distinctive and weak, or strong and characterless. These are three different goals needing three different tests, so the neutral persona is defined to be the plain engine and any change is attributable.",
  },
  {
    id: "bbranch",
    slug: "b-branch",
    project: "B-Branch",
    parts: ["Retrieval", "Verification", "Approval"],
    detail:
      "Finding something is not confirming it, and confirming it is not deciding to act on it. One module reaches outside; everything else works on what it brought back, which makes the trust boundary a single readable place in the code.",
  },
  {
    id: "abranch",
    slug: "a-branch",
    project: "A-Branch",
    parts: ["Research", "Creative", "Production"],
    detail:
      "Three pipelines rather than one, with the handoff frozen on approval. Without the freeze the stages quietly renegotiate and no one can say which one introduced a fault.",
  },
  {
    id: "games",
    slug: "historical-games-lab",
    project: "Historical Games Lab",
    parts: ["What sources support", "What I decided"],
    detail:
      "Reconstructing a historical game means choosing where the evidence runs out. Those choices are implementation decisions and should be recorded as such, so later evidence can overturn them cleanly.",
  },
  {
    id: "gemvault",
    slug: "gemvault",
    project: "GemVault Pro",
    parts: ["Reusable instruction", "One-off prompt"],
    detail:
      "A well-made instruction is a component, not a message. Treating it as a component means giving it a category, a description and a way to be found again.",
  },
];

export function Thesis() {
  const [openId, setOpenId] = useState<string>("persona");

  return (
    <section id="thesis" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="01"
            eyebrow="The idea underneath"
            title="One discipline, applied six times."
            subtitle="These projects look unrelated — a persona library, a chess engine, a video pipeline, a control plane. They are the same habit in six settings: refuse to let distinct things collapse into each other, then say plainly which is which."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <PullQuote className="mt-10 max-w-3xl" cite="The rule every project here follows">
            Keep separate the things that are usually blurred — and label what you
            actually know.
          </PullQuote>
        </Reveal>

        <div className="mt-14">
          <Reveal delay={0.05}>
            {/* The CV builds its comparisons as tables with pale-teal headers
                and hairline rules; this keeps that grammar and adds disclosure. */}
            <div className="overflow-hidden border-y border-[var(--line)]">
              <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_auto] gap-6 bg-[var(--surface)] px-4 py-3 sm:grid sm:px-5">
                <span className="t-eyebrow">Project</span>
                <span className="t-eyebrow">Kept apart</span>
                <span className="t-eyebrow text-right">Why</span>
              </div>

              <ul className="divide-y divide-[var(--line)]">
                {SEPARATIONS.map((s) => {
                  const open = openId === s.id;
                  return (
                    <li key={s.id}>
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpenId(open ? "" : s.id)}
                          aria-expanded={open}
                          aria-controls={`sep-${s.id}`}
                          className={cn(
                            "grid w-full grid-cols-1 items-center gap-2 px-4 py-4 text-left transition-colors sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_auto] sm:gap-6 sm:px-5",
                            open ? "bg-[var(--surface)]" : "hover:bg-[var(--bg-subtle)]",
                          )}
                        >
                          <span className="text-[14.5px] font-semibold text-[var(--text-strong)]">
                            {s.project}
                          </span>

                          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            {s.parts.map((part, i) => (
                              <span key={part} className="flex items-center gap-2.5">
                                {i > 0 && (
                                  <span
                                    aria-hidden
                                    className="h-3 w-px shrink-0 bg-[var(--accent)]"
                                  />
                                )}
                                <span className="font-mono text-[12px] text-[var(--text)]">
                                  {part}
                                </span>
                              </span>
                            ))}
                          </span>

                          <span
                            aria-hidden
                            className={cn(
                              "justify-self-start font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-faint)] transition-transform duration-300 sm:justify-self-end",
                              open && "text-[var(--accent)]",
                            )}
                          >
                            {open ? "−" : "+"}
                          </span>
                        </button>
                      </h3>

                      <div
                        id={`sep-${s.id}`}
                        hidden={!open}
                        className="bg-[var(--surface)] px-4 pb-5 sm:px-5"
                      >
                        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_auto] sm:gap-6">
                          <div className="hidden sm:block" />
                          <p className="max-w-[62ch] text-[14px] leading-[1.65] text-[var(--text-muted)]">
                            {s.detail}
                          </p>
                          <Link
                            href={`/work/${s.slug}`}
                            className="link-underline self-start whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]"
                          >
                            Open project →
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="t-body mt-12 max-w-[62ch] text-[var(--text-muted)]">
            This is not a metaphor borrowed from the humanities to decorate an
            engineering CV. Reading a source means deciding what it can and cannot
            establish, holding the difference between what it says and what you
            infer, and recording where you filled a gap. That is the same operation
            as separating a verified claim from a retrieved one — which is why the
            history degree is the method here rather than the hobby.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
