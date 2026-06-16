import type { Metadata } from 'next';
import { AboutPage } from '@/src/views/About';

export const metadata: Metadata = {
  title: 'About | VISH Studio',
  description: 'Learn about VISH Studio — a creative web agency based in Mauritius building high-performance digital products for scaling brands globally.',
};

export default function About() {
  return <AboutPage />;
}
