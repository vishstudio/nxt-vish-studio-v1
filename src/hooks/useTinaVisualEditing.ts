/**
 * TinaCMS Visual Editing Hooks
 *
 * These hooks integrate TinaCMS visual editing into each page/component.
 * - In the TinaCMS admin iframe: data is fetched via GraphQL client and
 *   kept in sync with the sidebar form through `useTina()`.
 * - In production (no Tina server): the fetch silently fails and components
 *   fall back to the static JSON data from `lib/content.ts`.
 *
 * Usage:
 *   const { data, tinaField } = useTinaHome();
 *   <h1 data-tina-field={tinaField('heroTitleLine1')}>{data.heroTitleLine1}</h1>
 */

import { useEffect, useState } from "react";
import { useTina, tinaField as rawTinaField } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import {
  getHomePage,
  getAboutPage,
  getServicesPage,
  getContactPage,
  getSiteSettings,
  getPartners,
  type HomePageContent,
  type AboutPageContent,
  type ServicesPageContent,
  type ContactPageContent,
  type SiteSettings,
  type PartnersData,
} from "../lib/content";
import { getProjects, getProject, type Project } from "../lib/projects";

// Re-export for convenience
export { rawTinaField as tinaField };

// ─── Helper: generic Tina query hook ─────────────────────────────────────────

/**
 * A minimal valid GraphQL query used as a placeholder before the real query
 * is fetched. Prevents the "Unexpected <EOF>" parse error that occurs when
 * useTina() receives an empty query string inside the admin iframe.
 */
const PLACEHOLDER_QUERY = `query { __typename }`;

interface TinaQueryResult<T> {
  data: T;
  query: string;
  variables: Record<string, unknown>;
}

/**
 * Generic hook that:
 * 1. Takes static data as the starting value
 * 2. Attempts to fetch from TinaCMS GraphQL client
 * 3. Uses `useTina()` for real-time sidebar sync
 * 4. Returns the live data (or static if fetch failed)
 */
function useTinaData<TQueryData extends Record<string, unknown>, TContent>(
  staticData: TContent,
  fetchQuery: () => Promise<TinaQueryResult<TQueryData>>,
  extractContent: (queryData: TQueryData) => TContent,
): { data: TContent; tinaData: TQueryData | null } {
  // Build initial useTina input with static data as a stand-in
  const initialInput: TinaQueryResult<TQueryData> = {
    data: {} as TQueryData,
    query: PLACEHOLDER_QUERY,
    variables: {},
  };

  const [queryResult, setQueryResult] =
    useState<TinaQueryResult<TQueryData>>(initialInput);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetchQuery()
      .then((res) => {
        setQueryResult(res);
        setFetched(true);
      })
      .catch(() => {
        // No TinaCMS server (production) — stay with static data
      });
  }, []);

  // useTina must be called unconditionally (React hook rules)
  const { data: liveData } = useTina(queryResult);

  if (fetched && liveData) {
    try {
      const content = extractContent(liveData);
      return { data: content, tinaData: liveData };
    } catch {
      return { data: staticData, tinaData: null };
    }
  }

  return { data: staticData, tinaData: null };
}

// ─── Home Page ───────────────────────────────────────────────────────────────

