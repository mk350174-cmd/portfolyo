# Research & Design Document
**Interactive portfolio — Mehmet Koyuncu**
Prepared before implementation. Sources: supplied CV + five project archives + live verification (2026-09-11).

---

## 1. What I learned about Mehmet

A first-year History undergraduate at Eskişehir Osmangazi University (expected 2030) who builds
unusually rigorous software with AI assistance. The naive read — "history student who likes AI" —
is wrong. The archives show someone whose actual discipline is **epistemic hygiene in software**:
he builds systems, then builds the apparatus that stops those systems from overstating themselves.

Evidence, from his own repositories, not from the CV:

- `Persona/`: every embedded number is tier-stamped `Simülasyon` / `Hesaplanan` / `Tahmini` and
  **never** `Ölçülmüş` (measured). There is a `make check-provenance` integrity audit whose entire
  job is to prevent a simulated value from being labelled as measured. Status line: "Measured: 0."
- `Persona/persona_math/ceid.py`: a source comment flags its own module as a
  "reverse-inconsistency… experimental, implemented-but-unpublished code. Treat every patch below
  as Simülasyon/Tahmini tier and unreviewed until a paper documents it properly."
- `timurlenkmotoru/STATUS.md`: declares itself "the authoritative status record", says older docs
  "contain unverified/false claims", and carries a section literally titled *"Corrected false
  claims"*. It separates `Kanıtlı` (proven) from `Kanıtlanmamış` (unproven) and records a **failed**
  experiment with the note "read this note before retrying".
- `B_BRANCH/README.md`: "No blanket production-ready claim… the unchanged legacy suite still has 10
  failing expectations; full Vitest is therefore red." And the line that best captures him:
  **"External data never becomes VERIFIED merely because retrieval works."**

That is the person. Not "AI enthusiast". Someone who treats *labelling what you actually know* as
an engineering problem.

## 2. What I learned from the CV

The CV is already excellent and unusually disciplined — it labels sections "Proposed architecture",
"a design proposal, not a completed deployment", "these are goals, not a launched platform". Its
claim boundaries are accurate against the archives (I checked; see §4).

It is also 10 pages of dense prose, linear, and static. Its weakness is not honesty — it is that
**the connections between the six projects are asserted, not shown**, and the reader must hold ten
pages in their head to see the system. That is precisely what a website can fix.

So the site's job is not to re-state the CV. It is to make the CV's structure *navigable and
demonstrable*.

## 3. Project inventory (verified against archives)

| Project | Status | Verified evidence |
|---|---|---|
| **Persona Engineering** | Built + ongoing research | 495 unique persona IDs (I counted them: 534 raw entries across 6 category files, 39 duplicated → 495 unique — matches the CV exactly). 10-block behavioural schema, HPEP-100 vectors, working persona→prompt compiler with 3 tiers × 4 platforms, CEID metrics, Claude Code plugin + MCP server, 60-paper research series with a simulation harness |
| **PersonaNeedle** | Research direction — **not trained** | ~26M-param architecture, training/finetune/quantization/bundling code present. Repo states plainly: "PersonaNeedle is **not trained** in this repo (no torch/GPU)" |
| **Tamerlane Chess AI Engine** | Built, playing | C++20 (`CMAKE_CXX_STANDARD 20`), v0.9.0-cognitive, ~12,275 LOC in `src/`+`include/`, 11 test binaries. 11×10 board + 2 citadels = 112 squares, 13 piece types. Alpha-beta, iterative deepening, LMR, singular extensions, null-move, ProbCut, qsearch, TT. 18 personas with real parameter effects |
| **Historical Strategy Games Lab** | Prototypes | 14 self-contained HTML files, ~92k lines total, Three.js/WebGL throughout. Hiashatar, Togyzool, Şatra, Satrancı Rumi, Kurt ve Koyun, Buga Shadra, Kalebendi, Bozkır, plus browser Timurlenk v27→v35 |
| **A-Branch / Video Pipeline** | Built | 3 TypeScript pipelines. P1 research → P2 creative (11 phases, ends FROZEN) → P3 production (10 phases). 66 test files. Remotion + FFmpeg/ffprobe + ElevenLabs/Piper. Governance gates A4–A7 |
| **B-Branch / Control Plane** | Built, gates open | B00–B12 modules, all present in `src/`. B08 is the only external-retrieval point. Release is explicit that full test suite is red and several gates are NOT VERIFIED |
| **GemVault Pro** | **Live, public** | Verified live 2026-09-11 |

