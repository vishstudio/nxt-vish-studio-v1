import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BrandWatermark } from './brand-watermark';

const meta = {
  title: 'Brand/BrandWatermark',
  component: BrandWatermark,
} satisfies Meta<typeof BrandWatermark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative min-h-[32rem] overflow-hidden border border-white/10">
      <BrandWatermark isVisible />
    </div>
  ),
};
