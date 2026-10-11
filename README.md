# asjad.codes

Personal site of Asjad Abbas, product manager at ImagineArt.

Each featured project pairs a short description with evidence: a live screenshot, source code or a measured number. A highlighted phrase and the evidence for it share one highlighter colour, and hovering either lights up both.

## Run

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
npm start        # serve the build
```

## Where things live

| Path | What |
|---|---|
| `src/components/Hero.tsx`, `About.tsx`, `MoreProjects.tsx` | Home page sections |
| `src/content/featured.tsx` | The three featured projects on the home page |
| `src/content/figures.tsx` | Screenshots, code and drawings, shared by the home page and project pages |
| `src/content/work.ts` | The "More projects" list |
| `src/app/work/*/page.tsx` | One page per featured project, each with its own metadata and structured data |
| `src/lib/site.ts` | Name, role, links and description used across pages, metadata and JSON-LD |
| `src/app/sitemap.ts`, `robots.ts`, `manifest.ts` | Search and crawler files |
| `public/llms.txt`, `public/llms-full.txt` | Plain-text summaries for language models |
| `public/og*.png` | Share images |
| `src/assets/plates/` | Pencil drawings generated with ImagineArt, toned to the page colours |

## Visitor highlights

Visitors can select any line on the site, pick a highlighter colour and leave a short note. The latest ones are listed on the home page with the visitor's city.

- `src/components/Highlighter.tsx`: the select-to-highlight button and composer
- `src/components/VisitorHighlights.tsx`: the list on the home page
- `src/app/api/highlights/route.ts` and `src/lib/highlights.ts`: the API, storage and checks

What the API checks:
- The quote must appear on the page it came from.
- Notes are capped at 120 characters, with no links or contact details and a basic profanity filter.
- There's a hidden trap field for bots.
- Each visitor can post 5 times an hour. The limit is tracked by a salted hash of their IP, which expires after the hour.

**Storage.** Locally, highlights are saved to `.data/highlights.json` (gitignored). On Vercel, connect an Upstash Redis store from the Marketplace, which sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`. Until you do, posting returns "not switched on yet".

**Removing one.** Set `HIGHLIGHTS_ADMIN_TOKEN`, then run:

```sh
curl -X DELETE "https://asjad.codes/api/highlights?id=ID" -H "Authorization: Bearer $HIGHLIGHTS_ADMIN_TOKEN"
```

See `.env.example`.

## Rules

- One typeface: Atkinson Hyperlegible Next. No monospace UI text. Code samples use the system monospace.
- Highlighter colours only pair a phrase with its evidence.
- Plain, first-person copy. No taglines, eyebrow labels or status pills.
