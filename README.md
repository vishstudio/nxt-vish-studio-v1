# VISH Studio

VISH Studio is the public website and project-onboarding platform for a Mauritius-based creative technology studio. It presents the studio’s services, pricing, projects, process, team, and testimonials, while collecting structured project briefs from prospective clients.

## Technology

- Next.js 15 App Router and React 19
- TypeScript
- Tailwind CSS 4
- Motion for interaction and reveal animation
- Storybook for component review and visual QA
- React Hook Form for structured multi-step form state
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
| Secondary/title muted text | `vish-gray` / `#6A7282` |
| Border | `vish-border` / `#333333` |

Typography uses a Google Sans-first stack for display headings, body copy, controls, and compact labels, while Prompt remains reserved for the logo. The layout uses true-black backgrounds, high-contrast typography, restrained yellow accents, thin translucent borders, rounded controls, generous spacing, and a maximum standard content width of 1400px.

Core primitives include `Button`, `PageLayout`, `PageHero`, `Section`, `SectionTitle`, `ProjectCard`, and `FormField`.

Storybook is configured with `@storybook/nextjs-vite` and imports the global VISH design system from `src/app/globals.css`. Stories live next to their component files as `*.stories.tsx` inside the relevant `src/components/<component-name>` folder, including shared UI primitives and renderable section components. Runtime-only integrations such as analytics and service-worker registration are not given visual stories because they render no inspectable UI.

Shared section headings use `src/components/ui/section-title/section-title.tsx`, which renders the title text in white, the final word in muted grey (`#6A7282` via `text-vish-gray`), and the closing period in the yellow accent to mirror the homepage hero title treatment.

## Routes and features

- `/`: studio overview, selected work, services, process, pricing, and contact
- `/projects` and `/project/[slug]`: portfolio index and case studies
- `/services`: capabilities and service categories
- `/pricing`: service-specific packages, care plans, and add-ons
- `/start-project`: five-step client brief flow for service, package, questionnaire, contact details, and review
- `/about`, `/testimonials`, `/contact`: company and contact content
- `/privacy`, `/terms`: legal content

The Start Project flow reads packages from the canonical pricing data, manages the multi-step questionnaire with React Hook Form, and writes submissions to the Firestore `briefs` collection. Each Firestore document includes the selected service, selected package, contact details, raw answer map, and a labelled `questionnaire` array for easier review. After a successful submission, the page shows a confirmation modal with the brief reference plus the studio email and phone number from site settings; its primary action returns the user to the home page. The page uses website-style step headings with white display text, grey intro copy, and yellow accent punctuation. Its own fixed progress/action bar is always visible so the user can proceed through the multi-step form, step changes scroll the page back to the top, validation blocks only missing essentials, and choice-based questionnaire answers remain optional context instead of hard blockers. The page suppresses the global floating project CTA.

The home hero is optimized around a large editorial rotating typed headline, a primary project-inquiry CTA, a secondary projects link, three concise micro proof signals, a desktop-only capability proof panel, and animated studio stats from `content/pages/home.json` (`heroStats`). The typed headline keeps the white `We build your` prefix fixed, rotates only the grey ending text, holds each complete phrase for five seconds, renders the closing period in the yellow accent, and keeps the description close enough to read as one hero message. The hero keeps the first viewport left-focused and avoids the former selected-work proof panel and animated project-image thumbnails to keep the first viewport responsive; the right side stacks a static capability panel above the compact stats block on desktop. `PageHero` gives the homepage hero a fixed viewport height only from laptop widths upward, and scroll parallax is applied separately to the main content, foreground proof stack, and decorative watermark. On mobile and tablet, the stats render in normal flow below the CTAs instead of as an absolute foreground element, so the hero height follows its content and the recent-work strip begins after clear spacing. Immediately after the hero, `src/components/recent-project-strip/recent-project-strip.tsx` renders the first four home-featured projects from `content/projects` as a full-bleed recent-work image strip before the trusted partners marquee. Its client motion layer in `recent-project-strip-motion.tsx` keeps the same horizontal project order across breakpoints, shows four tall image tiles on desktop with deliberate viewport bleed, shows only the first three on tablet, restores all four as smaller side-by-side tiles on mobile, and uses oversized viewport-relative row widths at each breakpoint so the strip still feels outside the standard layout on tablet and mobile. Scroll progress makes the middle tiles reveal first while the outside tiles slide up more slowly until the row aligns, and the strip keeps extra top breathing room on mobile/tablet so it does not cover the hero stats. The stats render with `src/components/hero-stats/hero-stats.tsx`, use a standard block below the CTA stack below desktop, and switch to a compact two-column right-side block at `xl`. The loader and home hero share the discreet center-left brand watermark from `src/components/brand-watermark/brand-watermark.tsx`, which renders `public/assets/icon-rounded.svg`; the loader still animates the watermark on entry, while the hero keeps it static on load and lets scroll parallax create movement.

The trusted partners section (`src/components/trusted-partners/trusted-partners.tsx`) uses `content/site/partners.json` for its partner list, section label, trust heading, credibility copy, CTA label, and compact proof points. It presents a static trust-building layout with a concise credibility statement, Start Project CTA, linked partner grid, and three compact proof points. It avoids a moving marquee so the section feels calmer, more stable, and more confidence-building.

The homepage About section (`src/components/about/about.tsx`) reads `aboutHeading`, `aboutParagraph1`, and `aboutParagraph2` from `content/pages/home.json`, presenting VISH Studio with a clear title/body hierarchy, concise client-facing agency copy, and generous vertical spacing between the trusted partners and selected work sections.

The homepage Selected Case Studies section (`src/components/projects/projects.tsx`) reads its label, heading, description, CTA label, and home-featured projects from Tina content. It presents projects in normal document flow as a lightweight editorial showcase: one featured project with a large image and concise details, followed by compact supporting project cards. It avoids the previous sticky scroll carousel and active-slide animation so the section remains easier to scan and less performance-heavy.

The global bottom project CTA is suppressed on the homepage until the visitor has scrolled past the selected Projects section, then it resumes the standard idle-aware floating behavior. Pricing and Start Project continue to suppress the global floating CTA.

The global custom cursor is desktop-only and keeps pointer movement outside React render state, using Motion values and pointer events for smoother tracking. Cookie settings are split into a lightweight trigger (`src/components/cookie-settings/cookie-settings-trigger.tsx`) and a deferred settings panel so navbar/footer triggers do not eagerly load the full consent UI.

## Content and TinaCMS

Editable content lives under `content`. TinaCMS schemas are defined in `tina/config.ts`, with visual-editing hooks under `src/hooks/tina`. GitHub Pages deployment uses `npm ci`, so `package-lock.json` is committed and must be kept in sync with `package.json`.

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

Client initialization and brief creation live in `src/lib/firebase.ts`. Firestore access rules are in `firestore.rules`; deploy them with the Firebase CLI before enabling production submissions. The deployed rules must allow the current `briefs` payload shape, including `service`, `package`, `answers`, `questionnaire`, `contact`, `status`, `source`, `createdAt`, and `submittedAt`.

## Local development

Prerequisite: Node.js 20.19 or newer, matching `.nvmrc` and the GitHub Pages workflow. The project `.npmrc` enables `legacy-peer-deps` because TinaCMS currently pulls a few React 18 peer-range packages while the site runs React 19.

```bash
npm install
npm run dev
```

Use `npm run dev:next` when TinaCMS is not needed.

Useful commands:

```bash
npm run lint       # TypeScript validation
npm run build      # Tina build plus production static export
npm run storybook  # Run Storybook locally on port 6006
npm run build-storybook # Build static Storybook output
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
