export type CtaLinkType = "internal" | "url" | "phone" | "email" | "whatsapp";

export interface CtaLink {
  linkType: CtaLinkType;
  linkValue: string;
}

export interface PricingCarePlan {
  title: string;
  price: string;
  cadence: string;
  summary: string;
}

/** Build the final href string from a structured CtaLink */
export function buildCtaHref(link: CtaLink): string {
  switch (link.linkType) {
    case "phone":
      return `tel:${link.linkValue}`;
    case "email":
      return `mailto:${link.linkValue}`;
    case "whatsapp":
      return `https://wa.me/${link.linkValue}`;
    case "url":
    case "internal":
    default:
      return link.linkValue;
  }
}

/** Returns true if the href should open in a new tab / use <a> instead of <Link> */
export function isExternalCtaLink(link: CtaLink): boolean {
  return (
    link.linkType === "url" ||
    link.linkType === "phone" ||
    link.linkType === "email" ||
    link.linkType === "whatsapp"
  );
}

export interface PricingPlan {
  label: string;
  name: string;
  price: string;
  discountedPrice: string;
  priceNote: string;
  delivery: string;
  tagline: string;
  featured: boolean;
  ctaLabel: string;
  ctaLink: CtaLink;
  features: string[];
  carePlan?: PricingCarePlan;
  bestFor: string;
  revisions: string;
}

export interface PricingCategory {
  label: string;
  slug: string;
  plans: PricingPlan[];
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
  pricingCategories: PricingCategory[];
  customLabel: string;
  customDescription: string;
  customCtaLabel: string;
  customCtaHref: string;
}

interface PricingPlanJson {
  label: string;
  name: string;
  price: string;
  discountedPrice?: string;
  priceNote: string;
  delivery: string;
  tagline: string;
  featured?: boolean;
  ctaLabel: string;
  ctaLink?: { linkType?: string; linkValue?: string };
  /** @deprecated use ctaLink */
  ctaHref?: string;
  features?: string[];
  carePlan?: Partial<PricingCarePlan>;
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
  pricingCategories?: {
    label?: string;
    slug?: string;
    plans?: PricingPlanJson[];
  }[];
  customLabel: string;
  customDescription: string;
  customCtaLabel: string;
  customCtaHref: string;
}

import pricingJson from "@/content/pages/pricing.json";

function mapPricingPlan(p: PricingPlanJson): PricingPlan {
  return {
    label: p.label ?? "",
    name: p.name ?? "",
    price: p.price ?? "",
    discountedPrice: p.discountedPrice ?? "",
    priceNote: p.priceNote ?? "",
    delivery: p.delivery ?? "",
    tagline: p.tagline ?? "",
    featured: p.featured ?? false,
    ctaLabel: p.ctaLabel ?? "",
    ctaLink: p.ctaLink
      ? {
          linkType: (p.ctaLink.linkType ?? "internal") as CtaLinkType,
          linkValue: p.ctaLink.linkValue ?? "",
        }
      : { linkType: "url" as CtaLinkType, linkValue: p.ctaHref ?? "" },
    features: (p.features ?? []).filter(Boolean),
    carePlan: p.carePlan
      ? {
          title: p.carePlan.title ?? "",
          price: p.carePlan.price ?? "",
          cadence: p.carePlan.cadence ?? "",
          summary: p.carePlan.summary ?? "",
        }
      : undefined,
    bestFor: p.bestFor ?? "",
    revisions: p.revisions ?? "",
  };
}

export function getPricingPage(): PricingPageContent {
  const raw = pricingJson as unknown as PricingPageJson;
  const plans = (raw.plans ?? []).map(mapPricingPlan);
  const pricingCategories = (raw.pricingCategories ?? [])
    .map((category) => ({
      label: category.label ?? "",
      slug: category.slug ?? "",
      plans: (category.plans ?? []).map(mapPricingPlan),
    }))
    .filter((category) => category.label && category.plans.length > 0);

  return {
    heroLabel: raw.heroLabel ?? "",
    heroTitleLine1: raw.heroTitleLine1 ?? "",
    heroTitleLine2: raw.heroTitleLine2 ?? "",
    heroSubtext: raw.heroSubtext ?? "",
    sectionLabel: raw.sectionLabel ?? "",
    sectionHeading: raw.sectionHeading ?? "",
    sectionSubtext: raw.sectionSubtext ?? "",
    plans,
    pricingCategories,
    customLabel: raw.customLabel ?? "",
    customDescription: raw.customDescription ?? "",
    customCtaLabel: raw.customCtaLabel ?? "",
    customCtaHref: raw.customCtaHref ?? "",
  };
}
