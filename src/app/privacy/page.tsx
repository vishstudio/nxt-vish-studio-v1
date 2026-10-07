import type { Metadata } from 'next';
import { getLegalPage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { LegalPage } from '@/src/views/LegalPage';

export const metadata: Metadata = toMetadata(getLegalPage('privacy')?.seo);

const PrivacyPage = () => {
  return <LegalPage slug="privacy" />;
}

export default PrivacyPage;
