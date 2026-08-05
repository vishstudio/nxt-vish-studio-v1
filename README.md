# VISH Studio

VISH Studio is the public website and project-onboarding platform for a Mauritius-based creative technology studio. It presents the studio’s services, pricing, projects, process, team, and testimonials, while collecting call booking requests and structured project briefs from prospective clients.

## Technology

- Next.js 15 App Router and React 19
- TypeScript
- Tailwind CSS 4
- Motion for interaction and reveal animation
- Storybook for component review and visual QA
- React Hook Form for structured multi-step form state
- TinaCMS for JSON-backed content and visual editing
- Firebase Firestore for project brief submissions and call booking requests
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

New reusable components belong in `src/components/<kebab-name>/<component-file>.tsx`. Search the existing component inventory before adding markup or a new primitive. React components are declared as functional arrow functions for consistency across `src/components`, `src/views`, and thin `src/app` route wrappers.

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

Typography uses Google Sans for display headings, body copy, controls, and compact labels. Google Sans is loaded in `src/app/layout.tsx` with the Google Fonts stylesheet embed, while Prompt remains loaded through `next/font/google` and reserved for logo-adjacent text. `LogoText` renders the `public/assets/logo-text.svg` wordmark and keeps optional suffixes such as `portal` as regular-weight Prompt text. The layout uses true-black backgrounds, high-contrast typography, restrained yellow accents, thin translucent borders, rounded controls, generous spacing, and a maximum standard content width of 1400px.

Core primitives include `Button`, `PageLayout`, `PageHero`, `Section`, `SectionTitle`, `ProjectCard`, and `FormField`.

Storybook is configured with `@storybook/nextjs-vite` and imports the global VISH design system from `src/app/globals.css`. Stories live next to their component files as `*.stories.tsx` inside the relevant `src/components/<component-name>` folder, including shared UI primitives and renderable section components. Runtime-only integrations such as analytics and service-worker registration are not given visual stories because they render no inspectable UI.

Shared section headings use `src/components/ui/section-title/section-title.tsx`, which renders one-word titles fully white with the closing period in yellow accent, and multi-word titles with the final word muted grey (`#6A7282` via `text-vish-gray`) plus the same accent period. Non-home content sections should use this primitive for visible section titles unless they are compact card labels, modal titles, hero titles, or transactional form step headings.

## Routes and features

- `/`: studio overview, selected work, services, process, pricing, and contact
- `/book-call`: free discovery-call booking request with date/time slot selection, visitor email capture, and Firestore-backed pending booking records for Google Meet invite follow-up
- `/projects` and `/project/[slug]`: portfolio index and case studies
- `/services`: capabilities and service categories for Website, Mobile Apps, SaaS Products, CRM, Softwares, Branding, Dashboard, and ERP work
- `/pricing`: service-specific packages, care plans, and add-ons
- `/start-project`: five-step client brief flow for service, package, questionnaire, contact details, and review
- `/walkthrough`: portal walkthrough page with an app-style sidebar layout, Prompt-based `vish studio portal` logo treatment, workflow steps, status summary, and booking CTA
- `/about`, `/testimonials`, `/contact`: company and contact content. The About page team section uses the shared `Team` component with CMS-backed member data and presents each person as an open rounded-corner portrait profile with the member name and title beneath. Team portraits come from the CMS image path and may reference local public assets such as `/assets/img/vishroy.jpg`. Team profiles render as a swipeable snap carousel with progress dots on mobile, a staggered two-column portrait layout on tablet, and a four-column layout on desktop.
- `/privacy`, `/terms`: legal content

