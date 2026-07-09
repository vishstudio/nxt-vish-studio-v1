import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Team } from './team';

const meta = {
  title: 'Sections/Team',
  component: Team,
} satisfies Meta<typeof Team>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Team />,
};
