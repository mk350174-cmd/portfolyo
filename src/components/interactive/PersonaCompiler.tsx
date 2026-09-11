"use client";

import { useMemo, useState } from "react";
import {
  PERSONAS,
  BLOCK_SEMANTICS,
  PERSONA_LIBRARY_TOTAL,
  type PersonaProfile,
} from "@/content/personas";
import {
  compilePersona,
  PLATFORMS,
  TIERS,
  type Platform,
  type Tier,
} from "@/lib/persona-compiler";
import { cn } from "@/lib/utils";

/**
 * The Persona Compiler.
 *
 * A browser port of `persona_math/compiler.py`, running over profiles taken
 * from the real library. The visitor picks a persona, a tier and a target
 * platform, and watches an actual system prompt assemble — which is a far
 * better explanation of "persona before the task" than a paragraph about it.
 */
export function PersonaCompiler() {
  const [personaId, setPersonaId] = useState("machiavelli");
  const [tier, setTier] = useState<Tier>("standard");
  const [platform, setPlatform] = useState<Platform>("claude");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const persona = useMemo(
    () => PERSONAS.find((p) => p.id === personaId) ?? PERSONAS[0],
    [personaId],
  );

  const result = useMemo(
    () => compilePersona(persona, platform, tier),
    [persona, platform, tier],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PERSONAS;
    return PERSONAS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.label.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(result.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable; the text is selectable regardless.
    }
  }

  return (
    <div className="border border-[var(--line)] bg-[var(--bg)]">
      {/* Controls */}
      <div className="border-b border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
          <ControlGroup label="Tier">
            <SegmentedControl
              options={TIERS.map((t) => ({ id: t.id, label: t.label, title: `${t.budget} — ${t.use}` }))}
              value={tier}
              onChange={(v) => setTier(v as Tier)}
              name="compiler-tier"
            />
          </ControlGroup>

          <ControlGroup label="Target platform">
            <SegmentedControl
              options={PLATFORMS.map((p) => ({ id: p.id, label: p.label, title: p.note }))}
              value={platform}
              onChange={(v) => setPlatform(v as Platform)}
              name="compiler-platform"
            />
          </ControlGroup>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
        {/* Persona picker */}
        <div className="border-b border-[var(--line)] lg:border-b-0 lg:border-r">
          <div className="border-b border-[var(--line)] p-3">
            <label htmlFor="persona-search" className="sr-only">
              Search personas
            </label>
            <input
              id="persona-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${PERSONAS.length} of ${PERSONA_LIBRARY_TOTAL} profiles…`}
              className="w-full rounded-md border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[13px] text-[var(--text)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] focus:outline-none"
            />
          </div>

          <div
            role="listbox"
            aria-label="Persona profiles"
            className="scroll-slim max-h-[18rem] overflow-y-auto lg:max-h-[30rem]"
          >
            {filtered.map((p) => {
              const selected = p.id === persona.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setPersonaId(p.id)}
                  className={cn(
                    "flex w-full items-start gap-2.5 border-b border-[var(--line)] px-3.5 py-2.5 text-left transition-colors",
                    selected
                      ? "bg-[var(--accent-soft)]"
                      : "hover:bg-[var(--bg-subtle)]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-[6px] h-3 w-[3px] shrink-0 rounded-sm transition-colors",
                      selected ? "bg-[var(--accent)]" : "bg-[var(--line-strong)]",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-medium text-[var(--text-strong)]">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[11.5px] text-[var(--text-muted)]">
                      {p.label}
                    </span>
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="px-3.5 py-6 text-center text-[13px] text-[var(--text-faint)]">
                No profile matches that.
              </p>
            )}
          </div>
        </div>

        {/* Profile + output */}
        <div className="min-w-0">
          <PersonaBlocks persona={persona} ranked={result.ranked} used={result.blocksUsed} />

          <div className="border-t border-[var(--line)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-2.5 sm:px-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="t-eyebrow">Compiled system prompt</span>
                <span className="tabular font-mono text-[11px] text-[var(--text-muted)]">
                  ~{result.tokens} tokens
                  <span className="text-[var(--text-faint)]"> / {result.limit} budget</span>
                </span>
              </div>
              <button
                type="button"
                onClick={copy}
                className="rounded-md border border-[var(--line-strong)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-strong)] transition-colors hover:bg-[var(--surface)]"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Prompt text wraps rather than scrolling sideways — it is prose
                the visitor is meant to read, not code to be diffed. */}
            <pre className="scroll-slim max-h-[26rem] overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words px-4 py-4 font-mono text-[11.5px] leading-[1.65] text-[var(--text)] sm:px-5">
              <code>{result.prompt}</code>
            </pre>
          </div>

          {/* Two honest notes about the port, kept visible rather than buried. */}
          <div className="border-t border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-3.5 sm:px-5">
            <p className="text-[12px] leading-[1.6] text-[var(--text-muted)]">
              {result.usesAuthoredRules ? (
                <>
                  <span className="font-medium text-[var(--text)]">
                    This profile has hand-authored anchors.
                  </span>{" "}
                  Machiavelli is the library&rsquo;s reference persona and the only one
                  with written behavioural rules. Pick any other profile to see the
                  generated fallback the remaining 494 use — the gap between them is
                  the honest measure of how finished this is.
                </>
              ) : (
                <>
                  <span className="font-medium text-[var(--text)]">
                    Generated anchors.
                  </span>{" "}
                  This profile uses the compiler&rsquo;s generic block rules, as 494 of
                  the 495 do. Switch to Machiavelli, the reference persona, to see
                  hand-authored anchors instead.
                </>
              )}
            </p>
            <p className="mt-2 text-[12px] leading-[1.6] text-[var(--text-faint)]">
              Ported from <code className="font-mono">persona_math/compiler.py</code>. Block
              ranking, the axes and the token budget are computed exactly as the Python
              does; the CEID coherence score is not approximated here, because a number
              that looks precise but is not his would defeat the point.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The ten behavioural blocks, ordered as the compiler ranks them. */
function PersonaBlocks({
  persona,
  ranked,
  used,
}: {
  persona: PersonaProfile;
  ranked: number[];
  used: number;
}) {
  const rankOf = new Map(ranked.map((b, i) => [b, i]));

  return (
    <div className="px-4 py-4 sm:px-5">
      <div className="mb-4">
        <h3 className="t-h3">{persona.name}</h3>
        <p className="mt-1 text-[13px] text-[var(--text-muted)]">
          {persona.label}
          {persona.era && <span className="text-[var(--text-faint)]"> · {persona.era}</span>}
        </p>
        {persona.tagline && (
          <p className="t-serif mt-2.5 max-w-[54ch] text-[14.5px] italic leading-[1.5] text-[var(--text)]">
            {persona.tagline}
          </p>
        )}
      </div>

      <p className="t-eyebrow mb-2.5">
        Behavioural blocks · strongest {used} used at this tier
      </p>

      <ul className="space-y-[3px]">
        {BLOCK_SEMANTICS.map((block, i) => {
          const value = persona.blocks[i];
          const rank = rankOf.get(i) ?? 99;
          const inUse = rank < used;
          return (
            <li
              key={block.n}
              className="grid grid-cols-[1.5rem_minmax(0,1fr)_2.5rem] items-center gap-2.5"
              title={`${block.name} — ${block.gloss}`}
            >
              <span
                className={cn(
                  "tabular font-mono text-[10px]",
                  inUse ? "text-[var(--accent)]" : "text-[var(--text-faint)]",
                )}
              >
                B{block.n}
              </span>

              <span className="relative block h-[18px] min-w-0">
                {/* The bar is the data; the label rides on top of it. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-[2px] transition-all duration-500",
                    inUse ? "bg-[var(--accent)]" : "bg-[var(--line)]",
                  )}
                  style={{
                    width: `${Math.max(value * 100, 3)}%`,
                    opacity: inUse ? 0.16 : 0.5,
                  }}
                />
                <span
                  className={cn(
                    "relative block truncate pl-2 text-[11.5px] leading-[18px]",
                    inUse ? "text-[var(--text)]" : "text-[var(--text-faint)]",
                  )}
                >
                  {block.name}
                </span>
              </span>

              <span
                className={cn(
                  "tabular text-right font-mono text-[11px]",
                  inUse ? "text-[var(--text-strong)]" : "text-[var(--text-faint)]",
                )}
              >
                {value.toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ControlGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="t-eyebrow mb-2">{label}</p>
      {children}
    </div>
  );
}

/**
 * A radio group styled as a segmented control — arrow keys move between
 * options, as a native radio group does.
 */
function SegmentedControl({
  options,
  value,
  onChange,
  name,
}: {
  options: { id: string; label: string; title?: string }[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div className="inline-flex rounded-md border border-[var(--line)] bg-[var(--bg)] p-0.5">
      {options.map((o) => {
        const active = o.id === value;
        return (
          <label
            key={o.id}
            title={o.title}
            className={cn(
              "cursor-pointer rounded-[4px] px-2.5 py-1.5 font-mono text-[11px] transition-colors",
              active
                ? "bg-[var(--text-strong)] text-[var(--bg)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-strong)]",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={active}
              onChange={() => onChange(o.id)}
              className="sr-only"
            />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}
