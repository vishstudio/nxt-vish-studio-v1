import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { FormField } from './form-field';

const meta = {
  title: 'Forms/FormField',
  component: FormField,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inputs: Story = {
  args: {
    id: 'name',
    label: 'Name',
    value: '',
    onChange: () => undefined,
  },
  render: () => {
    const [name, setName] = useState('VISH Studio');
    const [brief, setBrief] = useState('We need a fast, premium website with a clear project inquiry flow.');

    return (
      <div className="w-[min(42rem,calc(100vw-2rem))] space-y-6 p-6">
        <FormField id="name" label="Name" value={name} onChange={setName} required />
        <FormField id="brief" label="Project brief" value={brief} onChange={setBrief} multiline hint="Use textarea mode for longer answers." />
      </div>
    );
  },
};
