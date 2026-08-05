# Local Image Replacement Map

Former remote stock-image references have been replaced with local assets under `public/assets/img/`. Keep this map current when changing hero, section, CTA, or Storybook image paths.

## Runtime Website Images

| ID | Current location | Usage | Local path |
| --- | --- | --- | --- |
| about-studio | `content/pages/about.json` field `studioImage` | About intro studio image | `/assets/img/about-studio.jpg` |
| about-hero | `src/views/About.tsx` `PageHero.backgroundImage` | About page hero background | `/assets/img/about-hero.jpg` |
| pricing-hero | `content/pages/pricing.json` field `heroBackgroundImageUrl` | Pricing page hero background | `/assets/img/pricing-hero.avif` |
| legal-hero | `src/views/LegalPage.tsx` `PageHero.backgroundImage` | Privacy and terms hero background | `/assets/img/legal-hero.jpg` |
| services-hero | `src/views/ServicesPage.tsx` `PageHero.backgroundImage` | Services page hero background | `/assets/img/services-hero.jpg` |
| home-cta-1 | `src/views/Home.tsx` `ctaBackgrounds[0]` | Homepage first project CTA image | `/assets/img/home-cta-1.avif` |
| home-cta-2 | `src/views/Home.tsx` `ctaBackgrounds[1]` | Homepage second project CTA image | `/assets/img/home-cta-2.avif` |
| testimonials-hero | `src/views/TestimonialsPage.tsx` `PageHero.backgroundImage` | Testimonials page hero background | `/assets/img/testimonials-hero.avif` |
| projects-cta-1 | `src/views/ProjectsPage.tsx` `ctaBackgrounds[0]` | Projects page first CTA image | `/assets/img/home-cta-1.avif` |
| projects-cta-2 | `src/views/ProjectsPage.tsx` `ctaBackgrounds[1]` | Projects page second CTA image | `/assets/img/home-cta-2.avif` |
| projects-hero | `src/views/ProjectsPage.tsx` `PageHero.backgroundImage` | Projects page hero background | `/assets/img/projects-hero.avif` |
| testimonials-section | `src/components/testimonials/testimonials.tsx` background image | Homepage testimonials section background | `/assets/img/testimonials-hero.avif` |
| services-section | `src/components/services/services.tsx` background image | Homepage services section background | `/assets/img/services-section.jpg` |

## Development-Only Story Images

These are only used by Storybook stories, not the public website runtime.

| Current location | Local path |
| --- | --- |
| `src/components/ui/page-hero/page-hero.stories.tsx` | `/assets/img/home-cta-1.avif` |
| `src/components/ui/project-card/project-card.stories.tsx` | `/assets/img/home-cta-1.avif` |
| `src/components/projects-cta/projects-cta.stories.tsx` | `/assets/img/home-cta-1.avif` |
