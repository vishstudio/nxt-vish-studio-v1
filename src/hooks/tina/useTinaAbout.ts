import { getAboutPage } from "../../lib/content";
import { useTinaPage } from "./usePage";

export function useTinaAbout() {
  const { data, tinaField, rawPage } = useTinaPage("about.json", getAboutPage());
  return { data, tinaField, rawAboutPage: rawPage };
}
