/// <reference types="vite/client" />

export interface Project {
  slug: string;
  title: string;
  category: string[];
  image: string;
  year: string;
  order: number;
  description: string;
  fullDescription: string;
  gallery: string[];
  featuredOnHome: boolean;
  siteUrl?: string;
  techStack?: string[];
}

interface ProjectJson {
  title: string;
  slug?: string;
  category: string | string[];
  image: string;
  year: string;
  order?: number;
  description: string;
  fullDescription?: string;
  gallery?: string[];
  featuredOnHome?: boolean;
  siteUrl?: string;
  techStack?: string[];
}

// Vite eagerly imports all project JSON at build time — fully static, no API needed
const projectModules = import.meta.glob<ProjectJson>(
  "/content/projects/*.json",
  {
    eager: true,
    import: "default",
  },
) as Record<string, ProjectJson>;

export function getProjects(): Project[] {
  return Object.entries(projectModules)
    .map(([filePath, data]) => ({
      slug: data.slug || filePath.split("/").pop()?.replace(".json", "") || "",
      title: data.title,
      category: Array.isArray(data.category) ? data.category : [data.category],
      image: data.image,
      year: data.year,
      order: data.order ?? 999,
      description: data.description,
      fullDescription: data.fullDescription || data.description,
      gallery: (data.gallery || []).filter(Boolean) as string[],
      featuredOnHome: data.featuredOnHome ?? false,
      siteUrl: data.siteUrl || "",
      techStack: (data.techStack || []).filter(Boolean) as string[],
    }))
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}
