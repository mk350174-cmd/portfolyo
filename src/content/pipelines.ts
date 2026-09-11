/**
 * A-Branch and B-Branch structure, read from the archives.
 *
 * A-Branch phases come from `FULL_PIPELINE_SYSTEM_MAP.md`; B-Branch module
 * names come from the header comment of each `src/bNN/index.ts`.
 */

export interface Phase {
  id: string;
  name: string;
  output?: string;
}

export interface Stage {
  id: string;
  label: string;
  title: string;
  role: string;
  phases: Phase[];
  /** The handoff this stage produces, where it is a frozen contract. */
  handoff?: { name: string; frozen: boolean; note: string };
}

export const A_BRANCH_STAGES: Stage[] = [
  {
    id: "p1",
    label: "P1",
    title: "Research",
    role: "Establish what is actually known, and keep verification separate from retrieval.",
    phases: [
      { id: "P1.01", name: "Input initialisation", output: "ResearchRequest" },
      { id: "P1.02", name: "Scope proposal", output: "ResearchScope" },
      { id: "P1.03", name: "Domain research", output: "VerifiedClaims[]" },
      { id: "P1.04", name: "Claim verification", output: "VerifiedClaims[]" },
      { id: "P1.05–06", name: "Synthesis", output: "Analysis" },
      { id: "P1.07", name: "Handoff assembly", output: "ResearchPackage" },
    ],
    handoff: {
      name: "ResearchPackage",
      frozen: false,
      note: "Claims carry their verification state forward; nothing downstream may upgrade them.",
    },
  },
  {
    id: "p2",
    label: "P2",
    title: "Creative",
    role: "Turn verified material into a plan — and stop changing it once it is agreed.",
    phases: [
      { id: "P2.01", name: "Ingest & reference discovery", output: "ReferenceUniverse" },
      { id: "P2.02", name: "Understanding", output: "UnderstandingAnalysis" },
      { id: "P2.03", name: "Creative strategy", output: "CreativeStrategy" },
      { id: "P2.04", name: "Format & duration decision", output: "FormatDecision" },
      { id: "P2.05", name: "Manual research / observation", output: "Observations[]" },
      { id: "P2.06", name: "Visual direction", output: "VisualLanguage" },
      { id: "P2.07", name: "Asset planning", output: "AssetRequirements" },
      { id: "P2.08", name: "Scene & shot planning", output: "SceneShots[]" },
      { id: "P2.09", name: "Flow prompt direction", output: "PromptList[]" },
      { id: "P2.10", name: "Voice specification", output: "VoiceSpec" },
      { id: "P2.11", name: "Production package approval", output: "ProductionPackage" },
    ],
    handoff: {
      name: "ProductionPackageHandoff",
      frozen: true,
      note: "Frozen on approval. Production may arrange what it was given; it may not invent.",
    },
  },
  {
    id: "p3",
    label: "P3",
    title: "Production",
    role: "Assemble, render and check — with no creative authority of its own.",
    phases: [
      { id: "P3.01", name: "Ingest + validation", output: "ResolvedAsset[]" },
      { id: "P3.02", name: "Asset decodability", output: "AssetProbeRecord[]" },
      { id: "P3.03", name: "Asset matching", output: "ResolvedAsset[]" },
      { id: "P3.04", name: "Piper preview", output: "PiperPreviewResult" },
      { id: "P3.05", name: "ElevenLabs production voice", output: "ProductionVoiceResult" },
      { id: "P3.06", name: "Timing — master clock", output: "TimingResult" },
      { id: "P3.07", name: "Timeline + motion validation", output: "Timeline" },
      { id: "P3.08", name: "Remotion render", output: "RenderManifest" },
      { id: "P3.09", name: "Automated QA", output: "QAReport" },
      { id: "P3.10", name: "Delivery", output: "DeliveryRecord" },
    ],
    handoff: {
      name: "FinalDeliveryPackage",
      frozen: false,
      note: "Quality checks run after the render, not as a substitute for it.",
    },
  },
];

export interface Module {
  id: string;
  name: string;
  /** What kind of work it does — drives the grouping in the diagram. */
  role: "foundation" | "intelligence" | "strategy" | "external" | "control";
  note: string;
}

export const B_BRANCH_MODULES: Module[] = [
  {
    id: "B00",
    name: "Governance foundation",
    role: "foundation",
    note: "Evidence and provenance types, audit trail, hashing, identity, governance contracts. Every other module builds on it.",
  },
  {
    id: "B01",
    name: "Brand & ecosystem intelligence",
    role: "intelligence",
    note: "Ecosystem discovery, role classification, territory rules, canonical state versioning.",
  },
  {
    id: "B02",
    name: "Content intelligence",
    role: "intelligence",
    note: "Strategic opportunity evaluation and classification.",
  },
  {
    id: "B03",
    name: "Audience intelligence",
    role: "intelligence",
    note: "Audience modelling shared with the strategy modules.",
  },
  {
    id: "B04",
    name: "Positioning",
    role: "intelligence",
    note: "Positioning analysis over the intelligence layer.",
  },
  {
    id: "B05",
    name: "Creative synthesis",
    role: "strategy",
    note: "Strategic creative direction and the constraints that bound it.",
  },
  {
    id: "B06",
    name: "Distribution strategy",
    role: "strategy",
    note: "Channel and distribution planning.",
  },
  {
    id: "B07",
    name: "Performance framework",
    role: "strategy",
    note: "How performance is to be judged, decided before the results arrive.",
  },
  {
    id: "B08",
    name: "Analytics strategy · external reach",
    role: "external",
    note: "The only module that reaches outside the system. Retrieval succeeding does not make what it retrieved verified.",
  },
  {
    id: "B09",
    name: "Learning loops",
    role: "control",
    note: "Feeding outcomes back without letting them silently rewrite the record.",
  },
  {
    id: "B10",
    name: "Continuous optimisation",
    role: "control",
    note: "Ongoing adjustment within the approved strategy.",
  },
  {
    id: "B11",
    name: "Risk & compliance",
    role: "control",
    note: "Where an action can be refused.",
  },
  {
    id: "B12",
    name: "State management",
    role: "control",
    note: "Canonical state and persistence across the whole plane.",
  },
];

/** The three steps B-Branch refuses to collapse. */
export const TRUST_STEPS = [
  {
    id: "retrieve",
    label: "Retrieve",
    where: "B08 only",
    body: "Something was found. That is all this establishes. The result enters the system marked as retrieved and nothing more.",
  },
  {
    id: "verify",
    label: "Verify",
    where: "Separate phase",
    body: "Something was checked against a standard. A successful fetch is not a check — the README states this outright, and the type system enforces it.",
  },
  {
    id: "approve",
    label: "Approve",
    where: "Governance review",
    body: "Someone decided to act. Verification does not imply approval; approval is a distinct, recorded event.",
  },
];
