"use client";

import { useMemo } from "react";
import { PROJECTS } from "@/content/projects";
import { TIER_META, TIER_ORDER, type EvidenceTier } from "@/lib/types";
import { useEvidence } from "@/components/evidence/evidence-context";
import { EvidenceControl } from "@/components/evidence/EvidenceControl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Introduces the Evidence Filter — the site's signature interaction.
 *
 * Counts are computed from the content layer rather than written by hand, so
 * they cannot drift away from what the site actually says.
 */
export function EvidenceIntro() {
  const { active, toggle, isFiltered } = useEvidence();

  const counts = useMemo(() => {
    const c: Record<EvidenceTier, number> = {
      built: 0,
      experimental: 0,
      proposed: 0,
      vision: 0,
    };
    for (const p of PROJECTS) {
      for (const claim of [...p.today, ...p.howBuilt, ...p.next]) c[claim.tier] += 1;
      for (const m of p.metrics) c[m.tier] += 1;
    }
    return c;
  }, []);

  const total = TIER_ORDER.reduce((n, t) => n + counts[t], 0);
  const shown = TIER_ORDER.filter((t) => active.includes(t)).reduce((n, t) => n + counts[t], 0);

  return (
    <section
      id="evidence"
      className="scroll-mt-24 border-y border-[var(--line)] bg-[var(--bg-subtle)] py-16 sm:py-20"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionHeader
              index="00"
              eyebrow="How to read this"
              title="Every claim here is labelled."
              subtitle="Portfolios tend to present what someone hopes to build in the same voice as what they have finished. This one does not. Each statement carries the tier it belongs to — and you can switch the others off."
            />

            <p className="t-body mt-7 max-w-[46ch] text-[var(--text-muted)]">
              The filter follows you through the whole site. Set it to{" "}
              <span className="font-medium text-[var(--text)]">Built</span> and
              everything speculative recedes — the fastest way to answer the only
              question that matters on a first visit: what actually exists?
            </p>

            <div className="mt-7">
              <EvidenceControl />
            </div>

            <p className="mt-5 font-mono text-[11.5px] text-[var(--text-faint)]">
              Excluded material is dimmed, never hidden. You should be able to see
              what was set aside.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {TIER_ORDER.map((tier) => {
                  const meta = TIER_META[tier];
                  const on = active.includes(tier);
                  return (
                    <li key={tier}>
                      <button
                        type="button"
                        onClick={() => toggle(tier)}
                        aria-pressed={on}
                        className="group flex w-full items-start gap-4 py-4 text-left transition-opacity duration-300"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "mt-[7px] size-2 shrink-0 rounded-full transition-all duration-300",
                            on ? "opacity-100" : "opacity-25",
                          )}
                          style={{ background: `var(--tier-${tier})` }}
                        />
                        <span className={cn("min-w-0 flex-1 transition-opacity duration-300", on ? "opacity-100" : "opacity-45")}>
                          <span className="flex flex-wrap items-baseline gap-x-2.5">
                            <span className="text-[15px] font-semibold text-[var(--text-strong)]">
                              {meta.label}
                            </span>
                            <span className="tabular font-mono text-[11px] text-[var(--text-faint)]">
                              {counts[tier]} statements
                            </span>
                          </span>
                          <span className="mt-1 block text-[13.5px] leading-[1.55] text-[var(--text-muted)]">
                            {meta.description}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "mt-1 shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors",
                            on ? "text-[var(--accent)]" : "text-[var(--text-faint)]",
                          )}
                        >
                          {on ? "shown" : "dimmed"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p className="tabular mt-5 font-mono text-[12px] text-[var(--text-muted)]">
                Showing <span className="text-[var(--text-strong)]">{shown}</span> of {total}{" "}
                statements
                {isFiltered && (
                  <span className="text-[var(--accent)]"> · filtered</span>
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
