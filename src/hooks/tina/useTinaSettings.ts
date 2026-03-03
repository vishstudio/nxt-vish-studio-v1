import client from "../../../tina/__generated__/client";
import { getSiteSettings, type SiteSettings } from "../../lib/content";
import { rawTinaField, useTinaData } from "./core";

export function useTinaSettings() {
  const staticContent = getSiteSettings();

  const result = useTinaData(
    staticContent,
    () => client.queries.siteSettings({ relativePath: "settings.json" }) as any,
    (qd: any) => {
      const s = qd.siteSettings;
      return {
        email: s.email ?? "",
        phone: s.phone ?? "",
        phoneLink: s.phoneLink ?? "",
        address: s.address ?? "",
        copyright: s.copyright ?? "",
        contactHeadingLine1: s.contactHeadingLine1 ?? "",
        contactHeadingLine2: s.contactHeadingLine2 ?? "",
        scrollText: s.scrollText ?? "",
        socials: (s.socials ?? []).map((x: any) => ({
          name: x?.name ?? "",
          url: x?.url ?? "",
        })),
        footerLinks: (s.footerLinks ?? []).map((x: any) => ({
          label: x?.label ?? "",
          url: x?.url ?? "",
        })),
      } as SiteSettings;
    },
  );

  const rawPage = result.tinaData
    ? (result.tinaData as any).siteSettings
    : null;

  function tinaField(fieldName: string): string | undefined {
    if (!rawPage) return undefined;
    return rawTinaField(rawPage, fieldName);
  }

  return { data: result.data, tinaField };
}
