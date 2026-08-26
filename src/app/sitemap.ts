import type { MetadataRoute } from 'next';
import { getProjects } from '@/src/lib/projects';

const siteUrl = 'https://vish.studio';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    '',
    '/about',
    '/book-call',
    '/projects',
    '/services',
    '/services/social-media-marketing',
    '/services/saas-products',
    '/services/websites',
    '/services/templates',
    '/services/softwares',
    '/services/mobile-apps',
    '/services/branding',
    '/services/ai-automations',
    '/pricing',
    '/testimonials',
    '/walkthrough',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const projectRoutes = getProjects().map((project) => ({
    url: `${siteUrl}/project/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
