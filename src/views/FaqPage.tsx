'use client';

import { Contact } from '../components/contact/contact';
import { Faq } from '../components/faq/faq';
import { PageLayout } from '../components/ui/page-layout/page-layout';

export const FaqPage = () => {
  return (
    <PageLayout>
      <Faq paginate />
      <Contact />
    </PageLayout>
  );
};
