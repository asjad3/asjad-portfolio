import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const title = `${site.name}, Product Manager at ImagineArt`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Asjad",
    lastName: "Abbas",
    username: "asjad3",
    title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.png"] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = { themeColor: "#fbfbfa", width: "device-width", initialScale: 1 };

// Before paint: turns on motion unless the visitor prefers reduced motion or saves data. If the app never
// hydrates, the highlighters and drawings are finished after 2.5 s so nothing stays hidden.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');var c=navigator.connection;if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!(c&&c.saveData))d.classList.add('motion');setTimeout(function(){if(d.classList.contains('hydrated'))return;var q=function(s,k){document.querySelectorAll(s).forEach(function(e){k.forEach(function(x){e.classList.add(x)})})};q('[data-scope]',['inked']);q('[data-living]',['drawn','done','still'])},2500)})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="me" href={site.github} />
        <link rel="me" href={site.linkedin} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="Plain-text summary for language models" />
      </head>
      <body>{children}</body>
    </html>
  );
}
