import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Section } from './section';

const meta = {
  title: 'UI/Section',
  component: Section,
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Section>
      <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-8">
        Section content follows the standard VISH max width and responsive gutters.
      </div>
    </Section>
  ),
};
