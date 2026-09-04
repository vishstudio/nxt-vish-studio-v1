# VISH Studio

VISH Studio is the public website and project-onboarding platform for a Mauritius-based creative technology studio. It presents the studio’s services, pricing, projects, process, team, and testimonials, while collecting call booking requests, newsletter leads, and structured project briefs from prospective clients.

## Technology

- Next.js 15 App Router and React 19
- TypeScript
- Tailwind CSS 4
- Motion for interaction and reveal animation
- Storybook for component review and visual QA
- React Hook Form for structured multi-step form state
- TinaCMS for JSON-backed content and visual editing
- Firebase Firestore for project brief submissions and call booking requests
- Production-only Google Analytics and Microsoft Clarity, with consent-aware cookie settings

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

Typography uses Google Sans for display headings, body copy, controls, and compact labels. Google Sans is loaded in `src/app/layout.tsx` with the Google Fonts stylesheet embed, while Prompt remains loaded through `next/font/google` and reserved for logo-adjacent text. `LogoText` renders the VISH Studio wordmark as an inline outlined SVG so Safari and translated pages do not depend on runtime font rendering for the logo; optional suffixes such as `portal` remain regular-weight Prompt text. The layout uses true-black backgrounds, high-contrast typography, restrained yellow accents, thin translucent borders, rounded controls, generous spacing, and a maximum standard content width of 1400px.

Core primitives include `Button`, `PageLayout`, `PageHero`, `Section`, `SectionTitle`, `ProjectCard`, and `FormField`. `PageHero` accepts a focused `contentClassName` hook for page-specific vertical alignment without duplicating the hero structure; the homepage uses it to keep its left copy aligned with the desktop capability stack. Global text selection is transparent so selected copy does not introduce an off-brand browser highlight, and every navigation control is explicitly non-selectable through the cross-browser `[data-nav-link]` rule to prevent accidental browser selection while interacting with links.

Storybook is configured with `@storybook/nextjs-vite` and imports the global VISH design system from `src/app/globals.css`. Stories live next to their component files as `*.stories.tsx` inside the relevant `src/components/<component-name>` folder, including shared UI primitives and renderable section components. Runtime-only integrations such as analytics and service-worker registration are not given visual stories because they render no inspectable UI.

Shared section headings use `src/components/ui/section-title/section-title.tsx`, which renders one-word titles fully white with the closing period in yellow accent, and multi-word titles with the final word muted grey (`#6A7282` via `text-vish-gray`) plus the same accent period. Non-home content sections should use this primitive for visible section titles unless they are compact card labels, modal titles, hero titles, or transactional form step headings.

## Routes and features

- `/`: studio overview, selected work, services, process, pricing, and contact
- `/book-call`: free discovery-call booking request with date/time slot selection, visitor email capture, and Firestore-backed pending booking records for Google Meet invite follow-up
- `/projects` and `/project/[slug]`: portfolio index and case studies
- `/services`: capabilities for Social Media Marketing, SaaS Products, Websites, Website Templates, Softwares, Mobile Apps, Branding, and AI Integrations & Automations. The desktop Services submenu is a wide, topbar-aligned split panel: a service-direction rail with the overview link sits beside two columns of icon-led service rows, each linking directly to its service page. Each row keeps its arrow in a dedicated far-right column, away from the title and description. When the desktop topbar is compact, its hamburger sits left, the logo stays centered, and the Schedule a Free Call CTA remains right. On mobile, the wordmark remains centered without the auxiliary icon, with the hamburger left and CTA right; after scrolling, the CTA becomes a circular yellow booking-icon button. Every Schedule a Free Call CTA uses the same CalendarCheck booking icon, and icon-only shared buttons center their icon without an offset. The navigation drawer opens from the left and presents the same service links and icons. The custom language selector supports English and French only, with a white active option.
- `/services/saas-products`: landing page for client-facing SaaS applications, including client portals, operational SaaS, vertical products, delivery phases, and a Schedule a Free Call CTA.
- `/services/social-media-marketing`, `/services/websites`, `/services/softwares`, `/services/mobile-apps`, and `/services/branding`: dedicated service landing pages sharing `src/views/ServiceLandingPage.tsx` and a Schedule a Free Call CTA.
- `/services/templates` and `/services/ai-automations`: dedicated Website Templates and AI Integrations & Automations pages with project inquiry CTAs while those tracks are prepared.
- `/pricing`: service-specific packages, care plans, and add-ons. The shared pricing content lists all eight canonical services; Social Media Marketing, SaaS Products, Website Templates, and AI Integrations & Automations use an explicitly custom-scoped starting plan until fixed packages are defined.
- `/start-project`: five-step client brief flow for all eight services, package, service-specific questionnaire, contact details, and review
- `/walkthrough`: portal walkthrough page with an app-style sidebar layout, Prompt-based `vish studio portal` logo treatment, workflow steps, status summary, and booking CTA
- `/about`, `/testimonials`, `/contact`: company and contact content. The About page is a CMS-backed agency story, sequenced as a hero call-to-action, studio narrative, team introduction, trusted-partner proof, working principles, and a shared closing project CTA. Its team section uses the shared `Team` component with CMS-backed member data and presents each person as an open rounded-corner portrait profile with the member role, index, name, and a yellow rule in a refined rounded dark caption panel over the lower portrait. Team portraits come from the CMS image path; Vishroy, Divesh, Pravesh, Ayesha, and Alice use the supplied local assets in `public/assets/img/team/`. Team profiles render as an auto-advancing, manually swipeable snap carousel with progress dots on phones; on desktop, three portraits remain in view while scrolling through the section advances the full five-person track in discrete right-to-left steps.
- `/privacy`, `/terms`: legal content

