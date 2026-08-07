import type { Metadata } from 'next';
import { SaasProductsPage } from '@/src/views/SaasProductsPage';

export const metadata: Metadata = {
  title: 'SaaS Products | VISH Studio',
  description:
    'SaaS product design and development for client portals, operational products, and subscription-ready web applications.',
};

const SaasProducts = () => {
  return <SaasProductsPage />;
};

export default SaasProducts;
