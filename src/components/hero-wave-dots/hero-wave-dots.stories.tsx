import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroWaveDots } from './hero-wave-dots';

const meta = {
  title: 'Hero/HeroWaveDots',
  component: HeroWaveDots,
} satisfies Meta<typeof HeroWaveDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative h-[42rem] overflow-hidden">
      <HeroWaveDots />
    </div>
  ),
};