The primary conversion CTA is `Book Free Call`, which routes to `/book-call`. The booking page shows what to expect from a 20-30 minute discovery call, lets visitors choose a date and 30-minute slot from the standard availability window, collects their name/email/company, and writes a Firestore `bookings` document through `createCallBooking()` in `src/lib/firebase.ts`. Booking records include contact details, selected date/time, `startAt`/`endAt` timestamps, duration, timezone, pending status, source, host/public emails, and empty Meet/calendar fields for follow-up. After a successful write, `src/components/book-call-confirmation-modal/book-call-confirmation-modal.tsx` confirms the request and tells the visitor the agency will email the Google Meet invite shortly. Because `hello@vish.studio` redirects to `vishstudio.ltd@gmail.com`, Google Meet links are currently added from Firebase or the client portal after the request is received. The page also keeps a secondary `Start a Project` action, styled like the pricing custom-project CTA, for visitors who already know their scope. On desktop, the left-side call context remains sticky while the visitor scrolls through the booking form. It ends with the shared Contact footer, keeping standard contact, newsletter, legal, and cookie controls available.

The primary conversion CTA is now `Schedule a Free Call`. It routes visitors to `/book-call` to choose a future meeting time, rather than suggesting an immediate call.

The Start Project flow reads packages from the canonical pricing data, manages the multi-step questionnaire with React Hook Form, and writes submissions to the Firestore `briefs` collection. Each Firestore document includes the selected service, selected package, contact details, raw answer map, and a labelled `questionnaire` array for easier review. After a successful submission, the page shows a confirmation modal with the brief reference plus the studio email and phone number from site settings; its primary action returns the user to the home page. The page uses website-style step headings with white display text, grey intro copy, and yellow accent punctuation. Its own fixed progress/action bar is always visible so the user can proceed through the multi-step form, step changes scroll the page back to the top, validation blocks only missing essentials, and choice-based questionnaire answers remain optional context instead of hard blockers. The Start Project and Book Call pages suppress the global floating project CTA.

The homepage pricing cards use a `Choose Plan` CTA that opens `src/components/pricing-plan-choice-modal/pricing-plan-choice-modal.tsx`. The modal lets visitors continue to either `/book-call` or `/start-project`, and records pricing-choice analytics for the selected plan and route. Desktop cards reserve extra bottom spacing between package details and the CTA so the action does not sit too close to the supporting text.

