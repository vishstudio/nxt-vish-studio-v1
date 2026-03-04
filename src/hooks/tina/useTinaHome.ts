import client from "../../../tina/__generated__/client";
import { getHomePage, type HomePageContent } from "../../lib/content";
import { rawTinaField, useTinaData } from "./core";

export function useTinaHome() {
  const staticContent = getHomePage();

  const result = useTinaData(
    staticContent,
    () => client.queries.homePage({ relativePath: "home.json" }) as any,
    (qd: any) =>
      ({
        heroLabel: qd.homePage.heroLabel ?? "",
        heroTitleLine1: qd.homePage.heroTitleLine1 ?? "",
        heroTitleLine2: qd.homePage.heroTitleLine2 ?? "",
        heroDescription: qd.homePage.heroDescription ?? "",
        aboutHeading: qd.homePage.aboutHeading ?? "",
        aboutParagraph1: qd.homePage.aboutParagraph1 ?? "",
        aboutParagraph2: qd.homePage.aboutParagraph2 ?? "",
        servicesHeading: qd.homePage.servicesHeading ?? "",
        servicesSubtext: qd.homePage.servicesSubtext ?? "",
        servicesButtonText: qd.homePage.servicesButtonText ?? "",
        services: (qd.homePage.services ?? []).map((s: any) => ({
          id: s?.id ?? "",
          title: s?.title ?? "",
          description: s?.description ?? "",
        })),
        processHeading: qd.homePage.processHeading ?? "",
        processSubtext: qd.homePage.processSubtext ?? "",
        processSteps: (qd.homePage.processSteps ?? []).map((s: any) => ({
          num: s?.num ?? "",
          title: s?.title ?? "",
          description: s?.description ?? "",
          tags: (s?.tags ?? []).filter(Boolean),
        })),
        testimonialsHeading: qd.homePage.testimonialsHeading ?? "",
        testimonialsSubtext: qd.homePage.testimonialsSubtext ?? "",
        testimonials: (qd.homePage.testimonials ?? []).map((t: any) => ({
          quote: t?.quote ?? "",
          name: t?.name ?? "",
          role: t?.role ?? "",
          company: t?.company ?? "",
        })),
      } as HomePageContent),
  );

  const rawPage = result.tinaData ? (result.tinaData as any).homePage : null;

  function tinaField(fieldName: string): string | undefined {
    if (!rawPage) return undefined;
    return rawTinaField(rawPage, fieldName);
  }

  return { data: result.data, tinaField };
}
