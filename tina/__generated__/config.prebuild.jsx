// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || "94cff29e-b158-496c-b456-9850440a0fb9",
  token: process.env.TINA_TOKEN || "effdd5b419c83677e081c08c90c3a1dee3d7b399",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─── Projects (multi-file) ───
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "json",
        ui: {
          router: ({ document }) => `/project/${document.slug || document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => (values?.title || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            description: "URL-friendly identifier (e.g. 'my-project'). Used in /project/<slug>",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Categories",
            description: "Select up to 3 categories",
            required: true,
            list: true,
            options: [
              "Web Design",
              "Branding",
              "Development",
              "Product Design",
              "UI/UX Design",
              "Mobile App"
            ],
            ui: {
              validate: (value) => {
                if (!value || value.length === 0)
                  return "At least one category is required";
                if (value.length > 3) return "Maximum 3 categories allowed";
              }
            }
          },
          {
            type: "string",
            name: "techStack",
            label: "Tech Stack",
            description: "Select technologies used in this project",
            list: true,
            options: [
              "React JS",
              "Next JS",
              "MongoDB",
              "Laravel",
              "HTML 5",
              "CSS 3",
              "Javascript",
              "Java",
              "Figma",
              "SEO",
              "Node.js",
              "MySQL",
              "UI/UX",
              "Logo Design",
              "Marketing",
              "Analytics",
              "Webdesign"
            ]
          },
          {
            type: "string",
            name: "image",
            label: "Featured Image URL",
            description: "Paste a Dropbox share link and change '?dl=0' to '?raw=1' (e.g. https://www.dropbox.com/s/xxx/image.jpg?raw=1). Do NOT use the 'previews.dropbox.com' URL \u2014 that link expires."
          },
          { type: "string", name: "year", label: "Year", required: true },
          {
            type: "number",
            name: "order",
            label: "Display Order",
            description: "Lower numbers appear first"
          },
          {
            type: "boolean",
            name: "featuredOnHome",
            label: "Show on Homepage",
            description: "Check to display this project in the Homepage. Only up to 4 will be shown."
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "fullDescription",
            label: "Full Description",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "gallery",
            label: "Gallery Image URLs",
            description: "Paste Dropbox share links with '?raw=1' appended, one per entry (e.g. https://www.dropbox.com/s/xxx/image.jpg?raw=1). Do NOT use 'previews.dropbox.com' URLs.",
            list: true
          },
          {
            type: "string",
            name: "siteUrl",
            label: "Live Site URL",
            description: "Link to the live project (e.g. https://example.com)"
          }
        ]
      },
      // ─── Site Settings (single file) ───
      {
        name: "siteSettings",
        label: "Site Settings",
        path: "content/site",
        format: "json",
        match: { include: "settings" },
        ui: {
          router: () => "/",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "email", label: "Email", required: true },
          { type: "string", name: "phone", label: "Phone", required: true },
          { type: "string", name: "phoneLink", label: "Phone Link" },
          {
            type: "string",
            name: "address",
            label: "Address",
            ui: { component: "textarea" }
          },
          { type: "string", name: "copyright", label: "Copyright Text" },
          {
            type: "string",
            name: "contactHeadingLine1",
            label: "Contact Heading Line 1"
          },
          {
            type: "string",
            name: "contactHeadingLine2",
            label: "Contact Heading Line 2"
          },
          { type: "string", name: "scrollText", label: "Scroll Circle Text" },
          {
            type: "object",
            name: "socials",
            label: "Social Links",
            list: true,
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "url", label: "URL", required: true },
              {
                type: "boolean",
                name: "openInNewTab",
                label: "Open in new tab"
              }
            ]
          },
          {
            type: "object",
            name: "footerLinks",
            label: "Footer Links",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "url", label: "URL", required: true }
            ]
          }
        ]
      },
      // ─── Partners (single file) ───
      {
        name: "partners",
        label: "Partners",
        path: "content/site",
        format: "json",
        match: { include: "partners" },
        ui: {
          router: () => "/",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "string",
            name: "partnersLabel",
            label: "Section Label",
            isTitle: true,
            required: true
          },
          {
            type: "object",
            name: "partners",
            label: "Partners",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Partner" })
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true
              },
              {
                type: "string",
                name: "url",
                label: "Website URL",
                description: "Link to the partner's website (e.g. https://example.com)"
              }
            ]
          }
        ]
      },
      // ─── Home Page (single file) ───
      {
        name: "homePage",
        label: "Home Page",
        path: "content/pages",
        format: "json",
        match: { include: "home" },
        ui: {
          router: () => "/",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1"
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2"
          },
          {
            type: "string",
            name: "heroDescription",
            label: "Hero Description",
            ui: { component: "textarea" }
          },
          { type: "string", name: "aboutHeading", label: "About Heading" },
          {
            type: "string",
            name: "aboutParagraph1",
            label: "About Paragraph 1",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "aboutParagraph2",
            label: "About Paragraph 2",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "servicesHeading",
            label: "Services Heading"
          },
          {
            type: "string",
            name: "servicesSubtext",
            label: "Services Subtext"
          },
          {
            type: "string",
            name: "servicesButtonText",
            label: "Services Button Text"
          },
          {
            type: "object",
            name: "services",
            label: "Services",
            list: true,
            fields: [
              { type: "string", name: "id", label: "ID (e.g. 01)" },
              { type: "string", name: "title", label: "Title", required: true },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" }
              }
            ]
          },
          { type: "string", name: "processHeading", label: "Process Heading" },
          { type: "string", name: "processSubtext", label: "Process Subtext" },
          {
            type: "object",
            name: "processSteps",
            label: "Process Steps",
            list: true,
            fields: [
              { type: "string", name: "num", label: "Step Number" },
              { type: "string", name: "title", label: "Title", required: true },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" }
              },
              { type: "string", name: "tags", label: "Tags", list: true }
            ]
          },
          {
            type: "string",
            name: "testimonialsHeading",
            label: "Testimonials Heading"
          },
          {
            type: "string",
            name: "testimonialsSubtext",
            label: "Testimonials Subtext"
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "New Testimonial" })
            },
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote",
                required: true,
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "name",
                label: "Client Name",
                required: true
              },
              {
                type: "string",
                name: "role",
                label: "Role / Title",
                required: true
              },
              { type: "string", name: "company", label: "Company" }
            ]
          }
        ]
      },
      // ─── About Page (single file) ───
      {
        name: "aboutPage",
        label: "About Page",
        path: "content/pages",
        format: "json",
        match: { include: "about" },
        ui: {
          router: () => "/about",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1"
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2"
          },
          {
            type: "string",
            name: "studioImage",
            label: "Studio Image URL",
            description: "Paste an image URL"
          },
          {
            type: "string",
            name: "studioImageAlt",
            label: "Studio Image Alt Text"
          },
          { type: "string", name: "introHeading", label: "Intro Heading" },
          {
            type: "string",
            name: "introParagraph1",
            label: "Intro Paragraph 1",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "introParagraph2",
            label: "Intro Paragraph 2",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "valuesLabel",
            label: "Values Section Label"
          },
          {
            type: "string",
            name: "valuesHeading",
            label: "Values Section Heading"
          },
          {
            type: "object",
            name: "values",
            label: "Core Values",
            list: true,
            fields: [
              { type: "string", name: "id", label: "ID (e.g. 01)" },
              { type: "string", name: "title", label: "Title", required: true },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" }
              }
            ]
          },
          {
            type: "object",
            name: "teamMembers",
            label: "Team Members",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "New Team Member" })
            },
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "role", label: "Role", required: true },
              {
                type: "string",
                name: "image",
                label: "Photo URL",
                description: "Paste an image URL"
              },
              {
                type: "string",
                name: "bio",
                label: "Bio",
                ui: { component: "textarea" }
              },
              { type: "number", name: "order", label: "Display Order" }
            ]
          }
        ]
      },
      // ─── Services Page (single file) ───
      {
        name: "servicesPage",
        label: "Services Page",
        path: "content/pages",
        format: "json",
        match: { include: "services" },
        ui: {
          router: () => "/services",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1"
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2"
          },
          {
            type: "object",
            name: "categories",
            label: "Service Categories",
            list: true,
            fields: [
              {
                type: "string",
                name: "category",
                label: "Category Name",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "items",
                label: "Service Items",
                list: true
              }
            ]
          }
        ]
      },
      // ─── Contact Page (single file) ───
      {
        name: "contactPage",
        label: "Contact Page",
        path: "content/pages",
        format: "json",
        match: { include: "contact" },
        ui: {
          router: () => "/contact",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1"
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2"
          },
          {
            type: "string",
            name: "heroTitlePunctuation",
            label: "Hero Punctuation (e.g. ? or .)"
          },
          {
            type: "string",
            name: "heroDescription",
            label: "Hero Description",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "trustIndicators",
            label: "Trust Indicators",
            list: true,
            fields: [
              {
                type: "string",
                name: "icon",
                label: "Icon Name (e.g. MessageSquare, Clock, Zap)"
              },
              { type: "string", name: "title", label: "Title", required: true },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" }
              }
            ]
          }
        ]
      },
      // ─── Pricing Page (single file) ───
      {
        name: "pricingPage",
        label: "Pricing Page",
        path: "content/pages",
        format: "json",
        match: { include: "pricing" },
        ui: {
          router: () => "/pricing",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1"
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2"
          },
          {
            type: "string",
            name: "heroSubtext",
            label: "Hero Subtext",
            ui: { component: "textarea" }
          },
          { type: "string", name: "sectionLabel", label: "Section Label" },
          { type: "string", name: "sectionHeading", label: "Section Heading" },
          {
            type: "string",
            name: "sectionSubtext",
            label: "Section Subtext",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "plans",
            label: "Pricing Plans",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Plan" })
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Plan Label (e.g. STARTER)"
              },
              {
                type: "string",
                name: "name",
                label: "Plan Name",
                required: true
              },
              {
                type: "string",
                name: "price",
                label: "Price (e.g. Rs 3,000)",
                required: true
              },
              {
                type: "string",
                name: "priceNote",
                label: "Price Note (e.g. ONE-TIME)"
              },
              {
                type: "string",
                name: "delivery",
                label: "Delivery Time (e.g. 3\u20135 business days)"
              },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
                ui: { component: "textarea" }
              },
              {
                type: "boolean",
                name: "featured",
                label: "Featured (Most Popular)"
              },
              { type: "string", name: "ctaLabel", label: "CTA Button Label" },
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
                      {
                        label: "Internal path (e.g. /contact)",
                        value: "internal"
                      },
                      { label: "External URL (https://...)", value: "url" },
                      { label: "Phone number", value: "phone" },
                      { label: "Email address", value: "email" },
                      { label: "WhatsApp number", value: "whatsapp" }
                    ]
                  },
                  {
                    type: "string",
                    name: "linkValue",
                    label: "Value",
                    description: "Path, full URL, phone number (digits only), email, or WhatsApp number (digits only)"
                  }
                ]
              },
              {
                type: "string",
                name: "features",
                label: "Features",
                list: true
              },
              { type: "string", name: "bestFor", label: "Best For" },
              { type: "string", name: "revisions", label: "Revisions Policy" }
            ]
          },
          {
            type: "string",
            name: "customLabel",
            label: "Custom Block Heading"
          },
          {
            type: "string",
            name: "customDescription",
            label: "Custom Block Description",
            ui: { component: "textarea" }
          },
          { type: "string", name: "customCtaLabel", label: "Custom CTA Label" },
          { type: "string", name: "customCtaHref", label: "Custom CTA Link" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
