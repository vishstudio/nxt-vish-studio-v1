import { getHomePage } from "../../lib/content";
import { useTinaPage } from "./usePage";

export function useTinaHome() {
  const { data, tinaField, rawPage } = useTinaPage("home.json", getHomePage());
  return { data, tinaField, rawHomePage: rawPage };
}
