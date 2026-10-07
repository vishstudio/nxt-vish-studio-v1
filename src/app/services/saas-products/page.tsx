import type { Metadata } from 'next';
import { getSaasProductsPage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { SaasProductsPage } from '@/src/views/SaasProductsPage';

export const metadata: Metadata = toMetadata(getSaasProductsPage().seo);

const SaasProducts = () => {
  return <SaasProductsPage />;
};

export default SaasProducts;
