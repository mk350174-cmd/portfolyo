"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Claim, Project } from "@/lib/types";
import { PROJECTS } from "@/content/projects";
import { Evidenced } from "@/components/evidence/Evidenced";
import { TierChip, EvidenceControl } from "@/components/evidence/EvidenceControl";
import { useEvidence } from "@/components/evidence/evidence-context";
import { Reveal } from "@/components/ui/Reveal";
import { PullQuote } from "@/components/ui/SectionHeader";

/**
 * The shared template for every project page.
 *
 * It answers the seven questions each project must answer — what, why, what
 * exists, how it was built, what it taught, what is next — plus an explicit
 * limits section, which is the one most portfolios leave out.
 */
export function ProjectDetail({
  project,
  children,
}: {
  project: Project;
  children?: ReactNode;
}) {
  const { isActive, ready } = useEvidence();
  const related = project.connectsTo
    .map((c) => ({ ...c, project: PROJECTS.find((p) => p.slug === c.slug) }))
    .filter((c) => c.project);

  const visibleMetrics = project.metrics.filter((m) => !ready || isActive(m.tier));

  return (
    <article>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="border-b border-[var(--line)] pt-12 pb-12 sm:pt-16">
        <div className="container-page">
          {/* CSS entrance, not the JS scroll-reveal: this block contains the
              page's <h1>, which is its Largest Contentful Paint element and
              must not wait for hydration. */}
          <div className="rise">
            <nav aria-label="Breadcrumb" className="mb-8">
              <Link
                href="/#work"
                className="link-underline font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)]"
              >
                ← All work
              </Link>
            </nav>

            <span className="rule-mark mb-5" aria-hidden />
            <p className="t-eyebrow mb-3">
              <span className="text-[var(--text-faint)]">{project.index} / </span>
              {project.kicker}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <h1 className="t-h1">{project.title}</h1>
              <TierChip tier={project.tier} />
            </div>

            <p className="t-body-lg mt-6 max-w-[58ch] text-[var(--text-muted)]">
              {project.summary}
            </p>

            {project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {l.label}
                    <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Metrics strip ──────────────────────────────────────────────── */}
      {project.metrics.length > 0 && (
        <div className="border-b border-[var(--line)] bg-[var(--bg-subtle)]">
          <div className="container-page py-7">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {project.metrics.map((m) => (
                <Evidenced key={m.label} tier={m.tier}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="tabular block text-[26px] font-semibold leading-none tracking-[-0.025em] text-[var(--text-strong)]">
                      {m.value}
                    </span>
                    <span className="mt-2 block text-[12.5px] leading-[1.4] text-[var(--text)]">
                      {m.label}
                    </span>
                    <span className="mt-1.5 block font-mono text-[10px] leading-[1.4] text-[var(--text-faint)]">
                      {m.source}
                      {m.verifiedOn && ` · ${m.verifiedOn}`}
                    </span>
                  </dd>
                </Evidenced>
              ))}
            </dl>
            {visibleMetrics.length === 0 && (
              <p className="mt-3 font-mono text-[11px] text-[var(--text-faint)]">
                Every figure here sits outside the tiers you have selected.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-16">
          <div className="min-w-0">
            {/* ── The question ────────────────────────────────────────── */}
            <Reveal>
              <PullQuote className="mb-14" cite="The question this project explores">
                {project.question}
              </PullQuote>
            </Reveal>

            <Reveal>
              <Block eyebrow="What it is">
                <p className="t-body max-w-[64ch] text-[var(--text)]">{project.what}</p>
              </Block>
            </Reveal>

            <Reveal>
              <Block eyebrow="Why I built it">
                <p className="t-body max-w-[64ch] text-[var(--text)]">{project.why}</p>
              </Block>
            </Reveal>

            {/* Project-specific interactive content. */}
            {children && <div className="mb-14">{children}</div>}

            <Reveal>
              <Block eyebrow="What exists today">
                <ClaimList claims={project.today} />
              </Block>
            </Reveal>

            <Reveal>
              <Block eyebrow="How it was built">
                <ClaimList claims={project.howBuilt} />
              </Block>
            </Reveal>

            <Reveal>
              <Block eyebrow="What it taught me">
                <ol className="space-y-5">
                  {project.learned.map((l, i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        aria-hidden
                        className="tabular mt-[3px] shrink-0 font-mono text-[11px] text-[var(--accent)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="t-body max-w-[60ch] text-[var(--text)]">{l}</p>
                    </li>
                  ))}
                </ol>
              </Block>
            </Reveal>

            <Reveal>
              <Block eyebrow="What is next">
                <ClaimList claims={project.next} />
              </Block>
            </Reveal>

            {/* ── Limits ──────────────────────────────────────────────── */}
            <Reveal>
              <section className="border-l-[3px] border-[var(--tier-proposed)] bg-[var(--tier-proposed-bg)] px-5 py-6 sm:px-7">
                <h2 className="t-eyebrow mb-4 text-[var(--tier-proposed)]">
                  What this project is not
                </h2>
                <ul className="space-y-3">
                  {project.limits.map((l, i) => (
                    <li
                      key={i}
                      className="max-w-[62ch] text-[14px] leading-[1.65] text-[var(--text)]"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-9">
              <div>
                <p className="t-eyebrow mb-3">Evidence filter</p>
                <EvidenceControl variant="compact" />
              </div>

              <div>
                <p className="t-eyebrow mb-3">Built with</p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="font-mono text-[11.5px] text-[var(--text-muted)]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {related.length > 0 && (
                <div>
                  <p className="t-eyebrow mb-3">Connects to</p>
                  <ul className="space-y-4">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/work/${r.slug}`} className="group block">
                          <span className="block text-[14px] font-medium text-[var(--text-strong)] transition-colors group-hover:text-[var(--accent)]">
                            {r.project!.title}
                          </span>
                          <span className="mt-1 block text-[12.5px] leading-[1.5] text-[var(--text-muted)]">
                            {r.relation}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <ProjectPager slug={project.slug} />
    </article>
  );
}

function Block({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="t-eyebrow mb-4">{eyebrow}</h2>
      {children}
    </section>
  );
}

function ClaimList({ claims }: { claims: Claim[] }) {
  return (
    <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {claims.map((c) => (
        <Evidenced key={c.id} tier={c.tier} as="li" className="py-4">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-5">
            <div className="order-2 min-w-0 flex-1 sm:order-1">
              <p className="t-body max-w-[62ch] text-[var(--text)]">{c.text}</p>
              {c.source && (
                <p className="mt-1.5 font-mono text-[10.5px] text-[var(--text-faint)]">
                  {c.source}
                </p>
              )}
            </div>
            <div className="order-1 shrink-0 sm:order-2 sm:pt-1">
              <TierChip tier={c.tier} />
            </div>
          </div>
        </Evidenced>
      ))}
    </ul>
  );
}

function ProjectPager({ slug }: { slug: string }) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? PROJECTS[i - 1] : null;
  const next = i < PROJECTS.length - 1 ? PROJECTS[i + 1] : null;

  return (
    <nav
      aria-label="More projects"
      className="border-t border-[var(--line)] bg-[var(--bg-subtle)]"
    >
      <div className="container-page">
        <div className="grid sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group border-b border-[var(--line)] py-8 transition-colors hover:bg-[var(--bg)] sm:border-b-0 sm:border-r sm:pr-8"
            >
              <span className="t-eyebrow mb-2 block">← Previous</span>
              <span className="t-h3 transition-colors group-hover:text-[var(--accent)]">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group py-8 transition-colors hover:bg-[var(--bg)] sm:pl-8 sm:text-right"
            >
              <span className="t-eyebrow mb-2 block">Next →</span>
              <span className="t-h3 transition-colors group-hover:text-[var(--accent)]">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
