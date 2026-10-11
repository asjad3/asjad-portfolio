"use client";

import { useEffect, useState } from "react";

type Highlight = {
  id: string;
  quote: string;
  note: string;
  ink: string;
  path: string;
  city?: string;
  country?: string;
  createdAt: string;
};

const pages: Record<string, string> = { "/work/ai-sheets": "AI Sheets", "/work/timefork": "timefork", "/work/gallerist": "Gallerist" };
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function ago(iso: string) {
  const s = (new Date(iso).getTime() - Date.now()) / 1000;
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of steps) if (Math.abs(s) >= secs) return rtf.format(Math.round(s / secs), unit);
  return "just now";
}

function where(h: Highlight) {
  if (h.city) return `Someone in ${h.city}`;
  if (h.country) {
    try {
      return `Someone in ${new Intl.DisplayNames(["en"], { type: "region" }).of(h.country)}`;
    } catch {}
  }
  return "Someone";
}

export function VisitorHighlights() {
  const [items, setItems] = useState<Highlight[] | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/highlights", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => live && setItems(d.highlights ?? []))
      .catch(() => live && setItems([]));
    const onPost = (e: Event) => {
      const h = (e as CustomEvent<Highlight>).detail;
      if (h) setItems((list) => [h, ...(list ?? []).filter((x) => x.id !== h.id)]);
    };
    addEventListener("highlight:posted", onPost);
    return () => {
      live = false;
      removeEventListener("highlight:posted", onPost);
    };
  }, []);

  if (items === null) return <p className="vh-empty">Loading highlights…</p>;
  if (items.length === 0) return <p className="vh-empty">No highlights yet. Select a line anywhere above and leave the first one.</p>;

  return (
    <ul className="vh-list" aria-live="polite">
      {items.map((h) => (
        <li key={h.id} data-reveal="">
          <blockquote>
            <mark className="ink" data-ink={h.ink}>{h.quote}</mark>
          </blockquote>
          {h.note ? <p className="vh-note">{h.note}</p> : null}
          <p className="vh-meta">
            {where(h)}, {ago(h.createdAt)}
            {pages[h.path] ? (
              <>
                , on{" "}
                <a className="link" href={h.path}>
                  {pages[h.path]}
                </a>
              </>
            ) : null}
          </p>
        </li>
      ))}
    </ul>
  );
}
