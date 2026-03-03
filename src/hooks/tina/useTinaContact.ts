import client from "../../../tina/__generated__/client";
import { getContactPage, type ContactPageContent } from "../../lib/content";
import { makeTinaField, useTinaData } from "./core";

export function useTinaContact() {
  const staticContent = getContactPage();

  const result = useTinaData(
    staticContent,
    () => client.queries.contactPage({ relativePath: "contact.json" }) as any,
    (qd: any) =>
      ({
        heroLabel: qd.contactPage.heroLabel ?? "",
        heroTitleLine1: qd.contactPage.heroTitleLine1 ?? "",
        heroTitleLine2: qd.contactPage.heroTitleLine2 ?? "",
        heroTitlePunctuation: qd.contactPage.heroTitlePunctuation ?? "",
        heroDescription: qd.contactPage.heroDescription ?? "",
        trustIndicators: (qd.contactPage.trustIndicators ?? []).map(
          (t: any) => ({
            icon: t?.icon ?? "",
            title: t?.title ?? "",
            description: t?.description ?? "",
          }),
        ),
      } as ContactPageContent),
  );

  const rawContactPage = result.tinaData
    ? (result.tinaData as any).contactPage
    : null;

  const tinaField = makeTinaField(rawContactPage);

  return { data: result.data, tinaField, rawContactPage };
}
