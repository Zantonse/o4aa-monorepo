# O4AA Monorepo

Turborepo monorepo for Okta for AI Agents (O4AA) applications.

## Structure

```
o4aa-monorepo/
├── packages/ui/          ← @o4aa/ui: shared design tokens, types, components
├── apps/knowledge/       ← Knowledge hub (32 sections, 8 newsletters)
├── apps/discovery/       ← Discovery wizard (Gong-derived archetypes)
└── apps/demo/            ← JAG token exchange demo
```

## Commands

- `pnpm dev` — run all apps in parallel
- `pnpm build` — build all (ui first, then apps)
- `pnpm --filter knowledge dev` — run single app
- `pnpm --filter @o4aa/ui build` — build shared package

## Shared Package (@o4aa/ui)

- `@o4aa/ui/tokens` — OKLCH design tokens (CSS)
- `@o4aa/ui/types` — unified TypeScript types
- `@o4aa/ui/components` — shared React components

## Stack

- Next.js 16.2.0 / React 19.2.4
- Tailwind CSS v4 with OKLCH tokens
- Turborepo for build orchestration
- pnpm workspaces

## Vercel Deployment

Each app deploys independently:
- knowledge → root dir `apps/knowledge`
- discovery → root dir `apps/discovery`
- demo → root dir `apps/demo`

@AGENTS.md
