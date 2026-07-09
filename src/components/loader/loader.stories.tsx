import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Loader } from './loader';

const meta = {
  title: 'Feedback/Loader',
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLoadingComplete: () => undefined,
  },
};
