import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageLayout } from './page-layout';

const meta = {
  title: 'UI/PageLayout',
  component: PageLayout,
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <PageLayout>
      <div className="mx-auto max-w-[1400px] rounded-3xl border border-white/10 p-8">
        Page layout wrapper content.
      </div>
    </PageLayout>
  ),
};
