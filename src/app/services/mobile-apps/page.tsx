import type { Metadata } from 'next';
import { ServiceLandingPage } from '@/src/views/ServiceLandingPage';

export const metadata: Metadata = {
  title: 'Mobile Apps | VISH Studio',
  description: 'Mobile app strategy, design, and development from VISH Studio.',
};

const MobileApps = () => <ServiceLandingPage label="Mobile Apps" title="Mobile apps" description="Mobile-first product experiences for customer portals, booking flows, internal teams, and launch-ready iOS or Android app concepts." />;

export default MobileApps;
