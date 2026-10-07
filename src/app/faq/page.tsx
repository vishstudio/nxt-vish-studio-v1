import type { Metadata } from 'next';
import { getFaqPage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { FaqPage } from '@/src/views/FaqPage';

export const metadata: Metadata = toMetadata(getFaqPage().seo);

const FaqRoute = () => {
  return <FaqPage />;
};

export default FaqRoute;
