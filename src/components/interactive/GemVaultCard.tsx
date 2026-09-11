import { VERIFICATION } from "@/content/site";

/**
 * GemVault Pro.
 *
 * The only project a visitor can open right now, so the panel's job is to
 * get them there. Figures come from the live page's own metadata and are
 * dated, per the verification rule — no adoption or usage numbers are
 * claimed, because none could be checked.
 */
export function GemVaultCard() {
  return (
    <div className="border border-[var(--line)] bg-[var(--bg)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--bg-subtle)] px-4 py-3 sm:px-5">
        <p className="t-eyebrow">Live · verified {VERIFICATION.checkedOn}</p>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-1.5 animate-pulse rounded-full bg-[var(--accent)] motion-reduce:animate-none"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)]">
            Serving
          </span>
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <p className="font-mono text-[11px] text-[var(--text-faint)]">
          gemvault-app.higgsfield.app
        </p>
        <h3 className="t-h2 mt-2">GemVault Pro</h3>
        <p className="t-serif mt-2 text-[16px] italic text-[var(--text-muted)]">
          &ldquo;Yapay Zekayı Ustaca Kullan&rdquo; — use AI skilfully
        </p>

        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          <Stat value="735" label="Gem instructions" />
          <Stat value="18" label="categories" />
          <Stat value="TR" label="interface language" />
          <Stat value="Public" label="no sign-in to browse" />
        </dl>

        <ul className="mt-7 space-y-2">
          {[
            "AI-assisted search across the collection",
            "Dynamic instruction generation",
            "A personal Gem builder",
            "Copy and download on every entry",
          ].map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-[var(--text)]"
            >
              <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              {f}
            </li>
          ))}
        </ul>

        <a
          href="https://gemvault-app.higgsfield.app/gems"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Open the live platform
          <span aria-hidden>↗</span>
        </a>

        <p className="mt-4 text-[12px] leading-[1.6] text-[var(--text-faint)]">
          The item and category counts are read from the platform&rsquo;s own page and
          were checked on the date above; they may have moved since. No usage or
          adoption figures are claimed, because none could be verified.
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="tabular block text-[24px] font-semibold leading-none tracking-[-0.025em] text-[var(--text-strong)]">
          {value}
        </span>
        <span className="mt-1.5 block text-[12px] leading-[1.35] text-[var(--text-muted)]">
          {label}
        </span>
      </dd>
    </div>
  );
}
