import Link from "next/link";
import { PROJECTS } from "@/content/projects";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page">
        <span className="rule-mark mb-5" aria-hidden />
        <p className="t-eyebrow mb-3">404</p>
        <h1 className="t-h1">That page does not exist.</h1>
        <p className="t-body mt-5 max-w-[52ch] text-[var(--text-muted)]">
          Nothing here — which is at least an honest label. Try one of these instead.
        </p>
        <ul className="mt-9 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group flex items-baseline gap-4 py-3.5 transition-colors hover:text-[var(--accent)]"
              >
                <span className="tabular font-mono text-[11px] text-[var(--text-faint)]">
                  {p.index}
                </span>
                <span className="text-[15px] font-medium text-[var(--text-strong)] transition-colors group-hover:text-[var(--accent)]">
                  {p.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="link-underline mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)]"
        >
          ← Back home
        </Link>
      </div>
    </section>
  );
}
