import type { TinaField } from "tinacms";
import { ICON_NAMES } from "../src/lib/icon-names";

// ─── Shared field builders ───────────────────────────────────────────────────

export const text = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  ...(description ? { description } : {}),
});

export const textarea = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  ui: { component: "textarea" },
  ...(description ? { description } : {}),
});

export const stringList = (name: string, label: string, description?: string): TinaField => ({
  type: "string",
  name,
  label,
  list: true,
  ...(description ? { description } : {}),
});

export const iconField = (name = "icon", label = "Icon"): TinaField => ({
  type: "string",
  name,
  label,
  options: ICON_NAMES.map((icon) => ({ label: icon, value: icon })),
});

export const seoField: TinaField = {
  type: "object",
  name: "seo",
  label: "SEO",
  description: "Browser tab title and search-result description for this page.",
  fields: [
    text("title", "Meta Title"),
    textarea("description", "Meta Description"),
  ],
};

export const linkListField = (name: string, label: string): TinaField => ({
  type: "object",
  name,
  label,
  list: true,
  ui: { itemProps: (item) => ({ label: item?.label || "Link" }) },
  fields: [
    { type: "string", name: "label", label: "Label", required: true },
    { type: "string", name: "url", label: "URL", required: true },
  ],
});

// ─── Pricing ─────────────────────────────────────────────────────────────────

export const pricingPlanFields: TinaField[] = [
  text("label", "Plan Label (e.g. STARTER)"),
  { type: "string", name: "name", label: "Plan Name", required: true },
  { type: "string", name: "price", label: "Mauritius Price (e.g. Rs 14,000)", required: true },
  text("priceGbp", "International Price (GBP)", "Shown to visitors outside Mauritius, e.g. £230 or £1,590+."),
  text("discountedPrice", "Discounted Mauritius Price", "Optional sale price shown before the regular Mauritius price."),
  text("discountedPriceGbp", "Discounted International Price (GBP)", "Optional sale price shown before the regular GBP price."),
  text("priceNote", "Price Note (e.g. ONE-TIME)"),
  text("delivery", "Delivery Time (e.g. 2–3 weeks)"),
  textarea("tagline", "Tagline"),
  { type: "boolean", name: "featured", label: "Featured (Most Popular)" },
  text("ctaLabel", "CTA Button Label"),
  {
    type: "object",
    name: "ctaLink",
    label: "CTA Button Link",
    fields: [
      {
        type: "string",
        name: "linkType",
        label: "Link Type",
        options: [
          { label: "Internal path (e.g. /book-call)", value: "internal" },
          { label: "External URL (https://...)", value: "url" },
          { label: "Phone number", value: "phone" },
          { label: "Email address", value: "email" },
          { label: "WhatsApp number", value: "whatsapp" },
        ],
      },
      text(
        "linkValue",
        "Value",
        "Path, full URL, phone number (digits only), email, or WhatsApp number (digits only)",
      ),
    ],
  },
  stringList("features", "Features"),
  {
    type: "object",
    name: "carePlan",
    label: "Monthly Care Plan",
    description:
      "Optional package-specific maintenance plan. This appears on the pricing page and in homepage package details.",
    fields: [
      text("title", "Care Plan Title"),
      text("price", "Monthly Mauritius Price"),
      text("priceGbp", "Monthly International Price (GBP)"),
      text("cadence", "Cadence"),
      textarea("summary", "Summary"),
    ],
  },
  text("bestFor", "Best For"),
  text("revisions", "Revisions Policy"),
];

export const pricingCarePlanFields: TinaField[] = [
  text("title", "Care Plan Title"),
  text("price", "Monthly Mauritius Price"),
  text("priceGbp", "Monthly International Price (GBP)"),
  text("cadence", "Cadence"),
  textarea("summary", "Summary"),
];

export const pricingAddOnFields: TinaField[] = [
  text("label", "Add-on Label"),
  text("price", "Mauritius Price"),
  text("priceGbp", "International Price (GBP)"),
  textarea("note", "Note"),
];
