import { TIER_ORDER, type EvidenceTier } from "@/lib/types";

/**
 * The Evidence Filter's state, held outside React.
 *
 * It lives here rather than in a `useState` + mount effect for two reasons.
 * The stored preference belongs to the browser, not to the component tree, so
 * `useSyncExternalStore` is the honest way to read it — and reading it on
 * first subscription rather than in an effect avoids the cascading render
 * that a setState-on-mount would cause.
 *
 * Snapshots are frozen and replaced wholesale, so `useSyncExternalStore` can
 * compare them by reference.
 */

const STORAGE_KEY = "mk.evidence.tiers";

export interface EvidenceSnapshot {
  tiers: readonly EvidenceTier[];
  /** False until the stored preference has been read. */
  hydrated: boolean;
}

/** Server and first-client render agree on this: everything is shown. */
const INITIAL: EvidenceSnapshot = Object.freeze({
  tiers: Object.freeze([...TIER_ORDER]) as readonly EvidenceTier[],
  hydrated: false,
});

let snapshot: EvidenceSnapshot = INITIAL;
const listeners = new Set<() => void>();
let readStorage = false;

function emit() {
  for (const l of listeners) l();
}

function persist(tiers: readonly EvidenceTier[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tiers));
  } catch {
    // Storage can be unavailable or blocked; the filter still works in-session.
  }
}

function hydrateOnce() {
  if (readStorage) return;
  readStorage = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as EvidenceTier[]) : null;
    const valid = parsed?.filter((t) => TIER_ORDER.includes(t)) ?? [];
    snapshot = Object.freeze({
      tiers: Object.freeze(valid.length > 0 ? valid : [...TIER_ORDER]) as readonly EvidenceTier[],
      hydrated: true,
    });
  } catch {
    snapshot = Object.freeze({ ...INITIAL, hydrated: true });
  }
}

export function subscribe(listener: () => void) {
  // The first subscriber triggers the storage read. React then re-reads the
  // snapshot, so no effect and no setState-on-mount are needed.
  const first = listeners.size === 0;
  listeners.add(listener);
  if (first && !readStorage) {
    hydrateOnce();
    // Notify asynchronously: subscribe() runs during React's commit, and the
    // store must not tell React to re-render while it is still committing.
    queueMicrotask(emit);
  }
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): EvidenceSnapshot {
  return snapshot;
}

export function getServerSnapshot(): EvidenceSnapshot {
  return INITIAL;
}

export function setTiers(next: readonly EvidenceTier[]) {
  const tiers = next.length > 0 ? [...next] : [...TIER_ORDER];
  snapshot = Object.freeze({
    tiers: Object.freeze(tiers) as readonly EvidenceTier[],
    hydrated: true,
  });
  persist(tiers);
  emit();
}

export function toggleTier(tier: EvidenceTier) {
  const current = snapshot.tiers;
  if (current.includes(tier)) {
    // Never allow an empty selection — a blank site teaches nothing.
    if (current.length === 1) return;
    setTiers(current.filter((t) => t !== tier));
  } else {
    // Keep the canonical order regardless of click order.
    setTiers(TIER_ORDER.filter((t) => t === tier || current.includes(t)));
  }
}
