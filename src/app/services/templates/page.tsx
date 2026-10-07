import type { Metadata } from 'next';
import { getServicePage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { ServiceComingSoonPage } from '@/src/views/ServiceComingSoonPage';

export const metadata: Metadata = toMetadata(getServicePage('templates').seo);

const Templates = () => <ServiceComingSoonPage slug="templates" />;

export default Templates;
