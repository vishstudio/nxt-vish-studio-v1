import { defineConfig } from "tinacms";
import { pagesCollection } from "./collections/pages";
import { projectCollection } from "./collections/project";
import { siteSettingsCollection } from "./collections/site-settings";

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
    // Sidebar order: every page, then global settings, then case studies.
    collections: [pagesCollection, siteSettingsCollection, projectCollection],
  },
});
