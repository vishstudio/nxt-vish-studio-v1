import client from "../../../tina/__generated__/client";
import { getLegalPage, type LegalPageContent } from "../../lib/content";
import { PLACEHOLDER_QUERY, makeTinaField } from "./core";
import { useEffect, useState } from "react";
import { useTina } from "tinacms/dist/react";

export function useTinaLegalPage(slug: string) {
  const staticContent = getLegalPage(slug);
  const [queryResult, setQueryResult] = useState<{
    data: Record<string, any>;
    query: string;
    variables: Record<string, unknown>;
  }>({
    data: {},
    query: PLACEHOLDER_QUERY,
    variables: {},
  });
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!slug) return;
    client.queries
      .legalPage({ relativePath: `${slug}.json` })
      .then((res: any) => {
        setQueryResult(res);
        setFetched(true);
      })
      .catch(() => {});
  }, [slug]);

  const { data: liveData } = useTina(queryResult) as {
    data: Record<string, any>;
  };

  if (fetched && liveData?.legalPage) {
    const p = liveData.legalPage;
    const data: LegalPageContent = {
      title: p.title ?? "",
      slug: p.slug ?? slug,
      heroLabel: p.heroLabel ?? "",
      intro: p.intro ?? "",
      lastUpdated: p.lastUpdated ?? "",
      sections: (p.sections ?? []).map((section: any) => ({
        title: section?.title ?? "",
        body: section?.body ?? "",
      })),
    };

    return {
      data,
      tinaField: makeTinaField(liveData.legalPage),
      rawLegalPage: liveData.legalPage,
    };
  }

  return {
    data: staticContent,
    tinaField: makeTinaField(null),
    rawLegalPage: null,
  };
}
