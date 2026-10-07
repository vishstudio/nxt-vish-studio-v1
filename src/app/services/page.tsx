import type { Metadata } from 'next';
import { getServicesPage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { ServicesPage } from '@/src/views/ServicesPage';

export const metadata: Metadata = toMetadata(getServicesPage().seo);

const Services = () => {
  return <ServicesPage />;
}

export default Services;
