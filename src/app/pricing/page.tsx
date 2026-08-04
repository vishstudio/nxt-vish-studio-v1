import type { Metadata } from 'next';
import { PricingPage } from '@/src/views/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing | VISH Studio',
  description: 'Transparent pricing for custom web applications, high-performance websites, and brand architecture. Find the right plan for your project.',
};

const Pricing = () => {
  return <PricingPage />;
}

export default Pricing;
