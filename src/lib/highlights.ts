import { createHash, randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

// Visitor highlights: a phrase from the site, a highlighter colour, an optional short note and a city.
// Stored in Redis (Vercel KV / Upstash over REST) when configured, otherwise in a local JSON file.

export const INKS = ["lemon", "rose", "mint", "sky"] as const;
export type Ink = (typeof INKS)[number];
export const PAGES = ["/", "/work/ai-sheets", "/work/timefork", "/work/gallerist"] as const;

export type Highlight = {
  id: string;
  quote: string;
  note: string;
  ink: Ink;
  path: string;
  city?: string;
  country?: string;
  createdAt: string;
};

const KEY = "highlights:v1";
const KEEP = 500;
const PER_HOUR = 5;

const kvUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const useKv = Boolean(kvUrl && kvToken);

/** False on a deployment without a database: there's nowhere to save highlights. */
export const storageReady = useKv || !process.env.VERCEL;

async function kv(commands: (string | number)[][]) {
  const res = await fetch(`${kvUrl}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${kvToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`KV request failed with ${res.status}`);
  return (await res.json()) as { result?: unknown; error?: string }[];
}

const file = path.join(process.cwd(), ".data", "highlights.json");
async function readFile(): Promise<Highlight[]> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return [];
  }
}
async function writeFile(list: Highlight[]) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(list, null, 2));
}

export async function listHighlights(limit = 24): Promise<Highlight[]> {
  if (useKv) {
    const [r] = await kv([["LRANGE", KEY, 0, limit - 1]]);
    return ((r?.result as string[] | undefined) ?? []).map((s) => JSON.parse(s) as Highlight);
  }
  return (await readFile()).slice(0, limit);
}

export async function addHighlight(h: Highlight) {
  if (useKv) {
    await kv([
      ["LPUSH", KEY, JSON.stringify(h)],
      ["LTRIM", KEY, 0, KEEP - 1],
    ]);
    return;
  }
  const list = await readFile();
  await writeFile([h, ...list].slice(0, KEEP));
}

export async function removeHighlight(id: string): Promise<boolean> {
  if (useKv) {
    const [r] = await kv([["LRANGE", KEY, 0, -1]]);
    const hit = ((r?.result as string[] | undefined) ?? []).find((s) => (JSON.parse(s) as Highlight).id === id);
    if (hit) await kv([["LREM", KEY, 1, hit]]);
    return Boolean(hit);
  }
  const list = await readFile();
  const next = list.filter((h) => h.id !== id);
  await writeFile(next);
  return next.length !== list.length;
}

// Rate limit per visitor. The key is a salted hash of the IP and expires with the window, so no address is kept.
const windows = new Map<string, { n: number; until: number }>();
export async function allowPost(ip: string): Promise<boolean> {
  const key = `highlights:rate:${createHash("sha256").update(`${process.env.HIGHLIGHTS_SALT ?? "asjad.codes"}:${ip}`).digest("hex").slice(0, 32)}`;
  if (useKv) {
    const [count] = await kv([
      ["INCR", key],
      ["EXPIRE", key, 3600, "NX"],
    ]);
    return Number(count?.result) <= PER_HOUR;
  }
  const now = Date.now();
  const w = windows.get(key);
  if (!w || w.until < now) {
    windows.set(key, { n: 1, until: now + 3_600_000 });
    return true;
  }
  w.n += 1;
  return w.n <= PER_HOUR;
}

// ───────── validation ─────────

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (s: string) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) =>
    e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : (ENTITIES[e.toLowerCase()] ?? m),
  );

export const normalise = (s: string) =>
  s
    .normalize("NFKC")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const pageText = new Map<string, { text: string; at: number }>();
/** The visible text of one of our own pages, so a quote can only be something the site actually says. */
export async function textOfPage(origin: string, page: string): Promise<string> {
  const cached = pageText.get(page);
  if (cached && Date.now() - cached.at < 10 * 60_000) return cached.text;
  const html = await fetch(origin + page, { cache: "no-store" }).then((r) => r.text());
  const main = html.split(/<main[^>]*>/)[1]?.split("</main>")[0] ?? html;
  const text = normalise(decode(main.replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ")));
  pageText.set(page, { text, at: Date.now() });
  return text;
}

const LINKISH = /(https?:\/\/|www\.|\.(com|net|org|io|xyz|co|me|ru|pk)\b|@[a-z0-9-]+\.|\d{7,})/i;
const RUDE = /\b(fuck\w*|shit\w*|bitch\w*|cunt\w*|dick\w*|porn\w*|nigg\w*|fag\w*|retard\w*|whore\w*|slut\w*)\b/i;

export type Draft = { quote?: unknown; note?: unknown; ink?: unknown; path?: unknown; website?: unknown };

/** Returns an error message for the visitor, or the cleaned fields. */
export function clean(d: Draft): { error: string } | { quote: string; note: string; ink: Ink; path: string } {
  if (typeof d.website === "string" && d.website.trim()) return { error: "Something went wrong. Please try again." };
  const quote = typeof d.quote === "string" ? d.quote.replace(/\s+/g, " ").trim() : "";
  const note = typeof d.note === "string" ? d.note.replace(/\s+/g, " ").trim() : "";
  const ink = INKS.includes(d.ink as Ink) ? (d.ink as Ink) : "lemon";
  const page = typeof d.path === "string" && (PAGES as readonly string[]).includes(d.path) ? d.path : null;
  if (!page) return { error: "You can only highlight text on this site." };
  if (quote.length < 3 || quote.length > 160) return { error: "Pick a phrase between a few words and a sentence long." };
  if (note.length > 120) return { error: "Keep the note under 120 characters." };
  if (LINKISH.test(note)) return { error: "Notes can’t include links or contact details." };
  if (RUDE.test(note) || RUDE.test(quote)) return { error: "Please keep it friendly." };
  return { quote, note, ink, path: page };
}

export function newHighlight(fields: { quote: string; note: string; ink: Ink; path: string }, headers: Headers): Highlight {
  const city = headers.get("x-vercel-ip-city");
  return {
    id: randomUUID(),
    ...fields,
    city: city ? decodeURIComponent(city) : undefined,
    country: headers.get("x-vercel-ip-country") ?? undefined,
    createdAt: new Date().toISOString(),
  };
}
