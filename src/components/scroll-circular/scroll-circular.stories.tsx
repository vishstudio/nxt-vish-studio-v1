import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ScrollCircular } from './scroll-circular';

const meta = {
  title: 'Navigation/ScrollCircular',
  component: ScrollCircular,
} satisfies Meta<typeof ScrollCircular>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <div className="min-h-[32rem]"><ScrollCircular /></div>,
};
