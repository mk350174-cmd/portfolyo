"use client";

import { useEvidence } from "./evidence-context";
import { TIER_META, TIER_ORDER, type EvidenceTier } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * The filter control itself.
 *
 * `variant="bar"` is the full labelled version used in the page body;
 * `variant="compact"` is the condensed one that lives in the sticky header.
 */
export function EvidenceControl({
  variant = "bar",
  className,
}: {
  variant?: "bar" | "compact";
  className?: string;
}) {
  const { active, toggle, setOnly, reset, isFiltered, ready } = useEvidence();

  const activeCount = active.length;
  const compact = variant === "compact";

  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-2 gap-y-2", className)}
      role="group"
      aria-label="Filter the portfolio by evidence tier"
    >
      {!compact && (
        <span className="t-eyebrow mr-1 shrink-0">Evidence</span>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        {TIER_ORDER.map((tier) => {
          const meta = TIER_META[tier];
          const on = active.includes(tier);
          return (
            <button
              key={tier}
              type="button"
              onClick={() => toggle(tier)}
              aria-pressed={on}
              title={meta.description}
              className={cn(
                "group relative inline-flex items-center gap-1.5 rounded-md border font-mono uppercase tracking-[0.1em] transition-all duration-200",
                compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 text-[11px]",
                on
                  ? "border-[var(--line-strong)] bg-[var(--bg)] text-[var(--text-strong)] shadow-[var(--shadow-sm)]"
                  : "border-transparent bg-transparent text-[var(--text-faint)] hover:text-[var(--text-muted)]",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-1.5 rounded-full transition-opacity duration-200",
                  on ? "opacity-100" : "opacity-30",
                )}
                style={{ background: `var(--tier-${tier})` }}
              />
              {meta.short}
            </button>
          );
        })}
      </div>

      <div className={cn("flex items-center gap-1.5", compact ? "ml-0.5" : "ml-1")}>
        <button
          type="button"
          onClick={() => setOnly(["built"])}
          className={cn(
            "rounded-md px-2 py-1 font-mono uppercase tracking-[0.1em] text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]",
            compact ? "text-[10px]" : "text-[11px]",
          )}
        >
          Only built
        </button>
        {isFiltered && (
          <button
            type="button"
            onClick={reset}
            className={cn(
              "rounded-md px-2 py-1 font-mono uppercase tracking-[0.1em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]",
              compact ? "text-[10px]" : "text-[11px]",
            )}
          >
            Show all
          </button>
        )}
      </div>

      {/* Dimming carries no meaning without sight, so the state change is
          announced. Each claim also states its own tier in its chip. */}
      <p aria-live="polite" className="sr-only">
        {ready
          ? activeCount === TIER_ORDER.length
            ? "Showing all evidence tiers."
            : `Showing ${active.map((t) => TIER_META[t].label).join(", ")}. Other material is dimmed but still readable.`
          : ""}
      </p>
    </div>
  );
}

/** A small inline label stating which tier a statement belongs to. */
export function TierChip({
  tier,
  className,
  showLabel = true,
}: {
  tier: EvidenceTier;
  className?: string;
  showLabel?: boolean;
}) {
  const meta = TIER_META[tier];
  return (
    <span className={cn("tier-chip", meta.className, className)} title={meta.description}>
      <span
        aria-hidden
        className="size-1.5 rounded-full"
        style={{ background: "currentColor" }}
      />
      {showLabel && meta.label}
    </span>
  );
}
