import client from "../../../tina/__generated__/client";
import { getServicesPage, type ServicesPageContent } from "../../lib/content";
import { makeTinaField, useTinaData } from "./core";

export function useTinaServices() {
  const staticContent = getServicesPage();

  const result = useTinaData(
    staticContent,
    () => client.queries.servicesPage({ relativePath: "services.json" }) as any,
    (qd: any) =>
      ({
        heroLabel: qd.servicesPage.heroLabel ?? "",
        heroTitleLine1: qd.servicesPage.heroTitleLine1 ?? "",
        heroTitleLine2: qd.servicesPage.heroTitleLine2 ?? "",
        categories: (qd.servicesPage.categories ?? []).map((c: any) => ({
          category: c?.category ?? "",
          description: c?.description ?? "",
          items: (c?.items ?? []).filter(Boolean),
        })),
      } as ServicesPageContent),
  );

  const rawServicesPage = result.tinaData
    ? (result.tinaData as any).servicesPage
    : null;

  const tinaField = makeTinaField(rawServicesPage);

  return { data: result.data, tinaField, rawServicesPage };
}
