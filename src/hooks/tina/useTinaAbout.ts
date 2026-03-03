import client from "../../../tina/__generated__/client";
import { getAboutPage, type AboutPageContent } from "../../lib/content";
import { makeTinaField, useTinaData } from "./core";

export function useTinaAbout() {
  const staticContent = getAboutPage();

  const result = useTinaData(
    staticContent,
    () => client.queries.aboutPage({ relativePath: "about.json" }) as any,
    (qd: any) =>
      ({
        heroLabel: qd.aboutPage.heroLabel ?? "",
        heroTitleLine1: qd.aboutPage.heroTitleLine1 ?? "",
        heroTitleLine2: qd.aboutPage.heroTitleLine2 ?? "",
        studioImage: qd.aboutPage.studioImage ?? "",
        studioImageAlt: qd.aboutPage.studioImageAlt ?? "",
        introHeading: qd.aboutPage.introHeading ?? "",
        introParagraph1: qd.aboutPage.introParagraph1 ?? "",
        introParagraph2: qd.aboutPage.introParagraph2 ?? "",
        valuesLabel: qd.aboutPage.valuesLabel ?? "",
        valuesHeading: qd.aboutPage.valuesHeading ?? "",
        values: (qd.aboutPage.values ?? []).map((v: any) => ({
          id: v?.id ?? "",
          title: v?.title ?? "",
          description: v?.description ?? "",
        })),
        teamMembers: (qd.aboutPage.teamMembers ?? [])
          .map((m: any) => ({
            name: m?.name ?? "",
            role: m?.role ?? "",
            image: m?.image ?? "",
            bio: m?.bio ?? "",
            order: m?.order ?? 999,
          }))
          .sort((a: any, b: any) => a.order - b.order),
      } as AboutPageContent),
  );

  const rawAboutPage = result.tinaData
    ? (result.tinaData as any).aboutPage
    : null;

  const tinaField = makeTinaField(rawAboutPage);

  return { data: result.data, tinaField, rawAboutPage };
}
