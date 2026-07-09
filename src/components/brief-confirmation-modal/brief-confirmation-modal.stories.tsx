import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BriefConfirmationModal } from './brief-confirmation-modal';

const meta = {
  title: 'Forms/BriefConfirmationModal',
  component: BriefConfirmationModal,
} satisfies Meta<typeof BriefConfirmationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    briefId: 'VISH-2026-001',
    onClose: () => undefined,
  },
};
