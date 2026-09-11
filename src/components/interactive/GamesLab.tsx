"use client";

import { useState } from "react";
import { GAME_PROTOTYPES, GAMES_TOTALS } from "@/content/games";
import { cn } from "@/lib/utils";

/**
 * The games lab inventory.
 *
 * These prototypes are not deployed anywhere, so there is nothing honest to
 * link to and no screenshot that would not be staged. What can be shown
 * truthfully is the inventory itself: what was built, how large each one is,
 * and what tradition it comes from. The bar is the line count, which is a
 * real measurement rather than decoration.
 */
export function GamesLab() {
  const [openFile, setOpenFile] = useState<string | null>(GAME_PROTOTYPES[3].file);
  const max = Math.max(...GAME_PROTOTYPES.map((g) => g.lines));

  return (
    <div className="border border-[var(--line)] bg-[var(--bg)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-3 sm:px-5">
        <p className="t-eyebrow">The inventory</p>
        <p className="tabular font-mono text-[11px] text-[var(--text-muted)]">
          {GAMES_TOTALS.files} files · {GAMES_TOTALS.lines} lines ·{" "}
          {GAMES_TOTALS.distinctGames} distinct games
        </p>
      </div>

      <ul className="divide-y divide-[var(--line)]">
        {GAME_PROTOTYPES.map((g) => {
          const open = openFile === g.file;
          return (
            <li key={g.file}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenFile(open ? null : g.file)}
                  aria-expanded={open}
                  aria-controls={`game-${g.file}`}
                  className={cn(
                    "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-3 text-left transition-colors sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] sm:px-5",
                    open ? "bg-[var(--surface)]" : "hover:bg-[var(--bg-subtle)]",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold text-[var(--text-strong)]">
                      {g.title}
                    </span>
                    <span className="block truncate text-[12px] text-[var(--text-muted)]">
                      {g.english} · {g.tradition}
                    </span>
                  </span>

                  {/* Line count as a bar — a measured quantity, drawn to scale. */}
                  <span className="col-span-2 flex items-center gap-2.5 sm:col-span-1">
                    <span
                      aria-hidden
                      className="h-[3px] rounded-full bg-[var(--accent)] opacity-45"
                      style={{ width: `${Math.max((g.lines / max) * 100, 2)}%` }}
                    />
                    <span className="tabular shrink-0 font-mono text-[10px] text-[var(--text-faint)]">
                      {g.lines.toLocaleString()} lines
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className={cn(
                      "shrink-0 font-mono text-[12px]",
                      open ? "text-[var(--accent)]" : "text-[var(--text-faint)]",
                    )}
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>

              <div
                id={`game-${g.file}`}
                hidden={!open}
                className="bg-[var(--surface)] px-4 pb-4 sm:px-5"
              >
                <p className="max-w-[68ch] text-[13px] leading-[1.6] text-[var(--text)]">
                  {g.note}
                </p>
                <p className="mt-2 font-mono text-[10px] text-[var(--text-faint)]">
                  {g.file}
                  {g.threeD && " · Three.js / WebGL"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="border-t border-[var(--line)] px-4 py-3 text-[12px] leading-[1.6] text-[var(--text-muted)] sm:px-5">
        These prototypes are not deployed, so there is nothing to link and no
        screenshot that would not be staged for effect. The inventory is what can be
        shown honestly.
      </p>
    </div>
  );
}
