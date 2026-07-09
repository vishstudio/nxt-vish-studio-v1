import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProjectCard } from './project-card';

const meta = {
  title: 'UI/ProjectCard',
  component: ProjectCard,
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const project = {
  slug: 'imagine3d',
  title: 'Imagine3D',
  category: ['Website', 'UX'],
  image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop',
  year: '2026',
  description: 'A polished case study card with image, metadata, and action states.',
  siteUrl: 'https://vish.studio',
};

export const Default: Story = {
  args: {
    project,
    index: 0,
  },
};
