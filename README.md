# Mehmet Koyuncu — interactive portfolio

An interactive portfolio for Mehmet Koyuncu: History undergraduate at Eskişehir Osmangazi
University, and independent builder working on persona engineering, historical game AI, and
evidence-controlled AI systems.

The site's organising idea is taken from his own work: **keep separate the things that are
usually blurred, and label what you actually know.** Every factual statement carries an
evidence tier, and the visitor can filter the whole site by it.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion. No UI library is installed
wholesale — the primitives are hand-built so the design stays a single system.

## How it is organised

```
src/
  content/          Typed content. Data, not presentation.
    site.ts           Identity, navigation, build-time verification notes
    projects.ts       The six projects — every claim carries an evidence tier
    personas.ts       73 persona profiles extracted from the Persona repository
    chess.ts          Engine parameters read from timurlenkmotoru
    pipelines.ts      A-Branch stages and B-Branch modules
    games.ts          The historical games lab inventory
  lib/
    types.ts          EvidenceTier, Claim, Metric, Project
    persona-compiler.ts  A browser port of persona_math/compiler.py
  components/
    evidence/         The Evidence Filter — context, control, and wrapper
    interactive/      The demonstrations: compiler, style map, board, pipelines
    sections/         Page sections
    ui/               Shared primitives
  app/                Routes
docs/
  RESEARCH_AND_DESIGN.md   The research and design document written before implementation
```

### The evidence layer

`src/lib/types.ts` defines four tiers — `built`, `experimental`, `proposed`, `vision`. Every
claim in `projects.ts` is an object carrying one. The filter in
`components/evidence/` reads that property, so filtering is a consequence of how the content is
modelled rather than a UI trick. Excluded material is dimmed, never removed: a visitor should be
able to see what was set aside.

To add a claim, add it to the relevant project's `today`, `howBuilt` or `next` array with its
tier and a `source` naming where it can be checked.

### The interactive pieces

None of them are mock-ups.

- **Persona Compiler** (`lib/persona-compiler.ts`) — a faithful port of
  `persona_math/compiler.py`, running over profiles extracted from the real library. Block
  ranking, the power/ethics axes and the token budget are computed exactly as the Python does.
  The CEID score is deliberately *not* approximated; the UI says so.
- **Persona Style Map** — all 18 chess personas plotted on their real `contempt()` and
  `aspiration_delta()` values from `src/persona.cpp`. Labels are placed by a greedy
  collision-avoidance pass, so the chart stays legible if the values change.
- **Board Explorer** — Tamerlane movement rules implemented from `TIMURLENK_CHESS_SPEC.md`
  and generated live on the 11 × 10 board.
- **Pipeline Flow** and **Control Plane Map** — A-Branch phases and B-Branch modules as named
  in their archives.

## Design system

The palette was sampled directly from the CV PDF rather than invented. White is ~86% of that
document and teal ~0.36%; that ratio is treated as a rule, so teal is a sparse accent and never
a flood. Dark mode is derived from the same navy/teal family — a token swap, not a second brand.

Tokens live in `app/globals.css`. The CV's section grammar — a short teal rule, a numbered
small-caps eyebrow, then the heading — is reused throughout via `ui/SectionHeader`.

## Performance and accessibility notes

- Above-the-fold content uses a CSS entrance animation, never the JavaScript scroll-reveal.
  A reveal component holds its element at `opacity: 0` until React hydrates, which pushes
  Largest Contentful Paint out behind the whole bundle. Anything in the first viewport —
  and especially each page's `<h1>` — must not wait for JavaScript.
- Font weights are kept deliberately narrow; `latin-ext` is required throughout for Turkish.
- Every complex visualisation has a designed mobile form rather than a shrunken one: the
  style map becomes a sortable table carrying the same numbers.
- `prefers-reduced-motion` is respected; no interaction depends on animation to be understood.

## Content rules

1. Never present a proposal as an accomplishment. If it is not built, it is tiered.
2. Only show a figure that can be pointed at. Figures read from a live page carry the date
   they were checked.
3. Link only what resolves. See the verification notes in `content/site.ts`, which are
   published in the site footer rather than kept in a comment.
