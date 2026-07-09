import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Navbar } from './navbar';

const meta = {
  title: 'Navigation/Navbar',
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <div className="min-h-[42rem]"><Navbar /></div>,
};
