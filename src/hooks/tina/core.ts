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
 * 2. Optionally fetches from TinaCMS GraphQL client for local visual editing
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
  fetchRemote = true,
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
    if (!fetchRemote) {
      return;
    }

    fetchQuery()
      .then((res) => {
        setQueryResult(res);
        setFetched(true);
      })
      .catch(() => {
        // No TinaCMS server (production) — stay with static data
      });
  }, [fetchRemote]);

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

const TINA_META_KEYS = new Set(["__typename", "_sys", "_values", "_internalSys", "_internalValues", "id"]);

/**
 * Shapes live Tina data like the static JSON it replaces: `null` becomes the
 * static value's empty equivalent so components never receive `null` lists or
 * strings, while fields the editor did fill always come from Tina.
 */
export function normalizeLike<T>(live: unknown, shape: T): T {
  if (Array.isArray(shape)) {
    if (!Array.isArray(live)) return [] as T;
    const itemShape = shape[0];
    return live
      .filter((item) => item !== null && item !== undefined)
      .map((item) => (itemShape === undefined ? item : normalizeLike(item, itemShape))) as T;
  }

  if (shape && typeof shape === "object") {
    const source = (live && typeof live === "object" ? live : {}) as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(source)) {
      if (!TINA_META_KEYS.has(key) && value !== null) result[key] = value;
    }
    for (const [key, value] of Object.entries(shape as Record<string, unknown>)) {
      if (key === "_template") continue;
      result[key] = normalizeLike(source[key], value);
    }

    return result as T;
  }

  if (live === null || live === undefined) {
    if (typeof shape === "string") return "" as T;
    if (typeof shape === "number") return 0 as T;
    if (typeof shape === "boolean") return false as T;
    return shape;
  }

  return live as T;
}
