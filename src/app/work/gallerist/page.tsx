import type { Metadata } from "next";
import { ProjectPage } from "@/components/ProjectPage";
import { GalleristDrawing, GalleristShot } from "@/content/figures";
import { personId, site } from "@/lib/site";

const description =
  "Gallerist is a free browser tool for making Product Hunt gallery images. It starts from seven slide layouts instead of a blank canvas and exports at 1270 × 760.";

export const metadata: Metadata = {
  title: "Gallerist: Product Hunt gallery images",
  description,
  alternates: { canonical: "/work/gallerist" },
  openGraph: { type: "article", title: `Gallerist · ${site.name}`, description, url: "/work/gallerist", images: ["/og/gallerist.png"] },
  twitter: { card: "summary_large_image", title: `Gallerist · ${site.name}`, description, images: ["/og/gallerist.png"] },
};

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Gallerist",
      url: "https://galleristapp.vercel.app",
      description,
      applicationCategory: "DesignApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires a modern web browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@id": personId },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: site.url },
        { "@type": "ListItem", position: 2, name: "Gallerist", item: `${site.url}/work/gallerist` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <ProjectPage
      name="Gallerist"
      lede="A free, browser-based editor for Product Hunt gallery images, built around seven slide layouts instead of a blank canvas."
      data={data}
      facts={[
        { label: "Type", value: "Web app" },
        { label: "Price", value: "Free, no sign-up" },
        { label: "Year", value: "2026" },
        { label: "Open it", value: <a className="link" href="https://galleristapp.vercel.app">galleristapp.vercel.app</a> },
      ]}
    >
      <h2>The seven slides</h2>
      <p>
        The Hook, The Evidence, The Trio, The Number, The Praise, The Turn and The Invitation. Each one covers a different part of a launch
        story, from the main claim at the start to the invitation at the end.
      </p>
      <GalleristDrawing marks={false} />
      <h2>Styles</h2>
      <p>
        Eight colourways (Gesso, Porcelain, Butter, Sandstone, Ultramarine, Verdigris, Mulberry and Ink), six paper finishes and four type
        pairings. A style can apply to the whole gallery or to one slide.
      </p>
      <GalleristShot marks={false} />
      <h2>Export</h2>
      <p>
        Slides export as PNGs at 1270 × 760, the size Product Hunt uses for gallery images, at twice the resolution so they stay sharp. There’s
        no account, no watermark and nothing to install.
      </p>
    </ProjectPage>
  );
}
