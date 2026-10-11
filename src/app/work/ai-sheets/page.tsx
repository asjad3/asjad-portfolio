import type { Metadata } from "next";
import { ProjectPage } from "@/components/ProjectPage";
import { SheetsDrawing, SheetsShot } from "@/content/figures";
import { personId, site } from "@/lib/site";

const description =
  "AI Sheets is the spreadsheet agent in Chatly. It turns a single prompt into a multi-sheet workbook with formulas, pivot tables and charts. Asjad Abbas was the feature lead from the first prototype to launch.";

export const metadata: Metadata = {
  title: "AI Sheets",
  description,
  alternates: { canonical: "/work/ai-sheets" },
  openGraph: { type: "article", title: `AI Sheets · ${site.name}`, description, url: "/work/ai-sheets", images: ["/og/ai-sheets.png"] },
  twitter: { card: "summary_large_image", title: `AI Sheets · ${site.name}`, description, images: ["/og/ai-sheets.png"] },
};

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "AI Sheets",
      url: "https://chatly.ai/agent/sheets",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "A spreadsheet agent in Chatly that builds multi-sheet workbooks with formulas, pivot tables and charts from a single prompt.",
      publisher: { "@type": "Organization", name: "Chatly by ImagineArt", url: "https://chatly.ai" },
      contributor: { "@id": personId },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: site.url },
        { "@type": "ListItem", position: 2, name: "AI Sheets", item: `${site.url}/work/ai-sheets` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <ProjectPage
      name="AI Sheets"
      lede="A spreadsheet agent in Chatly that turns a single prompt into a working, multi-sheet workbook. I was the feature lead from the first prototype to launch."
      data={data}
      facts={[
        { label: "Role", value: "Feature lead (product manager)" },
        { label: "Company", value: "Chatly by ImagineArt" },
        { label: "Year", value: "2026" },
        { label: "Status", value: "Live" },
        { label: "Try it", value: <a className="link" href="https://chatly.ai/agent/sheets">chatly.ai/agent/sheets</a> },
      ]}
    >
      <h2>What it does</h2>
      <p>
        You describe the workbook you need, such as a budget, an expense report or an event tracker, and AI Sheets builds it: several
        sheets, working formulas, pivot tables and charts.
      </p>
      <SheetsShot marks={false} />
      <h2>What I did</h2>
      <ul>
        <li>Ran the evaluation of spreadsheet engines and chose the one we licensed, instead of building our own.</li>
        <li>Defined and validated the first version: one prompt in, a complete multi-sheet workbook out.</li>
        <li>Took the feature from prototype to production.</li>
      </ul>
      <SheetsDrawing marks={false} />
    </ProjectPage>
  );
}
