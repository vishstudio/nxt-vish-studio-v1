import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Faq } from './faq';

const meta = {
  title: 'Sections/FAQ',
  component: Faq,
} satisfies Meta<typeof Faq>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Faq />,
};
