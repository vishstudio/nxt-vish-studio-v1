import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CustomCursor } from './custom-cursor';

const meta = {
  title: 'Interaction/CustomCursor',
  component: CustomCursor,
} satisfies Meta<typeof CustomCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopOnly: Story = {
  render: () => (
    <div className="min-h-screen p-12">
      <CustomCursor />
      <div className="space-y-6">
        <p className="max-w-xl text-gray-400">Move a fine pointer over this story to inspect the custom cursor states.</p>
        <button className="rounded-full border border-white/10 px-5 py-3">Button hover state</button>
        <a data-cursor="project" href="#" className="block max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          Project cursor state
        </a>
      </div>
    </div>
  ),
};
