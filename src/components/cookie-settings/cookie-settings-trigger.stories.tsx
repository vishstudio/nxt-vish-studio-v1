import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CookieSettingsTrigger } from './cookie-settings-trigger';

const meta = {
  title: 'Privacy/CookieSettingsTrigger',
  component: CookieSettingsTrigger,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CookieSettingsTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <div className="flex items-center gap-4 p-8"><CookieSettingsTrigger /><CookieSettingsTrigger compact /></div>,
};
