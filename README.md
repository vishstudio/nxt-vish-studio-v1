# VISH Studio

VISH Studio is the public website and project-onboarding platform for a Mauritius-based creative technology studio. It presents the studio’s services, pricing, projects, process, team, and testimonials, while collecting structured project briefs from prospective clients.

## Technology

- Next.js 15 App Router and React 19
- TypeScript
- Tailwind CSS 4
- Motion for interaction and reveal animation
- TinaCMS for JSON-backed content and visual editing
- Firebase Firestore for project brief submissions
- Google Analytics and consent-aware cookie settings

The site is statically exported. Features must remain compatible with `output: "export"` unless the deployment architecture is deliberately changed.

## Project structure

```text
src/
├── app/                    Routes, metadata, application shell, global CSS
├── views/                  Page-level compositions
├── components/
│   ├── ui/                 Shared primitives and layout components
│   └── <feature>/          Feature and section components
├── hooks/tina/             TinaCMS visual-editing hooks
├── lib/                    Content mappers, integrations, analytics, domain logic
├── data/                   Stable local datasets
└── types/                  Shared declarations
content/
├── pages/                  Page content
├── projects/               One JSON document per project
├── site/                   Site settings and partners
└── legal/                  Privacy and terms content
tina/config.ts              TinaCMS schema
public/                     Static assets, uploads, service worker, Tina admin
.codex/skills/              Project-local Codex workflow skills
```

New reusable components belong in `src/components/<kebab-name>/<component-file>.tsx`. Search the existing component inventory before adding markup or a new primitive.

## Design system

The source of truth is `src/app/globals.css` and the shared components in `src/components/ui`.

| Role | Token/value |
| --- | --- |
| Background | `vish-bg` / `#000000` |
| Primary text | `vish-text` / `#ffffff` |
| Subtle surface | `vish-subtle` / `#111111` |
| Accent | `vish-accent` / `#ffd600` |
| Secondary text | `vish-gray` / `#a1a1aa` |
| Border | `vish-border` / `#333333` |

Typography uses Space Grotesk for display headings, Inter for body and controls, and Prompt for the logo. The layout uses true-black backgrounds, high-contrast typography, restrained yellow accents, thin translucent borders, rounded controls, generous spacing, and a maximum standard content width of 1400px.

Core primitives include `Button`, `PageLayout`, `PageHero`, `Section`, `SectionTitle`, `ProjectCard`, and `FormField`.

## Routes and features

- `/`: studio overview, selected work, services, process, pricing, and contact
- `/projects` and `/project/[slug]`: portfolio index and case studies
- `/services`: capabilities and service categories
- `/pricing`: service-specific packages, care plans, and add-ons
- `/start-project`: five-step client brief flow for service, package, questionnaire, contact details, and review
- `/about`, `/testimonials`, `/contact`: company and contact content
- `/privacy`, `/terms`: legal content

The Start Project flow reads packages from the canonical pricing data and writes submissions to the Firestore `briefs` collection. The page uses its own fixed progress/action bar and suppresses the global floating project CTA.

## Content and TinaCMS

Editable content lives under `content`. TinaCMS schemas are defined in `tina/config.ts`, with visual-editing hooks under `src/hooks/tina`.

When changing a content field, update:

1. The relevant JSON content.
2. The TinaCMS schema.
3. The TypeScript type/mapper or Tina hook.
4. The consuming component and its `data-tina-field` binding when applicable.

Pricing must be read through `getPricingPage()` rather than copied into components.

## Firebase project briefs

Copy the Firebase web-app configuration into `.env` using the names in `.env.example`:

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

Client initialization and brief creation live in `src/lib/firebase.ts`. Firestore access rules are in `firestore.rules`; deploy them with the Firebase CLI before enabling production submissions.

## Local development

Prerequisite: a current Node.js LTS release.

```bash
npm install
npm run dev
```

Use `npm run dev:next` when TinaCMS is not needed.

Useful commands:

```bash
npm run lint       # TypeScript validation
npm run build      # Tina build plus production static export
npm run clean      # Remove .next and out
npm run deploy     # Build the static deployment output
```

The development site runs at `http://localhost:3000`.

## Environment variables

Start from `.env.example`. It documents variables for site configuration, TinaCMS, Google Analytics, and Firebase. Never commit real tokens or private credentials.

## Development workflow

The project-local Codex skill is located at `.codex/skills/vish-studio-project`. Use `$vish-studio-project` for repository work so implementation follows the established architecture and visual system.

Every project change must update this README in the same change. Update the relevant enduring section with new behavior, routes, components, dependencies, environment variables, data ownership, setup steps, or deployment requirements. Keep this document current; do not use it as a chronological changelog.

Before handing off a change:

1. Confirm existing components were reused where possible.
2. Run `npm run lint`.
3. Run `npm run build` for production-impacting changes.
4. Browser-test visible changes on desktop and mobile.
5. Confirm this README describes the resulting project.
