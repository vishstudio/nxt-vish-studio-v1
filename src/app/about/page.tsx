import type { Metadata } from 'next';
import { getAboutPage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { AboutPage } from '@/src/views/About';

export const metadata: Metadata = toMetadata(getAboutPage().seo);

const About = () => {
  return <AboutPage />;
}

export default About;
