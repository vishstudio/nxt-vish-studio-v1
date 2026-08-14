import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRight } from 'lucide-react';
import { Button } from '../button/button';
import { PageHero } from './page-hero';

const meta = {
  title: 'UI/PageHero',
  component: PageHero,
} satisfies Meta<typeof PageHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    title: null,
  },
  render: () => (
    <PageHero
      label="Services"
      title={<h1 className="font-display text-6xl font-medium leading-none md:text-8xl">Digital systems<span className="text-vish-accent">.</span></h1>}
      description="A restrained page hero using the site typography, spacing, and black/yellow design language."
      action={<Button className="mt-8" variant="cta" icon={<ArrowRight className="h-4 w-4" />}>Schedule a Free Call</Button>}
      backgroundImage="/assets/img/home-cta-1.avif"
    />
  ),
};
