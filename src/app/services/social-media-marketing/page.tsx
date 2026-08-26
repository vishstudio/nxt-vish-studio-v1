import type { Metadata } from 'next';
import { ServiceLandingPage } from '@/src/views/ServiceLandingPage';

export const metadata: Metadata = {
  title: 'Social Media Marketing | VISH Studio',
  description: 'Social media marketing, campaign planning, and creative direction from VISH Studio.',
};

const SocialMediaMarketing = () => <ServiceLandingPage label="Social Media Marketing" title="Social media marketing" description="Strategic social media marketing, campaign planning, content direction, and performance-focused creative that keep your brand visible and relevant." />;

export default SocialMediaMarketing;
