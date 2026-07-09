import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CookieSettings } from './cookie-settings';

const meta = {
  title: 'Privacy/CookieSettings',
  component: CookieSettings,
} satisfies Meta<typeof CookieSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PanelOpen: Story = {
  args: {
    openSignal: 1,
  },
};
