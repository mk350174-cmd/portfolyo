# Higgsfield Asset Plan

Written before any generation, per the asset-pass brief §2. The portfolio's narrative, palette,
Evidence Filter, information architecture, typography and project hierarchy are frozen. Generated
media is an enhancement layer only.

## Connection

| | |
|---|---|
| Official Higgsfield MCP integration | connected, 91 tools |
| `@higgsfield/cli` | not installed — not needed; the MCP server is the official path in this environment |
| Authenticated | yes |
| Plan / credits | Plus · 1000 credits |
| Workspace | one private workspace (owner) |
| Preflight cost | 1.25 credits per 2-variant 1k image (Recraft V4.1) |

Credits are not the binding constraint. The binding constraint is the §16 quality bar.

## Baseline audit — media density per route

Measured, not estimated. The site currently contains **exactly one image** (the CV portrait) across
all eight routes.

| Route | Height | `img` | `video` | Custom SVG | Words |
|---|---:|---:|---:|---|---:|
| `/` | 9387 | 1 | 0 | 1 (ecosystem diagram) | 2363 |
| `/about` | 3132 | 1 | 0 | 0 | 793 |
| `/work/persona-engineering` | 5999 | 0 | 0 | 0 | 1741 |
| `/work/tamerlane-chess` | 6212 | 0 | 0 | 2 (style map, board) | 1278 |
| `/work/historical-games-lab` | 4523 | 0 | 0 | **0** | 855 |
| `/work/a-branch` | 4533 | 0 | 0 | 0 | 925 |
| `/work/b-branch` | 5649 | 0 | 0 | 0 | 1218 |
| `/work/gemvault` | 4103 | 0 | 0 | 0 | 676 |

The pages carrying real interactive evidence (Tamerlane's style map and board explorer, the pipeline
and control-plane diagrams, the Persona Compiler) do not need imagery and must not be given any —
rasterising real information into decorative art would be a straight downgrade.

Two pages have a genuine **comprehension** gap, not an atmosphere gap:

1. **Historical Strategy Games Lab.** It names eight games — Hiashatar, Togyzool, Şatra, Satrancı
   Rumi, Kurt ve Koyun, Buga Shadra, Kalebendi — and shows nothing. A reader who has never
   encountered togyzkumalak or Mongolian great chess cannot picture any of them. 855 words, zero
   visuals, and the subject is *physical objects*.
2. **Tamerlane Chess.** Thirteen piece types including a Giraffe, a Camel, a War Machine and a
   Vanguard. The board explorer correctly teaches their *movement geometry*; nothing conveys their
   *form*. These pieces do not exist in modern chess, so there is nothing for a reader to recall.

Both are exactly the §4 "historically informed board/game presentation assets" case.

---

## Proposed assets

### A01 — Tamerlane piece study `P0`

| | |
|---|---|
| Page | `/work/tamerlane-chess` |
| Purpose | Make thirteen unfamiliar piece types imaginable as objects |
| Media type | Still image |
| Placement | Above the Board Explorer, introducing it |
| Aspect ratio | 3:2 |
| Motion | None |
| Would CSS/SVG be better? | **No.** SVG already carries the movement rules; form and material are photographic problems |
| Model / workflow | Recraft V4.1, `model_type: utility`, palette locked to the CV hexes |
| Concept | A museum catalogue plate: several carved wooden pieces of clearly different silhouettes arranged in a row on a pale, near-white ground, soft even light, no glow, no drama |

**Honesty constraint.** This is an *interpretive* study, not a photograph of surviving artefacts. It
will be captioned and alt-texted as such. No claim that these are historical objects.

### A02 — Steppe board games object study `P0`

| | |
|---|---|
| Page | `/work/historical-games-lab` |
| Purpose | Give the lab a visual identity and make the games legible as objects of study |
| Media type | Still image |
| Placement | Above the prototype inventory |
| Aspect ratio | 3:2 |
| Motion | None |
| Would CSS/SVG be better? | **No.** Nothing in the page's data describes physical form |
| Model / workflow | Recraft V4.1, `utility`, palette locked |
| Concept | Top-down archival composition: a carved two-row pitted board with small stones beside a gridded wooden board, pale ground, catalogue lighting |

**Honesty constraint.** Same as A01 — an interpretive study, labelled.

### A03 — Persona Engineering atmosphere `P1 — provisional`

Only if A01/A02 clear the quality bar and this adds something. The live Persona Compiler is the
evidence; any image here is atmosphere. High risk of looking decorative, and §5 forbids inventing
scientific-looking measurement imagery. **Default: do not generate.**

