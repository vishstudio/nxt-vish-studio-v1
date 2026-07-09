import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useEffect } from 'react';
import { PROJECT_INQUIRY_MODAL_EVENT } from '../../lib/conversion';
import { ProjectInquiryModal } from './project-inquiry-modal';

const meta = {
  title: 'Forms/ProjectInquiryModal',
  component: ProjectInquiryModal,
} satisfies Meta<typeof ProjectInquiryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: () => {
    useEffect(() => {
      window.dispatchEvent(new Event(PROJECT_INQUIRY_MODAL_EVENT));
    }, []);

    return <ProjectInquiryModal />;
  },
};
