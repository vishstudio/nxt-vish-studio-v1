import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProjectsCta } from './projects-cta';

const meta = {
  title: 'Sections/ProjectsCta',
  component: ProjectsCta,
} satisfies Meta<typeof ProjectsCta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 0,
    backgroundImage: '/assets/img/home-cta-1.avif',
  },
};
