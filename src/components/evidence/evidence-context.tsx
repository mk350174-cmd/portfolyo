"use client";

import { useCallback, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { TIER_ORDER, type EvidenceTier } from "@/lib/types";
import {
  getServerSnapshot,
  getSnapshot,
  setTiers,
  subscribe,
  toggleTier,
} from "./evidence-store";

/**
 * The Evidence Filter.
 *
 * This is the site's signature interaction and its argument in miniature.
 * Every claim in the content layer carries an evidence tier; this hook decides
 * which tiers are currently emphasised. Excluded matter is dimmed rather than
 * removed, so a visitor can always see that something was set aside and what
 * it was.
 *
 * State lives in `evidence-store.ts` and is read through
 * `useSyncExternalStore`, which is what a browser-owned preference deserves.
 */

export interface EvidenceState {
  active: readonly EvidenceTier[];
  toggle: (tier: EvidenceTier) => void;
  setOnly: (tiers: EvidenceTier[]) => void;
  reset: () => void;
  isActive: (tier: EvidenceTier) => boolean;
  /** True when the visitor has narrowed the view at all. */
  isFiltered: boolean;
  /** True once the stored preference has been read. */
  ready: boolean;
}

/**
 * Kept as a provider component so the tree has one obvious place where the
 * filter is introduced, even though the store needs no React context.
 */
export function EvidenceProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useEvidence(): EvidenceState {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isActive = useCallback(
    (tier: EvidenceTier) => snapshot.tiers.includes(tier),
    [snapshot],
  );

  const setOnly = useCallback((tiers: EvidenceTier[]) => setTiers(tiers), []);
  const reset = useCallback(() => setTiers(TIER_ORDER), []);

  return useMemo(
    () => ({
      active: snapshot.tiers,
      toggle: toggleTier,
      setOnly,
      reset,
      isActive,
      isFiltered: snapshot.tiers.length < TIER_ORDER.length,
      ready: snapshot.hydrated,
    }),
    [snapshot, isActive, setOnly, reset],
  );
}
