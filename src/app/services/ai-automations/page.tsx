import type { Metadata } from 'next';
import { ServiceComingSoonPage } from '@/src/views/ServiceComingSoonPage';

export const metadata: Metadata = {
  title: 'AI Integrations & Automations | VISH Studio',
  description:
    'AI integrations and automation systems from VISH Studio. This service track is coming soon.',
};

const AiAutomations = () => {
  return (
    <ServiceComingSoonPage
      label="AI Integrations & Automations"
      title="AI integrations"
      mutedTitle="coming soon"
      description="AI automation workflows are being shaped for businesses that want cleaner handoffs, assisted operations, and practical internal systems."
    />
  );
};

export default AiAutomations;
