import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Highlighter } from "./Highlighter";
import { JsonLd } from "./JsonLd";

type Fact = { label: string; value: ReactNode };

/** Layout for a single project page: name, one-paragraph summary, details on the left, facts on the right. */
export function ProjectPage({
  name,
  lede,
  facts,
  children,
  data,
}: {
  name: string;
  lede: string;
  facts: Fact[];
  children: ReactNode;
  data: Record<string, unknown>;
}) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" className="wrap page">
        <nav aria-label="Breadcrumb">
          <Link className="crumb link" href="/#work">
            ← All work
          </Link>
        </nav>
        <article>
          <h1>{name}</h1>
          <p className="lede" data-highlightable="">
            {lede}
          </p>
          <div className="page-grid">
            <div className="prose" data-highlightable="">
              {children}
            </div>
            <dl className="facts">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </main>
      <Footer />
      <Highlighter />
      <JsonLd data={data} />
    </>
  );
}
