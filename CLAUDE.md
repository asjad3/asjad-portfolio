# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
```

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript 5
- Tailwind CSS v4 (PostCSS plugin — not v3, config differs)
- Framer Motion 12 for all animations

## Architecture

**Single-page layout:** `src/app/page.tsx` composes sections in this order: `Nav → Hero → ProjectGrid → FeaturedStack → ContributionCalendar → About → ContactCTA → Footer`.

**Sections** (`src/components/sections/`) are self-contained `"use client"` components. They use Framer Motion's `useInView` to trigger scroll animations.

**Static data** lives in `src/lib/projects.ts` — exports `projects`, `skills`, and `timeline`. Edit this file to update portfolio content.

**GitHub contributions** are fetched at runtime via `src/app/api/github/contributions/route.ts` using a GraphQL query against hardcoded username `asjad3`. Requires `GITHUB_TOKEN` env var. Response is cached for 1 hour via `next: { revalidate: 3600 }`.

## Styling Conventions

- CSS variables defined in `src/app/globals.css` under `:root`: `--bg-primary`, `--bg-card`, `--text-primary`, `--text-muted`, `--text-dim`, `--border`.
- These are re-exposed via `@theme inline` as Tailwind utilities: `bg-bg`, `bg-bg-card`, `text-text`, `text-text-muted`, `text-text-dim`, `border-border`.
- Fonts: Playfair Display (`font-serif`) for headings, JetBrains Mono (`font-mono`) for labels/metadata, Inter (`font-sans`) for body.
- Consistent animation easing: `[0.25, 0.1, 0.25, 1]`
- Stagger animations use incremental `delay` on child variants.
- Global utility classes in `globals.css`: `.noise-overlay`, `.marquee-track`, `.hover-underline`, `.animate-pulse-slow`, `.hero-word`.

## Tailwind CSS v4 Notes

v4 uses `@import "tailwindcss"` in CSS instead of `@tailwind` directives. Config is via `postcss.config.mjs`, not `tailwind.config.js`. Utility classes and some APIs differ from v3 — check `node_modules/next/dist/docs/` for Next.js specifics.
