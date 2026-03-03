// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || "43df9a3d-b238-44c9-8f2a-0b1563230ff6",
  token: process.env.TINA_TOKEN || "",
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
            label: "Category",
            required: true,
            options: [
              "Web Design",
              "Branding",
              "Development",
              "Product Design",
              "UI/UX Design",
              "Mobile App"
            ]
          },
          { type: "image", name: "image", label: "Featured Image" },
          { type: "string", name: "year", label: "Year", required: true },
          {
            type: "number",
            name: "order",
            label: "Display Order",
            description: "Lower numbers appear first"
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
            type: "image",
            name: "gallery",
            label: "Gallery Images",
            list: true
          }
        ]
      },
      // ─── Team Members (multi-file) ───
      {
        name: "teamMember",
        label: "Team Members",
        path: "content/team",
        format: "json",
        ui: {
          router: () => "/about",
          filename: {
            readonly: false,
            slugify: (values) => (values?.name || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
          }
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true
          },
          { type: "string", name: "role", label: "Role", required: true },
          { type: "image", name: "image", label: "Photo" },
          {
            type: "string",
            name: "bio",
            label: "Bio",
            ui: { component: "textarea" }
          },
          { type: "number", name: "order", label: "Display Order" }
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
              { type: "string", name: "url", label: "URL", required: true }
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
            type: "string",
            name: "partners",
            label: "Partner Names",
            list: true
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
          { type: "image", name: "studioImage", label: "Studio Image" },
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
      }
    ]
  }
});
export {
  config_default as default
};
