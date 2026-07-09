import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8">
      <Button variant="cta" icon={<ArrowRight className="h-4 w-4" />}>CTA</Button>
      <Button variant="navigation">Navigation</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="external" icon={<ExternalLink className="h-4 w-4" />}>External</Button>
      <Button variant="caseStudy" size="text">Case Study</Button>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" ariaLabel="Icon button"><ArrowRight className="h-4 w-4" /></Button>
    </div>
  ),
};
