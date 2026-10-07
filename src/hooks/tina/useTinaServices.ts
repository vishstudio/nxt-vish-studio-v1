import { getServicesPage } from "../../lib/content";
import { useTinaPage } from "./usePage";

export function useTinaServices() {
  // Production keeps the versioned build data so a stale remote response cannot
  // replace the local service image paths after the page loads.
  const { data, tinaField, rawPage } = useTinaPage(
    "services/index.json",
    getServicesPage(),
    process.env.NODE_ENV !== "production",
  );
  return { data, tinaField, rawServicesPage: rawPage };
}
