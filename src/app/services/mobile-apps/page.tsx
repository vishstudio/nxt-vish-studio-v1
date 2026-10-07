import type { Metadata } from 'next';
import { getServicePage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { ServiceLandingPage } from '@/src/views/ServiceLandingPage';

export const metadata: Metadata = toMetadata(getServicePage('mobile-apps').seo);

const MobileApps = () => <ServiceLandingPage slug="mobile-apps" />;

export default MobileApps;
