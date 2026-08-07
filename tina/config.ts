import { defineConfig } from "tinacms";

const pricingPlanFields: any[] = [
  {
    type: "string" as const,
    name: "label",
    label: "Plan Label (e.g. STARTER)",
  },
  {
    type: "string" as const,
    name: "name",
    label: "Plan Name",
    required: true,
  },
  {
    type: "string" as const,
    name: "price",
    label: "Mauritius Price (e.g. Rs 14,000)",
    required: true,
  },
  {
    type: "string" as const,
    name: "priceGbp",
    label: "International Price (GBP)",
    description: "Shown to visitors outside Mauritius, e.g. £230 or £1,590+.",
  },
  {
    type: "string" as const,
    name: "discountedPrice",
    label: "Discounted Mauritius Price",
    description: "Optional sale price shown before the regular Mauritius price.",
  },
  {
    type: "string" as const,
    name: "discountedPriceGbp",
    label: "Discounted International Price (GBP)",
    description: "Optional sale price shown before the regular GBP price.",
  },
  {
    type: "string" as const,
    name: "priceNote",
    label: "Price Note (e.g. ONE-TIME)",
  },
  {
    type: "string" as const,
    name: "delivery",
    label: "Delivery Time (e.g. 2–3 weeks)",
  },
  {
    type: "string" as const,
    name: "tagline",
    label: "Tagline",
    ui: { component: "textarea" },
  },
  {
    type: "boolean" as const,
    name: "featured",
    label: "Featured (Most Popular)",
  },
  { type: "string" as const, name: "ctaLabel", label: "CTA Button Label" },
  {
    type: "object" as const,
    name: "ctaLink",
    label: "CTA Button Link",
    fields: [
      {
        type: "string" as const,
        name: "linkType",
        label: "Link Type",
        options: [
          { label: "Internal path (e.g. /contact)", value: "internal" },
          { label: "External URL (https://...)", value: "url" },
          { label: "Phone number", value: "phone" },
          { label: "Email address", value: "email" },
          { label: "WhatsApp number", value: "whatsapp" },
        ],
      },
      {
        type: "string" as const,
        name: "linkValue",
        label: "Value",
        description:
          "Path, full URL, phone number (digits only), email, or WhatsApp number (digits only)",
      },
    ],
  },
  {
    type: "string" as const,
    name: "features",
    label: "Features",
    list: true,
  },
  {
    type: "object" as const,
    name: "carePlan",
    label: "Monthly Care Plan",
    description:
      "Optional package-specific maintenance plan. This appears on the pricing page and in homepage package details.",
    fields: [
      { type: "string" as const, name: "title", label: "Care Plan Title" },
      { type: "string" as const, name: "price", label: "Monthly Mauritius Price" },
      { type: "string" as const, name: "priceGbp", label: "Monthly International Price (GBP)" },
      { type: "string" as const, name: "cadence", label: "Cadence" },
      {
        type: "string" as const,
        name: "summary",
        label: "Summary",
        ui: { component: "textarea" },
      },
    ],
  },
  { type: "string" as const, name: "bestFor", label: "Best For" },
  { type: "string" as const, name: "revisions", label: "Revisions Policy" },
];

const pricingCarePlanFields: any[] = [
  { type: "string" as const, name: "title", label: "Care Plan Title" },
  { type: "string" as const, name: "price", label: "Monthly Mauritius Price" },
  {
    type: "string" as const,
    name: "priceGbp",
    label: "Monthly International Price (GBP)",
  },
  { type: "string" as const, name: "cadence", label: "Cadence" },
  {
    type: "string" as const,
    name: "summary",
    label: "Summary",
    ui: { component: "textarea" },
  },
];

