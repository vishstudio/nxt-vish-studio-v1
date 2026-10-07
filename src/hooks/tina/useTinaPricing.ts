import client from "../../../tina/__generated__/client";
import {
  getPricingPage,
  type PricingPageContent,
  type CtaLinkType,
} from "../../lib/pricing";
import { normalizeLike, rawTinaField, useTinaData } from "./core";

function mapPricingPlan(p: any) {
  return {
    label: p?.label ?? "",
    name: p?.name ?? "",
    price: p?.price ?? "",
    priceGbp: p?.priceGbp ?? "",
    discountedPrice: p?.discountedPrice ?? "",
    discountedPriceGbp: p?.discountedPriceGbp ?? "",
    priceNote: p?.priceNote ?? "",
    delivery: p?.delivery ?? "",
    tagline: p?.tagline ?? "",
    featured: p?.featured ?? false,
    ctaLabel: p?.ctaLabel ?? "",
    ctaLink: p?.ctaLink
      ? {
          linkType: (p.ctaLink.linkType ?? "internal") as CtaLinkType,
          linkValue: p.ctaLink.linkValue ?? "",
        }
      : { linkType: "url" as CtaLinkType, linkValue: p?.ctaHref ?? "" },
    features: (p?.features ?? []).filter(Boolean),
    carePlan: p?.carePlan
      ? {
          title: p.carePlan.title ?? "",
          price: p.carePlan.price ?? "",
          priceGbp: p.carePlan.priceGbp ?? "",
          cadence: p.carePlan.cadence ?? "",
          summary: p.carePlan.summary ?? "",
        }
      : undefined,
    bestFor: p?.bestFor ?? "",
    revisions: p?.revisions ?? "",
  };
}

function mapPricingCarePlan(p: any) {
  return {
    title: p?.title ?? "",
    price: p?.price ?? "",
    priceGbp: p?.priceGbp ?? "",
    cadence: p?.cadence ?? "",
    summary: p?.summary ?? "",
  };
}

function mapPricingAddOn(p: any) {
  return {
    label: p?.label ?? "",
    price: p?.price ?? "",
    priceGbp: p?.priceGbp ?? "",
    note: p?.note ?? "",
  };
}

export function useTinaPricing() {
  const staticContent = getPricingPage();

  const result = useTinaData(
    staticContent,
    () =>
      client.queries.page({
        relativePath: "pricing.json",
      }),
    (qd: any) =>
      ({
        heroLabel: qd.page.heroLabel ?? "",
        heroTitleLine1: qd.page.heroTitleLine1 ?? "",
        heroTitleLine2: qd.page.heroTitleLine2 ?? "",
        heroSubtext: qd.page.heroSubtext ?? "",
        heroBackgroundImage: qd.page.heroBackgroundImage ?? "",
        heroBackgroundImageUrl: qd.page.heroBackgroundImageUrl ?? "",
        sectionLabel: qd.page.sectionLabel ?? "",
        sectionHeading: qd.page.sectionHeading ?? "",
        sectionSubtext: qd.page.sectionSubtext ?? "",
        pricingCategories: (qd.page.pricingCategories ?? [])
          .map((category: any) => ({
            label: category?.label ?? "",
            slug: category?.slug ?? "",
            plans: (category?.plans ?? []).map(mapPricingPlan),
            carePlans: (category?.carePlans ?? [])
              .map(mapPricingCarePlan)
              .filter((carePlan: any) => carePlan.title && carePlan.price),
            addOns: (category?.addOns ?? [])
              .map(mapPricingAddOn)
              .filter((addOn: any) => addOn.label && addOn.price),
          }))
          .filter((category: any) => category.label && category.plans.length > 0),
        customLabel: qd.page.customLabel ?? "",
        customDescription: qd.page.customDescription ?? "",
        customCtaLabel: qd.page.customCtaLabel ?? "",
        customCtaHref: qd.page.customCtaHref ?? "",
        labels: normalizeLike(qd.page.labels, staticContent.labels),
      } as PricingPageContent),
  );

  const rawPage = result.tinaData ? (result.tinaData as any).page : null;

  function tinaField(
    fieldNameOrObj: string | any,
    fieldName?: string,
  ): string | undefined {
    if (!rawPage) return undefined;
    if (typeof fieldNameOrObj === "string") {
      return rawTinaField(rawPage, fieldNameOrObj);
    }
    return rawTinaField(fieldNameOrObj, fieldName!);
  }

  return { data: result.data, tinaField, rawPricingPage: rawPage };
}
