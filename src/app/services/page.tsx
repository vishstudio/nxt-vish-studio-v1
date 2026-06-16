import type { Metadata } from 'next';
import { ServicesPage } from '@/src/views/ServicesPage';

export const metadata: Metadata = {
  title: 'Services | VISH Studio',
  description: 'Custom web application development, high-performance website engineering, and brand architecture services from VISH Studio.',
};

export default function Services() {
  return <ServicesPage />;
}
