import type { Metadata } from 'next';
import { ServicesPage } from '@/src/views/ServicesPage';

export const metadata: Metadata = {
  title: 'Services | VISH Studio',
  description: 'Social media marketing, SaaS products, websites, website templates, software, mobile apps, branding, and AI integrations from VISH Studio.',
};

const Services = () => {
  return <ServicesPage />;
}

export default Services;
