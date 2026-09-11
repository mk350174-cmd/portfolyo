"use client";

import { useMemo, useState } from "react";
import { CHESS_PERSONAS, PSYCHE_RULES, type ChessPersona } from "@/content/chess";
import { cn } from "@/lib/utils";

/**
 * The Persona Style Map.
 *
 * Every point here is a real pair of integers from `src/persona.cpp`:
 * `contempt()` on one axis, `aspiration_delta()` on the other, both read at
 * psyche ψ = 0. This is the evidence for the project's central claim — that a
 * persona changes what the engine decides rather than what it says about the
 * move it was going to play anyway.
 *
 * On narrow screens the same data becomes a sortable table, because a
 * scatter plot at 360px wide is not a chart, it is a smudge.
 */

const PAD = { l: 54, r: 24, t: 24, b: 44 };
const VB = { w: 640, h: 420 };

const X_MIN = -24;
const X_MAX = 72;
const Y_MIN = 9;
const Y_MAX = 56;

/**
 * Label placement.
 *
 * Several personas share a coordinate or sit within a few centipawns of each
 * other — Umay and Selçuklu both at window 15, Erlik and Baybars both at
 * contempt 40 — so labels cannot all sit above their point. Rather than
 * hand-placing eighteen labels and hoping, each one takes the first candidate
 * position that collides with nothing already placed. The result is
 * deterministic, and it stays correct if the values in `chess.ts` change.
 */
type Placement = "above" | "below" | "right" | "left";

const FONT = 10.5;
const CHAR_W = 5.75; // measured average for this size and family
const LABEL_H = 11;

interface LabelBox {
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function candidate(p: ChessPersona, placement: Placement): LabelBox {
  const cx = sx(p.contempt);
  const cy = sy(p.aspiration);
  const w = p.name.length * CHAR_W;

  switch (placement) {
    case "below": {
      const y = cy + 18;
      return { x: cx, y, anchor: "middle", left: cx - w / 2, right: cx + w / 2, top: y - LABEL_H, bottom: y };
    }
    case "right": {
      const x = cx + 11;
      const y = cy + 3.5;
      return { x, y, anchor: "start", left: x, right: x + w, top: y - LABEL_H, bottom: y };
    }
    case "left": {
      const x = cx - 11;
      const y = cy + 3.5;
      return { x, y, anchor: "end", left: x - w, right: x, top: y - LABEL_H, bottom: y };
    }
    default: {
      const y = cy - 11;
      return { x: cx, y, anchor: "middle", left: cx - w / 2, right: cx + w / 2, top: y - LABEL_H, bottom: y };
    }
  }
}

function overlaps(a: LabelBox, b: LabelBox) {
  return !(a.right < b.left - 3 || a.left > b.right + 3 || a.bottom < b.top - 2 || a.top > b.bottom + 2);
}

/** A label must also clear every plotted marker, not just other labels. */
function hitsMarker(box: LabelBox, self: ChessPersona) {
  return CHESS_PERSONAS.some((o) => {
    if (o.id === self.id) return false;
    const mx = sx(o.contempt);
    const my = sy(o.aspiration);
    return (
      mx > box.left - 6 && mx < box.right + 6 && my > box.top - 6 && my < box.bottom + 6
    );
  });
}

const ORDER: Placement[] = ["above", "right", "left", "below"];

/** Resolved once at module load — the inputs are static. */
const LABELS: Record<string, LabelBox> = (() => {
  const placed: LabelBox[] = [];
  const out: Record<string, LabelBox> = {};

  // Top-down, so the crowded lower-left resolves against settled neighbours.
  const order = [...CHESS_PERSONAS].sort((a, b) => b.aspiration - a.aspiration);

  for (const p of order) {
    let chosen: LabelBox | null = null;
    for (const placement of ORDER) {
      const box = candidate(p, placement);
      if (box.left < 2 || box.right > VB.w - 2) continue;
      if (hitsMarker(box, p)) continue;
      if (placed.some((b) => overlaps(box, b))) continue;
      chosen = box;
      break;
    }
    // Nothing clean was available: push it further below and accept it.
    if (!chosen) {
      const box = candidate(p, "below");
      chosen = { ...box, y: box.y + 11, top: box.top + 11, bottom: box.bottom + 11 };
    }
    placed.push(chosen);
    out[p.id] = chosen;
  }
  return out;
})();

function sx(contempt: number) {
  return PAD.l + ((contempt - X_MIN) / (X_MAX - X_MIN)) * (VB.w - PAD.l - PAD.r);
}
function sy(aspiration: number) {
  return VB.h - PAD.b - ((aspiration - Y_MIN) / (Y_MAX - Y_MIN)) * (VB.h - PAD.t - PAD.b);
}

type SortKey = "contempt" | "aspiration" | "name";

export function PersonaStyleMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("contempt");