The home hero is optimized around a large editorial rotating typed headline, a primary project-inquiry CTA, a secondary projects link, three concise micro proof signals, a desktop-only capability proof panel, and animated studio stats from `content/pages/home.json` (`heroStats`). The three proof signals use white Lucide icons (strategy target, conversion interaction, and launch) rather than accent dots. Its desktop capability panel also uses white, relevant Lucide icons directly before each canonical-order service name, matching the icon language of the Services submenu. The typed headline keeps the white `We build your` prefix fixed, rotates only the grey ending text, holds each complete phrase for five seconds, renders the closing period in the yellow accent, and keeps the description close enough to read as one hero message. The hero keeps the first viewport left-focused and avoids the former selected-work proof panel and animated project-image thumbnails to keep the first viewport responsive; the right side stacks a static capability panel above the compact stats block on desktop. `PageHero` gives the homepage hero a fixed viewport height only from laptop widths upward, and scroll parallax is applied separately to the main content, foreground proof stack, and decorative watermark. On mobile and tablet, the stats render in normal flow below the CTAs instead of as an absolute foreground element, so the hero height follows its content and the trusted-partner strip and recent-work row follow after clear spacing. The homepage mounts `TrustedPartners` with its `strip` variant immediately after the hero: a black, thin-bordered marquee showing only bold partner names. It pauses for pointer or keyboard interaction and stays static for reduced-motion users; duplicate visual names are excluded from keyboard navigation and assistive technology. It deliberately omits the former “Chosen by” message. `src/components/recent-project-strip/recent-project-strip.tsx` follows this strip and renders the first four home-featured projects from `content/projects` as a full-bleed recent-work image strip. Its client motion layer in `recent-project-strip-motion.tsx` keeps the same horizontal project order across breakpoints, shows four tall image tiles on desktop with deliberate viewport bleed, shows only the first three on tablet, restores all four as smaller side-by-side tiles on mobile, and uses oversized viewport-relative row widths at each breakpoint so the strip still feels outside the standard layout on tablet and mobile. The tiles remain static as individual cards while the full row uses one shared scroll parallax transform, with only the first tile eager-loaded, so the strip keeps motion depth without staggered card reveals. The stats render with `src/components/hero-stats/hero-stats.tsx`, use a standard block below the CTA stack below desktop, and switch to a compact two-column right-side block at `xl`. The homepage FAQ section (`src/components/faq/faq.tsx`) appears after testimonials and before the contact footer, reads `faqHeading`, `faqSubtext`, and `faqItems` from `content/pages/home.json`, and uses the shared `Section` and `SectionTitle` primitives with an accessible accordion interaction. The root document sets a critical black background inline before CSS loads. The loader (`src/components/loader/loader.tsx`) is a centered, restrained brand moment: it restores the hero’s large translucent left-side `BrandWatermark`, fades in a dominant viewport-scaled shared text-based `LogoText` (with an explicit desktop-size override so it is never reduced to navbar scale), then raises the smaller “Functional clarity. Digital growth.” motto from below. It has no corner metadata or counter, retains a fallback completion timer, and hands off to the hero after the short reveal; the hero keeps its own static brand watermark and reveal fallback.

The loader wordmark is deliberately half its former scale across breakpoints, while its motto is independently positioned in the bottom center of the viewport rather than below the logo.

The trusted partners component (`src/components/trusted-partners/trusted-partners.tsx`) uses `content/site/partners.json` for its partner list, section label, trust heading, credibility copy, CTA label, and compact proof points. Its fuller default presentation remains on the About page with a credibility statement, Schedule a Free Call CTA, linked partner grid, and three compact proof points.

Immediately after the homepage hero, `src/components/home-impact/home-impact.tsx` reuses the `heroLabel`, `heroDescription`, and first three `heroStats` from `content/pages/home.json` as a high-contrast proof section. Its three-column desktop / stacked mobile impact display uses the shared `HeroStats` `impact` layout, so the same values animate into view without creating a second source of truth. It reads the static homepage mapper instead of mounting a second Tina visual-editing subscription alongside the hero. The previous homepage partner marquee is not mounted there.

The homepage no longer renders the generic About-the-agency section; its earlier position after the recent-project strip is now used by the service catalogue. The About content remains available for future focused use through `src/components/about/about.tsx` and `content/pages/home.json`, while the dedicated `/about` route remains the agency-story destination.

The homepage and services-page partnership section (`src/components/process/process.tsx`) reads its heading, supporting copy, and delivery stages from `content/pages/home.json`. It uses the shared `Section` and `SectionTitle` primitives and presents the four stages as a responsive, numbered editorial timeline: a sticky contextual introduction beside the stages on large screens, then a single-column timeline on smaller screens.

