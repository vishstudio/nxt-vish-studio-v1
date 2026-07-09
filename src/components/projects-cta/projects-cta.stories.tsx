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
    backgroundImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1800&auto=format&fit=crop',
  },
};
