import client from "../../../tina/__generated__/client";
import {
  getPricingPage,
  type PricingPageContent,
  type CtaLinkType,
} from "../../lib/pricing";
import { rawTinaField, useTinaData } from "./core";

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
      client.queries.pricingPage({
        relativePath: "pricing.json",
      }),
    (qd: any) =>
      ({
        heroLabel: qd.pricingPage.heroLabel ?? "",
        heroTitleLine1: qd.pricingPage.heroTitleLine1 ?? "",
        heroTitleLine2: qd.pricingPage.heroTitleLine2 ?? "",
        heroSubtext: qd.pricingPage.heroSubtext ?? "",
        heroBackgroundImage: qd.pricingPage.heroBackgroundImage ?? "",
        heroBackgroundImageUrl: qd.pricingPage.heroBackgroundImageUrl ?? "",
        sectionLabel: qd.pricingPage.sectionLabel ?? "",
        sectionHeading: qd.pricingPage.sectionHeading ?? "",
        sectionSubtext: qd.pricingPage.sectionSubtext ?? "",
        pricingCategories: (qd.pricingPage.pricingCategories ?? [])
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
        customLabel: qd.pricingPage.customLabel ?? "",
        customDescription: qd.pricingPage.customDescription ?? "",
        customCtaLabel: qd.pricingPage.customCtaLabel ?? "",
        customCtaHref: qd.pricingPage.customCtaHref ?? "",
      } as PricingPageContent),
  );

  const rawPage = result.tinaData ? (result.tinaData as any).pricingPage : null;

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
