/**
 * Shared TinaCMS hook infrastructure.
 * Provides the generic `useTinaData` helper and the PLACEHOLDER_QUERY constant.
 */

import { useEffect, useState } from "react";
import { useTina } from "tinacms/dist/react";
import { tinaField as rawTinaField } from "tinacms/dist/react";

export { rawTinaField };

export const PLACEHOLDER_QUERY = `query { __typename }`;

export interface TinaQueryResult<T> {
  data: T;
  query: string;
  variables: Record<string, unknown>;
}

/**
 * Generic hook that:
 * 1. Takes static data as the starting value
 * 2. Attempts to fetch from TinaCMS GraphQL client
 * 3. Uses `useTina()` for real-time sidebar sync
 * 4. Returns the live data (or static if fetch failed)
 */
export function useTinaData<
  TQueryData extends Record<string, unknown>,
  TContent,
>(
  staticData: TContent,
  fetchQuery: () => Promise<TinaQueryResult<TQueryData>>,
  extractContent: (queryData: TQueryData) => TContent,
): { data: TContent; tinaData: TQueryData | null } {
  const initialInput: TinaQueryResult<TQueryData> = {
    data: {} as TQueryData,
    query: PLACEHOLDER_QUERY,
    variables: {},
  };

  const [queryResult, setQueryResult] =
    useState<TinaQueryResult<TQueryData>>(initialInput);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetchQuery()
      .then((res) => {
        setQueryResult(res);
        setFetched(true);
      })
      .catch(() => {
        // No TinaCMS server (production) — stay with static data
      });
  }, []);

  const { data: liveData } = useTina(queryResult);

  if (fetched && liveData) {
    try {
      const content = extractContent(liveData);
      return { data: content, tinaData: liveData };
    } catch {
      return { data: staticData, tinaData: null };
    }
  }

  return { data: staticData, tinaData: null };
}

/**
 * Creates an overloaded tinaField helper that supports both:
 *   - tinaField('fieldName')          → annotates a top-level page field
 *   - tinaField(rawListItem, 'field') → annotates a field inside a list item
 */
export function makeTinaField(rawPage: any) {
  return function tinaField(
    fieldNameOrObj: string | any,
    fieldName?: string,
  ): string | undefined {
    if (!rawPage) return undefined;
    if (typeof fieldNameOrObj === "string") {
      return rawTinaField(rawPage, fieldNameOrObj);
    }
    if (fieldNameOrObj && fieldName) {
      return rawTinaField(fieldNameOrObj, fieldName);
    }
    return undefined;
  };
}
