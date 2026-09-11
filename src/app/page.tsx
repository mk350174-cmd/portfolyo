import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { EvidenceIntro } from "@/components/sections/EvidenceIntro";
import { Thesis } from "@/components/sections/Thesis";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Contact } from "@/components/sections/Contact";
import { PersonaCompiler } from "@/components/interactive/PersonaCompiler";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <EvidenceIntro />
      <Thesis />
      <WorkIndex />
      <Ecosystem />

      {/* The flagship demonstration sits on the home page as well as its own
          project page, so a visitor who never clicks through still meets it. */}
      <section id="compiler" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              index="04"
              eyebrow="Try the flagship"
              title="Persona before the task."
              subtitle="This is the persona-to-prompt compiler from the Persona repository, ported to run in your browser over profiles from the real library. Choose who is working, then choose how much of them the budget can afford."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10">
              <PersonaCompiler />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <p className="t-body max-w-[60ch] text-[var(--text-muted)]">
                The argument is in the tier switch. A persona is not a sentence you
                paste at the top of a prompt — it is a specification with a cost, and
                deciding which parts survive a hundred-token budget is the actual
                engineering problem.
              </p>
              <Link
                href="/work/persona-engineering"
                className="link-underline whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]"
              >
                Read the project →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  );
}
