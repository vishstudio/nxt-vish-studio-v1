import type { Metadata } from 'next';
import { getHomePage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { Home } from '@/src/views/Home';

export const metadata: Metadata = toMetadata(getHomePage().seo);

const HomePage = () => {
  return <Home />;
}

export default HomePage;
