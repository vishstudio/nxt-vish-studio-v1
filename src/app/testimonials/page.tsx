import type { Metadata } from 'next';
import { TestimonialsPage } from '@/src/views/TestimonialsPage';

export const metadata: Metadata = {
  title: 'Testimonials | VISH Studio',
  description: 'What our clients say about working with VISH Studio — real feedback from scaling brands worldwide.',
};

const Testimonials = () => {
  return <TestimonialsPage />;
}

export default Testimonials;
