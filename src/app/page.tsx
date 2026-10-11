import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlighter } from "@/components/Highlighter";
import { Interactions } from "@/components/Interactions";
import { JsonLd } from "@/components/JsonLd";
import { MoreProjects } from "@/components/MoreProjects";
import { Motion } from "@/components/Motion";
import { VisitorHighlights } from "@/components/VisitorHighlights";
import { Featured } from "@/content/featured";
import { personId, site, websiteId } from "@/lib/site";

const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  alternateName: [site.fullName, "asjad3"],
  givenName: "Asjad",
  familyName: "Abbas",
  jobTitle: site.jobTitle,
  description: site.description,
  url: site.url,
  image: `${site.url}/og.png`,
  email: `mailto:${site.email}`,
  worksFor: {
    "@type": "Organization",
    name: site.company.name,
    url: site.company.url,
    parentOrganization: { "@type": "Organization", name: site.company.parent, url: "https://vyro.ai" },
  },
  homeLocation: { "@type": "Place", name: `${site.city}, ${site.country}` },
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "PK" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["Product management", "AI products", "Spreadsheet agents", "Coding agents", "Rust", "TypeScript", "Next.js"],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": websiteId, url: site.url, name: site.name, inLanguage: "en", publisher: { "@id": personId } },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: `${site.name}, Product Manager at ImagineArt`,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      dateModified: site.updated,
      inLanguage: "en",
    },
    person,
    {
      "@type": "ItemList",
      name: "Selected work",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "AI Sheets", url: `${site.url}/work/ai-sheets` },
        { "@type": "ListItem", position: 2, name: "timefork", url: `${site.url}/work/timefork` },
        { "@type": "ListItem", position: 3, name: "Gallerist", url: `${site.url}/work/gallerist` },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <section className="wrap section" id="work" aria-labelledby="work-title">
          <h2 id="work-title" data-reveal="">
            Selected work
          </h2>
          <Featured />
        </section>
        <MoreProjects />
        <About />
        <section className="wrap section" id="highlights" aria-labelledby="highlights-title">
          <h2 id="highlights-title" data-reveal="">
            Highlights from visitors
          </h2>
          <p className="vh-intro" data-reveal="">Select any line on this site to highlight it, and leave a note if you like. The latest ones show up here.</p>
          <VisitorHighlights />
        </section>
      </main>
      <Footer />
      <Interactions />
      <Highlighter />
      <Motion />
      <JsonLd data={structuredData} />
    </>
  );
}
