import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextReveal } from './text-reveal';

const meta = {
  title: 'Motion/TextReveal',
  component: TextReveal,
} satisfies Meta<typeof TextReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'VISH Studio is a collective of designers, developers, and strategists building distinct digital systems.',
  },
  render: () => (
    <div className="min-h-[120vh] px-6 py-32 md:px-12">
      <TextReveal>
        VISH Studio is a collective of designers, developers, and strategists building distinct digital systems.
      </TextReveal>
    </div>
  ),
};
