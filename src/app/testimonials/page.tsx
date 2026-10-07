import type { Metadata } from 'next';
import { getTestimonialsPage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { TestimonialsPage } from '@/src/views/TestimonialsPage';

export const metadata: Metadata = toMetadata(getTestimonialsPage().seo);

const Testimonials = () => {
  return <TestimonialsPage />;
}

export default Testimonials;
