import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroStats } from './hero-stats';

const meta = {
  title: 'Hero/HeroStats',
  component: HeroStats,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof HeroStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isHeroRevealed: true,
    stats: [
      { label: 'Projects', value: 4, suffix: '+', format: 'number' },
      { label: 'Clients', value: 7, suffix: '+', format: 'number' },
      { label: 'Products', value: 4, suffix: '+', format: 'number' },
      { label: 'Established', value: 2019, format: 'year' },
    ],
    className: 'w-[min(43rem,calc(100vw-2rem))]',
  },
};