export function useTinaHome() {
  const staticContent = getHomePage();

  const result = useTinaData(
    staticContent,
    () => client.queries.homePage({ relativePath: "home.json" }) as any,
    (qd: any) =>
      ({
        heroLabel: qd.homePage.heroLabel ?? "",
        heroTitleLine1: qd.homePage.heroTitleLine1 ?? "",
        heroTitleLine2: qd.homePage.heroTitleLine2 ?? "",
        heroDescription: qd.homePage.heroDescription ?? "",
        aboutHeading: qd.homePage.aboutHeading ?? "",
        aboutParagraph1: qd.homePage.aboutParagraph1 ?? "",
        aboutParagraph2: qd.homePage.aboutParagraph2 ?? "",
        servicesHeading: qd.homePage.servicesHeading ?? "",
        servicesSubtext: qd.homePage.servicesSubtext ?? "",
        servicesButtonText: qd.homePage.servicesButtonText ?? "",
        services: (qd.homePage.services ?? []).map((s: any) => ({
          id: s?.id ?? "",
          title: s?.title ?? "",
          description: s?.description ?? "",
        })),
        processHeading: qd.homePage.processHeading ?? "",
        processSubtext: qd.homePage.processSubtext ?? "",
        processSteps: (qd.homePage.processSteps ?? []).map((s: any) => ({
          num: s?.num ?? "",
          title: s?.title ?? "",
          description: s?.description ?? "",
          tags: (s?.tags ?? []).filter(Boolean),
        })),
      } as HomePageContent),
  );

  /**
   * Returns a data-tina-field prop value for visual editing click-to-edit.
   * Pass the field name from the homePage schema (e.g. 'heroTitleLine1').
   */
  function tinaFieldHome(fieldName: string) {
    if (result.tinaData && (result.tinaData as any).homePage) {
      return rawTinaField((result.tinaData as any).homePage, fieldName);
    }
    return undefined;
  }

  return { data: result.data, tinaField: tinaFieldHome };
}

// ─── About Page ──────────────────────────────────────────────────────────────

export function useTinaAbout() {
  const staticContent = getAboutPage();

  const result = useTinaData(
    staticContent,
    () => client.queries.aboutPage({ relativePath: "about.json" }) as any,
    (qd: any) =>
      ({
        heroLabel: qd.aboutPage.heroLabel ?? "",
        heroTitleLine1: qd.aboutPage.heroTitleLine1 ?? "",
        heroTitleLine2: qd.aboutPage.heroTitleLine2 ?? "",
        studioImage: qd.aboutPage.studioImage ?? "",
        studioImageAlt: qd.aboutPage.studioImageAlt ?? "",
        introHeading: qd.aboutPage.introHeading ?? "",
        introParagraph1: qd.aboutPage.introParagraph1 ?? "",
        introParagraph2: qd.aboutPage.introParagraph2 ?? "",
        valuesLabel: qd.aboutPage.valuesLabel ?? "",
        valuesHeading: qd.aboutPage.valuesHeading ?? "",
        values: (qd.aboutPage.values ?? []).map((v: any) => ({
          id: v?.id ?? "",
          title: v?.title ?? "",
          description: v?.description ?? "",
        })),
        teamMembers: (qd.aboutPage.teamMembers ?? []).map((m: any) => ({
          name: m?.name ?? "",
          role: m?.role ?? "",
          image: m?.image ?? "",
          bio: m?.bio ?? "",
          order: m?.order ?? 999,
        })).sort((a: any, b: any) => a.order - b.order),
      } as AboutPageContent),
  );

  function tinaFieldAbout(fieldName: string) {
    if (result.tinaData && (result.tinaData as any).aboutPage) {
      return rawTinaField((result.tinaData as any).aboutPage, fieldName);
    }
    return undefined;
  }

  return { data: result.data, tinaField: tinaFieldAbout };
}

// ─── Services Page ───────────────────────────────────────────────────────────

export function useTinaServices() {
  const staticContent = getServicesPage();

  const result = useTinaData(
    staticContent,
    () => client.queries.servicesPage({ relativePath: "services.json" }) as any,
    (qd: any) =>
      ({
        heroLabel: qd.servicesPage.heroLabel ?? "",
        heroTitleLine1: qd.servicesPage.heroTitleLine1 ?? "",
        heroTitleLine2: qd.servicesPage.heroTitleLine2 ?? "",
        categories: (qd.servicesPage.categories ?? []).map((c: any) => ({
          category: c?.category ?? "",
          description: c?.description ?? "",
          items: (c?.items ?? []).filter(Boolean),
        })),
      } as ServicesPageContent),
  );

  function tinaFieldServices(fieldName: string) {
    if (result.tinaData && (result.tinaData as any).servicesPage) {
      return rawTinaField((result.tinaData as any).servicesPage, fieldName);
    }
    return undefined;
  }

  return { data: result.data, tinaField: tinaFieldServices };
}

// ─── Contact Page ────────────────────────────────────────────────────────────

