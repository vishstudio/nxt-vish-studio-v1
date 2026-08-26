import type { Metadata } from 'next';
import { ServiceComingSoonPage } from '@/src/views/ServiceComingSoonPage';

export const metadata: Metadata = {
  title: 'Website Templates | VISH Studio',
  description:
    'Launch-ready website templates from VISH Studio. This service track is coming soon.',
};

const Templates = () => {
  return (
    <ServiceComingSoonPage
      label="Website Templates"
      title="Website templates"
      mutedTitle="coming soon"
      description="Launch-ready website and product templates are being prepared for teams that need a faster starting point without losing the VISH Studio visual standard."
    />
  );
};

export default Templates;
