import client from "../../../tina/__generated__/client";
import { makeTinaField, normalizeLike, useTinaData } from "./core";

/**
 * Visual-editing hook for any document in the Pages collection.
 *
 * @param relativePath Document path inside `content/pages`, e.g. `book-call.json`.
 * @param staticContent The versioned JSON used for the build and as a fallback.
 * @param fetchRemote Set to false to always render the build data (no Tina request).
 */
export function useTinaPage<T>(
  relativePath: string,
  staticContent: T,
  fetchRemote = true,
) {
  const result = useTinaData(
    staticContent,
    () => client.queries.page({ relativePath }) as any,
    (queryData: any) => normalizeLike(queryData.page, staticContent),
    fetchRemote,
  );

  const rawPage = result.tinaData ? (result.tinaData as any).page : null;

  return { data: result.data, tinaField: makeTinaField(rawPage), rawPage };
}
