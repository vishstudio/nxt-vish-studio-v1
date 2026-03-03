import client from "../../../tina/__generated__/client";
import { getPartners, type PartnersData } from "../../lib/content";
import { rawTinaField, useTinaData } from "./core";

export function useTinaPartners() {
  const staticContent = getPartners();

  const result = useTinaData(
    staticContent,
    () => client.queries.partners({ relativePath: "partners.json" }) as any,
    (qd: any) =>
      ({
        partnersLabel: qd.partners.partnersLabel ?? "",
        partners: (qd.partners.partners ?? []).filter(Boolean),
      } as PartnersData),
  );

  const rawPage = result.tinaData ? (result.tinaData as any).partners : null;

  function tinaField(fieldName: string): string | undefined {
    if (!rawPage) return undefined;
    return rawTinaField(rawPage, fieldName);
  }

  return { data: result.data, tinaField };
}