The primary conversion CTA is `Book Free Call`, which routes to `/book-call`. The booking page shows what to expect from a 20-30 minute discovery call, lets visitors choose a date and 30-minute slot from the standard availability window, collects their name/email/company, and writes a Firestore `bookings` document through `createCallBooking()` in `src/lib/firebase.ts`. Booking records include contact details, selected date/time, `startAt`/`endAt` timestamps, duration, timezone, pending status, source, host/public emails, and empty Meet/calendar fields for follow-up. After a successful write, `src/components/book-call-confirmation-modal/book-call-confirmation-modal.tsx` confirms the request and tells the visitor the agency will email the Google Meet invite shortly. Because `hello@vish.studio` redirects to `vishstudio.ltd@gmail.com`, Google Meet links are currently added from Firebase or the client portal after the request is received. The page also keeps a secondary `Start a Project` action, styled like the pricing custom-project CTA, for visitors who already know their scope. On desktop, the left-side call context remains sticky while the visitor scrolls through the booking form.

The Start Project flow reads packages from the canonical pricing data, manages the multi-step questionnaire with React Hook Form, and writes submissions to the Firestore `briefs` collection. Each Firestore document includes the selected service, selected package, contact details, raw answer map, and a labelled `questionnaire` array for easier review. After a successful submission, the page shows a confirmation modal with the brief reference plus the studio email and phone number from site settings; its primary action returns the user to the home page. The page uses website-style step headings with white display text, grey intro copy, and yellow accent punctuation. Its own fixed progress/action bar is always visible so the user can proceed through the multi-step form, step changes scroll the page back to the top, validation blocks only missing essentials, and choice-based questionnaire answers remain optional context instead of hard blockers. The Start Project and Book Call pages suppress the global floating project CTA.

The homepage pricing cards use a `Choose Plan` CTA that opens `src/components/pricing-plan-choice-modal/pricing-plan-choice-modal.tsx`. The modal lets visitors continue to either `/book-call` or `/start-project`, and records pricing-choice analytics for the selected plan and route. Desktop cards reserve extra bottom spacing between package details and the CTA so the action does not sit too close to the supporting text.

The home hero is optimized around a large editorial rotating typed headline, a primary project-inquiry CTA, a secondary projects link, three concise micro proof signals, a desktop-only capability proof panel, and animated studio stats from `content/pages/home.json` (`heroStats`). The typed headline keeps the white `We build your` prefix fixed, rotates only the grey ending text, holds each complete phrase for five seconds, renders the closing period in the yellow accent, and keeps the description close enough to read as one hero message. The hero keeps the first viewport left-focused and avoids the former selected-work proof panel and animated project-image thumbnails to keep the first viewport responsive; the right side stacks a static capability panel above the compact stats block on desktop. `PageHero` gives the homepage hero a fixed viewport height only from laptop widths upward, and scroll parallax is applied separately to the main content, foreground proof stack, and decorative watermark. On mobile and tablet, the stats render in normal flow below the CTAs instead of as an absolute foreground element, so the hero height follows its content and the recent-work strip begins after clear spacing. Immediately after the hero, `src/components/recent-project-strip/recent-project-strip.tsx` renders the first four home-featured projects from `content/projects` as a full-bleed recent-work image strip before the trusted partners marquee. Its client motion layer in `recent-project-strip-motion.tsx` keeps the same horizontal project order across breakpoints, shows four tall image tiles on desktop with deliberate viewport bleed, shows only the first three on tablet, restores all four as smaller side-by-side tiles on mobile, and uses oversized viewport-relative row widths at each breakpoint so the strip still feels outside the standard layout on tablet and mobile. The tiles remain static as individual cards while the full row uses one shared scroll parallax transform, with only the first tile eager-loaded, so the strip keeps motion depth without staggered card reveals. The stats render with `src/components/hero-stats/hero-stats.tsx`, use a standard block below the CTA stack below desktop, and switch to a compact two-column right-side block at `xl`. The homepage FAQ section (`src/components/faq/faq.tsx`) appears after testimonials and before the contact footer, reads `faqHeading`, `faqSubtext`, and `faqItems` from `content/pages/home.json`, and uses the shared `Section` and `SectionTitle` primitives with an accessible accordion interaction. The root document sets a critical black background inline before CSS loads. The loader and home hero share the discreet center-left brand watermark from `src/components/brand-watermark/brand-watermark.tsx`, which renders `public/assets/icon-rounded.svg`; the loader keeps its logo, counter, and status text visible in server-rendered HTML so the first paint is not a blank screen, includes a fallback completion timer, and the hero keeps its watermark static on load while also using a reveal fallback if the loader-ready event is missed.

