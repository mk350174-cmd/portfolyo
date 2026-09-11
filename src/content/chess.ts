/**
 * Tamerlane chess engine data — read out of the `timurlenkmotoru` archive.
 *
 * Piece values and movement rules come from `TIMURLENK_CHESS_SPEC.md` and
 * `include/types.h`. Persona parameters come from `include/persona.h` and
 * `src/persona.cpp`: the `contempt()` and `aspiration_delta()` switch
 * statements, read at psyche ψ = 0.
 *
 * Nothing here is estimated. Every number appears literally in the source.
 */

export interface ChessPersona {
  id: string;
  name: string;
  /** 1-18, the enum value in `PersonaType`. */
  enumValue: number;
  group: "mythological" | "historical";
  /** Draw aversion in centipawns. Higher = refuses draws more strongly. */
  contempt: number;
  /** Aspiration-window half-width in centipawns. Wider = more speculative. */
  aspiration: number;
  /** The characterisation in the source's own comments. */
  note: string;
  /** Special mode this persona unlocks, where one exists. */
  mode?: string;
}

/**
 * The 18 persona modes. `contempt` and `aspiration` are the values returned at
 * ψ = 0; both shift with the psyche scalar (contempt by ψ/10, aspiration by
 * |ψ|/5), and three personas switch to a different regime entirely at the
 * thresholds recorded in `mode`.
 */
export const CHESS_PERSONAS: ChessPersona[] = [
  // ── Turkic-Altaic mythology (v0.4.0 / v0.8.0) ──────────────────────────
  {
    id: "tengri",
    name: "Tengri",
    enumValue: 6,
    group: "mythological",
    contempt: 0,
    aspiration: 25,
    note: "Sky god — pure calculation, maximum depth. The neutral baseline.",
  },
  {
    id: "umay",
    name: "Umay",
    enumValue: 8,
    group: "mythological",
    contempt: -10,
    aspiration: 15,
    note: "Mother goddess — defensive, king safety first. The only persona that prefers a draw.",
    mode: "Shield: below ψ −30 the window halves for a safety-first search.",
  },
  {
    id: "dede_korkut",
    name: "Dede Korkut",
    enumValue: 7,
    group: "mythological",
    contempt: 5,
    aspiration: 18,
    note: "Wise bard — opening-focused, leans on known lines.",
  },
  {
    id: "ilteris",
    name: "İlteriş",
    enumValue: 1,
    group: "mythological",
    contempt: 10,
    aspiration: 18,
    note: "Göktürk Kağan — pragmatic, political intelligence, narrow aspiration.",
  },
  {
    id: "ulgen",
    name: "Ülgen",
    enumValue: 3,
    group: "mythological",
    contempt: 15,
    aspiration: 20,
    note: "Creator god — positional, patient, long-horizon.",
  },
  {
    id: "bozkurt",
    name: "Bozkurt",
    enumValue: 5,
    group: "mythological",
    contempt: 20,
    aspiration: 28,
    note: "Göktürk totem — dynamic, reactive, a tempo hunter.",
  },
  {
    id: "asina",
    name: "Aşina",
    enumValue: 2,
    group: "mythological",
    contempt: 30,
    aspiration: 35,
    note: "Royal wolf clan — will to power, wide aspiration.",
    mode: "Vesuvius: above ψ +60 the window triples and sacrifices get an extra ply.",
  },
  {
    id: "erlik",
    name: "Erlik",
    enumValue: 4,
    group: "mythological",
    contempt: 40,
    aspiration: 35,
    note: "Underworld ruler — aggressive, tactical, sacrifice-oriented.",
    mode: "Dark depth: above ψ +60 the window quadruples for mate search.",
  },
  // ── Historical Turkic commanders (v0.9.0) ──────────────────────────────
  {
    id: "selcuklu",
    name: "Selçuklu",
    enumValue: 15,
    group: "historical",
    contempt: -5,
    aspiration: 15,
    note: "Dandanakan, 1040 — patience and attrition. A draw is temporary.",
  },
  {
    id: "mete_han",
    name: "Mete Han",
    enumValue: 16,
    group: "historical",
    contempt: 15,
    aspiration: 25,
    note: "Xiongnu empire — iron discipline, always the optimal move.",
  },
  {
    id: "fatih",
    name: "Fatih",
    enumValue: 11,
    group: "historical",
    contempt: 20,
    aspiration: 20,
    note: "Constantinople, 1453 — methodical siege, patient pressure. Narrow and deep.",
  },
  {
    id: "kanuni",
    name: "Kanuni",
    enumValue: 12,
    group: "historical",
    contempt: 25,
    aspiration: 25,
    note: "Mohács, 1526 — balanced wings, centre control.",
  },
  {
    id: "timurlenk",
    name: "Timurlenk",
    enumValue: 9,
    group: "historical",
    contempt: 35,
    aspiration: 30,
    note: "Ankara, 1402 — siege plus flanking. Never accepts a draw.",
  },
  {
    id: "baybars",
    name: "Baybars",
    enumValue: 17,
    group: "historical",
    contempt: 40,
    aspiration: 32,
    note: "Ayn Jalut, 1260 — cavalry raid, horse tactics.",
  },
  {
    id: "alparslan",
    name: "Alparslan",
    enumValue: 13,
    group: "historical",
    contempt: 45,
    aspiration: 38,
    note: "Manzikert, 1071 — feigned retreat and envelopment.",
  },
  {
    id: "mahmut_gazne",
    name: "Mahmut of Ghazni",
    enumValue: 18,
    group: "historical",
    contempt: 50,
    aspiration: 42,
    note: "Indian campaigns — strike fast, take resources, withdraw.",
  },
  {
    id: "yildirim",
    name: "Yıldırım",
    enumValue: 10,
    group: "historical",
    contempt: 55,
    aspiration: 45,
    note: "Nicopolis, 1396 — lightning assault, high risk. Victory or collapse.",
  },
  {
    id: "cengiz",
    name: "Cengiz",
    enumValue: 14,
    group: "historical",
    contempt: 60,
    aspiration: 50,
    note: "Mongol storm — overwhelming speed and coordination. The widest window.",
  },
];