The homepage and `/services` page both use `src/components/service-catalogue/service-catalogue.tsx`, while keeping their purpose-specific presentations. On the homepage, the catalogue appears immediately after the post-hero impact and recent-project sections, taking the former About-the-agency position. `content/pages/services.json` is the source of truth for each category’s description, scoped capabilities, local service image and alt text, and four-step delivery plan; Tina exposes the same fields under Services Page. Both instances use `/assets/img/services-section.jpg` as an understated grayscale section background, layered under a dark gradient overlay so the catalogue remains readable. The homepage uses the `showcase` variant: a clean numbered service list paired with a single explanatory image stage. It automatically advances every five seconds, shows a yellow timed progress line on the active service, cross-fades the CMS-managed image, and explains the selected service with its description and three focus areas. It deliberately includes no local CTA, leaving conversion to the page’s established primary actions. Visitors can select any service directly, which pauses automatic rotation during hover or keyboard focus; reduced-motion users receive manual selection only. The `/services` page keeps the detailed explorer with plan, scope, CTA, and All services control. Across both variants, the dark translucent glass panel (`bg-black/80`, thin white border, and `backdrop-blur-xl`) follows the collapsed topbar treatment and uses white/gray typography for readable service details. The homepage wrapper (`src/components/services/services.tsx`) only connects the shared showcase to the `#services` anchor. The generic homepage `Process` timeline is intentionally not repeated below the catalogue.

The homepage Selected Case Studies section (`src/components/projects/projects.tsx`) reads its label, heading, description, CTA label, and home-featured projects from Tina content. It presents the home-featured projects as a clean image-led recent-project gallery: two compact tiles per row on mobile and four columns on desktop. Yellow is reserved for the section label, title punctuation, and interactive hover affordances; project years, categories, and default site links remain quiet white/gray metadata. Each tile links to its case study and surfaces its live `siteUrl` through a clear View site action. It avoids the previous sticky scroll carousel and active-slide animation so the section remains easier to scan and less performance-heavy.

The fixed navbar batches scroll measurements with `requestAnimationFrame` and keeps the desktop navigation/CTA mounted during its compact state so the topbar does not reflow heavily while shrinking. The desktop Services submenu keeps a continuous hover/focus target and temporarily holds the expanded navbar state while open, so scrolling does not collapse the submenu before visitors can reach its child links. In the compact right-side menu, Services is an expandable button rather than a direct link; its child links stay hidden until clicked and include “See all services” for the `/services` overview page. Desktop navigation includes `src/components/language-selector/language-selector.tsx` immediately before the Book Free Call CTA; mobile navigation renders the same selector inside the hamburger menu. The selector loads Google Translate on the client, persists the selected language in `localStorage` plus Google’s `googtrans` cookie, keeps the translated language active across route changes and future visits, and suppresses Google’s injected banner, iframe bubble, tooltip, spinner, and default widget UI through both `src/app/globals.css` and a client-side observer in the selector so only the custom selector is visible after refresh. Visible instances of `hello@vish.studio` and footer `vish studio` wordmarks use `translate="no"` with Google’s `notranslate` class so translation keeps brand/contact text exact. The contact footer reads email, phone, address, footer links, and social URLs from `content/site/settings.json`; its large Prompt text watermark stays at the same low-opacity treatment as the hero's background icon watermark. The former global bottom conversion bar has been removed; primary conversion now happens through the navbar CTA, hero CTA, section CTAs, and the `/book-call` page.

The contact footer (`src/components/contact/contact.tsx`) is organized as one compact closing layout: the project email and newsletter form share the first row, phone/address/social links share the second, and legal/cookie controls sit in the final row. A low-opacity animated official `LogoText` SVG wordmark, including its correctly proportioned registered mark, remains as a decorative background layer behind this content; the footer uses its `logoClassName` sizing hook to match the wordmark exactly to the viewport width. The footer keeps a deliberately tight bottom inset after the copyright row. This keeps all conversion and contact options present without splitting them into competing visual sections. The newsletter conversion flow is shared by `src/components/newsletter-signup/newsletter-signup.tsx` (the footer form and popup content) and `src/components/newsletter-popup/newsletter-popup.tsx` (first-visit display behavior). The popup waits until cookie preferences are answered so the two overlays do not compete, then stores a `vish-newsletter-prompt-status` value in local storage after dismissal or signup. Both signup locations write only the normalized email, source, subscription status, and timestamps to the Firestore `newsletter` collection through `createNewsletterSubscription()`. Newsletter copy is managed with the Site Settings Tina fields. Firestore rules permit anonymous creates only; deploy the updated `firestore.rules` before enabling live signup.

