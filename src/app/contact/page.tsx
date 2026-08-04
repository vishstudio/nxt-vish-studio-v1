import type { Metadata } from 'next';
import { ContactPage } from '@/src/views/ContactPage';

export const metadata: Metadata = {
  title: 'Contact | VISH Studio',
  description: 'Get in touch with VISH Studio. Start a project inquiry or reach out to discuss your digital vision.',
};

const Contact = () => {
  return <ContactPage />;
}

export default Contact;
