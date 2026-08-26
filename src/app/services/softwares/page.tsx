import type { Metadata } from 'next';
import { ServiceLandingPage } from '@/src/views/ServiceLandingPage';

export const metadata: Metadata = {
  title: 'Softwares | VISH Studio',
  description: 'Custom business software, client portals, and operational systems from VISH Studio.',
};

const Softwares = () => <ServiceLandingPage label="Softwares" title="Softwares" description="Bespoke business software for operations, portals, approvals, reporting, automation, and internal systems that replace scattered manual work." />;

export default Softwares;