/** Every persona also responds to the psyche scalar ψ ∈ [−100, +100]. */
export const PSYCHE_RULES = [
  {
    label: "Necessità",
    trigger: "ψ < −60",
    effect: "The aspiration window halves — an urgent, narrow, decisive search.",
  },
  {
    label: "Vesuvius protocol",
    trigger: "Aşina, ψ > +60",
    effect: "Window ×3, and material-sacrifice lines get an extra ply.",
  },
  {
    label: "Dark depth",
    trigger: "Erlik, ψ > +60",
    effect: "Window ×4, switching the search toward mate.",
  },
  {
    label: "Shield",
    trigger: "Umay, ψ < −30",
    effect: "Window halves into a full defensive posture.",
  },
];

export interface ChessPiece {
  id: string;
  name: string;
  english: string;
  /** Centipawn value from `include/types.h`. */
  value: number;
  movement: string;
  /** Glyph used in the board diagram. */
  glyph: string;
  special?: string;
}

/** All 13 piece types — the 11 classical pieces plus the two promotion royals. */
export const CHESS_PIECES: ChessPiece[] = [
  {
    id: "sah",
    name: "Şah",
    english: "King",
    value: 20000,
    glyph: "♔",
    movement: "One square in any of eight directions.",
    special:
      "May swap places with one friendly piece, once per game. Reaching the opposing citadel is a draw.",
  },
  {
    id: "kale",
    name: "Kale",
    english: "Rook",
    value: 550,
    glyph: "♖",
    movement: "Slides any distance orthogonally.",
  },
  {
    id: "zurafa",
    name: "Zürafa",
    english: "Giraffe",
    value: 480,
    glyph: "♘",
    movement: "One diagonal step, then at least three squares straight out from it.",
  },
  {
    id: "talia",
    name: "Talia",
    english: "Vanguard",
    value: 430,
    glyph: "♗",
    movement: "Diagonal slider with a minimum of two squares; the first square must be empty.",
    special:
      "Corrected in July 2026: it had been implemented as a fixed two-square jump, which the historical source ('moves like the elephant but must go at least two') showed to be wrong.",
  },
  {
    id: "at",
    name: "At",
    english: "Knight",
    value: 325,
    glyph: "♞",
    movement: "The classical (2,1) leap.",
  },
  {
    id: "deve",
    name: "Deve",
    english: "Camel",
    value: 330,
    glyph: "♟",
    movement: "A (3,1) leap — the knight's longer cousin.",
  },
  {
    id: "fil",
    name: "Fil",
    english: "Elephant",
    value: 290,
    glyph: "♝",
    movement: "Leaps exactly two squares diagonally. Colour-bound.",
  },
  {
    id: "savas",
    name: "Savaş Makinesi",
    english: "War Machine",
    value: 260,
    glyph: "♜",
    movement: "Leaps exactly two squares orthogonally.",
  },
  {
    id: "ferz",
    name: "Ferz",
    english: "Ferz",
    value: 160,
    glyph: "♛",
    movement: "One square diagonally.",
  },
  {
    id: "vali",
    name: "Vali",
    english: "Wazir",
    value: 130,
    glyph: "♕",
    movement: "One square orthogonally.",
  },
  {
    id: "piyon",
    name: "Piyon",
    english: "Pawn",
    value: 100,
    glyph: "♙",
    movement: "One square forward — there is no double step — capturing diagonally.",
    special: "Promotes to one of nine pieces; each pawn has its own promotion target.",
  },
  {
    id: "prens",
    name: "Prens",
    english: "Prince",
    value: 400,
    glyph: "♚",
    movement: "Moves like a king but is not royal — it can simply be captured.",
    special: "Part of the historical promotion chain added in July 2026.",
  },
  {
    id: "beklenmedik_sah",
    name: "Beklenmedik Şah",
    english: "Adventitious King",
    value: 5000,
    glyph: "♔",
    movement: "Moves like a king and is royal.",
    special: "A second life: the game continues while this piece stands.",
  },
];

