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
import { PlateFigure } from "@/components/ui/PlateFigure";

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
            <PlateFigure
              src="/media/tamerlane-pieces"
              alt="Five carved wooden pieces of distinctly different shapes standing in a row on a pale background: a tall tapered piece, a stepped block, one with a long curved neck, a low wide block, and a slender piece with a rounded cap."
              caption="Tamerlane chess uses thirteen piece types, several with no modern equivalent — a Giraffe, a Camel, a War Machine. This is a generated study of how such a set might read as objects, not a photograph of surviving pieces. The board below carries the actual rules."
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
          <PlateFigure
            src="/media/steppe-games"
            alt="Overhead view of two wooden board games on a pale background: a long board with two rows of round pits and a larger store at each end, a small pile of smooth pebbles beside it, and a square gridded board with round wooden counters."
            caption="The games in this lab are physical objects before they are code — sowing boards counted in stones, gridded boards played with counters. A generated study of the forms involved, not a record of specific historical artefacts."
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
