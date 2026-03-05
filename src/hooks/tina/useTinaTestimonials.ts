import client from "../../../tina/__generated__/client";
import {
  getTestimonialsPage,
  type TestimonialsPageContent,
} from "../../lib/content";
import { rawTinaField, useTinaData } from "./core";

export function useTinaTestimonials() {
  const staticContent = getTestimonialsPage();

  const result = useTinaData(
    staticContent,
    () =>
      client.queries.testimonialsPage({
        relativePath: "testimonials.json",
      }) as any,
    (qd: any) =>
      ({
        heading: qd.testimonialsPage.heading ?? "",
        subtext: qd.testimonialsPage.subtext ?? "",
        testimonials: (qd.testimonialsPage.testimonials ?? []).map(
          (t: any) => ({
            quote: t?.quote ?? "",
            name: t?.name ?? "",
            role: t?.role ?? "",
            company: t?.company ?? "",
          }),
        ),
      } as TestimonialsPageContent),
  );

  const rawPage = result.tinaData
    ? (result.tinaData as any).testimonialsPage
    : null;

  function tinaField(fieldName: string): string | undefined {
    if (!rawPage) return undefined;
    return rawTinaField(rawPage, fieldName);
  }

  return { data: result.data, tinaField };
}
