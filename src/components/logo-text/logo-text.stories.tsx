import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LogoText } from './logo-text';

const meta = {
  title: 'Brand/LogoText',
  component: LogoText,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof LogoText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <div className="p-8 text-3xl"><LogoText /></div>,
};
