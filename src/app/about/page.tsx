import type { Metadata } from 'next';
import { AboutPage } from '@/src/views/About';

export const metadata: Metadata = {
  title: 'About | VISH Studio',
  description: 'Meet VISH Studio, the Mauritius creative technology agency helping ambitious businesses turn their next chapter into a trusted digital presence.',
};

const About = () => {
  return <AboutPage />;
}

export default About;
