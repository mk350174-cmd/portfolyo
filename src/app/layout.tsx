import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { EvidenceProvider } from "@/components/evidence/evidence-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE } from "@/content/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Font weights are kept deliberately narrow. Every extra weight and style is
 * another blocking download, and the full set was costing more than the rest
 * of the page put together. Newsreader appears only in thesis lines and pull
 * quotes, upright and italic at one weight; the mono is labels and figures at
 * two. `latin-ext` is not optional — the site is full of Turkish.
 */
const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono-jb",
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — AI Systems Builder & History Undergraduate`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.github }],
  openGraph: {
    title: `${SITE.name} — AI Systems Builder & History Undergraduate`,
    description: SITE.description,
    type: "website",
    locale: "en",
  },
  robots: { index: true, follow: true },
};

/**
 * Applied before paint so a stored dark theme never flashes light.
 * Kept deliberately tiny and dependency-free.
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('mk.theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <EvidenceProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </EvidenceProvider>
      </body>
    </html>
  );
}
