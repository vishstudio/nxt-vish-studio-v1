# VISH Studio architecture

## Runtime and deployment

- Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4.
- Static export is enabled through `output: "export"` and `trailingSlash: true`.
- GitHub Pages-style output is generated in `out` by `npm run build`/`npm run deploy`.
- Client-side integrations must work in a static deployment.

## Repository ownership

| Path | Responsibility |
| --- | --- |
| `src/app` | Routes, metadata, global shell, global CSS |
| `src/views` | Page-level compositions reused by route files |
| `src/components/ui` | Reusable primitives and layout components |
| `src/components/<feature>` | Focused feature and section components |
| `src/hooks/tina` | TinaCMS visual-editing hooks and normalized content access |
| `src/lib` | Domain types, content mappers, integrations, analytics, utilities |
| `src/data` | Stable local datasets not managed through TinaCMS |
| `content` | JSON content edited through TinaCMS or directly |
| `tina/config.ts` | CMS collections and field schemas |
| `public` | Static assets, uploads, service worker, generated Tina admin |

## Page pattern

Prefer a thin route file that exports metadata and composes an existing view or focused feature component. Wrap standard pages in `PageLayout`; compose content with `PageHero`, `Section`, and section components.

Client components are appropriate for Tina visual editing, Motion, browser events, or interactive state. Keep static route metadata and non-interactive route composition server-rendered where practical.

## Content flow

1. Content lives in `content/pages`, `content/site`, `content/projects`, or `content/legal`.
2. `tina/config.ts` defines the editing schema.
3. `src/lib/content.ts`, domain mappers, and `src/hooks/tina` normalize data.
4. Views/components consume the normalized shape and preserve `data-tina-field` bindings where applicable.

When changing a field, update all four layers together. Avoid hardcoding CMS-owned copy in components.

## Existing integrations

- TinaCMS: content and visual editing.
- Firebase Firestore: project briefs in the `briefs` collection.
- Google Analytics: page and conversion events.
- Service worker: registered globally through `AppShell`.
- Cookie settings and custom cursor: mounted globally through `AppShell`.

## Validation

- `npm run lint`: TypeScript check (`tsc --noEmit`).
- `npm run build`: Tina build when available, followed by Next production build/static export.
- `npm run dev`: TinaCMS plus Next.js on port 3000.
- `npm run dev:next`: Next.js alone on port 3000.

For visible changes, validate the exact interaction at desktop and mobile sizes. Check page identity, non-blank content, framework overlays, console errors, keyboard behavior, fixed positioning, overflow, and screenshots.
