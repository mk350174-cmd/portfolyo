"use client";

import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Evidenced } from "@/components/evidence/Evidenced";
import { TierChip } from "@/components/evidence/EvidenceControl";
import { useEvidence } from "@/components/evidence/evidence-context";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<string, string> = {
  research: "Research",
  engine: "Engine",
  pipeline: "System",
  product: "Live product",
  lab: "Prototypes",
};

export function WorkIndex() {
  const { isActive, ready } = useEvidence();

  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="Selected work"
            title="Six projects, one argument."
            subtitle="Two flagships, three systems, one live product. Each opens into what exists today, how it was built, what it taught, and what is deliberately still ahead."
          />
        </Reveal>

        <RevealGroup className="mt-14 border-t border-[var(--line)]">
          {PROJECTS.map((p) => {
            const on = !ready || isActive(p.tier);
            const builtMetrics = p.metrics.filter((m) => !ready || isActive(m.tier));

            return (
              <RevealItem key={p.slug}>
                <Evidenced tier={p.tier} as="article" className="border-b border-[var(--line)]">
                  <Link
                    href={`/work/${p.slug}`}
                    className={cn(
                      "group block py-8 transition-colors sm:py-9",
                      on && "hover:bg-[var(--bg-subtle)]",
                    )}
                  >
                    <div className="grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,20rem)] lg:items-start lg:gap-10">
                      {/* The CV's numbering, kept as the index column. */}
                      <span
                        aria-hidden
                        className="tabular font-mono text-[11px] text-[var(--text-faint)] lg:pt-1.5"
                      >
                        {p.index}
                      </span>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <h3 className="t-h3 transition-colors group-hover:text-[var(--accent)]">
                            {p.title}
                          </h3>
                          <TierChip tier={p.tier} />
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
                            {KIND_LABEL[p.kind]}
                          </span>
                        </div>

                        <p className="t-body mt-3 max-w-[60ch] text-[var(--text-muted)]">
                          {p.summary}
                        </p>

                        <p className="t-serif mt-4 max-w-[58ch] text-[15px] italic leading-[1.5] text-[var(--text)]">
                          {p.question}
                        </p>

                        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]">
                          Open
                          <span
                            aria-hidden
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </span>
                      </div>

                      {/* Metrics respond to the filter individually, so an
                          experimental figure recedes even inside a built project. */}
                      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 lg:pt-1">
                        {builtMetrics.slice(0, 4).map((m) => (
                          <div key={m.label}>
                            <dt className="sr-only">{m.label}</dt>
                            <dd>
                              <span className="tabular block text-[19px] font-semibold leading-none tracking-[-0.02em] text-[var(--text-strong)]">
                                {m.value}
                              </span>
                              <span className="mt-1.5 block text-[11.5px] leading-[1.4] text-[var(--text-muted)]">
                                {m.label}
                              </span>
                            </dd>
                          </div>
                        ))}
                        {builtMetrics.length === 0 && (
                          <p className="col-span-2 font-mono text-[11px] text-[var(--text-faint)]">
                            No figures at the selected tiers.
                          </p>
                        )}
                      </dl>
                    </div>
                  </Link>
                </Evidenced>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
