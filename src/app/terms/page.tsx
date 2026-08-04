import type { Metadata } from 'next';
import { LegalPage } from '@/src/views/LegalPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions | VISH Studio',
  description: 'VISH Studio terms and conditions governing use of our website and services.',
};

const TermsPage = () => {
  return <LegalPage slug="terms" />;
}

export default TermsPage;