/** Search and verification facts, each traceable to a file in the archive. */
export const ENGINE_FACTS = [
  {
    label: "Board",
    value: "11 × 10 + 2 citadels",
    detail: "112 squares in total. Square = rank × 11 + file.",
    source: "TIMURLENK_CHESS_SPEC.md",
  },
  {
    label: "Piece types",
    value: "13",
    detail: "Eleven classical pieces plus Prince and Adventitious King.",
    source: "include/types.h",
  },
  {
    label: "Persona modes",
    value: "18",
    detail: "Eight from Turkic-Altaic mythology, ten historical commanders.",
    source: "include/persona.h",
  },
  {
    label: "Language",
    value: "C++20",
    detail: "CMAKE_CXX_STANDARD 20, required.",
    source: "CMakeLists.txt",
  },
  {
    label: "Engine source",
    value: "~12,275 lines",
    detail: "Across src/ and include/.",
    source: "src/, include/",
  },
  {
    label: "Test binaries",
    value: "11",
    detail: "Board, movegen, do/undo, perft, evaluation, tactics, opening book, NNUE features, promotion.",
    source: "tests/",
  },
];

export const SEARCH_TECHNIQUES = [
  "Alpha-beta with iterative deepening",
  "Transposition table with prefetch",
  "Late move reductions",
  "Singular extensions",
  "Null-move pruning (zugzwang-guarded)",
  "ProbCut",
  "Quiescence search",
  "Continuation history move ordering",
  "Aspiration windows (persona-controlled)",
  "MultiPV, isolated from persona logic",
];
