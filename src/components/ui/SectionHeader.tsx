import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The CV's section grammar, reused as the site's.
 *
 * A short teal rule, then a numbered small-caps eyebrow ("01 / FLAGSHIP
 * RESEARCH PROJECT"), then the heading. Taken directly from the document so
 * the site reads as its continuation rather than a different artefact.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  as: Tag = "h2",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <span className="rule-mark mb-5" aria-hidden />
      <p className="t-eyebrow mb-3">
        {index && <span className="text-[var(--text-faint)]">{index} / </span>}
        {eyebrow}
      </p>
      <Tag className={Tag === "h1" ? "t-h1" : "t-h2"}>{title}</Tag>
      {subtitle && (
        <p className="t-body-lg mt-4 text-[var(--text-muted)]">{subtitle}</p>
      )}
      {children}
    </header>
  );
}

/** The CV's pull-quote: pale teal surface with a teal left border. */
export function PullQuote({
  children,
  cite,
  className,
}: {
  children: ReactNode;
  cite?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "border-l-[3px] border-[var(--accent)] bg-[var(--surface)] px-5 py-5 sm:px-7 sm:py-6",
        className,
      )}
    >
      <blockquote className="t-serif text-[1.0625rem] leading-[1.55] text-[var(--text-strong)] sm:text-[1.1875rem]">
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {cite}
        </figcaption>
      )}
    </figure>
  );
}
