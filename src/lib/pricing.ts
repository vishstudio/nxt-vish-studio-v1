/// <reference types="vite/client" />

export type CtaLinkType = 'internal' | 'url' | 'phone' | 'email' | 'whatsapp';

export interface CtaLink {
  linkType: CtaLinkType;
  linkValue: string;
}

/** Build the final href string from a structured CtaLink */
export function buildCtaHref(link: CtaLink): string {
  switch (link.linkType) {
    case 'phone':     return `tel:${link.linkValue}`;
    case 'email':     return `mailto:${link.linkValue}`;
    case 'whatsapp':  return `https://wa.me/${link.linkValue}`;
    case 'url':
    case 'internal':
    default:          return link.linkValue;
  }
}

/** Returns true if the href should open in a new tab / use <a> instead of <Link> */
export function isExternalCtaLink(link: CtaLink): boolean {
  return link.linkType === 'url' || link.linkType === 'phone' || link.linkType === 'email' || link.linkType === 'whatsapp';
}

export interface PricingPlan {
  label: string;
  name: string;
  price: string;
  priceNote: string;
  delivery: string;
  tagline: string;
  featured: boolean;
  ctaLabel: string;
  ctaLink: CtaLink;
  features: string[];
  bestFor: string;
  revisions: string;
}

export interface PricingPageContent {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtext: string;
  sectionLabel: string;
  sectionHeading: string;
  sectionSubtext: string;
  plans: PricingPlan[];
  customLabel: string;
  customDescription: string;
  customCtaLabel: string;
  customCtaHref: string;
}

interface PricingPlanJson {
  label: string;
  name: string;
  price: string;
  priceNote: string;
  delivery: string;
  tagline: string;
  featured?: boolean;
  ctaLabel: string;
  ctaLink?: { linkType?: string; linkValue?: string };
  /** @deprecated use ctaLink */
  ctaHref?: string;
  features?: string[];
  bestFor?: string;
  revisions?: string;
}

interface PricingPageJson {
  heroLabel: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtext: string;
  sectionLabel: string;
  sectionHeading: string;
  sectionSubtext: string;
  plans?: PricingPlanJson[];
  customLabel: string;
  customDescription: string;
  customCtaLabel: string;
  customCtaHref: string;
}

const pricingModule = import.meta.glob<PricingPageJson>(
  "/content/pages/pricing.json",
  { eager: true, import: "default" },
) as Record<string, PricingPageJson>;

export function getPricingPage(): PricingPageContent {
  const raw = Object.values(pricingModule)[0];
  return {
    heroLabel: raw.heroLabel ?? "",
    heroTitleLine1: raw.heroTitleLine1 ?? "",
    heroTitleLine2: raw.heroTitleLine2 ?? "",
    heroSubtext: raw.heroSubtext ?? "",
    sectionLabel: raw.sectionLabel ?? "",
    sectionHeading: raw.sectionHeading ?? "",
    sectionSubtext: raw.sectionSubtext ?? "",
    plans: (raw.plans ?? []).map((p) => ({
      label: p.label ?? "",
      name: p.name ?? "",
      price: p.price ?? "",
      priceNote: p.priceNote ?? "",
      delivery: p.delivery ?? "",
      tagline: p.tagline ?? "",
      featured: p.featured ?? false,
      ctaLabel: p.ctaLabel ?? "",
      ctaLink: p.ctaLink
        ? { linkType: (p.ctaLink.linkType ?? 'internal') as CtaLinkType, linkValue: p.ctaLink.linkValue ?? "" }
        : { linkType: 'url' as CtaLinkType, linkValue: p.ctaHref ?? "" },
      features: (p.features ?? []).filter(Boolean),
      bestFor: p.bestFor ?? "",
      revisions: p.revisions ?? "",
    })),
    customLabel: raw.customLabel ?? "",
    customDescription: raw.customDescription ?? "",
    customCtaLabel: raw.customCtaLabel ?? "",
    customCtaHref: raw.customCtaHref ?? "",
  };
}
