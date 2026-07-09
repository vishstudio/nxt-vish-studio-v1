import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CarouselProgress } from './CarouselProgress';

const meta = {
  title: 'Navigation/CarouselProgress',
  component: CarouselProgress,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CarouselProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { count: 5, activeIndex: 2, className: 'flex' },
};

export const Vertical: Story = {
  args: { count: 5, activeIndex: 2, orientation: 'vertical', className: 'flex' },
};
