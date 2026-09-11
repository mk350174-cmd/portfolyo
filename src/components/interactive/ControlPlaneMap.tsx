"use client";

import { useState } from "react";
import { B_BRANCH_MODULES, TRUST_STEPS, type Module } from "@/content/pipelines";
import { cn } from "@/lib/utils";

/**
 * B-Branch, shown as the trust boundary it actually is.
 *
 * The interesting property of this architecture is not that it has thirteen
 * modules — it is that exactly one of them reaches outside, and that
 * retrieving, verifying and approving are three separate events. So the
 * diagram foregrounds the boundary and the three steps, and lets the module
 * grid be a grid.
 */

const ROLE_LABEL: Record<Module["role"], string> = {
  foundation: "Foundation",
  intelligence: "Intelligence",
  strategy: "Strategy",
  external: "External boundary",
  control: "Control",
};

const ROLE_ORDER: Module["role"][] = [
  "foundation",
  "intelligence",
  "strategy",
  "external",
  "control",
];

export function ControlPlaneMap() {
  const [activeId, setActiveId] = useState<string>("B08");
  const active = B_BRANCH_MODULES.find((m) => m.id === activeId)!;

  return (
    <div className="border border-[var(--line)] bg-[var(--bg)]">
      {/* The three steps that must not collapse into one another. */}
      <div className="border-b border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-4 sm:px-5">
        <p className="t-eyebrow mb-3.5">The separation the whole plane exists for</p>
        <ol className="grid gap-3 sm:grid-cols-3">
          {TRUST_STEPS.map((s, i) => (
            <li
              key={s.id}
              className="relative border-l-[3px] border-[var(--accent)] bg-[var(--bg)] px-3.5 py-3"
            >
              <div className="flex items-baseline gap-2">
                <span className="tabular font-mono text-[10px] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13.5px] font-semibold text-[var(--text-strong)]">
                  {s.label}
                </span>
                <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.08em] text-[var(--text-faint)]">
                  {s.where}
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-[1.55] text-[var(--text-muted)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Module grid, grouped by role. */}
      <div className="p-4 sm:p-5">
        <div className="space-y-4">
          {ROLE_ORDER.map((role) => {
            const mods = B_BRANCH_MODULES.filter((m) => m.role === role);
            if (mods.length === 0) return null;
            return (
              <div key={role}>
                <p className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                  {ROLE_LABEL[role]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {mods.map((m) => {
                    const isActive = m.id === activeId;
                    const isExternal = m.role === "external";
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setActiveId(m.id)}
                        aria-pressed={isActive}
                        className={cn(
                          "group flex min-w-0 items-center gap-2 rounded-sm border px-2.5 py-2 text-left transition-colors",
                          isActive
                            ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                            : "border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--bg-subtle)]",
                          isExternal && !isActive && "border-dashed border-[var(--accent)]",
                        )}
                      >
                        <span
                          className={cn(
                            "tabular font-mono text-[10.5px] font-semibold",
                            isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]",
                          )}
                        >
                          {m.id}
                        </span>
                        <span className="truncate text-[12px] text-[var(--text)]">
                          {m.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail — fixed minimum height so selection never jumps the layout. */}
      <div className="min-h-[5rem] border-t border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-3.5 sm:px-5">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-mono text-[12px] font-semibold text-[var(--accent)]">
            {active.id}
          </span>
          <span className="text-[14px] font-semibold text-[var(--text-strong)]">
            {active.name}
          </span>
          {active.role === "external" && (
            <span className="tier-chip tier-experimental">Trust boundary</span>
          )}
        </div>
        <p className="mt-1.5 max-w-[72ch] text-[13px] leading-[1.6] text-[var(--text-muted)]">
          {active.note}
        </p>
      </div>
    </div>
  );
}
