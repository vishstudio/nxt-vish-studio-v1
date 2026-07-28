import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionTitle } from './section-title';

const meta = {
  title: 'UI/SectionTitle',
  component: SectionTitle,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  args: {
    children: 'Section title',
  },
  render: () => (
    <div className="space-y-8 p-8">
      <SectionTitle size="md">Website</SectionTitle>
      <SectionTitle size="sm">Small section title</SectionTitle>
      <SectionTitle size="md">Medium section title</SectionTitle>
      <SectionTitle size="lg">Large section title</SectionTitle>
    </div>
  ),
};
