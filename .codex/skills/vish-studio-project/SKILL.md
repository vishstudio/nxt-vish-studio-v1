---
name: vish-studio-project
description: Maintain and extend the VISH Studio Next.js website consistently. Use for any code, UI, content, configuration, CMS, Firebase, routing, accessibility, performance, testing, or documentation task in this repository. Enforces the existing atomic component structure, black/white/yellow design system, TinaCMS content architecture, reuse-first implementation, responsive QA, and mandatory root README updates for every project change.
---

# VISH Studio Project

Work as a maintainer of the existing product. Preserve its architecture and visual identity instead of introducing parallel patterns.

## Required workflow

1. Read `README.md`, `package.json`, and the files nearest the requested change.
2. Read [references/architecture.md](references/architecture.md) for code, content, routing, and integration work.
3. Read [references/design-system.md](references/design-system.md) for any visible UI work.
4. Run `rg` across `src/components` before writing markup. Reuse an existing component whenever it satisfies the requirement.
5. Inspect `src/app/globals.css` and relevant existing components before selecting classes, spacing, typography, motion, borders, or colors.
6. Implement the smallest coherent change. Preserve unrelated user work and the static-export constraint.
7. Update the root `README.md` in the same change. This is mandatory for every code, content, configuration, schema, dependency, route, integration, or behavior change.
8. Validate proportionally: run `npm run lint`; run `npm run build` for routing, configuration, data, dependency, or production-impacting changes; perform desktop and mobile browser QA for rendered changes.

## Reuse and component rules

- Use existing custom components before native elements or one-off equivalents. Start with `Button`, `PageLayout`, `PageHero`, `Section`, `SectionTitle`, `ProjectCard`, and `FormField`.
- Create a component only when no existing component fits. Place it at `src/components/<kebab-name>/<component-file>.tsx`.
- Keep route files in `src/app` thin. Put reusable page composition in `src/views` or a focused component folder.
- Extend an existing component with a justified prop or variant when that avoids duplicating behavior.
- Keep repeated data and domain types in `src/lib`, `src/data`, or `content`, not embedded in multiple components.
- Use Lucide for icons and Motion for established interaction patterns. Do not add another icon or animation library.

## Visual rules

- Use semantic VISH tokens and existing Tailwind utilities. Do not introduce hardcoded colors when a token exists.
- Preserve true black backgrounds, white primary text, muted gray secondary text, and yellow accent usage.
- Use Space Grotesk/display styles for headings, Inter/sans styles for body and controls, Prompt only for logo treatment, and mono text for compact labels or technical metadata.
- Preserve the `max-w-[1400px]`, `px-6 md:px-12` page rhythm unless a proven interaction constraint requires a focused container.
- Keep interfaces premium, restrained, high-contrast, and spacious. Avoid generic card grids, extra gradients, arbitrary glows, decorative pills, and unrelated visual motifs.
- Match existing radii, thin translucent borders, focus rings, hover states, and motion timing.
- Verify keyboard accessibility, visible focus, accessible names, responsive wrapping, and fixed-element overlap.

## Established feature behavior

- Keep the homepage `ServiceCatalogue` showcase image paths local to `public/assets/img/` in `content/pages/services.json`. In production, `useTinaServices` must retain the versioned build data instead of replacing it with a browser-time Tina response; local development may still use Tina visual editing.
- The showcase caption is a dark translucent glass surface over the selected image. On mobile, preserve the compact Back/Next controls directly beneath that caption; they update the same selected service and should not alter the desktop service-list interaction.
- Preserve the homepage composition in `src/views/Home.tsx`: Hero, impact proof, services, recent-work strip, `ProjectsCta` index 0, team, process, `ProjectsCta` index 1, case studies, testimonials, FAQ, then contact. `Team` is intentionally visible on the homepage as a trust proof point. Keep slot indexes unique whenever a slot is added or moved.
- The four-member `Team` desktop carousel presents three portraits, then makes one final shift to Pravesh with no empty trailing track. Its role/name panel matches the ServiceCatalogue dark-glass caption treatment (`border-white/15`, `bg-black/65`, and `backdrop-blur-md`).
- Keep `HomeImpact` image-backed with the local `/assets/img/about-studio.jpg` asset beneath its dark desaturated overlay; its reused proof copy and `HeroStats` values must remain high contrast and readable.
- Google Translate's injected `.goog-text-highlight` must remain visually neutral in global CSS and the selector's runtime suppression style. Preserve standard keyboard focus styling while preventing its blue selection background and shadow from appearing on navigation text.
- There is no standalone `/contact` route or Contact Page Tina document. Navigation previously labelled Contact, including the footer and mobile menu, must use `/book-call` and describe the scheduling action instead. Keep the shared `Contact` footer on every closing page composition.
- Keep `Contact` as one coherent responsive footer: its upper area is a two-column desktop grid with the contact CTA beside `NewsletterSignup`; its lower area is a separate aligned grid for reach-us, explore, services, and social links. The top wordmark is intentionally omitted, while an oversized full-width `LogoText` wordmark appears at the end of the footer above the legal utility row. Reuse `Button`, `NewsletterSignup`, `LogoText`, and `CookieSettingsTrigger` rather than recreating their behavior; preserve the footer newsletter submit button's `navigation` variant.

## Content and data rules

- Treat `content/**/*.json` as the editable source for site content and `tina/config.ts` as its CMS schema.
- When content shape changes, update the JSON, TypeScript mapper/types, Tina schema, hooks, and consuming UI together.
- Reuse canonical mappers such as `getPricingPage()` rather than re-declaring package or service data.
- Keep Firebase initialization centralized in `src/lib/firebase.ts`; never commit secrets or private credentials.
- Preserve `output: "export"` compatibility. Do not add runtime-only Next.js server behavior without explicitly changing and documenting the deployment architecture.

## Mandatory README contract

Before finishing any change, update `README.md` so a new developer can understand the current system without reconstructing it from the diff.

- Update the relevant enduring section: architecture, routes, components, content, integrations, environment variables, commands, deployment, or feature behavior.
- Add new files, routes, services, collections, configuration, or dependencies to their relevant inventories.
- Document setup steps, required environment variables, migrations, security rules, and operational commands when applicable.
- Explain non-obvious ownership and data flow, including the source of truth and where future edits belong.
- Keep documentation current rather than appending a noisy chronological log. Remove or correct stale statements.
- For a purely internal refactor, document the resulting ownership or structural rule if it affects future maintenance.
- Do not claim completion if the README does not reflect the resulting project.

## Completion checklist

- Existing components were searched and reused where possible.
- New components follow the required folder convention.
- Design tokens and typography remain consistent.
- Data has one canonical source of truth.
- Accessibility and responsive behavior were checked.
- `README.md` describes the resulting change and current architecture.
- Type checking, build checks, and browser QA were run as appropriate, with any blocker reported.
