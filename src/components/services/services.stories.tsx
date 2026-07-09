import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Services } from './services';

const meta = {
  title: 'Sections/Services',
  component: Services,
} satisfies Meta<typeof Services>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Services />,
};
