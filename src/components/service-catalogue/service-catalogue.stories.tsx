import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import services from '../../../content/pages/services.json';
import { ServiceCatalogue } from './service-catalogue';

const meta = {
  title: 'Sections/ServiceCatalogue',
  component: ServiceCatalogue,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ServiceCatalogue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    services: services.categories,
    rawCategories: [],
    tinaField: () => undefined,
  },
};

export const HomepageShowcase: Story = {
  args: {
    services: services.categories,
    rawCategories: [],
    tinaField: () => undefined,
    variant: 'showcase',
  },
};
