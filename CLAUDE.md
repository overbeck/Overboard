# Overboard — Claude Context

## What this project is

Overboard is a master engineering dashboard for **Overbeck Music Ltd**, a one-person music technology company building custom performance instruments. It is a single-page React app deployed to GitHub Pages at `/overboard`. It tracks hardware systems, firmware repos, schematics, CAD files, component inventory, media, knowledge docs, and business strategy — all in one place.

The owner is also a performing musician. The dashboard serves both as an engineering tool and a business overview.

## Tech stack

- React 19 + TypeScript 5
- Vite 8 (build tool, base path `/overboard`)
- React Router DOM 7 (client-side routing)
- Tailwind CSS 3 (utility classes)
- Lucide React (icons only — no other icon libraries)
- Fonts: Inter (body), JetBrains Mono (monospace/code)
- No backend. All data is static TypeScript files in `src/data/`. Strategy data is fetched live from the GitHub API via `src/services/github.ts`.

## Directory structure

```
src/
  components/layout/   Layout.tsx, Sidebar.tsx
  data/                systems.ts, parts.ts, schematics.ts, repos.ts,
                       stepfiles.ts, media.ts, knowledge.ts, activity.ts,
                       strategy.ts (fallback only)
  pages/               Dashboard.tsx, Systems.tsx, Strategy.tsx,
                       Schematics.tsx, Parts.tsx, Media.tsx,
                       Knowledge.tsx, Repos.tsx, StepFiles.tsx
  pages/systems/       SystemDetail.tsx
  services/            github.ts (GitHub Contents API for strategy.json)
  types/               index.ts (all TypeScript interfaces)
  App.tsx              Router setup
  main.tsx
  index.css            Global styles + component layer
strategy.json          Live strategy data (read/written via GitHub API)
```

## Design system

### Colour palette (exact values — do not deviate)

| Role | Value |
|------|-------|
| Page background | `#080808` |
| Card background | `#1a1a1a` (via `.card`) |
| Sidebar background | `#0c0c0c` |
| Primary border | `#2a2a2a` (via `.card`), `#1e1e1e` (layout borders) |
| Subtle border | `#222` |
| Primary text | `#f0f0f0` |
| Secondary text | `#888` or `#666` |
| Muted text | `#555` or `#444` |
| Dim text | `#333` |
| Pink accent (Pink Elephant) | `#f472b6` |
| Purple accent (Purple Jellyfish) | `#a78bfa` |
| Silver accent (Silver Dolphin) | `#94a3b8` |
| Emerald (active / strategy) | `emerald-400/500/950` classes |
| Amber (immediate actions) | `amber-400/500/950` classes |
| Blue (complete) | `blue-400/500/950` classes |

### CSS component classes (defined in `src/index.css`)

- `.card` — `bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg`
- `.tag` — small monospace pill with border, used for labels/badges
- `.btn`, `.btn-primary`, `.btn-ghost` — button variants
- `.sidebar-link`, `.sidebar-link.active` — nav items

### Layout conventions

- Pages use `<div className="p-6 space-y-6 max-w-[1400px]">` as root
- Section headings: `text-xs font-mono text-[#555] uppercase tracking-widest`
- Cards use `hover:border-[#333] transition-colors` for interactive hover
- Icons from Lucide React, sized 12–16px for UI chrome, 13–14px for content

## Coding conventions

- No comments unless the WHY is genuinely non-obvious
- No multi-line docstrings
- No unnecessary abstractions — three similar lines beats a premature helper
- TypeScript interfaces live in `src/types/index.ts`
- Data files export named const arrays (e.g. `export const parts: Part[] = [...]`)
- Pages are default exports, no named exports from page files
- Tailwind only — no inline `style=` except for dynamic values (widths, colours from data)
- Never use emojis

## Systems in the data

| ID | Name | Accent |
|----|------|--------|
| `pink-elephant` | Pink Elephant | pink (`#f472b6`) |
| `purple-jellyfish` | Purple Jellyfish | purple (`#a78bfa`) |
| `silver-dolphin` | Silver Dolphin | silver (`#94a3b8`) |

Manibus is a planned system not yet in the data. It can be added as a fourth system when there is enough detail to fill the fields properly.

## What is in scope for autonomous improvements

- UI improvements: new filters, better empty states, usability wins
- New pages or sections that fit the existing data model
- Adding realistic mock data (new parts, knowledge docs, activity items)
- Improving the Strategy page (richer views, better UX)
- Performance and code quality improvements
- Better mobile/responsive handling
- Accessibility improvements

## What is out of scope

- Adding a real backend or database
- Changing the GitHub Pages deployment setup
- Removing existing pages or data
- Changing the dark colour scheme to light
- Adding dependencies beyond what already exists (no new npm packages without a strong reason)
- Pushing directly to `main`

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build (must pass before committing)
npm run lint     # ESLint
```

The build **must pass** (`npm run build` exits 0) before any commit. Fix all TypeScript and lint errors.
