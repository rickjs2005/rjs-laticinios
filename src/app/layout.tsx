import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito, Fraunces } from "next/font/google";
import "./globals.scss";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ClickFX } from "@/components/anim/ClickFX";
import { LiquidCursor } from "@/components/anim/LiquidCursor";
import { StickyWhats } from "@/components/ui/StickyWhats";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Intro } from "@/components/intro/Intro";

const display = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

// serifa "soft" editorial — usada só em palavras-acento dos títulos (contraste)
const serif = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = "https://rjslaticinios.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RJS Laticínios — Frescor que vem da fazenda",
    template: "%s · RJS Laticínios",
  },
  description:
    "RJS Laticínios — leite, queijos, manteigas, iogurtes, requeijão e doces frescos, com produção própria e entrega nacional. Qualidade e tradição que a família confia.",
  keywords: [
    "laticínios",
    "leite",
    "queijo",
    "manteiga",
    "iogurte",
    "requeijão",
    "doce de leite",
    "distribuidor de laticínios",
    "RJS",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "RJS Laticínios",
    title: "RJS Laticínios — Frescor que vem da fazenda",
    description:
      "Leite, queijos, manteigas, iogurtes e doces frescos. Produção própria, entrega nacional.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RJS Laticínios — Frescor que vem da fazenda",
    description: "Laticínios frescos com produção própria e entrega nacional.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2e7df6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RJS Laticínios",
    url: SITE_URL,
    description: "Indústria de laticínios — produção própria e entrega nacional.",
    foundingDate: "1998",
  };

  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var f=localStorage.getItem('rjs-flavor');if(f&&f!=='leite')document.documentElement.setAttribute('data-flavor',f);var s=sessionStorage.getItem('rjs-intro-seen');var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(s||rm)document.documentElement.setAttribute('data-intro-skip','1');}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
        <Intro />
        <SmoothScroll>{children}</SmoothScroll>
        <ClickFX />
        <LiquidCursor />
        <StickyWhats />
        <ScrollProgress />
      </body>
    </html>
  );
}