### A04 — Tamerlane motion loop `P2 — not planned`

A short looping board clip. Deferred: the page already has two real visualisations, and video would
cost Core Web Vitals on a page currently at 1.15s LCP. Only revisit if stills prove insufficient.

---

## Deliberate "no asset" decisions

| Page | Decision | Reason |
|---|---|---|
| `/work/b-branch` | **None** | §9. The value is architecture and evidence discipline. Any atmospheric image weakens credibility on the one page arguing that unverified things must not look verified |
| `/work/a-branch` | **None** | §8. The interactive pipeline with its frozen-handoff object already communicates the sequence better than motion graphics would |
| `/work/gemvault` | **None from Higgsfield** | §10. A real capture is required and a generated interface is forbidden. The live SPA cannot be rendered from this environment (the proxy relay resets the browser tunnel to that host), so **Mehmet should supply a real screenshot**. Fabricating one is out of the question |
| `/work/persona-engineering` | **None (P1 held)** | The compiler is stronger evidence than any image |
| `/` | **None** | §11. LCP was brought from 4.1s to 1.15s; a hero video would undo that for decoration |
| `/about` | **None** | The CV portrait is already the correct and only image |

## Palette lock

Every generation passes the CV hexes explicitly rather than describing them in prose:

`#FFFFFF` `#EEF5F5` `#DCE3E7` `#29343D` `#172F44` `#257C80`

Background forced to near-white. Teal must remain incidental — if it reads as a teal-tinted image,
the output is rejected.

## Rejection criteria

Reject on sight if the output shows: neon or glow, purple, cyberpunk, holograms, robots, floating
dashboards, particles, generic abstract 3D, a dark cinematic ground, fantasy game art, visible text
or numerals, or anything that reads as "AI art" rather than a catalogue photograph.

## Success test

§16: *does this make the project easier to understand or remember?* If an image only makes the page
prettier, it does not ship.

---

## Outcome (11 September 2026)

### Generated and kept

| | A01 | A02 |
|---|---|---|
| Page | `/work/tamerlane-chess` | `/work/historical-games-lab` |
| Model | Recraft V4.1 `utility`, 2k, 3:2 | Recraft V4.1 `utility`, 2k, 3:2 |
| Variants generated | 2 | 2 |
| Selected | v1 | v1 |
| Source | 1920×1248 PNG, 2.7 MB | 1920×1248 PNG, 2.9 MB |
| Shipped | `tamerlane-pieces-{800,1440}.webp`, 12.7 / 35.3 KB | `steppe-games-{800,1440}.webp`, 13.1 / 32.2 KB |

Both are lazy-loaded below the fold, carry informative alt text, and are captioned
**"Interpretive study"** — a generated study of form, not a photograph of surviving artefacts.

### Rejected

- **A01 v2** — warmer, browner wood that fought the CV's cool palette; silhouettes less
  differentiated and the left-hand piece read as an unfinished blank rather than a playing piece.
- **A02 v2** — bleached almost to white with harder shadows, and a sparser grid on the second board,
  so it carried less information than v1 despite being marginally cleaner.

### Not generated, by decision

- **A03 Persona atmosphere** — held at P1 in the plan and not generated. The live compiler is the
  evidence; an atmospheric image beside it would be decoration, and §5 forbids inventing
  scientific-looking imagery.
- **A04 Tamerlane motion loop** — P2, not generated. The page already carries two real
  visualisations and the LCP budget is better spent elsewhere.
- **B-Branch, A-Branch, home, about** — no asset, per the plan.
- **GemVault** — a real capture is required and cannot be taken from this environment (the proxy
  relay resets the browser tunnel to that host). Mehmet should supply a screenshot. A generated
  interface was never an option.

Total spend: four images, well under 10 credits.

### Performance

Measured on the same throttled profile (1.6 Mbps / 150 ms) before and after.

| Route | LCP before | LCP after | Transferred before → after |
|---|---|---|---|
| `/` | 1160 ms | 1164 ms | 493 → 493 KB |
| `/work/tamerlane-chess` | 1152 ms | 1136 ms | 513 → 513 KB |
| `/work/historical-games-lab` | — | 1152 ms | — → 500 KB |
| `/about` | 1144 ms | 1140 ms | 458 → 458 KB |

No measurable cost: the plates sit below the fold and load on scroll, so they never enter the
initial payload or compete for LCP. Differences are run-to-run noise.
