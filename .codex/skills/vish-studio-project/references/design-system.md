# VISH Studio design system

## Source of truth

- Tokens and global behavior: `src/app/globals.css`
- Font loading: `src/app/layout.tsx`
- Shared primitives: `src/components/ui`
- Existing page composition: `src/views` and `src/components`

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `vish-bg` | `#000000` | Page and major surface background |
| `vish-text` | `#ffffff` | Primary text |
| `vish-subtle` | `#111111` | Raised dark surfaces |
| `vish-accent` | `#ffd600` | Primary actions, active state, punctuation, focus |
| `vish-gray` | `#a1a1aa` | Supporting text |
| `vish-border` | `#333333` | Structural borders |

Prefer token utilities such as `bg-vish-bg`, `text-vish-accent`, and `border-vish-border`. Existing translucent neutrals such as `border-white/10`, `bg-white/[0.025]`, and `text-gray-400` are established secondary treatments.

## Typography

- `font-display`: Space Grotesk, weights 300–700. Use for page titles, section titles, feature headings, prices, and prominent numerals.
- `font-sans`: Inter, weights 300–600. Use for body copy, form controls, buttons, and navigation.
- `font-logo`: Prompt, weights 300, 400, and 900. Reserve for the VISH wordmark/logo treatment.
- `font-mono`: Use for compact uppercase labels, progress numbers, categories, technical metadata, and highly tracked microcopy.

Headings normally use medium weight, tight tracking, and compact line-height. Body copy uses gray text and relaxed line-height. Accent punctuation is an established motif: `<span className="text-vish-accent">.</span>`.

## Layout

- Default page shell: `PageLayout`.
- Default section wrapper: `Section` with `px-6 md:px-12` and `max-w-[1400px]`.
- Page content starts below the fixed navbar with `pt-32`.
- Use generous vertical spacing: common section padding is `py-20`, `py-24`, or `py-32` with responsive adjustments.
- Use focused containers only for transactional or reading flows; retain the standard outer gutters.

## Surfaces and controls

- Primary actions are yellow, black text, pill-shaped, and may use the restrained existing yellow glow.
- Navigation actions are white with black text and yellow hover.
- Secondary/ghost controls use translucent white surfaces and borders.
- Panels use true black or very subtle white opacity, `border-white/10`, and generally `rounded-2xl` or `rounded-3xl`.
- Inputs use `rounded-2xl`, subtle dark fill, white text, muted placeholders, and yellow focus borders.
- Focus treatment uses a yellow ring with black offset. Never remove visible keyboard focus.

## Motion and icons

- Use `motion/react` for purposeful reveals, fixed-bar transitions, and interaction feedback.
- Established easing is commonly `[0.16, 1, 0.3, 1]` or `[0.22, 1, 0.36, 1]`.
- Keep motion restrained and respect content hierarchy.
- Use `lucide-react` icons with consistent 16–24px sizing and inherited color.

## Avoid

- Off-black substitutes for the page background.
- New accent colors, arbitrary hex values, and unrelated gradients.
- Default browser-styled controls.
- Duplicate button, layout, title, card, or form primitives.
- Dense bento layouts, excessive glow, decorative badges, and icon filler.
- Fixed controls that overlap mobile content, cookie controls, or the custom cursor treatment.
