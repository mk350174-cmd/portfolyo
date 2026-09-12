import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/content/projects";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { PersonaCompiler } from "@/components/interactive/PersonaCompiler";
import { PersonaStyleMap } from "@/components/interactive/PersonaStyleMap";
import { BoardExplorer } from "@/components/interactive/BoardExplorer";
import { PipelineFlow } from "@/components/interactive/PipelineFlow";
import { ControlPlaneMap } from "@/components/interactive/ControlPlaneMap";
import { GamesLab } from "@/components/interactive/GamesLab";
import { GemVaultCard } from "@/components/interactive/GemVaultCard";
import { MotionPlate } from "@/components/ui/MotionPlate";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

/** The interactive piece each project gets, and the label above it. */
function ProjectInteractive({ slug }: { slug: string }) {
  switch (slug) {
    case "persona-engineering":
      return (
        <Framed
          eyebrow="Run the compiler"
          note="Ported from persona_math/compiler.py and running over profiles from the real library."
        >
          <PersonaCompiler />
        </Framed>
      );
    case "tamerlane-chess":
      return (
        <>
          <Framed
            eyebrow="The evidence for the persona claim"
            note="Each point is a pair of integers from src/persona.cpp — not an illustration of the idea, but the parameters themselves."
          >
            <PersonaStyleMap />
          </Framed>
          <Framed
            eyebrow="Learn the board"
            note="Movement rules implemented from TIMURLENK_CHESS_SPEC.md."
          >
            <MotionPlate
              src="/media/tamerlane-chess-flow.mp4"
              poster="/media/tamerlane-chess-flow-poster.webp"
              alt="Carved wooden chess pieces of several different shapes standing on a teal and cream board, shown in slow close-up."
              caption="Historically inspired visual language, not a reconstruction. Tamerlane chess has thirteen piece types, several with no modern equivalent; the board below carries the actual rules."
            />
            <div className="mt-6">
              <BoardExplorer />
            </div>
          </Framed>
        </>
      );
    case "historical-games-lab":
      return (
        <Framed eyebrow="What is in the lab" note="Measured from the archive.">
          <MotionPlate
            src="/media/historical-games-lab-flow.mp4"
            poster="/media/historical-games-lab-flow-poster.webp"
            alt="Overhead view of traditional board games on a pale surface: a long wooden board with rows of pits holding stones, a gridded board with light and dark counters, and small carved pieces scattered around them."
            caption="A generated study of game forms, not photographs of surviving artefacts. These games are physical objects before they are code: sowing boards counted in stones, gridded boards played with counters."
          />
          <div className="mt-6">
            <GamesLab />
          </div>
        </Framed>
      );
    case "a-branch":
      return (
        <Framed
          eyebrow="Trace the pipeline"
          note="Phases as named in the system map."
        >
          <PipelineFlow />
          <div className="mt-6">
            <MotionPlate
              src="/media/a-branch-flow.mp4"
              poster="/media/a-branch-flow-poster.webp"
              alt="Abstract editorial motion graphic moving through three stages, from research notes to a creative plan to an assembled production timeline."
              caption="A visual metaphor for the research → creative → production pipeline. The diagram above is the actual architecture."
              label="Editorial motion study"
            />
          </div>
        </Framed>
      );
    case "b-branch":
      return (
        <Framed
          eyebrow="The trust boundary"
          note="Thirteen modules, one of which reaches outside."
        >
          <ControlPlaneMap />
        </Framed>
      );
    case "gemvault":
      return (
        <Framed eyebrow="Open it" note="The one project you can use right now.">
          <GemVaultCard />
        </Framed>
      );
    default:
      return null;
  }
}

function Framed({
  eyebrow,
  note,
  children,
}: {
  eyebrow: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="t-eyebrow mb-1.5">{eyebrow}</h2>
      <p className="mb-4 max-w-[62ch] text-[13px] leading-[1.55] text-[var(--text-muted)]">
        {note}
      </p>
      {children}
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <ProjectDetail project={project}>
      <ProjectInteractive slug={slug} />
    </ProjectDetail>
  );
}
