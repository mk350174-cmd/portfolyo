import Link from "next/link";
import { SITE, VERIFICATION } from "@/content/site";
import { PROJECTS } from "@/content/projects";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[var(--bg-subtle)]">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="rule-mark mb-4" aria-hidden />
            <p className="t-h3 mb-2">{SITE.name}</p>
            <p className="t-small max-w-xs">
              {SITE.roles.join(" · ")} · {SITE.location}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="link-underline mt-4 inline-block font-mono text-[13px] text-[var(--accent)]"
            >
              {SITE.email}
            </a>
          </div>

          <nav aria-label="Projects">
            <p className="t-eyebrow mb-3.5">Work</p>
            <ul className="space-y-2">
              {PROJECTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="text-[13.5px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <p className="t-eyebrow mb-3.5">Elsewhere</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[13.5px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href="https://gemvault-app.higgsfield.app/gems"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[13.5px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]"
                >
                  GemVault Pro ↗
                </a>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[13.5px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-strong)]"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* The site argues that provenance should be visible, so its own
            verification notes are published rather than kept in a comment. */}
        <div className="mt-12 border-t border-[var(--line)] pt-7">
          <p className="t-eyebrow mb-3">Verification notes</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {VERIFICATION.notes.map((n) => (
              <li key={n.subject} className="text-[12.5px] leading-[1.6] text-[var(--text-muted)]">
                <span className="font-medium text-[var(--text)]">{n.subject}.</span>{" "}
                {n.finding}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[11px] text-[var(--text-faint)]">
            Live sources checked {VERIFICATION.checkedOn}. Figures read from live pages are dated
            where they appear.
          </p>
        </div>
      </div>
    </footer>
  );
}
