import { getTestimonialsPage } from "../../lib/content";
import { useTinaPage } from "./usePage";

export function useTinaTestimonials() {
  const { data, tinaField, rawPage } = useTinaPage(
    "testimonials.json",
    getTestimonialsPage(),
  );
  return { data, tinaField, rawTestimonialsPage: rawPage };
}