## 4. Verified vs future claims — and two corrections

**Verified by me, independently:**
- 495 unique personas — counted from source, matches CV.
- 18 chess personas with *real* mechanical effects, not dialogue. From `src/persona.cpp` each
  persona returns a distinct `contempt()` (draw aversion, e.g. Cengiz +60, Umay −10) and
  `aspiration_delta()` (search-window width, e.g. Cengiz 50, Umay 15). Plus mode switches:
  Necessità (ψ<−60), Vezüv protocol, Erlik dark depth, Umay shield.
- The engine's own audit records personas diverging by **±46cp** with **no strength loss** for the
  neutral persona (gauntlet 50.0%). Attributed to his audit, not asserted as independent fact.
- GemVault Pro is live and its own page metadata states **735 Gem instructions across 18
  categories** (verified 2026-09-11).

**Correctly labelled as NOT proven — and the site must preserve this:**
- PersonaNeedle is not trained.
- Persona-first prompting is a *hypothesis*, not a result. His own harness never emits "measured".
- Chess persona styles are *authored interpretations*, not reconstructions of how historical people
  played. He says this himself; the site repeats it.
- Raw ELO gain from the cognitive layer is explicitly unproven.
- Chess commentary is a **template/lookup system, not a live LLM** — I confirmed this by reading
  the `switch` statement in `persona.cpp`.

