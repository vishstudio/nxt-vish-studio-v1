import type { Metadata } from 'next';
import { getPricingPage } from '@/src/lib/pricing';
import { toMetadata } from '@/src/lib/seo';
import { PricingPage } from '@/src/views/PricingPage';

export const metadata: Metadata = toMetadata(getPricingPage().seo);

const Pricing = () => {
  return <PricingPage />;
}

export default Pricing;
