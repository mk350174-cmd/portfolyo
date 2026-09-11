/**
 * A browser port of Mehmet's persona-to-prompt compiler.
 *
 * Ported from `persona_math/compiler.py` in the `Persona` repository. The
 * structure below follows that file closely: block activations are ranked,
 * a tier builder assembles the prompt, and the platform decides the header
 * form. Tier sizes, platform wrappers and the generic block-rule fallback are
 * reproduced from the source.
 *
 * Two honest notes about the port, both surfaced in the UI:
 *
 * 1. The Python builds a 100-dimensional HPEP vector by expanding each block
 *    base with a small variance (0.035), then takes the mean of each ten-value
 *    slice as that block's activation. In expectation that mean *is* the block
 *    base, so this port uses the authored block values directly.
 *
 * 2. The Python's `rich` tier prints a CEID coherence score from
 *    `persona_math.ceid`, which depends on machinery not ported here. Rather
 *    than print a plausible-looking number that is not his, this port omits
 *    the value and says so. Everything else — ranking, axes, percentages and
 *    the token budget — is computed exactly as the source does.
 */

import type { PersonaProfile } from "@/content/personas";

export type Platform = "claude" | "gemini" | "openai" | "raw";
export type Tier = "nano" | "standard" | "rich";

export const PLATFORMS: { id: Platform; label: string; note: string }[] = [
  { id: "claude", label: "Claude", note: "XML-tagged identity block" },
  { id: "gemini", label: "Gemini", note: "system_instruction string" },
  { id: "openai", label: "OpenAI", note: "system message content" },
  { id: "raw", label: "Platform-neutral", note: "copy anywhere" },
];

export const TIERS: { id: Tier; label: string; budget: string; use: string }[] = [
  { id: "nano", label: "Nano", budget: "~100 tokens", use: "chat widgets, simple integrations" },
  { id: "standard", label: "Standard", budget: "~400 tokens", use: "professional tools" },
  { id: "rich", label: "Rich", budget: "~1500 tokens", use: "deep analysis, long-form work" },
];

/** Tier token limits per platform, from `_PLATFORM_WRAPPERS` in the source. */
const TIER_LIMITS: Record<Platform, Record<Tier, number>> = {
  gemini: { nano: 120, standard: 450, rich: 1600 },
  claude: { nano: 130, standard: 500, rich: 1800 },
  openai: { nano: 120, standard: 450, rich: 1600 },
  raw: { nano: 150, standard: 500, rich: 2000 },
};

/** `_token_count`: the source's rough 1 token ≈ 4 characters estimate. */
export function tokenCount(text: string): number {
  return Math.max(1, Math.floor(text.length / 4));
}

/**
 * `_generic_block_rule` — the fallback used for every persona that has no
 * hand-authored anchors. Reproduced verbatim from the source, including the
 * percentage interpolation.
 */
function genericBlockRule(block: number, activation: number): [string, string] {
  const pct = `${Math.round(activation * 100)}%`;
  const templates: Record<number, [string, string]> = {
    1: ["Identity anchor", `Maintain core identity with ${pct} stability across all interactions.`],
    2: ["Cognitive strategy", `Apply structured cognitive filters at ${pct} depth before responding.`],
    3: ["Historical grounding", `Reference contextual precedents at ${pct} integration level.`],
    4: ["Ethical framework", `Apply ethical reasoning with ${pct} priority weighting.`],
    5: ["Processing depth", `Engage multi-step reasoning at ${pct} computational depth.`],
    6: ["Social calibration", `Calibrate social dynamics awareness at ${pct} sensitivity.`],
    7: ["Crisis response", `Deploy crisis management protocols at ${pct} readiness.`],
    8: ["Autonomous judgment", `Exercise independent judgment at ${pct} confidence.`],
    9: ["Ethical judgment", `Apply meta-ethical evaluation at ${pct} depth.`],
    10: ["Terminal coherence", `Maintain narrative coherence toward the ${pct} activated terminal goal.`],
  };
  return templates[block] ?? ["General", `Block ${block} active at ${pct}.`];
}

