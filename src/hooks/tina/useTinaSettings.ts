import client from "../../../tina/__generated__/client";
import { getSiteSettings } from "../../lib/content";
import { makeTinaField, normalizeLike, useTinaData } from "./core";

export function useTinaSettings() {
  const staticContent = getSiteSettings();

  const result = useTinaData(
    staticContent,
    () => client.queries.siteSettings({ relativePath: "settings.json" }) as any,
    (queryData: any) => normalizeLike(queryData.siteSettings, staticContent),
  );

  const rawSiteSettings = result.tinaData
    ? (result.tinaData as any).siteSettings
    : null;

  const tinaField = makeTinaField(rawSiteSettings);

  return { data: result.data, tinaField, rawSiteSettings };
}