export function useTinaContact() {
  const staticContent = getContactPage();

  const result = useTinaData(
    staticContent,
    () => client.queries.contactPage({ relativePath: "contact.json" }) as any,
    (qd: any) =>
      ({
        heroLabel: qd.contactPage.heroLabel ?? "",
        heroTitleLine1: qd.contactPage.heroTitleLine1 ?? "",
        heroTitleLine2: qd.contactPage.heroTitleLine2 ?? "",
        heroTitlePunctuation: qd.contactPage.heroTitlePunctuation ?? "",
        heroDescription: qd.contactPage.heroDescription ?? "",
        trustIndicators: (qd.contactPage.trustIndicators ?? []).map(
          (t: any) => ({
            icon: t?.icon ?? "",
            title: t?.title ?? "",
            description: t?.description ?? "",
          }),
        ),
      } as ContactPageContent),
  );

  function tinaFieldContact(fieldName: string) {
    if (result.tinaData && (result.tinaData as any).contactPage) {
      return rawTinaField((result.tinaData as any).contactPage, fieldName);
    }
    return undefined;
  }

  return { data: result.data, tinaField: tinaFieldContact };
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export function useTinaSettings() {
  const staticContent = getSiteSettings();

  const result = useTinaData(
    staticContent,
    () => client.queries.siteSettings({ relativePath: "settings.json" }) as any,
    (qd: any) => {
      const s = qd.siteSettings;
      return {
        email: s.email ?? "",
        phone: s.phone ?? "",
        phoneLink: s.phoneLink ?? "",
        address: s.address ?? "",
        copyright: s.copyright ?? "",
        contactHeadingLine1: s.contactHeadingLine1 ?? "",
        contactHeadingLine2: s.contactHeadingLine2 ?? "",
        scrollText: s.scrollText ?? "",
        socials: (s.socials ?? []).map((x: any) => ({
          name: x?.name ?? "",
          url: x?.url ?? "",
        })),
        footerLinks: (s.footerLinks ?? []).map((x: any) => ({
          label: x?.label ?? "",
          url: x?.url ?? "",
        })),
      } as SiteSettings;
    },
  );

  function tinaFieldSettings(fieldName: string) {
    if (result.tinaData && (result.tinaData as any).siteSettings) {
      return rawTinaField((result.tinaData as any).siteSettings, fieldName);
    }
    return undefined;
  }

  return { data: result.data, tinaField: tinaFieldSettings };
}

// ─── Partners ────────────────────────────────────────────────────────────────

export function useTinaPartners() {
  const staticContent = getPartners();

  const result = useTinaData(
    staticContent,
    () => client.queries.partners({ relativePath: "partners.json" }) as any,
    (qd: any) =>
      ({
        partnersLabel: qd.partners.partnersLabel ?? "",
        partners: (qd.partners.partners ?? []).filter(Boolean),
      } as PartnersData),
  );

  function tinaFieldPartners(fieldName: string) {
    if (result.tinaData && (result.tinaData as any).partners) {
      return rawTinaField((result.tinaData as any).partners, fieldName);
    }
    return undefined;
  }

  return { data: result.data, tinaField: tinaFieldPartners };
}

// ─── Project Detail ──────────────────────────────────────────────────────────

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
        category: p.category ?? "",
        image: p.image ?? "",
        year: p.year ?? "",
        order: p.order ?? 999,
        description: p.description ?? "",
        fullDescription: p.fullDescription ?? "",
        gallery: (p.gallery ?? []).filter(Boolean),
      } as Project,
      tinaData: liveData.project,
    };
  }

  return { data: staticProject, tinaData: null };
}

// ─── Projects List ──────────────────────────────────────────────────────────

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
            category: p.category ?? "",
            image: p.image ?? "",
            year: p.year ?? "",
            order: p.order ?? 999,
            description: p.description ?? "",
            fullDescription: p.fullDescription ?? "",
            gallery: (p.gallery ?? []).filter(Boolean),
          } as Project),
      )
      .sort((a: Project, b: Project) => a.order - b.order);
    return { data: projects };
  }

  return { data: staticProjects };
}
