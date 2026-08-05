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
  image: '/assets/img/home-cta-1.avif',
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
