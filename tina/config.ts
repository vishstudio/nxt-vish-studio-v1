import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ||
    process.env.TINA_BRANCH ||
    process.env.HEAD ||
    "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
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
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "json",
        ui: {
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
            name: "category",
            label: "Category",
            required: true,
            options: [
              "Web Design",
              "Branding",
              "Development",
              "Product Design",
              "UI/UX Design",
              "Mobile App",
            ],
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "year",
            label: "Year",
            required: true,
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
            description: "Lower numbers appear first (e.g. 1, 2, 3...)",
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "fullDescription",
            label: "Full Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "gallery",
            label: "Gallery Images",
            list: true,
          },
        ],
      },
    ],
  },
});
