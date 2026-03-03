import client from "../../../tina/__generated__/client";
import { getPricingPage, type PricingPageContent, type CtaLinkType } from "../../lib/pricing";
import { rawTinaField, useTinaData } from "./core";

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
        sectionLabel: qd.pricingPage.sectionLabel ?? "",
        sectionHeading: qd.pricingPage.sectionHeading ?? "",
        sectionSubtext: qd.pricingPage.sectionSubtext ?? "",
        plans: (qd.pricingPage.plans ?? []).map((p: any) => ({
          label: p?.label ?? "",
          name: p?.name ?? "",
          price: p?.price ?? "",
          priceNote: p?.priceNote ?? "",
          delivery: p?.delivery ?? "",
          tagline: p?.tagline ?? "",
          featured: p?.featured ?? false,
          ctaLabel: p?.ctaLabel ?? "",
          ctaLink: p?.ctaLink
            ? { linkType: (p.ctaLink.linkType ?? "internal") as CtaLinkType, linkValue: p.ctaLink.linkValue ?? "" }
            : { linkType: "url" as CtaLinkType, linkValue: p?.ctaHref ?? "" },
          features: (p?.features ?? []).filter(Boolean),
          bestFor: p?.bestFor ?? "",
          revisions: p?.revisions ?? "",
        })),
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
