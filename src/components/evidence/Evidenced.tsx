"use client";

import type { ReactNode } from "react";
import { useEvidence } from "./evidence-context";
import { cn } from "@/lib/utils";
import type { EvidenceTier } from "@/lib/types";

/**
 * Wraps any piece of content with its evidence tier.
 *
 * When the tier is excluded by the filter the content recedes but stays in
 * the document: readable, focusable, and still labelled. Hiding it would
 * defeat the purpose — the visitor is meant to see what was set aside.
 */
export function Evidenced({
  tier,
  children,
  className,
  as: Tag = "div",
}: {
  tier: EvidenceTier;
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
}) {
  const { isActive, ready } = useEvidence();
  const on = !ready || isActive(tier);

  return (
    <Tag
      data-tier={tier}
      data-evidence-active={on ? "true" : "false"}
      className={cn(on ? "evidence-active" : "evidence-dimmed", className)}
    >
      {children}
    </Tag>
  );
}
