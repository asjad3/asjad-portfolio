import Link from "next/link";
import type { ReactNode } from "react";
import { Scope } from "./ink";

type Action = { label: string; href: string };

/** A featured project: what it is and what I did (left), the evidence (right), a drawing (below the text). */
export function Project({
  id,
  name,
  meta,
  children,
  actions,
  proof,
  drawing,
}: {
  id: string;
  name: string;
  meta: string;
  children: ReactNode;
  actions: Action[];
  proof: ReactNode;
  drawing: ReactNode;
}) {
  return (
    <Scope as="article" className="project">
      <div className="p-text">
        <h3 id={id}>{name}</h3>
        <p className="meta">{meta}</p>
        <p data-highlightable="">{children}</p>
        <p className="actions">
          {actions.map((a) =>
            a.href.startsWith("/") ? (
              <Link key={a.href} className="link" href={a.href}>
                {a.label} →
              </Link>
            ) : (
              <a key={a.href} className="link" href={a.href}>
                {a.label} ↗
              </a>
            ),
          )}
        </p>
      </div>
      <div className="p-proof">{proof}</div>
      <div className="p-drawing">{drawing}</div>
    </Scope>
  );
}
