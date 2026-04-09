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

**Single-page layout:** `src/app/page.tsx` composes all section components in order. Nav and footer live in `src/components/layout/`.

**Sections** (`src/components/sections/`) are self-contained and use Framer Motion's `useInView` to trigger scroll animations. Each section is a `"use client"` component.

**Static data** lives in `src/lib/projects.ts` — projects array, skills list, and timeline entries. Edit this file to update portfolio content.

**GitHub contributions** are fetched at runtime via `src/app/api/github/contributions/route.ts` using a GraphQL query. Requires `GITHUB_TOKEN` env var.

## Styling Conventions

- CSS variables for the color palette (defined in `src/app/globals.css`): `--bg-primary`, `--text-primary`, etc.
- Playfair Display for headings, JetBrains Mono for labels/metadata, Inter for body
- Consistent animation easing: `[0.25, 0.1, 0.25, 1]`
- Stagger animations use incremental `delay` on child variants

## Tailwind CSS v4 Notes

v4 uses `@import "tailwindcss"` in CSS instead of `@tailwind` directives. Config is via `postcss.config.mjs`, not `tailwind.config.js`. Utility classes and some APIs differ from v3 — check `node_modules/next/dist/docs/` for Next.js specifics.