  const selected = useMemo(
    () => CHESS_PERSONAS.find((p) => p.id === hovered) ?? null,
    [hovered],
  );

  const sorted = useMemo(() => {
    const list = [...CHESS_PERSONAS];
    if (sortKey === "name") return list.sort((a, b) => a.name.localeCompare(b.name));
    return list.sort((a, b) => b[sortKey] - a[sortKey]);
  }, [sortKey]);

  return (
    <div className="border border-[var(--line)] bg-[var(--bg)]">
      <div className="border-b border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-3 sm:px-5">
        <p className="t-eyebrow">18 persona modes · real engine parameters</p>
        <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--text-muted)]">
          Read from the <code className="font-mono">contempt()</code> and{" "}
          <code className="font-mono">aspiration_delta()</code> switch statements in{" "}
          <code className="font-mono">src/persona.cpp</code>, at psyche ψ = 0.
        </p>
      </div>

      {/* ── Desktop: the scatter ──────────────────────────────────────── */}
      <div className="hidden sm:block">
        <div className="relative px-2 pt-3">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="h-auto w-full"
            role="img"
            aria-label="Scatter plot of 18 chess personas by draw aversion and search window width. The full values are listed in the table below."
          >
            {/* Grid */}
            {[10, 20, 30, 40, 50].map((v) => (
              <g key={`y${v}`}>
                <line
                  x1={PAD.l}
                  y1={sy(v)}
                  x2={VB.w - PAD.r}
                  y2={sy(v)}
                  stroke="var(--line)"
                  strokeWidth="1"
                />
                <text
                  x={PAD.l - 8}
                  y={sy(v) + 3.5}
                  textAnchor="end"
                  fill="var(--text-faint)"
                  className="font-mono"
                  fontSize="9.5"
                >
                  {v}
                </text>
              </g>
            ))}
            {[-20, 0, 20, 40, 60].map((v) => (
              <g key={`x${v}`}>
                <line
                  x1={sx(v)}
                  y1={PAD.t}
                  x2={sx(v)}
                  y2={VB.h - PAD.b}
                  stroke="var(--line)"
                  strokeWidth="1"
                  opacity={v === 0 ? 1 : 0.55}
                  strokeDasharray={v === 0 ? undefined : "2 3"}
                />
                <text
                  x={sx(v)}
                  y={VB.h - PAD.b + 16}
                  textAnchor="middle"
                  fill="var(--text-faint)"
                  className="font-mono"
                  fontSize="9.5"
                >
                  {v}
                </text>
              </g>
            ))}

            {/* Axis titles */}
            <text
              x={(PAD.l + VB.w - PAD.r) / 2}
              y={VB.h - 8}
              textAnchor="middle"
              fill="var(--text-muted)"
              className="font-mono"
              fontSize="10"
            >
              Draw aversion — contempt (cp) →
            </text>
            <text
              x={-(PAD.t + VB.h - PAD.b) / 2}
              y="13"
              textAnchor="middle"
              transform="rotate(-90)"
              fill="var(--text-muted)"
              className="font-mono"
              fontSize="10"
            >
              Search window width (cp) →
            </text>

            {/* "Accepts a draw" marker — the zero line means something. */}
            <text
              x={sx(0) - 6}
              y={PAD.t + 12}
              textAnchor="end"
              fill="var(--text-faint)"
              className="font-mono"
              fontSize="9"
            >
              ← accepts draws
            </text>

            {/* Points */}
            {CHESS_PERSONAS.map((p) => {
              const isHover = hovered === p.id;
              const dim = hovered !== null && !isHover;
              const historical = p.group === "historical";
              return (
                <g
                  key={p.id}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ transition: "opacity .25s", opacity: dim ? 0.25 : 1 }}
                >
                  <circle
                    cx={sx(p.contempt)}
                    cy={sy(p.aspiration)}
                    r={isHover ? 7 : 5}
                    fill={historical ? "var(--accent)" : "var(--bg)"}
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    style={{ transition: "r .2s" }}
                  />
                  {/* A generous invisible hit area. */}
                  <circle
                    cx={sx(p.contempt)}
                    cy={sy(p.aspiration)}
                    r="15"
                    fill="transparent"
                  />
                  <text
                    x={LABELS[p.id].x}
                    y={LABELS[p.id].y}
                    textAnchor={LABELS[p.id].anchor}
                    fill={isHover ? "var(--text-strong)" : "var(--text-muted)"}
                    fontSize={FONT}
                    fontWeight={isHover ? 600 : 400}
                    style={{ transition: "fill .2s" }}
                  >
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-3 pb-2">
            <span className="flex items-center gap-2 font-mono text-[10.5px] text-[var(--text-muted)]">
              <span
                aria-hidden
                className="size-2.5 rounded-full border-[1.5px] border-[var(--accent)] bg-[var(--accent)]"
              />
              Historical commander
            </span>
            <span className="flex items-center gap-2 font-mono text-[10.5px] text-[var(--text-muted)]">
              <span
                aria-hidden
                className="size-2.5 rounded-full border-[1.5px] border-[var(--accent)] bg-[var(--bg)]"
              />
              Turkic-Altaic mythology
            </span>
          </div>
        </div>

        {/* Detail panel — reserved height so hovering never shifts the page. */}
        <div className="min-h-[5.5rem] border-t border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-3.5 sm:px-5">
          {selected ? (
            <PersonaDetail persona={selected} />
          ) : (
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
              Hover a persona to read its parameters
            </p>
          )}
        </div>
      </div>

      {/* ── Mobile: the same data, sortable ───────────────────────────── */}
      <div className="sm:hidden">
        <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-3 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
            Sort
          </span>
          {(
            [
              ["contempt", "Draw aversion"],
              ["aspiration", "Window"],
              ["name", "Name"],
            ] as [SortKey, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSortKey(key)}
              aria-pressed={sortKey === key}
              className={cn(
                "rounded px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors",
                sortKey === key
                  ? "bg-[var(--text-strong)] text-[var(--bg)]"
                  : "text-[var(--text-muted)]",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="divide-y divide-[var(--line)]">
          {sorted.map((p) => (
            <li key={p.id} className="px-3.5 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[14px] font-semibold text-[var(--text-strong)]">
                  {p.name}
                </span>
                <span className="tabular shrink-0 font-mono text-[11px] text-[var(--text-muted)]">
                  {p.contempt > 0 ? "+" : ""}
                  {p.contempt} · {p.aspiration}
                </span>
              </div>
              <p className="mt-1 text-[12.5px] leading-[1.5] text-[var(--text-muted)]">
                {p.note}
              </p>
              {p.mode && (
                <p className="mt-1.5 font-mono text-[10.5px] leading-[1.5] text-[var(--accent)]">
                  {p.mode}
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="border-t border-[var(--line)] px-3.5 py-2.5 font-mono text-[10px] text-[var(--text-faint)]">
          Values shown as draw aversion · window width, in centipawns.
        </p>
      </div>

      {/* Psyche rules apply on top of every persona. */}
      <div className="border-t border-[var(--line)] px-4 py-4 sm:px-5">
        <p className="t-eyebrow mb-3">Mode switches</p>
        <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {PSYCHE_RULES.map((r) => (
            <li key={r.label} className="text-[12.5px] leading-[1.55]">
              <span className="font-medium text-[var(--text-strong)]">{r.label}</span>
              <span className="font-mono text-[11px] text-[var(--accent)]"> · {r.trigger}</span>
              <span className="block text-[var(--text-muted)]">{r.effect}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PersonaDetail({ persona }: { persona: ChessPersona }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[15px] font-semibold text-[var(--text-strong)]">
          {persona.name}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-faint)]">
          PersonaType {persona.enumValue} ·{" "}
          {persona.group === "historical" ? "historical" : "mythological"}
        </span>
      </div>
      <p className="mt-1 max-w-[70ch] text-[13px] leading-[1.55] text-[var(--text-muted)]">
        {persona.note}
      </p>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
        <span className="tabular font-mono text-[11px] text-[var(--text)]">
          contempt{" "}
          <span className="text-[var(--accent)]">
            {persona.contempt > 0 ? "+" : ""}
            {persona.contempt}
          </span>
        </span>
        <span className="tabular font-mono text-[11px] text-[var(--text)]">
          aspiration <span className="text-[var(--accent)]">{persona.aspiration}</span>
        </span>
        {persona.mode && (
          <span className="font-mono text-[11px] text-[var(--text-muted)]">{persona.mode}</span>
        )}
      </div>
    </div>
  );
}
