"use client";

import { useMemo, useState } from "react";
import { CHESS_PIECES, type ChessPiece } from "@/content/chess";
import { cn } from "@/lib/utils";

/**
 * The board and piece explorer.
 *
 * Tamerlane chess is unfamiliar enough that describing it in prose does not
 * work — "a one-step diagonal followed by at least three straight" means
 * nothing until you see it. So the movement rules from
 * `TIMURLENK_CHESS_SPEC.md` are implemented here and drawn on the real
 * 11 × 10 board, including the two citadel squares that sit outside it.
 */

const FILES = 11;
const RANKS = 10;

/** The piece is placed centrally so every movement pattern has room. */
const ORIGIN = { f: 5, r: 4 };

interface Sq {
  f: number;
  r: number;
  /** Reachable in one move, versus a square the ray passes through. */
  kind: "target" | "path";
}

const onBoard = (f: number, r: number) => f >= 0 && f < FILES && r >= 0 && r < RANKS;

/**
 * Movement generation, following the spec's `gen_*` functions. Squares are
 * generated on an empty board, so sliders run to the edge.
 */
function movesFor(id: string, f: number, r: number): Sq[] {
  const out: Sq[] = [];
  const push = (nf: number, nr: number, kind: Sq["kind"] = "target") => {
    if (onBoard(nf, nr)) out.push({ f: nf, r: nr, kind });
  };

  const slide = (df: number, dr: number, from = 1, max = 99) => {
    for (let i = 1; i <= max; i++) {
      const nf = f + df * i;
      const nr = r + dr * i;
      if (!onBoard(nf, nr)) break;
      push(nf, nr, i < from ? "path" : "target");
    }
  };

  const ortho: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const diag: [number, number][] = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  switch (id) {
    case "sah":
    case "prens":
    case "beklenmedik_sah":
      [...ortho, ...diag].forEach(([df, dr]) => push(f + df, r + dr));
      break;

    case "kale":
      ortho.forEach(([df, dr]) => slide(df, dr));
      break;

    case "talia":
      // A diagonal slider with a minimum of two squares: the first square
      // must be empty and cannot be landed on.
      diag.forEach(([df, dr]) => slide(df, dr, 2));
      break;

    case "zurafa":
      // One diagonal step, then at least three squares straight out.
      diag.forEach(([df, dr]) => {
        const bf = f + df;
        const br = r + dr;
        if (!onBoard(bf, br)) return;
        out.push({ f: bf, r: br, kind: "path" });
        ortho.forEach(([sf, sr]) => {
          // Continuing back along the diagonal is not a straight leg.
          if (sf === -df && sr === 0) return;
          if (sr === -dr && sf === 0) return;
          for (let i = 3; i < 12; i++) {
            const nf = bf + sf * i;
            const nr = br + sr * i;
            if (!onBoard(nf, nr)) break;
            out.push({ f: nf, r: nr, kind: "target" });
          }
        });
      });
      break;

    case "at":
      [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2],
      ].forEach(([df, dr]) => push(f + df, r + dr));
      break;

    case "deve":
      [
        [3, 1],
        [3, -1],
        [-3, 1],
        [-3, -1],
        [1, 3],
        [1, -3],
        [-1, 3],
        [-1, -3],
      ].forEach(([df, dr]) => push(f + df, r + dr));
      break;

    case "fil":
      diag.forEach(([df, dr]) => push(f + df * 2, r + dr * 2));
      break;

    case "savas":
      ortho.forEach(([df, dr]) => push(f + df * 2, r + dr * 2));
      break;

    case "ferz":
      diag.forEach(([df, dr]) => push(f + df, r + dr));
      break;

    case "vali":
      ortho.forEach(([df, dr]) => push(f + df, r + dr));
      break;

    case "piyon":
      push(f, r + 1);
      push(f - 1, r + 1, "path");
      push(f + 1, r + 1, "path");
      break;
  }

  // A ray may reach the same square twice; prefer the stronger marking.
  const best = new Map<string, Sq>();
  for (const s of out) {
    const k = `${s.f},${s.r}`;
    const prev = best.get(k);
    if (!prev || (prev.kind === "path" && s.kind === "target")) best.set(k, s);
  }
  return [...best.values()];
}

const CELL = 34;
const GAP = 26; // room for the citadels sitting outside the board

