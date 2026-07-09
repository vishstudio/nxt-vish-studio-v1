import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BriefForm } from './brief-form';

const meta = {
  title: 'Forms/BriefForm',
  component: BriefForm,
} satisfies Meta<typeof BriefForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <div className="min-h-screen px-6 py-20 md:px-12"><BriefForm /></div>,
};
