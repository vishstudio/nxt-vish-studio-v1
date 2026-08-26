import type { Metadata } from 'next';
import { ServiceLandingPage } from '@/src/views/ServiceLandingPage';

export const metadata: Metadata = {
  title: 'Websites | VISH Studio',
  description: 'High-converting websites, e-commerce experiences, and marketing platforms from VISH Studio.',
};

const Websites = () => <ServiceLandingPage label="Websites" title="Websites" description="High-converting websites, landing pages, e-commerce experiences, and CMS-backed marketing sites built for speed, clarity, and trust." />;

export default Websites;