export function BoardExplorer() {
  const [pieceId, setPieceId] = useState("zurafa");

  const piece = useMemo(
    () => CHESS_PIECES.find((p) => p.id === pieceId) ?? CHESS_PIECES[0],
    [pieceId],
  );

  const moves = useMemo(() => movesFor(piece.id, ORIGIN.f, ORIGIN.r), [piece.id]);
  const lookup = useMemo(() => {
    const m = new Map<string, Sq["kind"]>();
    moves.forEach((s) => m.set(`${s.f},${s.r}`, s.kind));
    return m;
  }, [moves]);

  const boardW = FILES * CELL;
  const boardH = RANKS * CELL;
  const vbW = boardW + GAP * 2;

  return (
    <div className="border border-[var(--line)] bg-[var(--bg)]">
      <div className="border-b border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-3 sm:px-5">
        <p className="t-eyebrow">The board · 11 × 10 plus two citadels</p>
        <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--text-muted)]">
          112 squares and 13 piece types. Select a piece to see where it can go from
          the marked square — the movement rules are implemented from the spec, not
          illustrated.
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
        <div className="min-w-0 border-b border-[var(--line)] p-3 sm:p-4 lg:border-b-0 lg:border-r">
          <svg
            viewBox={`0 0 ${vbW} ${boardH}`}
            className="h-auto w-full"
            role="img"
            aria-label={`Board diagram showing the moves available to the ${piece.english} from a central square.`}
          >
            {/* Citadels sit outside the 11 × 10 grid. */}
            <rect
              x={GAP - 22}
              y={(RANKS - 9) * CELL}
              width="18"
              height={CELL}
              fill="var(--surface-strong)"
              stroke="var(--accent)"
              strokeWidth="1"
              rx="2"
            />
            <rect
              x={GAP + boardW + 4}
              y={(RANKS - 2) * CELL}
              width="18"
              height={CELL}
              fill="var(--surface-strong)"
              stroke="var(--accent)"
              strokeWidth="1"
              rx="2"
            />

            {Array.from({ length: RANKS }).map((_, ri) =>
              Array.from({ length: FILES }).map((__, fi) => {
                // Rank 0 is drawn at the bottom.
                const drawR = RANKS - 1 - ri;
                const x = GAP + fi * CELL;
                const y = drawR * CELL;
                const dark = (fi + ri) % 2 === 1;
                const key = `${fi},${ri}`;
                const mark = lookup.get(key);
                const isOrigin = fi === ORIGIN.f && ri === ORIGIN.r;

                return (
                  <g key={key}>
                    <rect
                      x={x}
                      y={y}
                      width={CELL}
                      height={CELL}
                      fill={dark ? "var(--surface)" : "var(--bg)"}
                      stroke="var(--line)"
                      strokeWidth="0.5"
                    />
                    {mark === "path" && (
                      <circle
                        cx={x + CELL / 2}
                        cy={y + CELL / 2}
                        r="3"
                        fill="var(--accent)"
                        opacity="0.28"
                      />
                    )}
                    {mark === "target" && (
                      <circle
                        cx={x + CELL / 2}
                        cy={y + CELL / 2}
                        r="7"
                        fill="var(--accent)"
                        opacity="0.5"
                      />
                    )}
                    {isOrigin && (
                      <>
                        <rect
                          x={x + 1.5}
                          y={y + 1.5}
                          width={CELL - 3}
                          height={CELL - 3}
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="2"
                          rx="2"
                        />
                        <text
                          x={x + CELL / 2}
                          y={y + CELL / 2 + 7}
                          textAnchor="middle"
                          fontSize="19"
                          fill="var(--text-strong)"
                        >
                          {piece.glyph}
                        </text>
                      </>
                    )}
                  </g>
                );
              }),
            )}

            <text
              x={GAP - 13}
              y={(RANKS - 9) * CELL - 5}
              textAnchor="middle"
              fill="var(--text-faint)"
              className="font-mono"
              fontSize="7.5"
            >
              citadel
            </text>
            <text
              x={GAP + boardW + 13}
              y={(RANKS - 2) * CELL - 5}
              textAnchor="middle"
              fill="var(--text-faint)"
              className="font-mono"
              fontSize="7.5"
            >
              citadel
            </text>
          </svg>

          <p className="mt-2 px-1 font-mono text-[10.5px] leading-[1.5] text-[var(--text-faint)]">
            Large marks are squares the piece can reach; faint marks are squares a ray
            passes through or a pawn captures onto. Generated on an empty board.
          </p>
        </div>

        {/* Piece list */}
        <div>
          <div
            role="listbox"
            aria-label="Piece types"
            className="scroll-slim max-h-[22rem] overflow-y-auto lg:max-h-[26rem]"
          >
            {CHESS_PIECES.map((p) => {
              const selected = p.id === piece.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setPieceId(p.id)}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-[var(--line)] px-3.5 py-2.5 text-left transition-colors",
                    selected ? "bg-[var(--accent-soft)]" : "hover:bg-[var(--bg-subtle)]",
                  )}
                >
                  <span
                    aria-hidden
                    className="w-5 shrink-0 text-center text-[15px] text-[var(--text-strong)]"
                  >
                    {p.glyph}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-[var(--text-strong)]">
                      {p.name}
                    </span>
                    <span className="block truncate text-[11.5px] text-[var(--text-muted)]">
                      {p.english}
                    </span>
                  </span>
                  <span className="tabular shrink-0 font-mono text-[10.5px] text-[var(--text-faint)]">
                    {p.value >= 5000 ? "royal" : p.value}
                  </span>
                </button>
              );
            })}
          </div>

          <PieceDetail piece={piece} />
        </div>
      </div>
    </div>
  );
}

function PieceDetail({ piece }: { piece: ChessPiece }) {
  return (
    <div className="bg-[var(--bg-subtle)] px-3.5 py-3.5">
      <p className="text-[13.5px] font-semibold text-[var(--text-strong)]">
        {piece.name}{" "}
        <span className="font-normal text-[var(--text-muted)]">· {piece.english}</span>
      </p>
      <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--text)]">
        {piece.movement}
      </p>
      {piece.special && (
        <p className="mt-2 border-l-2 border-[var(--accent)] pl-2.5 text-[12px] leading-[1.55] text-[var(--text-muted)]">
          {piece.special}
        </p>
      )}
    </div>
  );
}
