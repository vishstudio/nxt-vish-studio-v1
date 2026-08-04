import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LanguageSelector } from './language-selector';

const meta = {
  title: 'Navigation/LanguageSelector',
  component: LanguageSelector,
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex min-h-40 items-start justify-end bg-black p-8">
      <LanguageSelector />
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="w-80 bg-black p-8">
      <LanguageSelector compact />
    </div>
  ),
};
