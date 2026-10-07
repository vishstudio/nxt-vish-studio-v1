import { makeTinaField } from "./core";
import { useTinaSettings } from "./useTinaSettings";

/** Trusted partners live inside Site Settings → Trusted Partners. */
export function useTinaPartners() {
  const { data, rawSiteSettings } = useTinaSettings();
  const rawPartners = rawSiteSettings?.partners ?? null;

  return {
    data: data.partners,
    tinaField: makeTinaField(rawPartners),
    rawPartners,
  };
}
