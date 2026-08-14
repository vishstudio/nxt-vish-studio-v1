import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getSiteSettings } from '@/src/lib/content';
import { NewsletterSignup } from './newsletter-signup';

const meta = {
  title: 'Sections/Newsletter Signup',
  component: NewsletterSignup,
} satisfies Meta<typeof NewsletterSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Footer: Story = {
  args: { source: 'footer', settings: getSiteSettings() },
};

export const Popup: Story = {
  args: { source: 'popup', settings: getSiteSettings() },
};
