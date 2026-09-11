import { SITE } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const OPEN_TO = [
  {
    title: "Collaboration on the research",
    body: "The persona hypothesis needs testing by someone who did not invent it. Historians who can pressure-test the game reconstructions, and engineers who can break the evaluation design, are both more useful to me than agreement.",
  },
  {
    title: "Internships and junior engineering work",
    body: "I write C++ and TypeScript, test what I write, and document what I could not prove. I am a first-year undergraduate and I would rather be the least experienced person in a serious team than the most certain person in an empty room.",
  },
  {
    title: "Workshops for non-CS students",
    body: "I want to run sessions where students start from a question in their own discipline and leave with a working prototype and an honest record of what is still uncertain.",
  },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <SectionHeader
              index="05"
              eyebrow="Contact"
              title="I would like to be argued with."
              subtitle="The fastest way to improve any of this is for someone with more experience to tell me which part does not hold up."
            />

            <div className="mt-9 space-y-4">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center justify-between gap-4 border-b border-[var(--line)] pb-4 transition-colors hover:border-[var(--accent)]"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
                    Email
                  </span>
                  <span className="mt-1 block text-[15px] text-[var(--text-strong)]">
                    {SITE.email}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>

              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-between gap-4 border-b border-[var(--line)] pb-4 transition-colors hover:border-[var(--accent)]"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
                    GitHub
                  </span>
                  <span className="mt-1 block text-[15px] text-[var(--text-strong)]">
                    github.com/mk350174-cmd
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>

              <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-faint)]">
                    Based in
                  </span>
                  <span className="mt-1 block text-[15px] text-[var(--text-strong)]">
                    {SITE.location}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="t-eyebrow mb-5">Open to</p>
            <ul className="space-y-7">
              {OPEN_TO.map((item) => (
                <li key={item.title}>
                  <h3 className="text-[15px] font-semibold text-[var(--text-strong)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[58ch] text-[14px] leading-[1.65] text-[var(--text-muted)]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
