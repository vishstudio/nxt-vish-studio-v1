import type { Metadata } from 'next';
import { getServicePage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { ServiceComingSoonPage } from '@/src/views/ServiceComingSoonPage';

export const metadata: Metadata = toMetadata(getServicePage('ai-automations').seo);

const AiAutomations = () => <ServiceComingSoonPage slug="ai-automations" />;

export default AiAutomations;
