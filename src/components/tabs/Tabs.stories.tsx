import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: 'Service tabs',
    activeIndex: 0,
    onChange: () => undefined,
    items: [
      { id: 'websites', label: 'Websites' },
      { id: 'apps', label: 'Apps' },
    ],
  },
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
      <div className="p-8">
        <Tabs
          ariaLabel="Service tabs"
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          items={[
            { id: 'websites', label: 'Websites' },
            { id: 'apps', label: 'Apps' },
            { id: 'branding', label: 'Branding' },
          ]}
        />
      </div>
    );
  },
};
