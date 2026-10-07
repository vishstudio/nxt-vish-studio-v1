import { getLegalPage, type LegalPageContent } from "../../lib/content";
import { useTinaPage } from "./usePage";

export function useTinaLegalPage(slug: string) {
  const staticContent = getLegalPage(slug);
  const { data, tinaField, rawPage } = useTinaPage<LegalPageContent | undefined>(
    `${slug}.json`,
    staticContent,
    Boolean(staticContent),
  );
  return { data, tinaField, rawLegalPage: rawPage };
}
