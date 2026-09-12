"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A supporting motion study — one reusable plate for all three Flow videos.
 *
 * The design constraints are the interesting part:
 *
 * - The video source is **not in the DOM until it is needed.** Until the plate
 *   scrolls close to the viewport, only the poster exists, so a project page
 *   costs exactly one WebP until the visitor goes looking. That keeps the
 *   video out of LCP contention and off the initial payload entirely.
 * - `prefers-reduced-motion` is honoured by never attaching the source at
 *   all. Those visitors get the poster as a still image, permanently, and the
 *   caption carries the same information either way.
 * - Playback pauses when the plate leaves the viewport, so a video the
 *   visitor has scrolled past stops decoding.
 * - The aspect ratio is reserved up front, so nothing shifts when the poster
 *   or the video arrives.
 *
 * These are interpretive presentation assets, never evidence, so the caption
 * is required rather than optional — the same rule the still plates followed.
 */
export function MotionPlate({
  src,
  poster,
  alt,
  caption,
  label = "Interpretive motion study",
  width = 1280,
  height = 720,
}: {
  src: string;
  poster: string;
  alt: string;
  caption: string;
  label?: string;
  width?: number;
  height?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  /** True once the plate has come near the viewport — mounts the <video>. */
  const [active, setActive] = useState(false);
  /** Tracks whether the plate is on screen right now, to pause when it isn't. */
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Reduced motion: never mount or fetch the video. The poster is the whole
    // experience, and the caption carries the same information.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setOnScreen(entry.isIntersecting);
          if (entry.isIntersecting) setActive(true);
        }
      },
      { rootMargin: "200px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Play/pause runs in its own effect so it fires *after* the <video> has
  // mounted. Doing it inside the observer callback would call play() on a ref
  // that does not exist yet, and with preload="none" the source would then
  // never be fetched at all.
  useEffect(() => {
    const v = videoRef.current;
    if (!active || !v) return;
    if (onScreen) {
      v.play().catch(() => {
        // Autoplay can still be refused; the poster stays visible.
      });
    } else {
      v.pause();
    }
  }, [active, onScreen]);

  return (
    <figure className="border-t border-[var(--line)] pt-5">
      <div
        ref={wrapRef}
        className="relative overflow-hidden bg-[var(--surface)]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {active ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          /* The poster is a pre-optimised WebP standing in before any video
             source exists; next/image would add an optimiser round-trip for an
             asset that is already the right size and format. */
          // eslint-disable-next-line @next/next/no-img-element -- pre-optimised poster, deliberate
          <img
            src={poster}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]">
          {label}
        </span>
        <span className="min-w-0 flex-1 text-[12.5px] leading-[1.55] text-[var(--text-muted)]">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
