import type { Project } from "@/lib/types";

/**
 * The six projects.
 *
 * Every claim below is tiered. Where a statement is about something that
 * exists, the `source` field names the file or URL it was read from. Where a
 * statement is about something intended, it is tiered `proposed` or `vision`
 * and worded as an intention. That boundary is the point of the site.
 */
export const PROJECTS: Project[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "persona-engineering",
    index: "01",
    title: "Persona Engineering",
    kicker: "Independent research and software — existing foundation, ongoing work",
    kind: "research",
    tier: "built",
    summary:
      "A library of 495 persona profiles, a compiler that turns them into system prompts, and an evaluation layer that refuses to call a simulation a measurement.",
    question:
      "If a persona is more than a role label, what exactly is it made of — and can you reuse it instead of re-inventing it in every prompt?",
    what:
      "A structured persona library with a compiler and an evaluation layer. Each profile carries descriptive metadata, behavioural anchors across ten blocks, and an HPEP-100 vector — a 100-dimensional representation the framework uses to compare and compile personas.",
    why:
      "A prompt like “act as a historian” names a role without defining its judgment, evidence standards, priorities, or what it does when the task changes. The work asks whether those characteristics can be written down once, versioned, and reused — so a persona becomes an engineered component rather than an improvised preamble.",
    today: [
      {
        id: "pe-lib",
        tier: "built",
        text: "495 unique profiles across six categories — historical, fictional, mythological and archetypal figures. Each defines style, voice, era, explicit incompatibilities, and ten behavioural block activations.",
        source: "persona_math/personas/*.py",
      },
      {
        id: "pe-compiler",
        tier: "built",
        text: "A persona-to-prompt compiler producing system prompts for Claude, Gemini, OpenAI-style integrations, or platform-neutral use, in nano, standard and rich tiers. You can run a port of it on this site.",
        source: "persona_math/compiler.py",
      },
      {
        id: "pe-eval",
        tier: "experimental",
        text: "CEID identity metrics, drift analysis, mandatory-core checks and controlled simulations give an experimental vocabulary for comparing personas. These are project-defined measures, not evidence of human-like cognition.",
        source: "persona_math/ceid.py",
      },
      {
        id: "pe-plugin",
        tier: "built",
        text: "Developer tooling: a Claude Code plugin covering persona activation, search, comparison and diagnostics, plus an MCP server exposing profile inspection, memory access and evaluation records.",
        source: "persona_mcp/, .claude-plugin/",
      },
      {
        id: "pe-papers",
        tier: "experimental",
        text: "A 60-paper research series backed by a reproducible simulation harness. Every embedded number is tier-stamped as simulated, calculated or estimated — and never as measured.",
        source: "papers/, experiments/",
      },
      {
        id: "pe-needle",
        tier: "proposed",
        text: "PersonaNeedle extends the work toward a small persona-conditioned model: a roughly 26M-parameter architecture with teacher-assisted dataset generation, checkpoint/resume, fine-tuning, quantization and bundling all implemented. The model is not trained — the repository says so plainly.",
        source: "needle/",
      },
    ],
    howBuilt: [
      {
        id: "pe-hb1",
        tier: "built",
        text: "Python. Profiles are declarative specs; a factory expands each one's block values into the 100-dimensional vector deterministically from a seed, so the same profile always compiles to the same persona.",
        source: "persona_math/persona_factory.py",
      },
      {
        id: "pe-hb2",
        tier: "built",
        text: "The compiler ranks the ten blocks by activation and spends its token budget on the strongest ones first — four anchors at nano, six with detail at standard, all ten plus the identity signature at rich.",
        source: "persona_math/compiler.py",
      },
      {
        id: "pe-hb3",
        tier: "built",
        text: "A provenance audit runs over the whole series and fails if a simulated value has been labelled as measured. The current measured count is zero, and the repository states that too.",
        source: "make check-provenance",
      },
    ],
    learned: [
      "Writing the evaluation vocabulary was harder than writing the personas. It is easy to produce a number that looks like evidence; the work was building the audit that stops one.",
      "One persona in the library has hand-authored behavioural anchors and the other 494 fall back to generated ones. The gap between them is the most honest measure of how much of this is finished.",
      "Separating the stable profile from accumulated project memory turned out to be the load-bearing distinction. A persona should absorb new facts without quietly losing its standards.",
    ],
    next: [
      {
        id: "pe-n1",
        tier: "proposed",
        text: "Test the actual hypothesis: compare task-only prompts, brief role prompts and structured persona-first setups on the same held-out tasks, with matched model settings and comparable prompt budgets.",
      },
      {
        id: "pe-n2",
        tier: "proposed",
        text: "Assess accuracy, evidence use, consistency, correction behaviour and distinctiveness separately, rather than reporting one aggregate score.",
      },
      {
        id: "pe-n3",
        tier: "proposed",
        text: "Train PersonaNeedle and run the validation pipeline that upgrades results from simulated to measured.",
      },
      {
        id: "pe-n4",
        tier: "vision",
        text: "Develop persona engineering into a repeatable research and development practice that others can use and criticise.",
      },
    ],
    limits: [
      "Better performance from persona-first prompting is the hypothesis under investigation, not an established result.",
      "CEID and the drift metrics are project-defined measures. They are not validated instruments and not evidence of cognition.",
      "PersonaNeedle is not trained. The architecture and pipeline exist; a validated model does not.",
      "The CEID v2.0 patch architecture is implemented but undocumented by any paper in the series — the source flags this itself and marks it unreviewed.",
    ],
    metrics: [
      {
        value: "495",
        label: "unique persona profiles",
        tier: "built",
        source: "Counted from persona_math/personas/*.py",
      },
      {
        value: "10",
        label: "behavioural blocks per profile",
        tier: "built",
        source: "persona_math/personas/_spec.py",
      },
      {
        value: "3 × 4",
        label: "compiler tiers × target platforms",
        tier: "built",
        source: "persona_math/compiler.py",
      },
      {
        value: "0",
        label: "results labelled 'measured'",
        tier: "built",
        source: "papers/manifest.json",
      },
    ],
    stack: ["Python", "NumPy", "MCP", "Claude Code plugin", "pytest"],
    links: [],
    connectsTo: [
      {
        slug: "tamerlane-chess",
        relation: "gives personas a place where their decisions can actually be observed",
      },
      {
        slug: "gemvault",
        relation: "shares the goal of making specialised instructions reusable rather than re-typed",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "tamerlane-chess",
    index: "02",
    title: "Tamerlane Chess AI Engine",
    kicker: "Apex Timurlenk — C++20 engine, persona styles, historical game systems",
    kind: "engine",
    tier: "built",
    summary:
      "A C++20 engine for a 700-year-old chess variant, where 18 personas change search behaviour rather than dialogue.",
    question:
      "Can a historically inspired persona change what an engine actually decides — not just what it says about the move it was going to play anyway?",
    what:
      "A complete engine for Tamerlane chess: an 11×10 board with two citadels, thirteen piece types, and the promotion and royal-piece mechanics the variant needs. The rules engine determines legal play; no language model is in that loop.",
    why:
      "Tamerlane chess is a real historical game that almost nobody plays, partly because there is nowhere to play it well. Building the engine is the concrete half of a larger interest: making historical strategy systems accessible by making them playable, with opponents that carry a point of view.",
    today: [
      {
        id: "tc-rules",
        tier: "built",
        text: "Full variant rules: 11×10 plus two citadel squares (112 in total), thirteen piece types, the king's once-per-game swap, citadel entry as a draw, and per-pawn promotion targets.",
        source: "src/movegen.cpp, include/types.h",
      },
      {
        id: "tc-search",
        tier: "built",
        text: "Alpha-beta with iterative deepening, transposition table, late move reductions, singular extensions, zugzwang-guarded null-move pruning, ProbCut and quiescence search.",
        source: "src/search.cpp",
      },
      {
        id: "tc-persona",
        tier: "built",
        text: "18 persona modes that move real parameters: draw aversion, aspiration-window width, search extensions and evaluation weights. Three unlock distinct regimes at psyche thresholds.",
        source: "src/persona.cpp, include/persona.h",
      },
      {
        id: "tc-nnue",
        tier: "experimental",
        text: "A cognitive network adds weighted style signals on top of the handcrafted evaluation. The value base stays pure handcrafted evaluation; the persona only tilts style, capped at ±150cp.",
        source: "src/nnue.cpp",
      },
      {
        id: "tc-measured",
        tier: "experimental",
        text: "The project's own status audit records personas playing measurably differently — a spread of about ±46cp — while the neutral persona matches the plain engine exactly, so style costs no strength.",
        source: "STATUS.md",
      },
      {
        id: "tc-verify",
        tier: "built",
        text: "Eleven test binaries, locked perft baselines, a do/undo property test over random legal walks, ASan and UBSan in CI, and a UCI fuzzing campaign that found six real crashes and now runs clean.",
        source: "tests/, tools/uci_fuzz.py",
      },
    ],
    howBuilt: [
      {
        id: "tc-hb1",
        tier: "built",
        text: "C++20 with CMake. Personas are a thin layer over the search: each returns a contempt value and an aspiration-window width, so a persona is a handful of integers rather than a separate engine.",
        source: "include/persona.h",
      },
      {
        id: "tc-hb2",
        tier: "built",
        text: "Correctness is kept independent of style. The neutral persona is defined to be the plain engine, which makes any strength change attributable to the persona layer and nothing else.",
        source: "STATUS.md",
      },
      {
        id: "tc-hb3",
        tier: "built",
        text: "A single authoritative status document records what is proven and what is not, and keeps a list of claims that earlier documents got wrong.",
        source: "STATUS.md",
      },
    ],
    learned: [
      "A historical source changed the code. The Vanguard had been implemented as a fixed two-square jump; the period description — 'moves like the elephant, but must go at least two' — showed it was a slider. That is a history exercise resolving an engineering bug.",
      "Naming things honestly matters more than naming them impressively. The live commentary was called an AI narrator; it is a template and lookup system, and the status document now says so in those words.",
      "A failed experiment is worth writing down. An incremental accumulator was tried, drifted badly, was reverted, and carries a note telling the next attempt to read it first. The second approach, built differently, shipped.",
    ],
    next: [
      {
        id: "tc-n1",
        tier: "proposed",
        text: "Test whether players can tell the personas apart without seeing their names — the experiment that would turn a design intention into a finding.",
      },
      {
        id: "tc-n2",
        tier: "proposed",
        text: "A well-documented Tamerlane experience with a complete introductory lesson, a small set of distinguishable opponents, and a feedback process.",
      },
      {
        id: "tc-n3",
        tier: "vision",
        text: "More historical variants, each with documented rules, accessible onboarding, suitable opponents, and its historical context explained.",
      },
    ],
    limits: [
      "The personas are authored interpretations inspired by historical figures. They are not reconstructions of how those people actually played chess, and no source could establish that.",
      "The engine targets Tamerlane chess specifically, not a general family of variants.",
      "Turkish commentary is a template and lookup system, not a live language model.",
      "Style differentiation is not a strength gain. The audit shows strength is preserved, not improved; raw rating gain remains unproven.",
    ],
    metrics: [
      {
        value: "18",
        label: "persona modes with real parameters",
        tier: "built",
        source: "include/persona.h",
      },
      {
        value: "13",
        label: "piece types on 112 squares",
        tier: "built",
        source: "include/types.h",
      },
      {
        value: "±46cp",
        label: "measured spread between personas",
        tier: "experimental",
        source: "The project's own STATUS.md audit",
      },
      {
        value: "6",
        label: "real crashes found by UCI fuzzing",
        tier: "built",
        source: "tools/uci_fuzz.py",
      },
    ],
    stack: ["C++20", "CMake", "UCI", "WebSocket/JSON", "ASan/UBSan", "clang-tidy"],
    links: [],
    connectsTo: [
      {
        slug: "persona-engineering",
        relation: "supplies the method for defining and comparing character profiles",
      },
      {
        slug: "historical-games-lab",
        relation: "began as browser prototypes there before being rebuilt as a real engine",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "historical-games-lab",
    index: "03",
    title: "Historical Strategy Games Lab",
    kicker: "Browser prototypes — a collection, not a product",
    kind: "lab",
    tier: "experimental",
    summary:
      "Fourteen self-contained browser prototypes of historical board games from across the steppe, built in Three.js.",
    question:
      "Which historical games survive contact with a screen — and what does a rule set lose when you have to make every ambiguity explicit?",
    what:
      "A collection of single-file browser prototypes exploring historical board and strategy games: Hiashatar, Togyzool, Şatra, Satrancı Rumi, Kurt ve Koyun, Buga Shadra, Kalebendi, and several generations of a browser Timurlenk.",
    why:
      "Prototyping is how the research gets tested. A game whose rules are disputed in the literature forces a decision the moment you implement it — and the record of which decisions were made is as interesting as the game.",
    today: [
      {
        id: "hg-games",
        tier: "experimental",
        text: "Fourteen self-contained HTML prototypes, roughly 92,000 lines in total, using Three.js and WebGL for 2D and 3D exploration.",
        source: "Tarih-oyunlar archive",
      },
      {
        id: "hg-range",
        tier: "experimental",
        text: "The games span several traditions: Mongolian great chess, a Kazakh counting game, Tuvan and Altai board games, and an alternate historical chess.",
        source: "Tarih-oyunlar archive",
      },
      {
        id: "hg-lineage",
        tier: "built",
        text: "Three generations of a browser Timurlenk sit in this archive. They are where the Tamerlane rules were first worked out before the C++ engine existed.",
        source: "timurlenk_v27/v28/v35.html",
      },
    ],
    howBuilt: [
      {
        id: "hg-hb1",
        tier: "experimental",
        text: "Each game is one HTML file with no build step, so a prototype stays runnable years later without a toolchain to restore.",
        source: "Tarih-oyunlar archive",
      },
      {
        id: "hg-hb2",
        tier: "experimental",
        text: "Three.js carries the board and piece rendering; several prototypes include full 3D piece collections.",
        source: "buga_shadra_3d.html, kalebendi_3d.html",
      },
    ],
    learned: [
      "A single-file prototype with no build step is still openable years later. Several of these would be dead by now if they had a dependency tree.",
      "Prototypes are where the honest labelling problem first appeared. Once you implement a disputed rule you have made a decision, and it needs to be recorded as a decision rather than presented as history.",
      "Working the Tamerlane rules out in a browser first made the C++ engine a rewrite rather than a discovery.",
    ],
    next: [
      {
        id: "hg-n1",
        tier: "proposed",
        text: "Give each variant a source map: what the rules clearly support, what is disputed, and which choices were implementation decisions.",
      },
      {
        id: "hg-n2",
        tier: "vision",
        text: "Promote the strongest prototypes into properly engineered games with the same rigour as the Tamerlane engine.",
      },
    ],
    limits: [
      "These are prototypes, not products. They are distinct from the standalone Tamerlane engine, which is far more developed.",
      "The rule implementations are playable interpretations. They have not been reviewed against the scholarship on each game.",
      "Interfaces are in Turkish and were built for the author's own exploration.",
    ],
    metrics: [
      { value: "14", label: "browser prototypes", tier: "experimental", source: "Tarih-oyunlar archive" },
      { value: "~92k", label: "lines of prototype code", tier: "experimental", source: "Tarih-oyunlar archive" },
      { value: "8", label: "distinct historical games", tier: "experimental", source: "Tarih-oyunlar archive" },
    ],
    stack: ["JavaScript", "Three.js", "WebGL", "HTML"],
    links: [],
    connectsTo: [
      {
        slug: "tamerlane-chess",
        relation: "is where the Tamerlane rules were prototyped before the engine was written",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "a-branch",
    index: "04",
    title: "A-Branch — Video Production Pipeline",
    kicker: "Three connected TypeScript pipelines with frozen handoffs",
    kind: "pipeline",
    tier: "built",
    summary:
      "Research, creative direction and production as three separate pipelines, where each hands over a frozen package rather than a conversation.",
    question:
      "If research, creative judgment and production are genuinely different kinds of work, what does the handoff between them have to guarantee?",
    what:
      "Three TypeScript pipelines. Research produces verified claims; creative turns them into a production package that is then frozen; production assembles, renders and checks the result. Governance gates sit between the stages.",
    why:
      "Most creative automation collapses the stages, which means a rendering decision can silently rewrite a research claim. Keeping them apart — and freezing the handoff — makes it possible to say which stage a problem came from.",
    today: [
      {
        id: "ab-p1",
        tier: "built",
        text: "Pipeline 1, research: scope proposal, domain research, claim verification, synthesis, and a handoff package. Verification is a separate phase from retrieval.",
        source: "pipeline1_research/",
      },
      {
        id: "ab-p2",
        tier: "built",
        text: "Pipeline 2, creative: eleven phases from reference discovery through strategy, format decision, visual direction, asset planning, scene and shot planning, prompts and voice specification — ending in a production package that is frozen on approval.",
        source: "pipeline2_creative/",
      },
      {
        id: "ab-p3",
        tier: "built",
        text: "Pipeline 3, production: ingest and validation, asset decodability probing, voice generation, a master timing clock, timeline construction with motion validation, render, automated QA and delivery.",
        source: "pipeline3_production/",
      },
      {
        id: "ab-tests",
        tier: "built",
        text: "66 test files across the three pipelines, including a real Remotion render test rather than only a mocked one.",
        source: "pipeline*/tests/",
      },
      {
        id: "ab-gates",
        tier: "built",
        text: "Governance gates A4 to A7 sit at the transitions, and the timeline stage explicitly forbids creative inference — it may arrange what it was given, not invent.",
        source: "src/timeline.ts",
      },
    ],
    howBuilt: [
      {
        id: "ab-hb1",
        tier: "built",
        text: "TypeScript throughout, with Remotion for rendering, ffprobe for asset validation, and ElevenLabs or a local Piper voice depending on the stage.",
        source: "pipeline3_production/package.json",
      },
      {
        id: "ab-hb2",
        tier: "built",
        text: "Each pipeline carries the same spine — gates, identity, manifest, memory, a secret guard and explicit error types — so the three behave consistently at their boundaries.",
        source: "pipeline*/src/",
      },
    ],
    learned: [
      "Freezing the handoff is what makes the separation real. Without it the stages quietly renegotiate and nobody can say where a fault came from.",
      "A cost ledger and a checkpoint file turned out to matter as much as the render itself, because a pipeline that cannot resume is a pipeline you stop using.",
      "The most useful rule in the whole system is the smallest: the timeline stage may not infer creative intent.",
    ],
    next: [
      {
        id: "ab-n1",
        tier: "proposed",
        text: "Use it on the author's own work — turn the historical games research into explanatory video rather than treating the pipeline as an end in itself.",
      },
    ],
    limits: [
      "This is infrastructure, not a body of published video. The pipeline exists; a catalogue of finished films does not.",
      "Several stages depend on external providers and are exercised against fixtures rather than live services in the archived state.",
    ],
    metrics: [
      { value: "3", label: "connected pipelines", tier: "built", source: "A-Branch archive" },
      { value: "66", label: "test files", tier: "built", source: "pipeline*/tests/" },
      { value: "21", label: "orchestrated phases across P2 and P3", tier: "built", source: "FULL_PIPELINE_SYSTEM_MAP.md" },
    ],
    stack: ["TypeScript", "Remotion", "FFmpeg/ffprobe", "Vitest", "ElevenLabs", "Piper"],
    links: [],
    connectsTo: [
      {
        slug: "b-branch",
        relation: "shares the gate-and-handoff discipline, applied to media rather than strategy",
      },
      {
        slug: "historical-games-lab",
        relation: "is the intended subject matter — research becoming something watchable",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "b-branch",
    index: "05",
    title: "B-Branch — Strategic Control Plane",
    kicker: "B00–B12: evidence, provenance, and the separation of retrieval from verification",
    kind: "pipeline",
    tier: "built",
    summary:
      "A thirteen-module control plane built on one rule: retrieving information is not the same as verifying it, and neither is the same as approving an action.",
    question:
      "Where exactly should a human stand in an automated workflow — and what has to be true before a machine is allowed to act on something it merely found?",
    what:
      "Thirteen modules, B00 through B12, from a governance foundation through intelligence, creative synthesis, distribution, performance, analytics, learning loops, risk and compliance, and state management. External retrieval enters at exactly one place.",
    why:
      "Systems that retrieve and act in one step cannot tell you why they acted. Separating the steps makes provenance a property of the architecture rather than a report generated afterwards.",
    today: [
      {
        id: "bb-status",
        tier: "built",
        text: "The canonical decision on the V6 release is release candidate — external verification outstanding. Every mandatory internal software, security-contract, reproducibility and release-evidence gate passes; the external ones were never run, and the audit says so rather than rounding up.",
        source: "B_BRANCH_V6_FINAL_AUDIT_20260906.md",
      },
      {
        id: "bb-arch",
        tier: "built",
        text: "All thirteen modules exist in the source, each with the same internal shape: phases, orchestration, persistence and types.",
        source: "src/b00 … src/b12",
      },
      {
        id: "bb-b00",
        tier: "built",
        text: "B00 is the governance foundation the others build on: evidence and provenance types, audit trail, hashing, identity and governance contracts.",
        source: "src/b00/",
      },
      {
        id: "bb-b08",
        tier: "built",
        text: "B08 is the only module that reaches outside. Everything else operates on what B08 brought back, which makes the trust boundary a single readable place in the code.",
        source: "src/b08/external/",
      },
      {
        id: "bb-honest",
        tier: "built",
        text: "V6 took the legacy suite from ten failing expectations to 696 of 696, and the full Vitest run to 870 of 870 — then still refused to call itself production ready. Its closing line is the reason: structural completeness is not being presented as operational readiness.",
        source: "B_BRANCH_V6_FINAL_AUDIT_20260906.md",
      },
      {
        id: "bb-manifest",
        tier: "built",
        text: "Release manifests, a change ledger and separated verification logs distinguish current evidence from historical evidence.",
        source: "manifest.json, docs/REPAIR_LEDGER.json",
      },
    ],
    howBuilt: [
      {
        id: "bb-hb1",
        tier: "built",
        text: "TypeScript with a strict typecheck gate. A failing gate exits non-zero; tests are not suppressed to make a release look clean.",
        source: "package.json",
      },
      {
        id: "bb-hb2",
        tier: "built",
        text: "Governance is a type, not a convention. Evidence carries provenance through the modules rather than being asserted at the end.",
        source: "src/b00/evidence.ts",
      },
      {
        id: "bb-hb3",
        tier: "built",
        text: "V6 was repair and hardening, not a rewrite. B00–B12 was preserved; eight phases closed in sequence — release identity, lineage and governance, the measurement and retrieval boundaries, then learning, optimisation, compliance and state — each one closed only on its own evidence rather than on the previous phase's.",
        source: "B_BRANCH_V6_FINAL_AUDIT_20260906.md",
      },
      {
        id: "bb-hb4",
        tier: "built",
        text: "The release names the exact V5 archive it was built from, by hash. That claim is checkable, and it checks out: the digest in the V6 manifest matches the V5 archive byte for byte. Provenance the project can demonstrate rather than assert.",
        source: "B_BRANCH_V6_RELEASE_MANIFEST.json · baseline.sha256",
      },
    ],
    learned: [
      "The sentence the whole system is organised around is in its README: external data never becomes verified merely because retrieval works.",
      "Publishing the failing gates alongside the passing ones costs nothing and makes the passing ones mean something. V5 shipped with ten failing legacy expectations printed on its first screen; V6 closed them. Having stated the number while it was bad is what makes 696 of 696 worth reading now.",
      "One external entry point is worth more than a policy document about external entry points.",
    ],
    next: [
      {
        id: "bb-n1",
        tier: "proposed",
        text: "External verification — a live Agent Reach executable, real provider reachability, and a real-world compliance authority. This is precisely what stands between a release candidate and a production claim, and none of it was available in the audit environment.",
        source: "B_BRANCH_V6_FINAL_AUDIT_20260906.md",
      },
      {
        id: "bb-n3",
        tier: "proposed",
        text: "The deferred half of the loop: applying a change in a real production environment, measuring what happened afterwards, and executing a rollback for real. B10 stops at an external NOT_APPLIED handoff by design, so this is the next boundary rather than a missing feature.",
        source: "B_BRANCH_V6_FINAL_AUDIT_20260906.md",
      },
      {
        id: "bb-n2",
        tier: "vision",
        text: "Generalise the evidence and approval model so it can sit under other projects rather than only this one.",
      },
    ],
    limits: [
      "The internal gates pass; the external ones were never run. Live provider reachability, live retrieval and external content truth are not verified, and real-world legal or platform authority is out of scope entirely.",
      "Cryptographic actor authentication is out of scope. What is verified is narrower and worth stating exactly: an approval binds to one exact artifact.",
      "The gates that passed are the internal ones: software, security contract, reproducibility and release evidence. External verification remains outstanding, and no amount of internal passing substitutes for it.",
      "Live Agent Reach and provider retrieval were not verified in the final V6 environment. Fixture retrieval is not presented as live retrieval, and content that arrives is never promoted to verified truth merely because the fetch succeeded.",
    ],
    metrics: [
      { value: "13", label: "modules, B00 to B12", tier: "built", source: "src/" },
      { value: "1", label: "external entry point", tier: "built", source: "src/b08/external/" },
      {
        value: "870/870",
        label: "tests passing, full Vitest",
        tier: "built",
        source: "B_BRANCH_V6_FINAL_AUDIT_20260906.md",
      },
    ],
    stack: ["TypeScript", "Vitest", "Zod-style contracts", "Node"],
    links: [],
    connectsTo: [
      {
        slug: "a-branch",
        relation: "applies the same gate discipline to a different kind of work",
      },
      {
        slug: "persona-engineering",
        relation: "shares the refusal to let an unverified value wear a verified label",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "gemvault",
    index: "06",
    title: "GemVault Pro",
    kicker: "Live public platform for reusable AI instructions",
    kind: "product",
    tier: "built",
    summary:
      "A public, working platform for discovering and reusing Gemini Gems and task-specific AI instructions — the only project here you can open right now.",
    question:
      "If a good instruction is worth writing carefully, why does everyone rewrite one from scratch every time?",
    what:
      "A public web platform where task-specific AI instructions are organised into categories, searchable, and copyable. It also generates instructions dynamically and includes a personal Gem builder.",
    why:
      "It is the practical end of the same idea behind persona engineering: a specialised instruction is a reusable component. GemVault is that argument made concrete for people who will never read a research paper about it.",
    today: [
      {
        id: "gv-live",
        tier: "built",
        text: "Live and serving at gemvault-app.higgsfield.app. It is a finished, usable product rather than a demo.",
        source: "Verified 11 September 2026",
      },
      {
        id: "gv-scale",
        tier: "built",
        text: "The platform's own page metadata describes 735 advanced Gemini Gem instructions organised across 18 categories.",
        source: "Live page metadata, verified 11 September 2026",
      },
      {
        id: "gv-features",
        tier: "built",
        text: "Named capabilities: AI-assisted search, dynamic instruction generation, and a personal Gem builder. Entries support copy and download actions and link to related instructions.",
        source: "Live site",
      },
      {
        id: "gv-lang",
        tier: "built",
        text: "The interface is in Turkish, built for a Turkish-speaking audience.",
        source: "Live site",
      },
    ],
    howBuilt: [
      {
        id: "gv-hb1",
        tier: "built",
        text: "A single-page web application with client-side rendering, deployed and publicly reachable.",
        source: "Live site",
      },
    ],
    learned: [
      "Shipping something the public can open changes what you optimise. Categories and search matter more than the cleverness of any single instruction.",
      "Discovery is the actual problem. A well-written instruction nobody can find is not reusable in any meaningful sense.",
    ],
    next: [
      {
        id: "gv-n1",
        tier: "proposed",
        text: "Connect it to the persona work, so a Gem can carry a structured persona rather than only instruction text.",
      },
    ],
    limits: [
      "No usage or adoption figures are claimed here. The item and category counts come from the platform's own page and were checked on the date shown; nothing else is asserted.",
      "The interface is Turkish-language only.",
    ],
    metrics: [
      {
        value: "735",
        label: "Gem instructions",
        tier: "built",
        source: "Live page metadata",
        verifiedOn: "11 September 2026",
      },
      {
        value: "18",
        label: "categories",
        tier: "built",
        source: "Live page metadata",
        verifiedOn: "11 September 2026",
      },
    ],
    stack: ["TypeScript", "SPA", "Web platform"],
    links: [
      { label: "Open GemVault Pro", href: "https://gemvault-app.higgsfield.app/gems", kind: "live" },
    ],
    connectsTo: [
      {
        slug: "persona-engineering",
        relation: "is the public, usable end of the same reuse argument",
      },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
