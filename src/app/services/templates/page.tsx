import type { Metadata } from 'next';
import { ServiceComingSoonPage } from '@/src/views/ServiceComingSoonPage';

export const metadata: Metadata = {
  title: 'Templates | VISH Studio',
  description:
    'Launch-ready templates from VISH Studio. This service track is coming soon.',
};

const Templates = () => {
  return (
    <ServiceComingSoonPage
      label="Templates"
      title="Templates"
      mutedTitle="coming soon"
      description="Launch-ready website and product templates are being prepared for teams that need a faster starting point without losing the VISH Studio visual standard."
    />
  );
};

export default Templates;
