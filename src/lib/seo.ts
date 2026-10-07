import type { Metadata } from "next";
import type { PageSeo } from "./content";

/** Builds route metadata from a page document's CMS-managed `seo` object. */
export const toMetadata = (seo?: Partial<PageSeo>): Metadata => ({
  ...(seo?.title ? { title: seo.title } : {}),
  ...(seo?.description ? { description: seo.description } : {}),
});
