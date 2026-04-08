import type { Metadata, Viewport } from "next";
import { Playfair_Display, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ParallaxBg } from "@/components/ui/parallax-bg";
import { GridBg } from "@/components/ui/grid-bg";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Asjad \u2014 Selected Works",
  description: "Archive of selected works by Asjad. Full-stack developer and systems thinker.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "32x32" },
      { url: "/favicon.svg", sizes: "16x16" },
    ],
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f0ece4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <SmoothScroll />
        <div id="scroll-progress" />
        <div className="custom-cursor hidden md:block" />
        <ParallaxBg />
        <GridBg />
        <div className="relative z-10">
          {children}
        </div>
        <div className="noise-overlay" />
      </body>
    </html>
  );
}
