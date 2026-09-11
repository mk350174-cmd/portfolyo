import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/content/site";
import { SectionHeader, PullQuote } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "A History undergraduate at Eskişehir Osmangazi University building AI systems, and why the two are the same project.",
};

const WORKSHOPS = [
  {
    title: "From a question to a prototype",
    body: "A session that starts with a question from the participant's own discipline — not a coding exercise. They use Claude to narrow the task, find source material, define a small output, then build something and inspect where it fails. They leave with an artefact and a written record of what is still uncertain.",
  },
  {
    title: "Compare three ways of asking",
    body: "The same research task run three ways: a bare task prompt, a short role prompt, and a structured persona. Participants set their criteria in advance and compare. It introduces the persona idea as an open question rather than a conclusion, and gives people practice judging AI output on something other than how confident it sounds.",
  },
  {
    title: "History as an interactive system",
    body: "A short guided game of Tamerlane chess, then the same position played by different opponent settings. The session separates three things people routinely merge: the historical sources, the authored character interpretation, and what the engine actually computes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-[var(--line)] pt-12 pb-16 sm:pt-16">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div className="min-w-0">
              {/* CSS entrance: contains the page's <h1> / LCP element. */}
              <div className="rise">
                <SectionHeader
                  as="h1"
                  eyebrow="About"
                  title="A history student who ships C++."
                  subtitle="I am a first-year undergraduate reading History at Eskişehir Osmangazi University. I also write search code, test harnesses and control planes. Those are not two lives."
                />
              </div>

              <div className="rise rise-2 mt-10 max-w-[64ch] space-y-5">
                  <p className="t-body">
                    Historians are trained to do something that turns out to be rare
                    in software: decide what a source can and cannot establish. You
                    hold apart what a document says, what you infer from it, and what
                    you filled in because the evidence stopped. You record where you
                    did the filling, so someone with better evidence can overturn you
                    cleanly.
                  </p>
                  <p className="t-body">
                    That is the whole of my engineering practice. A persona library
                    that never lets a simulated number be labelled a measurement. A
                    chess engine whose status document lists the claims its own
                    earlier documents got wrong. A control plane built so that finding
                    something and confirming it cannot be the same event.
                  </p>
                  <p className="t-body">
                    I build with Claude and Claude Code — architecture, implementation,
                    debugging, testing, documentation. The tooling is genuinely good
                    and I am not going to pretend otherwise. What stays mine is the
                    direction, the interpretation, and the decision about what a result
                    is allowed to claim. Those are the parts I am trying to get better
                    at, and they are also the parts that do not get easier when the
                    tools improve.
                  </p>
              </div>

              <div className="rise rise-3">
                <PullQuote className="mt-10 max-w-[58ch]">
                  A history student should be able to explore software and AI without
                  leaving their discipline behind. Mine turned out to be the most
                  useful thing I brought.
                </PullQuote>
              </div>
            </div>

            {/* Also CSS, not JS: the portrait is this page's LCP candidate. */}
            <div className="rise rise-1 order-first lg:order-none">
              <div className="w-[128px] sm:w-[160px] lg:w-[220px]">
                <div className="overflow-hidden rounded-sm border border-[var(--line)]">
                  <Image
                    src="/mehmet-koyuncu.jpg"
                    alt="Mehmet Koyuncu"
                    width={456}
                    height={640}
                    priority
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 220px"
                    className="h-auto w-full"
                  />
                </div>
                <dl className="mt-5 space-y-3 font-mono text-[11px] leading-[1.5]">
                  <div>
                    <dt className="text-[var(--text-faint)]">Reading</dt>
                    <dd className="text-[var(--text)]">{SITE.degree}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--text-faint)]">At</dt>
                    <dd className="text-[var(--text)]">{SITE.university}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--text-faint)]">Expected</dt>
                    <dd className="text-[var(--text)]">{SITE.graduation}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--text-faint)]">Based in</dt>
                    <dd className="text-[var(--text)]">{SITE.location}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--text-faint)]">Interests</dt>
                    <dd className="text-[var(--text)]">
                      Digital humanities, historical strategy, cultural interpretation
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="What I want to do next"
              title="Teach this to people who do not code."
              subtitle="I want to run workshops for students whose starting point is not computer science — because the humanities training is an advantage here, and almost nobody tells them so."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
              {WORKSHOPS.map((w, i) => (
                <div key={w.title} className="border-t border-[var(--line)] pt-5">
                  <span
                    aria-hidden
                    className="tabular mb-3 block font-mono text-[11px] text-[var(--accent)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mb-2.5">{w.title}</h3>
                  <p className="text-[13.5px] leading-[1.65] text-[var(--text-muted)]">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 border-l-[3px] border-[var(--tier-proposed)] bg-[var(--tier-proposed-bg)] px-5 py-4">
              <p className="max-w-[70ch] text-[13.5px] leading-[1.65] text-[var(--text)]">
                <span className="font-semibold">These are proposals.</span> No workshop
                has run yet and no programme or team exists. They are written down here
                because I would like someone to help me run the first one, not because
                they are an accomplishment.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Collaboration */}
      <section className="border-t border-[var(--line)] bg-[var(--bg-subtle)] py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <Reveal>
              <SectionHeader
                index="02"
                eyebrow="Collaboration"
                title="What I need is disagreement."
              />
            </Reveal>
            <Reveal delay={0.06}>
              <div className="max-w-[62ch] space-y-4">
                <p className="t-body text-[var(--text-muted)]">
                  Historians could tell me where my game reconstructions are wrong, and
                  which of my implementation decisions the sources do not support.
                  Engineers could break the evaluation design before I publish a result
                  that rests on it. Designers could tell me that an interface I find
                  obvious is not. Students could play the games and reveal which rules
                  never landed.
                </p>
                <p className="t-body text-[var(--text-muted)]">
                  I am aware that the riskiest thing about working this way, alone and
                  quickly, is that nothing has been checked by anyone who did not
                  already agree with me. The evidence labels on this site are an
                  attempt to make that visible rather than to solve it. Actually
                  solving it needs other people.
                </p>
                <p className="pt-2">
                  <Link
                    href="/#contact"
                    className="link-underline font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]"
                  >
                    Get in touch →
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
