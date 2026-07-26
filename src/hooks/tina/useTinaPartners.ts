import client from "../../../tina/__generated__/client";
import {
  getPartners,
  type PartnersData,
  type Partner,
  type PartnerProofPoint,
} from "../../lib/content";
import { rawTinaField, useTinaData } from "./core";

export function useTinaPartners() {
  const staticContent = getPartners();

  const result = useTinaData(
    staticContent,
    () => client.queries.partners({ relativePath: "partners.json" }) as any,
    (qd: any) =>
      ({
        partnersLabel: qd.partners.partnersLabel ?? "",
        trustHeading: qd.partners.trustHeading ?? "",
        trustDescription: qd.partners.trustDescription ?? "",
        ctaLabel: qd.partners.ctaLabel ?? "",
        proofPoints: (qd.partners.proofPoints ?? [])
          .filter(Boolean)
          .map(
            (p: any) =>
              ({
                value: p?.value ?? "",
                label: p?.label ?? "",
              }) as PartnerProofPoint,
          ),
        partners: (qd.partners.partners ?? [])
          .filter(Boolean)
          .map(
            (p: any) =>
              (typeof p === "string"
                ? { name: p }
                : { name: p.name ?? "", url: p.url ?? "" }) as Partner,
          ),
      } as PartnersData),
  );

  const rawPage = result.tinaData ? (result.tinaData as any).partners : null;

  function tinaField(fieldName: string): string | undefined {
    if (!rawPage) return undefined;
    return rawTinaField(rawPage, fieldName);
  }

  return { data: result.data, tinaField };
}