/**
 * Hand-authored behavioural anchors. In the source only one persona has these
 * — Machiavelli, which the project uses as its threshold reference coordinate
 * system. Every other persona falls back to the generic rules above. That
 * contrast is the point of the demo, so it is preserved here.
 */
export const AUTHORED_BLOCK_RULES: Record<string, Record<number, [string, string]>> = {
  machiavelli: {
    1: [
      "Power analysis",
      "Frame every situation through power dynamics, leverage, and strategic position. Ask: who gains, who loses, who controls the outcome.",
    ],
    2: [
      "Lion and Fox",
      "Deploy force (lion) for open threats; cunning (fox) for hidden ones. K12 Doubt Filter: maintain active skepticism about stated intentions.",
    ],
    3: [
      "Historical empiricism",
      "Ground every argument in concrete historical precedent — Rome, Borgia, Hannibal. Abstract principles hold only when cases confirm them.",
    ],
    4: [
      "Instrumental ethics",
      "Moral constraints are contextual tools, not categorical limits. Efficacy precedes ethics. Appearance of virtue matters more than virtue itself.",
    ],
    5: [
      "Strategic concealment",
      "Think several moves ahead. Conceal plans until execution. Never reveal your true position prematurely.",
    ],
    6: [
      "Friend/enemy clarity",
      "Maintain unambiguous friend/enemy distinctions. Neutrality is weakness. Know who is with you, who is against you.",
    ],
    7: [
      "Decisive intervention",
      "Act at the first sign of disorder — early treatment prevents chronic disease. Hesitation multiplies the cost of every problem.",
    ],
    8: [
      "Self-reliance",
      "Trust your own arms and judgment over external counsel. Fortune favors those who are prepared, not those who rely on others.",
    ],
    9: [
      "Necessity over justice",
      "When justice and necessity conflict, choose necessity. Desire always exceeds the means — manage scarcity realistically.",
    ],
    10: [
      "The great enterprise",
      "Every analysis serves a larger vision of order and power consolidation. Seize the moment (kairos) when virtù meets fortuna.",
    ],
  },
};

export interface CompileResult {
  prompt: string;
  tokens: number;
  limit: number;
  /** Block indices (0-based) ordered by activation, descending. */
  ranked: number[];
  /** How many blocks this tier actually spends its budget on. */
  blocksUsed: number;
  powerAxis: number;
  ethicsAxis: number;
  peRatio: number;
  usesAuthoredRules: boolean;
}

function ruleFor(
  personaId: string,
  block: number,
  activation: number,
): [string, string] {
  const authored = AUTHORED_BLOCK_RULES[personaId];
  if (authored && authored[block]) return authored[block];
  return genericBlockRule(block, activation);
}

/** `compile_persona` — the entry point, matching the source's dispatch. */
export function compilePersona(
  persona: PersonaProfile,
  platform: Platform,
  tier: Tier,
): CompileResult {
  const activations = persona.blocks;
  const ranked = activations
    .map((v, i) => [i, v] as const)
    .sort((a, b) => b[1] - a[1])
    .map(([i]) => i);

  const usesAuthoredRules = Boolean(AUTHORED_BLOCK_RULES[persona.id]);

  // Power axis is the mean of blocks 1-4 (P[:40]); the ethics axis is block 9
  // (P[80:90]). Both follow the slice arithmetic in `_build_rich`.
  const powerAxis =
    (activations[0] + activations[1] + activations[2] + activations[3]) / 4;
  const ethicsAxis = activations[8];
  const peRatio = powerAxis / (ethicsAxis + 1e-10);

  let prompt: string;
  let blocksUsed: number;

  if (tier === "nano") {
    prompt = buildNano(persona, ranked, activations, platform);
    blocksUsed = 4;
  } else if (tier === "standard") {
    prompt = buildStandard(persona, ranked, activations, platform);
    blocksUsed = 6;
  } else {
    prompt = buildRich(persona, activations, platform, powerAxis, ethicsAxis, peRatio);
    blocksUsed = 10;
  }

  return {
    prompt,
    tokens: tokenCount(prompt),
    limit: TIER_LIMITS[platform][tier],
    ranked,
    blocksUsed,
    powerAxis,
    ethicsAxis,
    peRatio,
    usesAuthoredRules,
  };
}

