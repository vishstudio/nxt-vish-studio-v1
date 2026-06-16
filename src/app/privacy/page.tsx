import type { Metadata } from 'next';
import { LegalPage } from '@/src/views/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | VISH Studio',
  description: 'VISH Studio privacy policy — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return <LegalPage slug="privacy" />;
}
