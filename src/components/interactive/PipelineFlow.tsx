"use client";

import { useState } from "react";
import { A_BRANCH_STAGES } from "@/content/pipelines";
import { cn } from "@/lib/utils";

/**
 * A-Branch, traced.
 *
 * Three stages, expandable into their real phases. The point the diagram has
 * to carry is the handoff: the creative package freezes on approval, and
 * production has no authority to reopen it. So the handoff is drawn as a
 * distinct object between the stages rather than an arrow.
 */
export function PipelineFlow() {
  const [openStage, setOpenStage] = useState<string | null>("p2");

  return (
    <div className="border border-[var(--line)] bg-[var(--bg)]">
      <div className="border-b border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-3 sm:px-5">
        <p className="t-eyebrow">Three pipelines, two frozen boundaries</p>
        <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--text-muted)]">
          Phases as named in <code className="font-mono">FULL_PIPELINE_SYSTEM_MAP.md</code>.
          Select a stage to open it.
        </p>
      </div>

      <ol className="divide-y divide-[var(--line)]">
        {A_BRANCH_STAGES.map((stage, i) => {
          const open = openStage === stage.id;
          return (
            <li key={stage.id}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenStage(open ? null : stage.id)}
                  aria-expanded={open}
                  aria-controls={`stage-${stage.id}`}
                  className={cn(
                    "flex w-full items-start gap-4 px-4 py-4 text-left transition-colors sm:px-5",
                    open ? "bg-[var(--surface)]" : "hover:bg-[var(--bg-subtle)]",
                  )}
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-sm border border-[var(--accent)] font-mono text-[11px] font-semibold text-[var(--accent)]"
                  >
                    {stage.label}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="text-[15px] font-semibold text-[var(--text-strong)]">
                        {stage.title}
                      </span>
                      <span className="tabular font-mono text-[10.5px] text-[var(--text-faint)]">
                        {stage.phases.length} phases
                      </span>
                    </span>
                    <span className="mt-1 block max-w-[62ch] text-[13px] leading-[1.55] text-[var(--text-muted)]">
                      {stage.role}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1 shrink-0 font-mono text-[12px]",
                      open ? "text-[var(--accent)]" : "text-[var(--text-faint)]",
                    )}
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>

              <div id={`stage-${stage.id}`} hidden={!open} className="bg-[var(--surface)]">
                <ol className="grid gap-x-6 gap-y-0 px-4 pb-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-3">
                  {stage.phases.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-baseline gap-2.5 border-t border-[var(--line)] py-2"
                    >
                      <span className="tabular shrink-0 font-mono text-[10px] text-[var(--accent)]">
                        {p.id}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12.5px] leading-[1.4] text-[var(--text)]">
                          {p.name}
                        </span>
                        {p.output && (
                          <span className="block truncate font-mono text-[10px] text-[var(--text-faint)]">
                            → {p.output}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* The handoff, drawn as an object rather than an arrow. */}
              {stage.handoff && i < A_BRANCH_STAGES.length && (
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2.5 sm:px-5",
                    stage.handoff.frozen
                      ? "border-l-[3px] border-[var(--accent)] bg-[var(--accent-soft)]"
                      : "bg-[var(--bg-subtle)]",
                  )}
                >
                  <span
                    aria-hidden
                    className="font-mono text-[11px] text-[var(--text-faint)]"
                  >
                    ↓
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[var(--text-strong)]">
                    {stage.handoff.name}
                  </span>
                  {stage.handoff.frozen && (
                    <span className="tier-chip tier-built">Frozen</span>
                  )}
                  <span className="min-w-0 flex-1 text-[12px] leading-[1.5] text-[var(--text-muted)]">
                    {stage.handoff.note}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
