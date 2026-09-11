"use client";

import Link from "next/link";
import { useState } from "react";
import { PROJECTS } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * How the projects connect.
 *
 * Deliberately not a force-directed graph. A drifting blob of nodes says
 * "many things exist"; the claim here is narrower and more useful — that the
 * work stacks into three layers, and that specific projects feed specific
 * others. Positions are authored; the edges are read from each project's
 * `connectsTo`, so the diagram cannot disagree with the content.
 */

interface Node {
  slug: string;
  short: string;
  x: number;
  y: number;
  w: number;
  layer: number;
}

const NODES: Node[] = [
  { slug: "persona-engineering", short: "Persona Engineering", x: 404, y: 54, w: 196, layer: 0 },
  { slug: "tamerlane-chess", short: "Tamerlane Chess", x: 212, y: 214, w: 178, layer: 1 },
  { slug: "historical-games-lab", short: "Historical Games Lab", x: 476, y: 214, w: 196, layer: 1 },
  { slug: "b-branch", short: "B-Branch", x: 60, y: 374, w: 158, layer: 2 },
  { slug: "a-branch", short: "A-Branch", x: 300, y: 374, w: 158, layer: 2 },
  { slug: "gemvault", short: "GemVault Pro", x: 620, y: 374, w: 168, layer: 2 },
];

const LAYERS = [
  { y: 54, label: "Method", note: "defines reusable behaviour" },
  { y: 214, label: "Environment", note: "where behaviour becomes observable" },
  { y: 374, label: "Control & reach", note: "evidence, production, public use" },
];

const NODE_H = 46;

function nodeById(slug: string) {
  return NODES.find((n) => n.slug === slug)!;
}

/** Anchor points on a node's edge, chosen by the direction of travel. */
function anchor(n: Node, side: "top" | "bottom") {
  return { x: n.x + n.w / 2, y: side === "top" ? n.y : n.y + NODE_H };
}

interface Edge {
  from: string;
  to: string;
  label: string;
}

const EDGES: Edge[] = PROJECTS.flatMap((p) =>
  p.connectsTo
    .filter((c) => NODES.some((n) => n.slug === c.slug))
    .map((c) => ({ from: p.slug, to: c.slug, label: c.relation })),
).filter(
  // Keep one edge per pair; the relation is described from the first side.
  (e, i, arr) =>
    arr.findIndex(
      (o) =>
        (o.from === e.from && o.to === e.to) || (o.from === e.to && o.to === e.from),
    ) === i,
);

function edgePath(a: Node, b: Node) {
  const upper = a.layer <= b.layer ? a : b;
  const lower = a.layer <= b.layer ? b : a;

  if (upper.layer === lower.layer) {
    // Same band: arc beneath both so the line never crosses a label.
    const p1 = { x: upper.x + upper.w / 2, y: upper.y + NODE_H };
    const p2 = { x: lower.x + lower.w / 2, y: lower.y + NODE_H };
    const dip = 30;
    return `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y + dip}, ${p2.x} ${p2.y + dip}, ${p2.x} ${p2.y}`;
  }

  const p1 = anchor(upper, "bottom");
  const p2 = anchor(lower, "top");
  const mid = (p1.y + p2.y) / 2;
  return `M ${p1.x} ${p1.y} C ${p1.x} ${mid}, ${p2.x} ${mid}, ${p2.x} ${p2.y}`;
}

