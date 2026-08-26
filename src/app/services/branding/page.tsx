import type { Metadata } from 'next';
import { ServiceLandingPage } from '@/src/views/ServiceLandingPage';

export const metadata: Metadata = {
  title: 'Branding | VISH Studio',
  description: 'Strategic brand identity, visual systems, and launch assets from VISH Studio.',
};

const Branding = () => <ServiceLandingPage label="Branding" title="Branding" description="Strategic brand identity, visual systems, launch assets, and digital guidelines that make your business easier to recognize and trust." />;

export default Branding;
