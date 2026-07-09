import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TrustedPartners } from './trusted-partners';

const meta = {
  title: 'Sections/TrustedPartners',
  component: TrustedPartners,
} satisfies Meta<typeof TrustedPartners>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TrustedPartners />,
};
