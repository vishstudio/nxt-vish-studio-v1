export const canonicalServiceSlugs = [
  'social-media-marketing',
  'saas-products',
  'websites',
  'website-templates',
  'softwares',
  'mobile-apps',
  'branding',
  'ai-integrations-automations',
] as const;

export const canonicalServiceNames = [
  'Social Media Marketing',
  'SaaS Products',
  'Websites',
  'Website Templates',
  'Softwares',
  'Mobile Apps',
  'Branding',
  'AI Integrations & Automations',
] as const;

type ServiceOrderItem = {
  slug?: string;
  category?: string;
  label?: string;
  title?: string;
};

const serviceOrderIndex = new Map<string, number>([
  ...canonicalServiceSlugs.map((slug, index) => [slug, index] as const),
  ...canonicalServiceNames.map((name, index) => [name, index] as const),
]);

const getServiceOrderIndex = (service: ServiceOrderItem) => {
  const identifier = [service.slug, service.category, service.label, service.title]
    .find((value) => Boolean(value));

  return identifier ? (serviceOrderIndex.get(identifier) ?? Number.MAX_SAFE_INTEGER) : Number.MAX_SAFE_INTEGER;
};

export const sortByCanonicalServiceOrder = <T extends ServiceOrderItem>(services: T[]) =>
  [...services].sort((a, b) => getServiceOrderIndex(a) - getServiceOrderIndex(b));