const pricingAddOnFields: any[] = [
  { type: "string" as const, name: "label", label: "Add-on Label" },
  { type: "string" as const, name: "price", label: "Mauritius Price" },
  {
    type: "string" as const,
    name: "priceGbp",
    label: "International Price (GBP)",
  },
  {
    type: "string" as const,
    name: "note",
    label: "Note",
    ui: { component: "textarea" },
  },
];

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.TINA_BRANCH ||
    process.env.HEAD ||
    "main",
  clientId:
    process.env.TINA_CLIENT_ID || "94cff29e-b158-496c-b456-9850440a0fb9",
  token: process.env.TINA_TOKEN || "effdd5b419c83677e081c08c90c3a1dee3d7b399",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
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
          router: ({ document }) =>
            `/project/${(document as any).slug || document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) =>
              (values?.title || "")
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            description:
              "URL-friendly identifier (e.g. 'my-project'). Used in /project/<slug>",
            required: true,
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
              "Mobile App",
            ],
            ui: {
              validate: (value: string[] | undefined) => {
                if (!value || value.length === 0)
                  return "At least one category is required";
                if (value.length > 3) return "Maximum 3 categories allowed";
              },
            },
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
              "Webdesign",
            ],
          },
          {
            type: "string",
            name: "image",
            label: "Featured Image URL",
            description:
              "Paste a Dropbox share link and change '?dl=0' to '?raw=1' (e.g. https://www.dropbox.com/s/xxx/image.jpg?raw=1). Do NOT use the 'previews.dropbox.com' URL — that link expires.",
          },
          { type: "string", name: "year", label: "Year", required: true },
          {
            type: "number",
            name: "order",
            label: "Display Order",
            description: "Lower numbers appear first",
          },
          {
            type: "boolean",
            name: "featuredOnHome",
            label: "Show on Homepage",
            description:
              "Check to display this project in the Homepage. Only up to 4 will be shown.",
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "fullDescription",
            label: "Full Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "overview",
            label: "Overview",
            description:
              "Project detail section: Overview. This title is shown on the project detail page.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "overviewImage",
            label: "Overview Image URL",
            description:
              "Optional image for the Overview section. Paste a Dropbox share link with '?raw=1' or another image URL.",
          },
          {
            type: "string",
            name: "challenge",
            label: "The Challenge",
            description:
              "Project detail section: The Challenge. This title is shown on the project detail page.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "challengeImage",
            label: "The Challenge Image URL",
            description:
              "Optional image for The Challenge section. Paste a Dropbox share link with '?raw=1' or another image URL.",
          },
          {
            type: "string",
            name: "strategy",
            label: "The Strategy",
            description:
              "Project detail section: The Strategy. This title is shown on the project detail page.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "strategyImage",
            label: "The Strategy Image URL",
            description:
              "Optional image for The Strategy section. Paste a Dropbox share link with '?raw=1' or another image URL.",
          },
          {
            type: "string",
            name: "solution",
            label: "The Solution",
            description:
              "Project detail section: The Solution. This title is shown on the project detail page.",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "solutionImage",
            label: "The Solution Image URL",
            description:
              "Optional image for The Solution section. Paste a Dropbox share link with '?raw=1' or another image URL.",
          },
          {
            type: "string",
            name: "gallery",
            label: "Gallery Image URLs",
            description:
              "Paste Dropbox share links with '?raw=1' appended, one per entry (e.g. https://www.dropbox.com/s/xxx/image.jpg?raw=1). Do NOT use 'previews.dropbox.com' URLs.",
            list: true,
          },
          {
            type: "string",
            name: "siteUrl",
            label: "Live Site URL",
            description: "Link to the live project (e.g. https://example.com)",
          },
        ],
      },

      // ─── Legal Pages (multi-file) ───
      {
        name: "legalPage",
        label: "Legal Pages",
        path: "content/legal",
        format: "json",
        ui: {
          router: ({ document }) =>
            `/${(document as any).slug || document._sys.filename}`,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            description: "Use 'privacy' or 'terms'.",
            required: true,
          },
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
          },
          {
            type: "string",
            name: "intro",
            label: "Intro",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "lastUpdated",
            label: "Last Updated",
            description: "Use YYYY-MM-DD format.",
          },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.title || "Section" }),
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "body",
                label: "Body",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
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
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "email", label: "Email", required: true },
          { type: "string", name: "phone", label: "Phone", required: true },
          { type: "string", name: "phoneLink", label: "Phone Link" },
          {
            type: "string",
            name: "address",
            label: "Address",
            ui: { component: "textarea" },
          },
          { type: "string", name: "copyright", label: "Copyright Text" },
          {
            type: "string",
            name: "contactHeadingLine1",
            label: "Contact Heading Line 1",
          },
          {
            type: "string",
            name: "contactHeadingLine2",
            label: "Contact Heading Line 2",
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
                label: "Open in new tab",
              },
            ],
          },
          {
            type: "object",
            name: "footerLinks",
            label: "Footer Links",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "url", label: "URL", required: true },
            ],
          },
        ],
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
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "partnersLabel",
            label: "Section Label",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "trustHeading",
            label: "Trust Heading",
          },
          {
            type: "string",
            name: "trustDescription",
            label: "Trust Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "ctaLabel",
            label: "CTA Label",
          },
          {
            type: "object",
            name: "proofPoints",
            label: "Proof Points",
            list: true,
            fields: [
              { type: "string", name: "value", label: "Value" },
              { type: "string", name: "label", label: "Label" },
            ],
          },
          {
            type: "object",
            name: "partners",
            label: "Partners",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "Partner" }),
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "Website URL",
                description:
                  "Link to the partner's website (e.g. https://example.com)",
              },
            ],
          },
        ],
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
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1",
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2",
          },
          {
            type: "string",
            name: "heroDescription",
            label: "Hero Description",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "heroStats",
            label: "Hero Stats",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "number", name: "value", label: "Value", required: true },
              { type: "string", name: "prefix", label: "Prefix" },
              { type: "string", name: "suffix", label: "Suffix" },
              {
                type: "string",
                name: "format",
                label: "Format",
                options: [
                  { label: "Number", value: "number" },
                  { label: "Year", value: "year" },
                ],
              },
            ],
          },
          { type: "string", name: "aboutHeading", label: "About Heading" },
          {
            type: "string",
            name: "aboutParagraph1",
            label: "About Paragraph 1",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "aboutParagraph2",
            label: "About Paragraph 2",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "projectsLabel",
            label: "Projects Label",
          },
          {
            type: "string",
            name: "projectsHeading",
            label: "Projects Heading",
          },
          {
            type: "string",
            name: "projectsDescription",
            label: "Projects Description",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "projectsButtonText",
            label: "Projects Button Text",
          },
          {
            type: "string",
            name: "servicesHeading",
            label: "Services Heading",
          },
          {
            type: "string",
            name: "servicesSubtext",
            label: "Services Subtext",
          },
          {
            type: "string",
            name: "servicesButtonText",
            label: "Services Button Text",
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
                ui: { component: "textarea" },
              },
            ],
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
                ui: { component: "textarea" },
              },
              { type: "string", name: "tags", label: "Tags", list: true },
            ],
          },
          { type: "string", name: "faqHeading", label: "FAQ Heading" },
          {
            type: "string",
            name: "faqSubtext",
            label: "FAQ Subtext",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "faqItems",
            label: "FAQ Items",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.question || "New FAQ",
              }),
            },
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
                required: true,
              },
              {
                type: "string",
                name: "answer",
                label: "Answer",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },

      // ─── Testimonials Page (single file) ───
      {
        name: "testimonialsPage",
        label: "Testimonials",
        path: "content/pages",
        format: "json",
        match: { include: "testimonials" },
        ui: {
          router: () => "/testimonials",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "heading",
            label: "Page Heading",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "subtext",
            label: "Subtext",
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "New Testimonial" }),
            },
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote",
                required: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "name",
                label: "Client Name",
                required: true,
              },
              {
                type: "string",
                name: "role",
                label: "Role / Title",
                required: true,
              },
              { type: "string", name: "company", label: "Company" },
            ],
          },
        ],
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
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1",
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2",
          },
          {
            type: "string",
            name: "studioImage",
            label: "Studio Image URL",
            description: "Paste an image URL",
          },
          {
            type: "string",
            name: "studioImageAlt",
            label: "Studio Image Alt Text",
          },
          { type: "string", name: "introHeading", label: "Intro Heading" },
          {
            type: "string",
            name: "introParagraph1",
            label: "Intro Paragraph 1",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "introParagraph2",
            label: "Intro Paragraph 2",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "valuesLabel",
            label: "Values Section Label",
          },
          {
            type: "string",
            name: "valuesHeading",
            label: "Values Section Heading",
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
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "teamMembers",
            label: "Team Members",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.name || "New Team Member" }),
            },
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "role", label: "Role", required: true },
              {
                type: "string",
                name: "image",
                label: "Photo URL",
                description: "Paste an image URL",
              },
              {
                type: "string",
                name: "bio",
                label: "Bio",
                ui: { component: "textarea" },
              },
              { type: "number", name: "order", label: "Display Order" },
            ],
          },
        ],
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
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1",
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2",
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
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "items",
                label: "Service Items",
                list: true,
              },
            ],
          },
        ],
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
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1",
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2",
          },
          {
            type: "string",
            name: "heroTitlePunctuation",
            label: "Hero Punctuation (e.g. ? or .)",
          },
          {
            type: "string",
            name: "heroDescription",
            label: "Hero Description",
            ui: { component: "textarea" },
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
                label: "Icon Name (e.g. MessageSquare, Clock, Zap)",
              },
              { type: "string", name: "title", label: "Title", required: true },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
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
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "heroLabel",
            label: "Hero Label",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "heroTitleLine1",
            label: "Hero Title Line 1",
          },
          {
            type: "string",
            name: "heroTitleLine2",
            label: "Hero Title Line 2",
          },
          {
            type: "string",
            name: "heroSubtext",
            label: "Hero Subtext",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "heroBackgroundImage",
            label: "Hero Background Image Upload",
            description:
              "Upload a WEBP, PNG, or JPG hero image. Used when no pasted image URL is provided.",
          },
          {
            type: "string",
            name: "heroBackgroundImageUrl",
            label: "Hero Background Image URL",
            description:
              "Optional external image URL. If filled, this takes priority over the uploaded image.",
          },
          { type: "string", name: "sectionLabel", label: "Section Label" },
          { type: "string", name: "sectionHeading", label: "Section Heading" },
          {
            type: "string",
            name: "sectionSubtext",
            label: "Section Subtext",
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "pricingCategories",
            label: "Shared Service Pricing",
            description:
              "Single source of truth for homepage pricing cards and the full pricing page. Edit packages, prices, features, CTAs, and monthly care plans here.",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item?.label || "Service"} pricing`,
              }),
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Tab Label",
                required: true,
              },
              {
                type: "string",
                name: "slug",
                label: "Tab Slug",
                description:
                  "Lowercase identifier, e.g. website, branding, softwares, mobile-apps",
              },
              {
                type: "object",
                name: "plans",
                label: "Packages",
                description:
                  "These packages render as homepage cards and pricing page rows. Care plans inside each package render as monthly maintenance pricing.",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: `${item?.label ? `${item.label} — ` : ""}${item?.name || "Package"}${item?.price ? ` (${item.price})` : ""}`,
                  }),
                },
                fields: pricingPlanFields,
              },
              {
                type: "object",
                name: "carePlans",
                label: "Pricing Page Care Plans",
                description:
                  "Fallback monthly care rows shown on the full pricing page when a package does not define its own care plan.",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: `${item?.title || "Care plan"}${item?.price ? ` (${item.price})` : ""}`,
                  }),
                },
                fields: pricingCarePlanFields,
              },
              {
                type: "object",
                name: "addOns",
                label: "Pricing Page Add-ons",
                description:
                  "Common additional-cost rows shown below packages on the full pricing page.",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: `${item?.label || "Add-on"}${item?.price ? ` (${item.price})` : ""}`,
                  }),
                },
                fields: pricingAddOnFields,
              },
            ],
          },
          {
            type: "string",
            name: "customLabel",
            label: "Custom Block Heading",
          },
          {
            type: "string",
            name: "customDescription",
            label: "Custom Block Description",
            ui: { component: "textarea" },
          },
          { type: "string", name: "customCtaLabel", label: "Custom CTA Label" },
          { type: "string", name: "customCtaHref", label: "Custom CTA Link" },
        ],
      },
    ],
  },
});