The global custom cursor is desktop-only and keeps pointer movement outside React render state, using Motion values and pointer events for smoother tracking. Cookie settings are split into a lightweight trigger (`src/components/cookie-settings/cookie-settings-trigger.tsx`) and a deferred settings panel so navbar/footer triggers do not eagerly load the full consent UI.

## Content and TinaCMS

Editable content lives under `content`. TinaCMS schemas are defined in `tina/config.ts`, with visual-editing hooks under `src/hooks/tina`. GitHub Pages deployment uses `npm ci`, so `package-lock.json` is committed and must be kept in sync with `package.json`.

When changing a content field, update:

1. The relevant JSON content.
2. The TinaCMS schema.
3. The TypeScript type/mapper or Tina hook.
4. The consuming component and its `data-tina-field` binding when applicable.

Pricing must be read through `getPricingPage()` rather than copied into components. `src/lib/services.ts` owns the canonical service order—Social Media Marketing, SaaS Products, Websites, Website Templates, Softwares, Mobile Apps, Branding, and AI Integrations & Automations—and service catalogue and pricing renderers sort against it so all visible service lists remain aligned. Keep navigation and project-brief options aligned to that same order.

Pricing plans support localized display for Mauritius and international visitors. TinaCMS-owned plan objects in `content/pages/pricing.json` include `price` for Mauritius rupee values and `priceGbp` for international pound values, with optional `discountedPrice` and `discountedPriceGbp` sale fields. Optional package `carePlan` objects, category-level pricing-page `carePlans`, and category `addOns` follow the same `price` / `priceGbp` pattern. The homepage pricing cards and `/pricing` page use `src/hooks/usePricingCurrency.ts` and `src/lib/pricing-currency.ts` to show rupee prices for visitors with a Mauritius timezone or locale, and pound prices for visitors outside Mauritius. This is client-side and static-export compatible; keep GBP numbers manually reviewed in Tina rather than relying on live exchange-rate conversion.

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

Client initialization, brief creation, call booking creation, and newsletter signup live in `src/lib/firebase.ts`. Firestore access rules are in `firestore.rules` and the deployment manifest is `firebase.json`; deploy them with the Firebase CLI before enabling production submissions. The deployed rules must allow the current `briefs` payload shape, including `service`, `package`, `answers`, `questionnaire`, `contact`, `status`, `source`, `createdAt`, and `submittedAt`, public `bookings` creates for Book Free Call requests with contact details, selected slot fields, `startAt`, `endAt`, duration, timezone, pending status, source, host/public emails, empty Meet/calendar fields, and timestamps, and `newsletter` creates containing email, subscribed status, a popup/footer source, and timestamps. The public site cannot read, update, or delete any of these collections. If a Firestore-backed form shows `Missing or insufficient permissions`, deploy the latest rules to the active Firebase project with `npx firebase-tools@14.17.0 deploy --only firestore:rules --project <firebase-project-id>`.

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

Start from `.env.example`. It documents variables for site configuration, TinaCMS, Google Analytics, Microsoft Clarity, and Firebase. Google Analytics and Microsoft Clarity run only in production after analytics consent is granted, keeping local development, Tina previews, and visitors who reject optional analytics free from tracking scripts. Set `NEXT_PUBLIC_CLARITY_PROJECT_ID` to the ID shown in Microsoft Clarity under **Settings → Setup**, and add the same variable as a GitHub Actions repository variable or secret so the static production build includes it. Firebase is lazy-loaded only when a visitor submits a Firestore-backed form, so the newsletter popup does not initialise Firebase while merely being displayed. Never commit real tokens or private credentials.

## Development workflow

The project-local Codex skill is located at `.codex/skills/vish-studio-project`. Use `$vish-studio-project` for repository work so implementation follows the established architecture and visual system.

Every project change must update this README in the same change. Update the relevant enduring section with new behavior, routes, components, dependencies, environment variables, data ownership, setup steps, or deployment requirements. Keep this document current; do not use it as a chronological changelog.

Before handing off a change:

1. Confirm existing components were reused where possible.
2. Run `npm run lint`.
3. Run `npm run build` for production-impacting changes.
4. Browser-test visible changes on desktop and mobile.
5. Confirm this README describes the resulting project.
