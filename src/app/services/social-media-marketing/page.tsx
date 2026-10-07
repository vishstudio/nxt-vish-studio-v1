import type { Metadata } from 'next';
import { getServicePage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { ServiceLandingPage } from '@/src/views/ServiceLandingPage';

export const metadata: Metadata = toMetadata(getServicePage('social-media-marketing').seo);

const SocialMediaMarketing = () => <ServiceLandingPage slug="social-media-marketing" />;

export default SocialMediaMarketing;
