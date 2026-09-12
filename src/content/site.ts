/**
 * Site-level identity and navigation.
 *
 * Personal data follows the supplied privacy rule: name, city-level location,
 * public email and public GitHub are published; the phone number in the CV is
 * deliberately omitted.
 */

/**
 * The site's own absolute URL, used for `metadataBase`, the sitemap and the
 * Open Graph image.
 *
 * It has to be absolute — social scrapers will not follow a relative image
 * path — which makes a hardcoded domain a liability before DNS exists.
 * `mehmetkoyuncu.dev` does not resolve yet, so this prefers, in order: an
 * explicit `NEXT_PUBLIC_SITE_URL`, the host the platform reports at build
 * time, and only then the intended custom domain. The effect is that social
 * previews work on whatever URL the site is actually served from, and switch
 * to the custom domain the moment it is pointed at the deployment.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const platformHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (platformHost) return `https://${platformHost.replace(/\/+$/, "")}`;

  return "https://mehmetkoyuncu.dev";
}

export const SITE = {
  name: "Mehmet Koyuncu",
  roles: ["AI Systems Builder", "History Undergraduate"],
  location: "Eskişehir, Türkiye",
  email: "mk350174@gmail.com",
  github: "https://github.com/mk350174-cmd",
  university: "Eskişehir Osmangazi University",
  degree: "B.A. in History",
  graduation: "2030",
  url: resolveSiteUrl(),

  /** The one sentence the whole site exists to support. */
  thesis:
    "Keep separate the things that are usually blurred — and label what you actually know.",

  description:
    "History undergraduate and independent builder working on persona engineering, historical game AI, and evidence-controlled AI systems.",
} as const;

export const NAV = [
  { label: "Work", href: "/#work" },
  { label: "The idea", href: "/#thesis" },
  { label: "How it connects", href: "/#ecosystem" },
  { label: "About", href: "/about" },
] as const;

/**
 * Verification notes recorded at build time, per the supplied verification
 * rules. These are surfaced on the site rather than hidden, because the
 * portfolio's argument is that provenance should be visible.
 */
export const VERIFICATION = {
  checkedOn: "11 September 2026",
  notes: [
    {
      subject: "GemVault Pro",
      finding:
        "Live and serving. Its own page metadata states 735 Gem instructions across 18 categories.",
      status: "verified" as const,
    },
    {
      subject: "Persona library size",
      finding:
        "495 unique profiles, counted from the six category files in the source archive. The raw entries total 534, of which 39 are duplicated across files.",
      status: "verified" as const,
    },
    {
      subject: "Tamerlane engine repository",
      finding:
        "The repository URL printed in the CV does not currently resolve publicly, so it is not linked here. The engine's evidence on this site is drawn from the source archive instead.",
      status: "correction" as const,
    },
  ],
} as const;
