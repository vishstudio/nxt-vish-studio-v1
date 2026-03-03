import { useEffect, useState } from "react";
import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import { getProjects, getProject, type Project } from "../../lib/projects";
import { PLACEHOLDER_QUERY } from "./core";

export function useTinaProjectDetail(slug: string) {
  const staticProject = getProject(slug);

  const [queryResult, setQueryResult] = useState<{
    data: Record<string, any>;
    query: string;
    variables: Record<string, unknown>;
  }>({
    data: {},
    query: PLACEHOLDER_QUERY,
    variables: {},
  });
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!slug) return;
    client.queries
      .project({ relativePath: `${slug}.json` })
      .then((res: any) => {
        setQueryResult(res);
        setFetched(true);
      })
      .catch(() => {});
  }, [slug]);

  const { data: liveData } = useTina(queryResult) as {
    data: Record<string, any>;
  };

  if (fetched && liveData?.project) {
    const p = liveData.project;
    return {
      data: {
        slug: p.slug || p._sys?.filename || slug,
        title: p.title ?? "",
        category: Array.isArray(p.category)
          ? p.category
          : p.category
          ? [p.category]
          : [],
        image: p.image ?? "",
        year: p.year ?? "",
        order: p.order ?? 999,
        description: p.description ?? "",
        fullDescription: p.fullDescription ?? "",
        gallery: (p.gallery ?? []).filter(Boolean),
        featuredOnHome: p.featuredOnHome ?? false,
        siteUrl: p.siteUrl ?? "",
        techStack: (p.techStack ?? []).filter(Boolean),
      } as Project,
      tinaData: liveData.project,
    };
  }

  return { data: staticProject, tinaData: null };
}

export function useTinaProjectsList() {
  const staticProjects = getProjects();

  const [queryResult, setQueryResult] = useState<{
    data: Record<string, any>;
    query: string;
    variables: Record<string, unknown>;
  }>({
    data: {},
    query: PLACEHOLDER_QUERY,
    variables: {},
  });
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    client.queries
      .projectConnection()
      .then((res: any) => {
        setQueryResult(res);
        setFetched(true);
      })
      .catch(() => {});
  }, []);

  const { data: liveData } = useTina(queryResult) as {
    data: Record<string, any>;
  };

  if (fetched && liveData?.projectConnection?.edges) {
    const projects = liveData.projectConnection.edges
      .map((e: any) => e?.node)
      .filter(Boolean)
      .map(
        (p: any) =>
          ({
            slug: p.slug || p._sys?.filename || "",
            title: p.title ?? "",
            category: Array.isArray(p.category)
              ? p.category
              : p.category
              ? [p.category]
              : [],
            image: p.image ?? "",
            year: p.year ?? "",
            order: p.order ?? 999,
            description: p.description ?? "",
            fullDescription: p.fullDescription ?? "",
            gallery: (p.gallery ?? []).filter(Boolean),
            featuredOnHome: p.featuredOnHome ?? false,
            siteUrl: p.siteUrl ?? "",
            techStack: (p.techStack ?? []).filter(Boolean),
          } as Project),
      )
      .sort((a: Project, b: Project) => a.order - b.order);
    return { data: projects };
  }

  return { data: staticProjects };
}
