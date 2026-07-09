import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Projects } from './projects';

const meta = {
  title: 'Sections/Projects',
  component: Projects,
} satisfies Meta<typeof Projects>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeSelectedWork: Story = {
  args: {
    showViewAll: true,
  },
};