The trusted partners section (`src/components/trusted-partners/trusted-partners.tsx`) uses `content/site/partners.json` for its partner list, section label, trust heading, credibility copy, CTA label, and compact proof points. It presents a static trust-building layout with a concise credibility statement, Book Free Call CTA, linked partner grid, and three compact proof points. It avoids a moving marquee so the section feels calmer, more stable, and more confidence-building.

The homepage About section (`src/components/about/about.tsx`) reads `aboutHeading`, `aboutParagraph1`, and `aboutParagraph2` from `content/pages/home.json`, presenting VISH Studio with a clear title/body hierarchy, concise client-facing agency copy, and generous vertical spacing between the trusted partners and selected work sections.

The homepage Selected Case Studies section (`src/components/projects/projects.tsx`) reads its label, heading, description, CTA label, and home-featured projects from Tina content. It presents projects in normal document flow as a lightweight editorial showcase: one featured project with a large image and concise details, followed by compact supporting project cards. It avoids the previous sticky scroll carousel and active-slide animation so the section remains easier to scan and less performance-heavy.

The fixed navbar batches scroll measurements with `requestAnimationFrame` and keeps the desktop navigation/CTA mounted during its compact state so the topbar does not reflow heavily while shrinking. Desktop navigation includes `src/components/language-selector/language-selector.tsx` immediately before the Book Free Call CTA; mobile navigation renders the same selector inside the hamburger menu. The selector loads Google Translate on the client, persists the selected language in `localStorage` plus Google’s `googtrans` cookie, keeps the translated language active across route changes and future visits, and suppresses Google’s injected banner, iframe bubble, and tooltip UI through `src/app/globals.css` so only the custom selector is visible. Visible instances of `hello@vish.studio` and footer `vish studio` wordmarks use `translate="no"` with Google’s `notranslate` class so translation keeps brand/contact text exact. The contact footer reads email, phone, address, footer links, and social URLs from `content/site/settings.json`; its large Prompt text watermark stays at the same low-opacity treatment as the hero's background icon watermark. The former global bottom conversion bar has been removed; primary conversion now happens through the navbar CTA, hero CTA, section CTAs, and the `/book-call` page.

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

Client initialization, brief creation, and call booking creation live in `src/lib/firebase.ts`. Firestore access rules are in `firestore.rules`; deploy them with the Firebase CLI before enabling production submissions. The deployed rules must allow the current `briefs` payload shape, including `service`, `package`, `answers`, `questionnaire`, `contact`, `status`, `source`, `createdAt`, and `submittedAt`, plus public `bookings` creates for Book Free Call requests with contact details, selected slot fields, `startAt`, `endAt`, duration, timezone, pending status, source, host/public emails, empty Meet/calendar fields, and timestamps. If `/book-call` shows `Missing or insufficient permissions` or the friendlier booking-permissions error, deploy the latest rules to the active Firebase project with `npx firebase-tools@14.17.0 deploy --only firestore:rules --project <firebase-project-id>`.

Automated Google Meet creation still requires backend Google Calendar access. The setup checklist, `bookings` Firestore contract, availability rules, and Google Workspace/OAuth options are documented in `docs/book-call-google-meet-setup.md`.

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

The development site normally runs at `http://localhost:3000`. The `dev` and `dev:next` scripts intentionally do not force a port; if another local project is already using `3000`, Next.js will choose the next available port and print the actual local URL.

If `npm run dev` fails with `Tina Dev server is already in use. Datalayer server is busy on port 9000`, a stale Tina process is already listening from a previous run. Check it with `lsof -nP -iTCP:9000 -sTCP:LISTEN`, stop the stale project process, and rerun `npm run dev`.

Former remote stock images used by runtime pages and Storybook stories are now mapped to local files in `docs/unsplash-image-inventory.md`. Keep those image paths under `public/assets/img/` when replacing or recompressing assets.

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