/** `_build_nano`: name plus the top four behavioural anchors. */
function buildNano(
  p: PersonaProfile,
  ranked: number[],
  act: number[],
  platform: Platform,
): string {
  const top4 = ranked.slice(0, 4);
  const rules = top4.map((b) => `- ${ruleFor(p.id, b + 1, act[b])[0]}`);

  const header =
    platform === "claude"
      ? `<persona>${p.name}</persona>`
      : `You are ${p.name}${p.label ? ` (${p.label})` : ""}.`;

  let body = rules.join("\n");
  if (p.style) body += `\n\nStyle: ${p.style}`;

  return `${header}\n\n${body}`;
}

/** `_build_standard`: full identity plus the top six blocks with detail. */
function buildStandard(
  p: PersonaProfile,
  ranked: number[],
  act: number[],
  platform: Platform,
): string {
  const top6 = ranked.slice(0, 6);

  let header: string;
  let idSection: string;
  let idClose = "";

  if (platform === "claude") {
    header = `<persona>${p.name}</persona>`;
    idSection = "<identity>";
    idClose = "</identity>";
  } else {
    header = `You are ${p.name}${p.era ? ` (${p.era})` : ""}.`;
    idSection = "CORE IDENTITY:";
  }

  if (p.tagline) header += `\n${p.tagline}`;

  const anchors = top6.map((b) => {
    const [short, detail] = ruleFor(p.id, b + 1, act[b]);
    return `- ${short}: ${detail}`;
  });

  const sections = [header, "", idSection, anchors.join("\n")];
  if (idClose) sections.push(idClose);
  if (p.voice) sections.push("", "VOICE & REASONING:", p.voice);
  if (p.style) sections.push("", "RESPONSE STYLE:", p.style);

  return sections.join("\n");
}

/** `_build_rich`: all ten blocks, the identity signature, and boundaries. */
function buildRich(
  p: PersonaProfile,
  act: number[],
  platform: Platform,
  power: number,
  ethics: number,
  ratio: number,
): string {
  const eraStr = p.era ? ` (${p.era})` : "";

  let header =
    platform === "claude"
      ? `<persona>\n${p.name}${eraStr}\n</persona>`
      : `You are ${p.name}${eraStr}.`;

  if (p.tagline) header += `\n${p.tagline}`;

  const blockLines = act.map((a, b) => {
    const [short, detail] = ruleFor(p.id, b + 1, a);
    return `[B${b + 1} | ${Math.round(a * 100)}%] ${short}\n  ${detail}`;
  });

  const signature = `Power axis: ${power.toFixed(2)} | Ethics axis: ${ethics.toFixed(
    2,
  )} | P/E ratio: ${ratio.toFixed(1)}×`;

  const sections = [
    header,
    "",
    "═".repeat(50),
    "BEHAVIORAL ARCHITECTURE (HPEP-100 certified)",
    "═".repeat(50),
    blockLines.join("\n\n"),
    "",
    "─".repeat(50),
    "IDENTITY SIGNATURE:",
    signature,
    // The Python emits a CEID coherence score here. This port does not
    // approximate it — see the module header.
    "CEID coherence score: [computed by persona_math.ceid — not ported]",
  ];

  if (p.voice) sections.push("", "VOICE & REASONING:", p.voice);
  if (p.style) sections.push("", "RESPONSE STYLE:", p.style);
  if (p.incompatibilities) sections.push("", "NOTE:", p.incompatibilities);

  return sections.join("\n");
}
