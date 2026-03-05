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

// Statically imported project JSON files — fully static, no API needed
import gogarageJson from "@/content/projects/gogarage.json";
import imagine3dJson from "@/content/projects/imagine3d.json";
import morisMetricsJson from "@/content/projects/moris-metrics.json";
import ssPowerProJson from "@/content/projects/ss-power-pro.json";

const projectModules: Record<string, ProjectJson> = {
  "/content/projects/gogarage.json": gogarageJson as unknown as ProjectJson,
  "/content/projects/imagine3d.json": imagine3dJson as unknown as ProjectJson,
  "/content/projects/moris-metrics.json":
    morisMetricsJson as unknown as ProjectJson,
  "/content/projects/ss-power-pro.json":
    ssPowerProJson as unknown as ProjectJson,
};

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
