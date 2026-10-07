import type { Collection } from "tinacms";

export const projectCollection: Collection = {
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
        "Social Media Management",
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
      type: "string",
      name: "role",
      label: "Our Role",
      description: "e.g. Design & Development. Leave empty to use the default from the Projects page.",
    },
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
};
