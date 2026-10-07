import type { Metadata } from 'next';
import { getServicePage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { ServiceLandingPage } from '@/src/views/ServiceLandingPage';

export const metadata: Metadata = toMetadata(getServicePage('branding').seo);

const Branding = () => <ServiceLandingPage slug="branding" />;

export default Branding;
