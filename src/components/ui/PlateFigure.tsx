/**
 * An editorial plate — a supporting image with a catalogue-style caption.
 *
 * Two deliberate choices:
 *
 * 1. A plain `<img>` with an explicit srcset rather than `next/image`. These
 *    are pre-optimised WebP files at two widths, so there is nothing left for
 *    an image optimiser to do, and this keeps them working identically under
 *    a static export. Width and height are set so the box is reserved before
 *    the bytes arrive and nothing shifts.
 *
 * 2. The caption is required, not optional. Every image used here is an
 *    interpretive study rather than a photograph of a surviving object, and
 *    a site that argues about evidence labelling has to label its own
 *    pictures.
 */
export function PlateFigure({
  src,
  alt,
  caption,
  width = 1440,
  height = 936,
  priority = false,
}: {
  /** Base name without the width suffix, e.g. "/media/steppe-games". */
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure className="border-t border-[var(--line)] pt-5">
      <div className="overflow-hidden bg-[var(--surface)]">
        {/* eslint-disable-next-line @next/next/no-img-element --
            Deliberate. These are pre-optimised WebP files at two widths with
            an explicit srcset, lazily loaded below the fold; next/image would
            re-encode an already-optimal asset and tie the page to an image
            optimiser it does not need. The usual LCP and bandwidth arguments
            for next/image do not apply here. */}
        <img
          src={`${src}-1440.webp`}
          srcSet={`${src}-800.webp 800w, ${src}-1440.webp 1440w`}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 768px"
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]">
          Interpretive study
        </span>
        <span className="min-w-0 flex-1 text-[12.5px] leading-[1.55] text-[var(--text-muted)]">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
