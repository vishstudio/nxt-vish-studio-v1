import { getFaqPage } from "../../lib/content";
import { useTinaPage } from "./usePage";

export const useTinaFaq = () => {
  const { data, tinaField, rawPage } = useTinaPage("faq.json", getFaqPage());
  return { data, tinaField, rawFaqPage: rawPage };
};
