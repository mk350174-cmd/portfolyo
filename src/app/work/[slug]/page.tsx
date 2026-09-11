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
            <BoardExplorer />
          </Framed>
        </>
      );
    case "historical-games-lab":
      return (
        <Framed eyebrow="What is in the lab" note="Measured from the archive.">
          <GamesLab />
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