**Two corrections I had to make:**
1. **`github.com/mk350174-cmd/timurlenk-motoru` returns 404.** The CV prints this URL, but it does
   not resolve publicly. Per the supplied verification rule ("link only repositories that actually
   resolve"), the site must **not** link it. I link the profile instead and flag this to Mehmet.
2. The Persona README's category counts (91+83+95+81+71+113) sum to **534**, not 495. The site must
   not present those as a breakdown of 495. I use 495 total and omit the per-category split.

## 5. GitHub findings (live, 2026-09-11)

Profile `mk350174-cmd` resolves; 11 public repositories, none with descriptions, most HTML. The
flagship repositories (`timurlenk-motoru`, `Persona`) are **not public**. Consequence for design:
**this portfolio cannot lean on "go read my GitHub" as the proof layer.** The site itself has to
carry the evidence — which pushes the design toward showing real extracted data and real mechanisms
in-page rather than deferring to repo links. This constraint shaped the signature interaction.

## 6. GemVault findings (live, 2026-09-11)

Live and serving. Product name is **GemVault Pro**, tagline "Yapay Zekayı Ustaca Kullan", Turkish
(`lang="tr"`), dark UI. Page metadata: "18 kategoride 735 ileri seviye Gemini Gem talimatı. AI
destekli arama, dinamik talimat üretimi ve kişisel Gem Üretici." Features named by the product
itself: AI-assisted search, dynamic instruction generation, a personal Gem generator.
Category *names* are fetched at runtime from an API I could not read, so I do **not** invent them.
The 735/18 figures are used with an explicit "verified on" date so they can be re-checked.

## 7. Relationship between the projects — the actual thesis

The six projects are not six interests. They are one idea applied six times:

> **Keep separate the things that are usually blurred, and label what you actually know.**

- **Persona Engineering** — separate *identity* from *task* from *output*; separate stable profile
  from accumulated memory; separate simulated from measured.
- **Tamerlane Chess** — separate *rules correctness* from *playing style* from *playing strength*.
  His CV: "three different goals that need different tests."
- **B-Branch** — separate *retrieval* from *verification* from *approval*.
- **A-Branch** — separate *research* from *creative* from *production*, with frozen handoffs.
- **Games Lab** — separate *supported historical rules* from *implementation decisions*.
- **GemVault** — separate *reusable instruction* from *one-off prompt*.

That is a genuinely unusual and coherent position, and it comes from the History training: source
criticism is exactly this discipline. History isn't decoration on the AI work — it's the *method*.

## 8. Target visitor

1. **Technical reviewer / recruiter** (2 minutes) — needs "is this real?" answered fast.
2. **Researcher / academic** — needs the claims to be honest and the method visible.
3. **Curious general visitor / student** — needs the ideas without source code.
4. **Collaborator** — needs to see where they'd fit.

Visitor 1 is the constraint: the evidence must be skimmable in 2 minutes without dumbing anything
down for visitors 2–4.

## 9. Narrative strategy

Lead with the tension: *history student* + *AI systems*. Immediately resolve it with the thesis —
source criticism is the method. Then prove the thesis six times, each project labelled by what it
actually is. End with what he wants to build next, clearly marked as next.

Never let a proposal wear the costume of an achievement. The site's credibility *is* the product.

## 10. Information architecture

Hybrid: a narrative home page + one deep-dive route per project.

- `/` — Hero → Thesis → Evidence key → Work index → Ecosystem (how the six connect) → Approach → Contact
- `/work/persona-engineering` — flagship + **live Persona Compiler**
- `/work/tamerlane-chess` — flagship + **Persona Style Map** + board explorer
- `/work/historical-games-lab`, `/work/a-branch`, `/work/b-branch`, `/work/gemvault`
- `/about`

Deep dives share one template answering the seven required questions (what/why/question/today/
how-built/learned/next) via progressive disclosure, so no page becomes a README.

## 11. Visual language

The interactive evolution of the CV, not a copy of it. Extracted grammar:

- A short **teal rule** opens every section (the CV's signature mark).
- Teal **eyebrow** labels, small-caps, letterspaced, numbered `01 /`, `02 /` — the CV's own
  convention, reused as site navigation.
- **Rules and dividers, not cards.** The CV has no floating cards; neither does the site.
- Pale-teal surface `#EEF5F5` for emphasis blocks and the CV's left-border pull-quote.
- **Discipline learned from pixel-sampling the CV:** white is 86% of it, teal only 0.36%. Teal is a
  *sparse accent*, never a flood. This ratio is a hard design rule.

## 12. Exact palette (sampled from the CV myself; matches supplied values)

| Role | Hex | Sampled |
|---|---|---|
| Paper / background | `#FFFFFF` | 86.17% |
| Pale teal surface | `#EEF5F5` | `#EDF4F4` 2.28% |
| Body text (charcoal) | `#29343D` | `#28343D` 0.76% |
| Primary heading (navy) | `#172F44` | `#162F44` 0.50% |
| Accent (teal) | `#257C80` | `#247C80` 0.36% |
| Divider | `#DCE3E7` | `#E4E9EC` |
| Secondary text | `#5E666D` | `#71797F` |

Dark mode derives from the **same** navy/teal family (navy deepened as ground, teal lifted for
contrast). No second brand. No purple, no neon, no glow.

## 13. Typography

- **Inter** — UI and body. Contemporary, highly readable, matches the CV's humanist sans tone.
- **Newsreader** — a restrained serif, used *only* for thesis statements and pull quotes. This is
  the one deliberate addition to the CV's system: it carries the historical/editorial dimension
  that is Mehmet's actual differentiator, and stops the site reading as generic tech.
- **JetBrains Mono** — evidence chips, parameter tables, compiled prompt output. Technical register.

## 14. Interaction strategy

Motion communicates structure only: reveal relationships, trace pipeline flow, expand evidence,
transition between states. No particles, no parallax scenery, no custom cursor. Everything works
without motion; `prefers-reduced-motion` is respected throughout.

## 15. Signature interaction — considered and chosen

**Rejected — the connected node graph.** It is the cliché answer, it is what every AI portfolio
does, and a force-directed blob communicates "many things exist" rather than "these things share
one idea". The ecosystem is better shown as an explicit, readable relationship diagram.

**Chosen — two interactions, one thematic and one demonstrative:**

**(a) The Evidence Filter — the site-wide signature.** A persistent control filtering the entire
portfolio by evidence tier: `Built` / `Experimental` / `Proposed` / `Vision`. Set it to "Built only"
and every speculative claim on the page visibly recedes, leaving only what exists today. Every
factual statement on the site carries a tier.

This is the right signature because it *is* Mehmet's thesis, executed on himself. A portfolio that
volunteers what it hasn't finished is the opposite of portfolio inflation — and it answers the
recruiter's real question ("what's actually real here?") in one click. No other portfolio does this,
and it cannot be copied by someone who doesn't have the discipline to back it.

**(b) The Persona Compiler — the flagship demo.** A faithful TypeScript port of his actual
`persona_math/compiler.py`, running over persona data extracted from his real library. Choose a
persona → see its ten behavioural blocks → choose tier (nano/standard/rich) and platform
(Claude/Gemini/OpenAI/raw) → watch the real system prompt assemble, with the same block-ranking
algorithm and token accounting as his Python. The visitor learns "persona before the task" by
*doing* it. Given that his flagship repos are private (§5), this in-page demonstration is also the
strongest available evidence that the work exists.

Supporting: **the Persona Style Map** for Tamerlane — all 18 personas plotted on their *real*
`contempt` × `aspiration_delta` values read out of `persona.cpp`, proving the claim that personas
change decisions rather than dialogue.

## 16. Component strategy

No wholesale installation of the four reference libraries. Patterns extracted:
- **shadcn/ui** — the composition philosophy: own your primitives, `cn()` + variant-driven styling,
  Radix-grade keyboard/ARIA semantics. Primitives are hand-built so the design system stays single.
- **Magic UI** — reveal-on-scroll and staged text motion, rebuilt restrained and token-driven.
- **HyperUI** — clean responsive section skeletons and table/list layout patterns.
- **Preline** — navigation and disclosure behaviour, focus management, mobile nav patterns.

Result: one design system, small bundle, no library fingerprints.

## 17. Mobile strategy

Designed, not degraded. The Style Map becomes a sortable ranked list with the same numbers. The
compiler stacks into tabs. The ecosystem diagram becomes a vertical relationship flow. The evidence
filter becomes a horizontally scrollable segmented control. Nothing is dropped — only re-formed.

## 18. Technical architecture

Next.js (App Router) + TypeScript + Tailwind, static-exportable. Content lives in typed data modules
(`src/content/*`) separate from presentation; every claim is a typed object carrying its evidence
tier, so the Evidence Filter is a data property, not a hack. Design tokens centralised in CSS custom
properties. Motion isolated in reusable primitives. No giant dependencies for small effects.

---

## Critical review — "could this be anyone else's site?"

I asked the required question: *if I changed the name, could this belong to another AI developer?*

First pass: **yes, and that was a problem.** A hero, six project cards, a tech list, a contact
section — that is every developer portfolio. Teal instead of purple doesn't fix it.

What actually makes it unfakeable:

1. **The Evidence Filter.** Any other portfolio, switched to "Built only", would either not change
   or would collapse. Mehmet's survives — and the parts that recede are labelled honestly rather
   than hidden. The interaction only works for someone who already works this way.
2. **Real extracted data, not descriptions of data.** Real persona blocks; real `contempt` and
   `aspiration_delta` integers from his C++; a real port of his compiler. Swapping the name would
   break it, because the data is his.
3. **History as method, not decoration.** The site argues that source criticism *is* the
   engineering discipline. That claim belongs to a History undergraduate who ships C++20 search
   code, and to nobody else in this genre.
4. **Naming its own limits.** The site states that the flagship repositories are private and that a
   CV link 404s. A generic portfolio never does this; Mehmet's repositories do it constantly.

Remaining risk to manage during build: the evidence discipline must not read as self-deprecation.
Mitigation — the tone is *precision*, not apology. "Not trained yet" sits beside "26M-parameter
architecture, training pipeline, quantization and bundling all implemented." Confidence comes from
specificity.
