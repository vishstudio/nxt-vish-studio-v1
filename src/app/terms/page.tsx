import type { Metadata } from 'next';
import { getLegalPage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { LegalPage } from '@/src/views/LegalPage';

export const metadata: Metadata = toMetadata(getLegalPage('terms')?.seo);

const TermsPage = () => {
  return <LegalPage slug="terms" />;
}

export default TermsPage;
