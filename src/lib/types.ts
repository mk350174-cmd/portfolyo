/**
 * Core types for the portfolio's content layer.
 *
 * The central idea: nothing on this site is a bare string. Every factual
 * statement is a typed object carrying the evidence tier it belongs to, so
 * the Evidence Filter is a property of the data rather than a UI trick.
 */

/**
 * Evidence tiers, ordered from strongest to weakest claim.
 *
 * These mirror the vocabulary Mehmet already uses across his own repositories
 * (`Simülasyon` / `Hesaplanan` / `Tahmini` tier stamps in Persona;
 * `Kanıtlı` vs `Kanıtlanmamış` in the Tamerlane STATUS record).
 */
export type EvidenceTier = "built" | "experimental" | "proposed" | "vision";

export const TIER_ORDER: EvidenceTier[] = ["built", "experimental", "proposed", "vision"];

export const TIER_META: Record<
  EvidenceTier,
  { label: string; short: string; description: string; className: string }
> = {
  built: {
    label: "Built",
    short: "Built",
    description: "Implemented and running today. Verifiable in the source.",
    className: "tier-built",
  },
  experimental: {
    label: "Experimental",
    short: "Experimental",
    description: "Implemented, but its results are not established. Treated as a hypothesis.",
    className: "tier-experimental",
  },
  proposed: {
    label: "Proposed",
    short: "Proposed",
    description: "Designed and specified. Not yet built.",
    className: "tier-proposed",
  },
  vision: {
    label: "Long-term",
    short: "Long-term",
    description: "A direction worth aiming at. Deliberately not a commitment.",
    className: "tier-vision",
  },
};

/** A single labelled statement. */
export interface Claim {
  id: string;
  tier: EvidenceTier;
  text: string;
  /** Where this can be checked — a file path, a live URL, a document. */
  source?: string;
}

/** A named, measurable figure. Only used where a source can be pointed at. */
export interface Metric {
  value: string;
  label: string;
  tier: EvidenceTier;
  source: string;
  /** Present when the figure was read off a live page and may drift. */
  verifiedOn?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "source" | "doc";
}

export type ProjectKind = "research" | "engine" | "pipeline" | "product" | "lab";

export interface Project {
  slug: string;
  /** Two-digit index used by the CV's "01 /" section grammar. */
  index: string;
  title: string;
  /** Short descriptor beneath the title, as in the CV. */
  kicker: string;
  kind: ProjectKind;
  /** Headline status for the work as a whole. */
  tier: EvidenceTier;
  /** One sentence. Shown in the work index. */
  summary: string;
  /** The question the project explores. Central to the narrative. */
  question: string;
  /** The seven answers required of every project, in progressive disclosure. */
  what: string;
  why: string;
  today: Claim[];
  howBuilt: Claim[];
  learned: string[];
  next: Claim[];
  /** Explicit limits. Every project states what it is not. */
  limits: string[];
  metrics: Metric[];
  stack: string[];
  links: ProjectLink[];
  /** Which other projects this one feeds, by slug. */
  connectsTo: { slug: string; relation: string }[];
}