export function Ecosystem() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const isEdgeLit = (e: Edge) =>
    activeSlug === null || e.from === activeSlug || e.to === activeSlug;
  const isNodeLit = (slug: string) =>
    activeSlug === null ||
    slug === activeSlug ||
    EDGES.some(
      (e) =>
        (e.from === activeSlug && e.to === slug) ||
        (e.to === activeSlug && e.from === slug),
    );

  const activeEdges = activeSlug
    ? EDGES.filter((e) => e.from === activeSlug || e.to === activeSlug)
    : [];

  return (
    <section
      id="ecosystem"
      className="scroll-mt-24 border-y border-[var(--line)] bg-[var(--bg-subtle)] py-20 sm:py-28"
    >
      <div className="container-page">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="How it connects"
            title="The projects stack."
            subtitle="Persona engineering supplies a method for describing behaviour. The games give that behaviour somewhere to be observed. The control and production systems decide what may be trusted and what reaches anyone else."
          />
        </Reveal>

        {/* Desktop: the blueprint. */}
        <Reveal delay={0.08}>
          <figure className="mt-12 hidden md:block">
            <figcaption className="sr-only">
              A diagram of how the six projects relate, arranged in three layers:
              method, environment, and control and reach.
            </figcaption>
            <div
              className="relative"
              onMouseLeave={() => setActiveSlug(null)}
            >
              <svg
                viewBox="0 0 860 460"
                className="h-auto w-full"
                role="presentation"
              >
                {/* Band rules and labels */}
                {LAYERS.map((l) => (
                  <g key={l.label}>
                    <line
                      x1="0"
                      y1={l.y - 26}
                      x2="860"
                      y2={l.y - 26}
                      stroke="var(--line)"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y={l.y - 34}
                      fill="var(--accent)"
                      className="font-mono"
                      fontSize="9.5"
                      letterSpacing="1.6"
                      style={{ textTransform: "uppercase" }}
                    >
                      {l.label.toUpperCase()}
                    </text>
                    <text
                      x="860"
                      y={l.y - 34}
                      textAnchor="end"
                      fill="var(--text-faint)"
                      className="font-mono"
                      fontSize="9.5"
                    >
                      {l.note}
                    </text>
                  </g>
                ))}

                {/* Edges beneath nodes */}
                <g>
                  {EDGES.map((e) => {
                    const lit = isEdgeLit(e);
                    return (
                      <path
                        key={`${e.from}-${e.to}`}
                        d={edgePath(nodeById(e.from), nodeById(e.to))}
                        fill="none"
                        stroke={lit ? "var(--accent)" : "var(--line-strong)"}
                        strokeWidth={lit && activeSlug ? 1.6 : 1.1}
                        strokeDasharray="3 3"
                        opacity={lit ? (activeSlug ? 1 : 0.55) : 0.14}
                        style={{ transition: "opacity .3s, stroke .3s, stroke-width .3s" }}
                      />
                    );
                  })}
                </g>

                {/* Nodes */}
                <g>
                  {NODES.map((n) => {
                    const lit = isNodeLit(n.slug);
                    const isActive = activeSlug === n.slug;
                    return (
                      <a
                        key={n.slug}
                        href={`/work/${n.slug}`}
                        onMouseEnter={() => setActiveSlug(n.slug)}
                        onFocus={() => setActiveSlug(n.slug)}
                        onBlur={() => setActiveSlug(null)}
                      >
                        <g
                          style={{
                            transition: "opacity .3s",
                            opacity: lit ? 1 : 0.28,
                          }}
                        >
                        <rect
                          x={n.x}
                          y={n.y}
                          width={n.w}
                          height={NODE_H}
                          rx="3"
                          fill={isActive ? "var(--accent-soft)" : "var(--bg)"}
                          stroke={isActive ? "var(--accent)" : "var(--line-strong)"}
                          strokeWidth={isActive ? 1.5 : 1}
                          style={{ transition: "fill .3s, stroke .3s" }}
                        />
                        <rect
                          x={n.x}
                          y={n.y}
                          width="3"
                          height={NODE_H}
                          fill="var(--accent)"
                          opacity={isActive ? 1 : 0.5}
                          style={{ transition: "opacity .3s" }}
                        />
                        <text
                          x={n.x + 14}
                          y={n.y + NODE_H / 2 + 4}
                          fill="var(--text-strong)"
                          fontSize="12.5"
                          fontWeight="600"
                        >
                          {n.short}
                        </text>
                        </g>
                      </a>
                    );
                  })}
                </g>
              </svg>

              {/* The relation itself, shown in prose rather than crammed
                  onto the edge as unreadable micro-type. */}
              <div className="mt-2 min-h-[3.25rem] border-t border-[var(--line)] pt-3">
                {activeSlug ? (
                  <ul className="space-y-1.5">
                    {activeEdges.map((e) => {
                      const other = e.from === activeSlug ? e.to : e.from;
                      const subject = PROJECTS.find((p) => p.slug === e.from)!;
                      const object = PROJECTS.find((p) => p.slug === e.to)!;
                      return (
                        <li
                          key={`${e.from}-${e.to}`}
                          className="text-[13px] leading-[1.55] text-[var(--text-muted)]"
                        >
                          <span className="font-medium text-[var(--text-strong)]">
                            {subject.title}
                          </span>{" "}
                          {e.label}{" "}
                          <span className="font-medium text-[var(--text-strong)]">
                            — {object.title}
                          </span>
                          <span className="sr-only"> (related to {other})</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
                    Hover or focus a project to trace its connections
                  </p>
                )}
              </div>
            </div>
          </figure>
        </Reveal>

        {/* Mobile: the same relationships as a readable list, not a
            shrunken diagram. */}
        <div className="mt-10 md:hidden">
          <ol className="space-y-7">
            {LAYERS.map((layer, li) => (
              <li key={layer.label}>
                <p className="t-eyebrow mb-3">{layer.label}</p>
                <p className="mb-3 text-[12.5px] text-[var(--text-faint)]">{layer.note}</p>
                <ul className="space-y-2">
                  {NODES.filter((n) => n.layer === li).map((n) => {
                    const project = PROJECTS.find((p) => p.slug === n.slug)!;
                    return (
                      <li key={n.slug}>
                        <Link
                          href={`/work/${n.slug}`}
                          className="block border-l-[3px] border-[var(--accent)] bg-[var(--bg)] px-3.5 py-3"
                        >
                          <span className="block text-[14px] font-semibold text-[var(--text-strong)]">
                            {project.title}
                          </span>
                          {project.connectsTo.length > 0 && (
                            <span className="mt-1 block text-[12.5px] leading-[1.5] text-[var(--text-muted)]">
                              {project.connectsTo[0].relation}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <p className={cn("t-body mt-12 max-w-[62ch] text-[var(--text-muted)]")}>
            The stack is not finished, and the gaps are the interesting part. The
            persona method has no validated result yet. The chess engine has
            personas but no study showing players can tell them apart. Those two
            gaps are the same gap, which is why the projects are worth keeping in
            one portfolio rather than six.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
